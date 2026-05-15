package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"
)

// statsReport handles POST /stats/report from the extension
func statsReport(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// CORS headers for extension requests
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	err := r.ParseForm()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	domain := r.FormValue("domain")
	version := r.FormValue("version")
	timestampStr := r.FormValue("timestamp")

	if domain == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Sanitize
	domain = sanitizeDomain(domain)
	if len(domain) > 254 || len(version) > 20 {
		w.WriteHeader(http.StatusRequestEntityTooLarge)
		return
	}

	timestamp := time.Now()
	if timestampStr != "" {
		if ms, err := strconv.ParseInt(timestampStr, 10, 64); err == nil {
			timestamp = time.UnixMilli(ms)
		}
	}

	err = dbStatsInsert(domain, version, timestamp)
	if err != nil {
		logger.Println(getRequestId(r) + " Stats error: " + err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// statsQuery handles GET /stats/summary (admin endpoint)
func statsQuery(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	summary, err := dbStatsQuery()
	if err != nil {
		logger.Println(getRequestId(r) + " Stats query error: " + err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(summary)
}

// dbStatsInsert inserts a bypass event into the stats table
func dbStatsInsert(domain string, version string, timestamp time.Time) error {
	stmt, err := db.Prepare("INSERT INTO bypass_stats (domain, ext_version, bypassed_at) VALUES ($1, $2, $3)")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(domain, version, timestamp)
	return err
}

// StatsSummary represents aggregate stats
type StatsSummary struct {
	TotalBypasses   int              `json:"total_bypasses"`
	TodayBypasses   int              `json:"today_bypasses"`
	TopDomains      []DomainCount    `json:"top_domains"`
	VersionBreakdown []VersionCount  `json:"version_breakdown"`
}

type DomainCount struct {
	Domain string `json:"domain"`
	Count  int    `json:"count"`
}

type VersionCount struct {
	Version string `json:"version"`
	Count   int    `json:"count"`
}

// dbStatsQuery returns aggregate statistics
func dbStatsQuery() (*StatsSummary, error) {
	summary := &StatsSummary{}

	// Total bypasses
	err := db.QueryRow("SELECT COUNT(*) FROM bypass_stats").Scan(&summary.TotalBypasses)
	if err != nil {
		return nil, err
	}

	// Today's bypasses
	err = db.QueryRow("SELECT COUNT(*) FROM bypass_stats WHERE bypassed_at >= CURRENT_DATE").Scan(&summary.TodayBypasses)
	if err != nil {
		return nil, err
	}

	// Top 10 domains
	rows, err := db.Query("SELECT domain, COUNT(*) as cnt FROM bypass_stats GROUP BY domain ORDER BY cnt DESC LIMIT 10")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var dc DomainCount
		rows.Scan(&dc.Domain, &dc.Count)
		summary.TopDomains = append(summary.TopDomains, dc)
	}

	// Version breakdown
	rows2, err := db.Query("SELECT ext_version, COUNT(*) as cnt FROM bypass_stats GROUP BY ext_version ORDER BY cnt DESC LIMIT 10")
	if err != nil {
		return nil, err
	}
	defer rows2.Close()
	for rows2.Next() {
		var vc VersionCount
		rows2.Scan(&vc.Version, &vc.Count)
		summary.VersionBreakdown = append(summary.VersionBreakdown, vc)
	}

	return summary, nil
}

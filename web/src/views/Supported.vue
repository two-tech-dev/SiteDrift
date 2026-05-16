<script setup lang="ts">
import { ref, computed } from 'vue';

const supportedSearch = ref('');
const repositoryUrl = 'https://github.com/two-tech-dev/SiteDrift';

const supportedSites = [
  "1link.club", "1shortlink.com", "4shared.com", "5play.ru", "admiregirls-byme.com", "akoam.to", 
  "akw.to", "akwam.org", "all-fans.online", "an1.com", "androidtop.net", "anonym.ninja", 
  "apkhubs.com", "apkmos.com", "badgirlsdrop.com", "blitly.io", "bluetechno.net", "boost.ink", 
  "brpaper.com", "bstlar.com", "cb.click", "cb.run", "cemendemons.com", "cheatsquad.gg", 
  "cpmlink.net", "curseforge.com", "depravityweb.co", "dl.pcgamestorrents.org", "dlandroid.com", 
  "download.modsofapk.com", "earnme.club", "emulator.games", "fansmega.com", "favpng.com", 
  "fc-lc.com", "fex.net", "filedm.com", "filehorse.com", "filepuma.com", "firefaucet.win", 
  "forex-gold.net", "forex1pro.com", "forexit.online", "free-leaks.com", "fssquad.com", 
  "gamalk-sehetk.com", "gamesmega.net", "getwallpapers.com", "goldmega.online", "healdad.com", 
  "healthy4pepole.com", "hotstars-leaks.com", "icerik.site", "idnation.net", "indishare.org", 
  "k2s.cc", "leakutopia.site", "leitup.com", "letsboost.net", "liblink.pl", "linegee.net", 
  "link-to.net", "links-loot.com", "links.shortenbuddy.com", "linksht.com", "linksloot.net", 
  "linkspy.cc", "linkvertise.com", "linkvertise.net", "lkc21.net", "lnk.parts", "lnk2.cc", 
  "longfiles.com", "loot-link.com", "loot-links.com", "lootdest.com", "lootdest.info", 
  "lootdest.org", "lootlink.org", "lootlinks.co", "mangalist.org", "manualsbooks.com", 
  "mega-guy.com", "megadropz.com", "megadumpz.com", "mobi2c.com", "mobilemodsapk.com", 
  "mobitaak.com", "mydramalist.com", "newforex.online", "newsociety0.co", "ofpacksmega.com", 
  "oko.sh", "onepieceex.net", "only-fun.xyz", "onlymega.co", "oracle.com", "ouo.io", 
  "ouo.press", "oxy.cloud", "pirateproxy.wtf", "pnp-drops.me", "portableapps.com", 
  "premiumstashdrop.com", "ps4linux.com", "rareofhub.com", "rekonise.com", "ryn.cc", 
  "sammobile.com", "secret-links.com", "secretpack-links.com", "sfile.mobi", "sfile.xyz", 
  "sfirmware.com", "shopforex.online", "shortly.xyz", "shortmoz.link", "softpedia.com", 
  "solvetube.site", "srt.am", "sub2unlock.com", "sub4unlock.com", "syosetu.org", "tavernleaks.com", 
  "thepremium.online", "tii.la", "tik.lat", "tl.gd", "tlkm.id", "tomxcontent.com", "u.to", 
  "uiz.app", "uiz.io", "uploadking.net", "uploadrar.com", "uploadrar.net", "uptomega.me", 
  "usanewstoday.club", "ux9.de", "wadooo.com", "work.ink", "workink.click", "world-trips.net", 
  "world2our.com", "www.adtival.network", "www.clictune.com", "www.dlink2.com", "www.dlink2.net", 
  "www.dlink4.com", "xprmpacks.com", "ydfile.com", "ytsubme.com", "zedge.net"
];

const filteredSites = computed(() => {
  const query = supportedSearch.value.trim().toLowerCase();
  if (!query) return supportedSites;
  return supportedSites.filter((site) => site.toLowerCase().includes(query));
});
</script>

<template>
  <main class="page-wrapper">
    <div class="container" style="max-width: 900px;">
      
      <div 
        class="header-section"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <span class="eyebrow">Bypass Directory</span>
        <h1>Supported Sites</h1>
        <p class="directory-intro text-muted">
          Search the domains SiteDrift currently knows how to handle. Support can change as
          shortener services evolve, so this directory is a transparency snapshot rather than a guarantee.
        </p>

        <div class="directory-stats">
          <div class="directory-stat glass-panel">
            <strong>{{ supportedSites.length }}</strong>
            <span>Supported domains</span>
          </div>
          <div class="directory-stat glass-panel">
            <strong>Searchable</strong>
            <span>Find root domains quickly</span>
          </div>
          <div class="directory-stat glass-panel">
            <strong>Community</strong>
            <span>Improved through contributions</span>
          </div>
        </div>

        <div class="search-container">
          <input
            v-model="supportedSearch"
            class="input-glass search-input"
            placeholder="Search domains like linkvertise..."
            aria-label="Search supported domains"
          />
          <div class="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        <p class="result-count text-muted">Showing {{ filteredSites.length }} of {{ supportedSites.length }} domains</p>
      </div>
      
      <section class="support-flow glass-panel">
        <div class="flow-item">
          <span>01</span>
          <h2>Domain-specific modules</h2>
          <p class="text-muted">SiteDrift uses targeted bypass logic for supported services instead of one generic shortcut.</p>
        </div>
        <div class="flow-item">
          <span>02</span>
          <h2>Crowd bypass assists repeats</h2>
          <p class="text-muted">When a resolved destination is known, future visits to the same link can move faster.</p>
        </div>
        <div class="flow-item">
          <span>03</span>
          <h2>Support evolves</h2>
          <p class="text-muted">Shortener sites change often, so the directory improves through reports and open-source contributions.</p>
        </div>
      </section>

      <div
        class="sites-grid"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 600, delay: 200 } }"
      >
        <transition-group name="fade">
          <div
            v-for="site in filteredSites"
            :key="site"
            class="site-card glass-panel glass-panel-hover"
            v-motion
            :initial="{ opacity: 0, scale: 0.96 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 220 } }"
          >
            <div class="site-dot"></div>
            {{ site }}
          </div>
        </transition-group>

        <div v-if="filteredSites.length === 0" class="no-results glass-panel">
          <h2>No matching domain yet</h2>
          <p class="text-muted">Try searching the root domain without paths or subpages. If SiteDrift does not support it yet, you can request or contribute support.</p>
          <a :href="repositoryUrl" class="btn btn-secondary">Request support on GitHub</a>
        </div>
      </div>
      
    </div>
  </main>
</template>

<style scoped>
.header-section {
  margin-bottom: 3rem;
  text-align: center;
}

.header-section h1 {
  margin-bottom: 1.25rem;
}

.directory-intro {
  max-width: 720px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
}

.directory-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0 auto 2rem;
}

.directory-stat {
  padding: 1.25rem;
}

.directory-stat strong {
  display: block;
  color: var(--accent-cyan);
  font-size: 1.5rem;
  margin-bottom: 0.35rem;
}

.directory-stat span {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.search-container {
  position: relative;
  max-width: 600px;
  margin-inline: auto;
}

.search-input {
  padding-left: 3rem;
  font-size: 1.125rem;
  border-radius: var(--radius-full);
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.result-count {
  margin-top: 1rem;
  font-size: 0.95rem;
}

.support-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  margin-bottom: 3rem;
}

.flow-item span {
  display: inline-flex;
  margin-bottom: 1rem;
  color: var(--accent-cyan);
  font-weight: 700;
  letter-spacing: 0.16em;
}

.flow-item h2 {
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.site-card {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
}

.site-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.no-results {
  grid-column: 1 / -1;
  padding: 4rem;
  text-align: center;
}

.no-results h2 {
  margin-bottom: 1rem;
}

.no-results p {
  max-width: 520px;
  margin: 0 auto 1.5rem;
}

@media (max-width: 768px) {
  .directory-stats,
  .support-flow {
    grid-template-columns: 1fr;
  }
}
</style>

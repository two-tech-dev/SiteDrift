# SiteDrift Frontend Architecture & Design

This document outlines the design, architecture, and technology stack for the new SiteDrift web presence. The goal is to separate the frontend from the Go backend, creating a unified platform that serves as both a public portfolio/landing page and a secure admin panel.

## 1. Core Objectives

*   **Decoupling:** Move the Admin Panel out of the Go server's static templates into a modern Single Page Application (SPA) or Server-Side Rendered (SSR) app.
*   **Brand Identity:** Establish SiteDrift as a premium, community-driven open-source project.
*   **Public Transparency:** Showcase real-time crowd statistics and supported bypasses to build trust and encourage installations.
*   **Admin Efficiency:** Provide a fast, responsive interface for moderators to review reported links and manage the crowd database.

## 2. Technology Stack

To ensure excellent SEO, performance, and a premium developer experience, the following stack is recommended:

*   **Framework:** **Next.js** (App Router) or **Nuxt 3** (if you prefer to stick with Vue, which is used in the extension's popup). Next/Nuxt provides excellent SEO for the landing page while supporting secure, client-side routing for the admin panel.
*   **Styling:** **Vanilla CSS with CSS Modules** (or SCSS). *Note: Adhering to the project's design philosophy, we avoid utility-first frameworks like Tailwind CSS to maintain maximum control over bespoke, premium animations and glassmorphic effects.*
*   **Animations:** **Framer Motion** (React) or **VueUse Motion** (Vue) for fluid page transitions, scroll reveals, and interactive micro-animations.
*   **Data Fetching:** Standard `fetch` API or `SWR`/`Vue Query` for real-time admin panel updates.

## 3. Design Aesthetics & Vibe

SiteDrift should feel like a state-of-the-art, "hacker-chic" but highly polished tool.

*   **Theme:** Deep Dark Mode default. Backgrounds should be rich dark navy (`#0b1326`) fading into pure black.
*   **Colors:** Use the extension's color tokens to maintain brand consistency:
    *   Primary Accent: Soft Blue (`#adc6ff`)
    *   Secondary Accent: Vibrant Cyan/Neon (`#4cd7f6`) for glowing effects and active states.
    *   Warnings/Deletes: Soft Red (`#ffb4ab`)
*   **Materials:** **Glassmorphism**. Cards, navbars, and modals should use translucent backgrounds with `backdrop-filter: blur(12px)` and subtle, semi-transparent borders.
*   **Typography:** Modern, geometric sans-serif like **Inter**, **Outfit**, or **Geist** (currently used in the extension).
*   **Animations:**
    *   Hover states should have a slight scale-up and increased glow.
    *   Counters (like total bypasses) should smoothly tick up.
    *   Page transitions should be seamless cross-fades.

## 4. Architecture & Routing

### Public Portfolio (SEO Optimized)

*   **`/` (Home):**
    *   **Hero Section:** High-impact headline ("Skip the Wait. Instantly."), glowing install button, and a dynamic 3D or animated abstract graphic representing data flowing past barriers.
    *   **Live Stats Ribbon:** A ticker showing "X Million Links Bypassed" and "Y Years of Time Saved" (fetching from `/stats/summary`).
    *   **Features Grid:** Cards highlighting Crowd Bypass, Tracker Removal, and Open Source nature.
*   **`/supported` (Bypass Directory):**
    *   A searchable, paginated list of all supported domains. Good for SEO (e.g., users searching "how to bypass linkvertise").
*   **`/community` (or `/stats`):**
    *   Public dashboard showing the top contributors, top bypassed domains, and health of the network.

### Secure Admin Panel (Client-Side / Protected)

*   **`/admin/login`:**
    *   Sleek, minimalist login card with glassmorphism.
*   **`/admin/dashboard`:**
    *   Overview of system health, recent reports, and quick stats.
*   **`/admin/reports` (The Queue):**
    *   A Tinder-like or highly efficient list view for reported crowd links.
    *   Moderators can quickly click "Approve" (keep link) or "Delete" (remove malicious/wrong link).
    *   Keyboard shortcuts (e.g., Arrow Left for delete, Arrow Right for approve) for rapid moderation.
*   **`/admin/settings`:**
    *   Manage admin accounts, change passwords, and configure global server flags.

## 5. API Integration Strategy

The Go backend (`ServerDriftCrowd`) will act purely as a JSON REST API.

1.  **CORS:** The Go server must be configured to accept cross-origin requests from the new frontend domain.
2.  **Authentication:** Admin routes on the backend currently use cookie/token auth. The frontend will need to store the session token (HTTP-only cookie preferred, or secure local storage) and attach it to requests to `/admin/api/*`.
3.  **New Public Endpoints Needed (Optional but recommended):**
    *   `GET /api/public/stats` (Already partially implemented via `/stats/summary`).
    *   `GET /api/public/supported-sites` (Could serve the list of domains extracted from the extension's bypass folders).

## 6. Implementation Roadmap

**Phase 1: Project Setup & Landing Page**
*   Initialize Next.js / Nuxt repository.
*   Setup global CSS, fonts, and CSS variables matching the extension.
*   Build the public Landing Page and integrate the `/stats/summary` API.

**Phase 2: Admin Panel Foundation**
*   Create the `/admin` layout.
*   Implement the login flow, connecting to the Go server's auth endpoints.
*   Setup route guards to protect `/admin/*` pages.

**Phase 3: Moderation Queue**
*   Build the Reports interface connecting to `/admin/api/getreported`.
*   Implement the Vote Delete functionality (`/admin/api/votedelete`).

**Phase 4: Cleanup & Deployment**
*   Remove the old `adminHandlers.go` HTML serving logic from the Go backend.
*   Deploy the frontend to Vercel/Netlify.
*   Deploy the API to the main server.

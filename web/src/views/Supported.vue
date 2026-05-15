<script setup lang="ts">
import { ref, computed } from 'vue';

const supportedSearch = ref('');

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
        <h1 style="margin-bottom: 2rem;">Supported Sites</h1>
        
        <div class="search-container">
          <input 
            v-model="supportedSearch" 
            class="input-glass search-input" 
            placeholder="Search domains like linkvertise..." 
          />
          <div class="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
      </div>
      
      <div 
        class="sites-grid"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 600, delay: 200 } }"
      >
        <transition-group name="fade">
          <div 
            v-for="(site, index) in filteredSites" 
            :key="site" 
            class="site-card glass-panel glass-panel-hover"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 300, delay: index * 50 } }"
          >
            <div class="site-dot"></div>
            {{ site }}
          </div>
        </transition-group>
        
        <div v-if="filteredSites.length === 0" class="no-results glass-panel">
          <p class="text-muted">No sites found matching "{{ supportedSearch }}"</p>
        </div>
      </div>
      
    </div>
  </main>
</template>

<style scoped>
.header-section {
  margin-bottom: 4rem;
  text-align: center;
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
</style>

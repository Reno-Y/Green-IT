<template>
  <div class="dashboard-page">
    <!-- NAV -->
    <nav class="nav" aria-label="Navigation principale">
      <div class="nav-inner">
        <router-link to="/dashboard" class="nav-logo">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M4 18C4 18 6.5 9.5 11 6C15.5 2.5 18 3 18 3C18 3 18.5 5.5 15 10C11.5 14.5 4 18 4 18Z"
                  fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M4 18L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          EcoTrace
        </router-link>
        <nav class="nav-links" aria-label="Navigation secondaire">
          <router-link to="/dashboard" class="active" aria-current="page">Tableau de bord</router-link>
          <router-link to="/usages">Mes usages</router-link>
          <router-link to="/profile">Profil</router-link>
        </nav>
        <div class="nav-end">
          <button class="btn-icon" @click="toggleTheme" title="Changer de thème" aria-label="Changer de thème">
            <span class="theme-icon" v-html="themeIcon"></span>
          </button>
          <router-link to="/login" class="btn btn-ghost btn-sm">Déconnexion</router-link>
        </div>
      </div>
    </nav>

    <main>
      <div class="container page-pad">
        <!-- Page header -->
        <header class="page-header">
          <h1 class="page-title">Bonjour, Marie 👋</h1>
          <p class="page-desc">Bilan de la semaine du 7 au 13 avril 2025</p>
        </header>

        <!-- STATS GRID -->
        <section aria-labelledby="stats-title">
          <h2 class="sr-only" id="stats-title">Statistiques de la semaine</h2>
          <div class="grid-4" style="margin-bottom:1.25rem">
            <!-- Main CO2 card -->
            <div class="card col-span-2">
              <p class="card-label">Empreinte cette semaine</p>
              <div class="stat-num lg" style="color:var(--am)" aria-label="2 virgule 847 kilogrammes CO2 équivalent">2.847</div>
              <p class="stat-unit">kg CO₂eq</p>
              <span class="stat-delta delta-down" aria-label="En baisse de 12 pourcent par rapport à la semaine dernière">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 2L6 10M2 7L6 10L10 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                12 % vs semaine dernière
              </span>
              <p style="margin-top:.625rem;font-size:.8rem;color:var(--t3)">
                ≈ 14 km en voiture · 3 smartphones entièrement chargés
              </p>
            </div>

            <!-- Score card -->
            <div class="card" style="display:flex;flex-direction:column;align-items:flex-start">
              <p class="card-label">Score EcoNom.</p>
              <div class="score-ring" style="--score:72" aria-label="Score 72 sur 100">
                <span class="score-ring-val">72</span>
              </div>
              <span class="stat-delta delta-down" style="margin-top:.625rem">
                ↑ 4 pts ce mois
              </span>
            </div>

            <!-- Total saved -->
            <div class="card">
              <p class="card-label">Total économisé</p>
              <div class="stat-num" style="color:var(--ac)" aria-label="4 virgule 2 kilogrammes CO2 équivalent évités">4.2</div>
              <p class="stat-unit">kg CO₂eq évités</p>
              <p class="stat-delta delta-eq" style="margin-top:.375rem">depuis votre inscription</p>
            </div>
          </div>
        </section>

        <!-- CHART + RECENT USAGES -->
        <div class="grid-2" style="gap:1.25rem;margin-bottom:1.25rem;align-items:start">
          <!-- Bar chart -->
          <section class="card" aria-labelledby="chart-title">
            <div class="section-header">
              <h2 class="section-title" id="chart-title">Répartition par usage</h2>
              <span class="section-sub">Cette semaine</span>
            </div>
            <div class="bars" role="list" aria-label="Répartition des émissions par catégorie">
              <div v-for="bar in barData" :key="bar.label" class="bar-row" role="listitem">
                <span class="bar-label">{{ bar.label }}</span>
                <div class="bar-track" role="progressbar" :aria-valuenow="bar.pct" aria-valuemin="0" aria-valuemax="100">
                  <div class="bar-fill" :style="{ '--pct': bar.pct + '%', '--bar-c': bar.color }"></div>
                </div>
                <span class="bar-val">{{ bar.value }}</span>
              </div>
            </div>
            <div style="display:flex;gap:.625rem;flex-wrap:wrap;margin-top:1.25rem;padding-top:1rem;border-top:.5px solid var(--bd)">
              <span class="badge badge-stream">▶ Streaming 65 %</span>
              <span class="badge badge-social"># Social 15 %</span>
              <span class="badge badge-cloud">↑ Cloud 11 %</span>
              <span class="badge badge-email">@ Email 10 %</span>
            </div>
          </section>

          <!-- Recent usages -->
          <section class="card" aria-labelledby="recent-title">
            <div class="section-header">
              <h2 class="section-title" id="recent-title">Derniers usages</h2>
              <router-link to="/usages" class="btn btn-ghost btn-sm">Tout voir →</router-link>
            </div>
            <ol style="list-style:none">
              <li v-for="usage in recentUsages" :key="usage.id" class="usage-item">
                <span class="usage-dot" :style="{ background: usage.color }" aria-hidden="true"></span>
                <div class="usage-info">
                  <p class="usage-platform">{{ usage.platform }}</p>
                  <p class="usage-meta"><time :datetime="usage.date">{{ usage.dateDisplay }}</time> · {{ usage.duration }}</p>
                </div>
                <span class="usage-co2" :aria-label="usage.co2">{{ usage.co2 }}</span>
              </li>
            </ol>
            <div style="margin-top:1rem;padding-top:1rem;border-top:.5px solid var(--bd);text-align:center">
              <router-link to="/usages" class="btn btn-outline btn-sm" style="width:100%;justify-content:center">
                + Ajouter un usage
              </router-link>
            </div>
          </section>
        </div>

        <!-- TIPS -->
        <section aria-labelledby="tips-title">
          <div class="section-header">
            <h2 class="section-title" id="tips-title">Recommandations personnalisées</h2>
          </div>
          <div class="grid-2" style="gap:.75rem">
            <div v-for="tip in tips" :key="tip.id" class="tip-card">
              <span class="tip-icon" aria-hidden="true">{{ tip.icon }}</span>
              <div class="tip-body">
                <strong>{{ tip.title }}</strong>
                {{ tip.description }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- FOOTER -->
    <footer role="contentinfo">
      <div class="footer-inner">
        <p class="footer-text">© 2025 EcoTrace · Projet Numérique Durable TI616 · EFREI Paris</p>
        <span class="footer-green">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 9C1 9 2.5 4.5 5 3C7.5 1.5 9 2 9 2C9 2 9 3.5 7.5 6C6 8.5 1 9 1 9Z" fill="currentColor"/>
          </svg>
          Éco-conçu · &lt; 50 Ko · 0 requête externe
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      themeIcon: '',
      barData: [
        { label: 'Streaming', pct: 65, value: '1.85 kg', color: 'var(--rd)' },
        { label: 'Réseaux soc.', pct: 15, value: '0.42 kg', color: 'var(--am)' },
        { label: 'Cloud', pct: 11, value: '0.30 kg', color: 'var(--ac)' },
        { label: 'Emails', pct: 10, value: '0.28 kg', color: 'var(--bl)' }
      ],
      recentUsages: [
        { id: 1, platform: 'Netflix', date: '2025-04-13', dateDisplay: '13 avr.', duration: '2 h 30 min', co2: '0.85 kg', color: 'var(--rd)' },
        { id: 2, platform: 'Gmail', date: '2025-04-13', dateDisplay: '13 avr.', duration: '45 emails', co2: '0.14 kg', color: 'var(--bl)' },
        { id: 3, platform: 'Instagram', date: '2025-04-12', dateDisplay: '12 avr.', duration: '1 h 15 min', co2: '0.21 kg', color: 'var(--am)' },
        { id: 4, platform: 'Google Drive', date: '2025-04-12', dateDisplay: '12 avr.', duration: '2.3 Go synchronisés', co2: '0.18 kg', color: 'var(--ac)' },
        { id: 5, platform: 'YouTube', date: '2025-04-11', dateDisplay: '11 avr.', duration: '3 h', co2: '1.02 kg', color: 'var(--rd)' }
      ],
      tips: [
        { id: 1, icon: '💡', title: 'Réduisez la qualité vidéo', description: 'Passer de 4K à 1080p réduit l\'empreinte streaming de 60 %. Économie estimée : 1.1 kg CO₂ par mois.' },
        { id: 2, icon: '📧', title: 'Nettoyez votre boîte mail', description: 'Supprimer 1 000 emails = 10 g de CO₂ économisés. Désabonnez-vous des newsletters inutiles.' },
        { id: 3, icon: '📱', title: 'Limitez le scroll infini', description: '1 h de moins par jour sur les réseaux sociaux = −4.5 kg CO₂/an. Activez un minuteur d\'application.' },
        { id: 4, icon: '☁', title: 'Faites le ménage dans le cloud', description: 'Les fichiers dupliqués et les photos floues occupent des serveurs. Un audit mensuel suffit.' }
      ]
    }
  },
  mounted() {
    this.updateThemeIcon();
  },
  methods: {
    toggleTheme() {
      const html = document.documentElement;
      const isLight = html.dataset.theme === 'light';
      if (isLight) {
        delete html.dataset.theme;
        localStorage.setItem('et-theme', 'dark');
      } else {
        html.dataset.theme = 'light';
        localStorage.setItem('et-theme', 'light');
      }
      this.updateThemeIcon();
    },
    updateThemeIcon() {
      const html = document.documentElement;
      const isLight = html.dataset.theme === 'light';
      this.themeIcon = isLight ? this.moonSVG() : this.sunSVG();
    },
    sunSVG() {
      return `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <circle cx="7.5" cy="7.5" r="2.5"/><line x1="7.5" y1="1" x2="7.5" y2="2.25"/>
        <line x1="7.5" y1="12.75" x2="7.5" y2="14"/><line x1="1" y1="7.5" x2="2.25" y2="7.5"/>
        <line x1="12.75" y1="7.5" x2="14" y2="7.5"/><line x1="2.9" y1="2.9" x2="3.8" y2="3.8"/>
        <line x1="11.2" y1="11.2" x2="12.1" y2="12.1"/><line x1="2.9" y1="12.1" x2="3.8" y2="11.2"/>
        <line x1="11.2" y1="3.8" x2="12.1" y2="2.9"/></svg>`;
    },
    moonSVG() {
      return `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.5 9.5A6 6 0 015 2a6 6 0 000 11 6 6 0 007.5-3.5z"/></svg>`;
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.theme-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
}
</style>


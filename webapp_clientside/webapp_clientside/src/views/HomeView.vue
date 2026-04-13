<template>
  <div class="home-page">
    <!-- ===== NAV ===== -->
    <nav class="nav" aria-label="Navigation principale">
      <div class="nav-inner">
        <router-link to="/" class="nav-logo" aria-label="EcoTrace accueil">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M4 18C4 18 6.5 9.5 11 6C15.5 2.5 18 3 18 3C18 3 18.5 5.5 15 10C11.5 14.5 4 18 4 18Z"
                  fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M4 18L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          EcoTrace
        </router-link>
        <div class="nav-end">
          <button class="btn-icon" @click="toggleTheme" title="Changer de thème" aria-label="Changer de thème">
            <span class="theme-icon" v-html="themeIcon"></span>
          </button>
          <router-link to="/login" class="btn btn-ghost btn-sm">Connexion</router-link>
          <router-link to="/register" class="btn btn-primary btn-sm">S'inscrire</router-link>
        </div>
      </div>
    </nav>

    <main>
      <!-- ===== HERO ===== -->
      <section class="hero">
        <div class="container">
          <div class="hero-pill" aria-label="Éco-conçu">
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <circle cx="5" cy="5" r="4" fill="currentColor" opacity=".5"/>
              <circle cx="5" cy="5" r="2" fill="currentColor"/>
            </svg>
            Numérique durable
          </div>
          <h1>Votre empreinte numérique,<br><span class="ac">enfin visible.</span></h1>
          <p class="hero-lead">
            Mesurez l'impact carbone de votre streaming, vos emails, réseaux sociaux
            et stockage cloud. Agissez concrètement, chaque jour.
          </p>
          <div class="hero-ctas">
            <router-link to="/register" class="btn btn-primary btn-lg">Commencer gratuitement</router-link>
            <router-link to="/dashboard" class="btn btn-outline btn-lg">Voir la démo</router-link>
          </div>
          <div class="hero-nums" aria-label="Statistiques de la plateforme">
            <div>
              <div class="hero-num-val">1 247</div>
              <div class="hero-num-label">kg CO₂ économisés</div>
            </div>
            <div>
              <div class="hero-num-val">8 423</div>
              <div class="hero-num-label">usages analysés</div>
            </div>
            <div>
              <div class="hero-num-val">A</div>
              <div class="hero-num-label">score EcoIndex moyen</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== CATEGORIES ===== -->
      <section class="features" aria-labelledby="feat-title">
        <div class="container">
          <p class="section-eyebrow">Usages suivis</p>
          <h2 class="section-heading" id="feat-title">Chaque clic a un coût</h2>
          <div class="features-grid" role="list">
            <article v-for="feature in features" :key="feature.id" class="feat-card" role="listitem">
              <div :class="['feat-icon', feature.icon]" aria-hidden="true">{{ feature.symbol }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
              <span class="feat-co2">{{ feature.co2 }}</span>
            </article>
          </div>
        </div>
      </section>

      <!-- ===== HOW IT WORKS ===== -->
      <section class="how" aria-labelledby="how-title">
        <div class="container">
          <p class="section-eyebrow" style="text-align:center">Comment ça marche</p>
          <h2 class="section-heading" id="how-title" style="text-align:center">Trois étapes, zéro friction</h2>
          <div class="how-steps" role="list">
            <div v-for="step in howSteps" :key="step.id" class="how-step" role="listitem">
              <div class="how-num" aria-hidden="true">{{ step.number }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== CTA FINAL ===== -->
      <section style="padding-block:4rem;text-align:center;border-top:.5px solid var(--bd)">
        <div class="container">
          <h2 style="font-size:clamp(1.4rem,3vw,2rem);font-weight:700;letter-spacing:-.02em;margin-bottom:.75rem">
            Prêt à mesurer votre empreinte ?
          </h2>
          <p style="font-size:.925rem;color:var(--t2);margin-bottom:1.75rem">
            Gratuit, open-source et éco-conçu. Poids total de la page : &lt; 50 Ko.
          </p>
          <router-link to="/register" class="btn btn-primary btn-lg">Créer mon compte</router-link>
        </div>
      </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer role="contentinfo">
      <div class="footer-inner">
        <p class="footer-text">© 2025 EcoTrace · Projet Numérique Durable TI616 · EFREI Paris</p>
        <span class="footer-green" aria-label="Site éco-conçu">
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
  name: 'HomeView',
  data() {
    return {
      themeIcon: '',
      features: [
        {
          id: 1,
          icon: 'fi-stream',
          symbol: '▶',
          title: 'Streaming vidéo',
          description: 'Netflix, YouTube, Twitch… La vidéo en ligne représente 60 % du trafic mondial et une part majeure des émissions numériques.',
          co2: '≈ 36 g CO₂/h en HD'
        },
        {
          id: 2,
          icon: 'fi-email',
          symbol: '@',
          title: 'Emails',
          description: 'Un email avec pièce jointe émet jusqu\'à 50 g de CO₂. Suivi de vos envois, newsletters reçues et nettoyage de boîte.',
          co2: '≈ 0.3–50 g CO₂/email'
        },
        {
          id: 3,
          icon: 'fi-social',
          symbol: '#',
          title: 'Réseaux sociaux',
          description: 'Scroll infini, stories, reels… L\'usage passif des réseaux sociaux cumule des heures de serveurs actifs chaque jour.',
          co2: '≈ 2.5 g CO₂/min'
        },
        {
          id: 4,
          icon: 'fi-cloud',
          symbol: '↑',
          title: 'Stockage cloud',
          description: 'Google Drive, Dropbox, iCloud… Chaque fichier synchronisé transite par des datacenters qui tournent 24h/24.',
          co2: '≈ 7 g CO₂/Go stocké/an'
        }
      ],
      howSteps: [
        {
          id: 1,
          number: '01',
          title: 'Créez votre compte',
          description: 'Inscription en moins d\'une minute. Aucune donnée vendue, aucun tracking publicitaire.'
        },
        {
          id: 2,
          number: '02',
          title: 'Saisissez vos usages',
          description: 'Renseignez votre streaming, vos emails, votre temps sur les réseaux sociaux et votre stockage cloud.'
        },
        {
          id: 3,
          number: '03',
          title: 'Réduisez votre impact',
          description: 'Visualisez votre bilan carbone et suivez les recommandations personnalisées pour le diminuer.'
        }
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
.home-page {
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


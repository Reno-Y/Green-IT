<template>
  <div class="login-page">
    <!-- NAV -->
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
          <router-link to="/register" class="btn btn-primary btn-sm">S'inscrire</router-link>
        </div>
      </div>
    </nav>

    <main class="auth-wrap">
      <div class="auth-card">
        <div class="card">
          <h1 class="auth-title">Connexion</h1>
          <p class="auth-sub">Bienvenue ! Suivez votre empreinte numérique.</p>

          <form @submit.prevent="handleLogin" novalidate>
            <div class="form-group">
              <label for="email">Adresse email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="vous@exemple.com"
                autocomplete="email"
              >
              <p class="form-error" v-if="errors.email">{{ errors.email }}</p>
            </div>

            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                v-model="form.password"
                placeholder="••••••••"
                autocomplete="current-password"
              >
              <p class="form-error" v-if="errors.password">{{ errors.password }}</p>
            </div>

            <div style="display:flex;align-items:center;justify-content:flex-end;margin-bottom:1.25rem">
              <a href="#" style="font-size:.825rem;color:var(--t2)">Mot de passe oublié ?</a>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
              Se connecter
            </button>
          </form>
        </div>

        <p class="auth-foot">
          Pas encore de compte ? <router-link to="/register">Créer mon compte</router-link>
        </p>
      </div>
    </main>

    <!-- FOOTER -->
    <footer role="contentinfo">
      <div class="footer-inner">
        <p class="footer-text">© 2025 EcoTrace · Projet Numérique Durable TI616</p>
        <span class="footer-green">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 9C1 9 2.5 4.5 5 3C7.5 1.5 9 2 9 2C9 2 9 3.5 7.5 6C6 8.5 1 9 1 9Z" fill="currentColor"/>
          </svg>
          Éco-conçu · &lt; 50 Ko
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      themeIcon: ''
    }
  },
  mounted() {
    this.updateThemeIcon();
  },
  methods: {
    handleLogin() {
      this.errors = {};

      if (!this.form.email.trim()) {
        this.errors.email = 'Email requis';
      } else if (!this.form.email.includes('@')) {
        this.errors.email = 'Email invalide';
      }

      if (!this.form.password.trim()) {
        this.errors.password = 'Mot de passe requis';
      }

      if (Object.keys(this.errors).length === 0) {
        this.$router.push('/dashboard');
      }
    },
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
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.auth-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.theme-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
}
</style>


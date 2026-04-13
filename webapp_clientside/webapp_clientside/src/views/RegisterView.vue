<template>
  <div class="register-page">
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
          <router-link to="/login" class="btn btn-ghost btn-sm">Connexion</router-link>
        </div>
      </div>
    </nav>

    <main class="auth-wrap">
      <div class="auth-card">
        <div class="card">
          <h1 class="auth-title">Créer un compte</h1>
          <p class="auth-sub">Mesurez votre impact numérique dès aujourd'hui.</p>

          <form @submit.prevent="handleRegister" novalidate>
            <div class="form-group">
              <label for="nom">Nom complet</label>
              <input
                type="text"
                id="nom"
                v-model="form.nom"
                placeholder="Marie Dupont"
                autocomplete="name"
              >
              <p class="form-error" v-if="errors.nom">{{ errors.nom }}</p>
            </div>

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
                placeholder="8 caractères minimum"
                autocomplete="new-password"
                minlength="8"
              >
              <p class="form-hint">Minimum 8 caractères.</p>
              <p class="form-error" v-if="errors.password">{{ errors.password }}</p>
            </div>

            <div class="form-group">
              <label for="confirm">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirm"
                v-model="form.confirm"
                placeholder="••••••••"
                autocomplete="new-password"
              >
              <p class="form-error" v-if="errors.confirm">{{ errors.confirm }}</p>
            </div>

            <div style="margin-bottom:1.25rem">
              <label style="display:flex;align-items:flex-start;gap:.5rem;cursor:pointer;font-weight:400;color:var(--t2)">
                <input
                  type="checkbox"
                  v-model="form.terms"
                  style="width:auto;margin-top:.2rem;accent-color:var(--ac)"
                >
                <span style="font-size:.825rem">
                  J'accepte les <a href="#">conditions d'utilisation</a> et la
                  <a href="#">politique de confidentialité</a>.
                </span>
              </label>
              <p class="form-error" v-if="errors.terms">{{ errors.terms }}</p>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
              Créer mon compte
            </button>
          </form>
        </div>

        <p class="auth-foot">
          Déjà un compte ? <router-link to="/login">Se connecter</router-link>
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
  name: 'RegisterView',
  data() {
    return {
      form: {
        nom: '',
        email: '',
        password: '',
        confirm: '',
        terms: false
      },
      errors: {},
      themeIcon: ''
    }
  },
  mounted() {
    this.updateThemeIcon();
  },
  methods: {
    handleRegister() {
      this.errors = {};

      if (!this.form.nom.trim()) {
        this.errors.nom = 'Nom requis';
      }

      if (!this.form.email.trim()) {
        this.errors.email = 'Email requis';
      } else if (!this.form.email.includes('@')) {
        this.errors.email = 'Email invalide';
      }

      if (!this.form.password.trim()) {
        this.errors.password = 'Mot de passe requis (8 caractères min.)';
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Mot de passe requis (8 caractères min.)';
      }

      if (this.form.password !== this.form.confirm) {
        this.errors.confirm = 'Les mots de passe ne correspondent pas';
      }

      if (!this.form.terms) {
        this.errors.terms = 'Vous devez accepter les conditions';
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
.register-page {
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


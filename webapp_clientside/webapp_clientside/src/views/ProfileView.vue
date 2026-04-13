<template>
  <div class="profile-page">
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
          <router-link to="/dashboard">Tableau de bord</router-link>
          <router-link to="/usages">Mes usages</router-link>
          <router-link to="/profile" class="active" aria-current="page">Profil</router-link>
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
      <div class="container page-pad" style="max-width:720px">
        <!-- Profile header -->
        <header class="profile-header">
          <div class="avatar" aria-label="Avatar de Marie Dupont">MD</div>
          <div>
            <h1 class="profile-name">Marie Dupont</h1>
            <p class="profile-email">marie.dupont@email.com</p>
            <p class="profile-since">Membre depuis avril 2025</p>
          </div>
        </header>

        <!-- Quick stats -->
        <div class="grid-3" style="margin-bottom:2rem">
          <div class="card" style="text-align:center">
            <p class="card-label">Usages enregistrés</p>
            <p style="font-family:var(--mono);font-size:1.75rem;font-weight:700">47</p>
          </div>
          <div class="card" style="text-align:center">
            <p class="card-label">CO₂ total suivi</p>
            <p style="font-family:var(--mono);font-size:1.75rem;font-weight:700;color:var(--am)">18.4<span style="font-size:1rem"> kg</span></p>
          </div>
          <div class="card" style="text-align:center">
            <p class="card-label">Score EcoNom.</p>
            <p style="font-family:var(--mono);font-size:1.75rem;font-weight:700;color:var(--ac)">72</p>
          </div>
        </div>

        <!-- Edit profile form -->
        <section class="card" aria-labelledby="edit-title" style="margin-bottom:1.25rem">
          <h2 style="font-size:1rem;font-weight:600;margin-bottom:1.25rem" id="edit-title">Modifier mes informations</h2>

          <div v-if="showSuccess" class="alert alert-success" role="alert">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
              <path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Profil mis à jour avec succès.
          </div>

          <form @submit.prevent="saveProfile" novalidate>
            <div class="grid-2" style="gap:.875rem">
              <div class="form-group" style="margin-bottom:0">
                <label for="p-nom">Nom</label>
                <input v-model="profile.nom" type="text" id="p-nom" required>
              </div>
              <div class="form-group" style="margin-bottom:0">
                <label for="p-prenom">Prénom</label>
                <input v-model="profile.prenom" type="text" id="p-prenom" required>
              </div>
            </div>

            <div class="form-group mt-2">
              <label for="p-email">Adresse email</label>
              <input v-model="profile.email" type="email" id="p-email" required>
              <p class="form-error" v-if="errors.email">{{ errors.email }}</p>
            </div>

            <div style="margin-bottom:1.25rem;padding-bottom:1.25rem;border-bottom:.5px solid var(--bd)">
              <p style="font-size:.875rem;font-weight:500;color:var(--t2);margin-bottom:.875rem">Modifier le mot de passe</p>
              <div class="form-group">
                <label for="p-pwd-cur">Mot de passe actuel</label>
                <input v-model="profile.pwd_cur" type="password" id="p-pwd-cur" placeholder="••••••••" autocomplete="current-password">
              </div>
              <div class="grid-2" style="gap:.875rem">
                <div class="form-group" style="margin-bottom:0">
                  <label for="p-pwd-new">Nouveau mot de passe</label>
                  <input v-model="profile.pwd_new" type="password" id="p-pwd-new" placeholder="8 caractères min." autocomplete="new-password" minlength="8">
                </div>
                <div class="form-group" style="margin-bottom:0">
                  <label for="p-pwd-conf">Confirmer</label>
                  <input v-model="profile.pwd_conf" type="password" id="p-pwd-conf" placeholder="••••••••" autocomplete="new-password">
                </div>
              </div>
            </div>

            <div style="margin-bottom:1.25rem">
              <p style="font-size:.875rem;font-weight:500;color:var(--t2);margin-bottom:.875rem">Préférences</p>
              <div class="form-group">
                <label for="p-objectif">Objectif mensuel</label>
                <select v-model="profile.objectif" id="p-objectif">
                  <option value="5">Réduire de 5 % par mois</option>
                  <option value="10" selected>Réduire de 10 % par mois</option>
                  <option value="20">Réduire de 20 % par mois</option>
                  <option value="0">Aucun objectif</option>
                </select>
                <p class="form-hint">Définit l'objectif affiché sur votre tableau de bord.</p>
              </div>
              <div>
                <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;font-weight:400;color:var(--t2)">
                  <input v-model="profile.newsletter" type="checkbox" style="width:auto;accent-color:var(--ac)">
                  <span style="font-size:.875rem">Recevoir les recommandations hebdomadaires par email</span>
                </label>
              </div>
            </div>

            <div style="display:flex;gap:.625rem;justify-content:flex-end">
              <button type="reset" class="btn btn-ghost">Annuler</button>
              <button type="submit" class="btn btn-primary">Enregistrer</button>
            </div>
          </form>
        </section>

        <!-- Danger zone -->
        <section class="danger-zone" aria-labelledby="danger-title">
          <h2 class="danger-title" id="danger-title">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="display:inline;vertical-align:middle;margin-right:.3rem" aria-hidden="true">
              <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <line x1="7" y1="5" x2="7" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="7" cy="10.5" r=".75" fill="currentColor"/>
            </svg>
            Zone de danger
          </h2>
          <p class="danger-text">
            La suppression de votre compte est irréversible. Toutes vos données, usages enregistrés
            et statistiques seront définitivement supprimés. Cette action ne peut pas être annulée.
          </p>
          <button class="btn btn-danger btn-sm" @click="deleteAccount">
            Supprimer mon compte
          </button>
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
  name: 'ProfileView',
  data() {
    return {
      themeIcon: '',
      showSuccess: false,
      profile: {
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie.dupont@email.com',
        pwd_cur: '',
        pwd_new: '',
        pwd_conf: '',
        objectif: '10',
        newsletter: true
      },
      errors: {}
    }
  },
  mounted() {
    this.updateThemeIcon();
  },
  methods: {
    saveProfile() {
      this.errors = {};
      if (this.profile.email && !this.profile.email.includes('@')) {
        this.errors.email = 'Email invalide';
      }
      if (Object.keys(this.errors).length === 0) {
        this.showSuccess = true;
        setTimeout(() => { this.showSuccess = false; }, 3000);
      }
    },
    deleteAccount() {
      if (confirm('Supprimer définitivement votre compte et toutes vos données ?')) {
        this.$router.push('/');
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
.profile-page {
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


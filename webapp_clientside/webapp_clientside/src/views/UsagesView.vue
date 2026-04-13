<template>
  <div class="usages-page">
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
          <router-link to="/usages" class="active" aria-current="page">Mes usages</router-link>
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
        <header class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem">
          <div>
            <h1 class="page-title">Mes usages numériques</h1>
            <p class="page-desc">Suivez et gérez l'ensemble de vos consommations numériques.</p>
          </div>
          <button class="btn btn-primary" @click="showAddModal = true" aria-haspopup="dialog">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Ajouter un usage
          </button>
        </header>

        <!-- Filters -->
        <div class="filters" role="search" aria-label="Filtres">
          <select v-model="filters.category" class="filter-select" aria-label="Filtrer par catégorie">
            <option value="">Toutes catégories</option>
            <option value="streaming">▶ Streaming</option>
            <option value="email">@ Email</option>
            <option value="social"># Réseaux sociaux</option>
            <option value="cloud">↑ Cloud</option>
          </select>
          <select v-model="filters.period" class="filter-select" aria-label="Filtrer par période">
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="3months">3 derniers mois</option>
            <option value="all">Tout</option>
          </select>
          <select v-model="filters.sort" class="filter-select" aria-label="Trier par">
            <option value="date-desc">Plus récent</option>
            <option value="date-asc">Plus ancien</option>
            <option value="co2-desc">CO₂ décroissant</option>
            <option value="co2-asc">CO₂ croissant</option>
          </select>
        </div>

        <!-- Summary bar -->
        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1.25rem">
          <div class="card card-sm" style="flex:1;min-width:130px;border-radius:var(--r)">
            <p class="card-label">Total semaine</p>
            <p style="font-family:var(--mono);font-size:1.25rem;font-weight:600;color:var(--am)">2.847 kg</p>
          </div>
          <div class="card card-sm" style="flex:1;min-width:130px;border-radius:var(--r)">
            <p class="card-label">Usages enregistrés</p>
            <p style="font-family:var(--mono);font-size:1.25rem;font-weight:600">{{ usages.length }}</p>
          </div>
          <div class="card card-sm" style="flex:1;min-width:130px;border-radius:var(--r)">
            <p class="card-label">Catégorie principale</p>
            <p style="font-size:1rem;font-weight:600"><span class="badge badge-stream">▶ Streaming</span></p>
          </div>
          <div class="card card-sm" style="flex:1;min-width:130px;border-radius:var(--r)">
            <p class="card-label">Tendance</p>
            <p style="font-size:1rem;font-weight:600;color:var(--ac)">↓ 12 % cette semaine</p>
          </div>
        </div>

        <!-- Table -->
        <section aria-labelledby="table-title">
          <h2 class="sr-only" id="table-title">Liste des usages numériques</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Catégorie</th>
                  <th scope="col">Plateforme</th>
                  <th scope="col">Durée / Quantité</th>
                  <th scope="col">CO₂ estimé</th>
                  <th scope="col"><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="usage in usages" :key="usage.id">
                  <td><time :datetime="usage.date" style="font-size:.8rem;color:var(--t2)">{{ usage.dateDisplay }}</time></td>
                  <td><span :class="['badge', `badge-${usage.category}`]">{{ usage.categoryLabel }}</span></td>
                  <td style="font-weight:500">{{ usage.platform }}</td>
                  <td class="td-mono">{{ usage.duration }}</td>
                  <td class="td-mono" :style="{ color: usage.color, fontWeight: '600' }">{{ usage.co2 }}</td>
                  <td>
                    <div class="td-actions">
                      <button class="btn btn-ghost btn-sm" @click="editUsage(usage)" :aria-label="`Modifier l'usage ${usage.platform}`">
                        Modifier
                      </button>
                      <button class="btn btn-ghost btn-sm" style="color:var(--rd)" @click="deleteUsage(usage.id)" :aria-label="`Supprimer l'usage ${usage.platform}`">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Pagination -->
        <nav class="pagination" aria-label="Pagination de la liste des usages">
          <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">←</button>
          <button class="page-btn" :class="{ active: currentPage === 1 }" @click="currentPage = 1" aria-current="page">1</button>
          <button class="page-btn" :class="{ active: currentPage === 2 }" @click="currentPage = 2">2</button>
          <button class="page-btn" @click="currentPage++">→</button>
          <span style="margin-left:.5rem;font-size:.8rem;color:var(--t3)">{{ usages.length }} usages · Page {{ currentPage }}/2</span>
        </nav>
      </div>
    </main>

    <!-- MODAL AJOUTER -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false" role="dialog" aria-modal="true">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">Ajouter un usage</h2>
          <button class="btn-icon" @click="showAddModal = false" aria-label="Fermer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <form @submit.prevent="addUsage" novalidate>
          <div class="form-group">
            <label for="add-cat">Catégorie <span aria-hidden="true" style="color:var(--rd)">*</span></label>
            <select v-model="newUsage.category" id="add-cat" required>
              <option value="">Sélectionner une catégorie</option>
              <option value="streaming">▶ Streaming vidéo</option>
              <option value="email">@ Email</option>
              <option value="social"># Réseaux sociaux</option>
              <option value="cloud">↑ Stockage cloud</option>
            </select>
            <p class="form-error" v-if="formErrors.category">{{ formErrors.category }}</p>
          </div>
          <div class="form-group">
            <label for="add-platform">Plateforme <span aria-hidden="true" style="color:var(--rd)">*</span></label>
            <input v-model="newUsage.platform" type="text" id="add-platform" required placeholder="Netflix, Gmail, Instagram…">
            <p class="form-error" v-if="formErrors.platform">{{ formErrors.platform }}</p>
          </div>
          <div class="grid-2" style="gap:.75rem">
            <div class="form-group" style="margin-bottom:0">
              <label for="add-duration">Durée / Quantité <span aria-hidden="true" style="color:var(--rd)">*</span></label>
              <input v-model="newUsage.duration" type="number" id="add-duration" required min="0" step="0.1" placeholder="ex : 90">
              <p class="form-error" v-if="formErrors.duration">{{ formErrors.duration }}</p>
            </div>
            <div class="form-group" style="margin-bottom:0">
              <label for="add-unit">Unité</label>
              <select v-model="newUsage.unit" id="add-unit">
                <option value="min">minutes</option>
                <option value="h">heures</option>
                <option value="emails">emails</option>
                <option value="go">Go</option>
              </select>
            </div>
          </div>
          <div class="form-group mt-2">
            <label for="add-date">Date</label>
            <input v-model="newUsage.date" type="date" id="add-date">
          </div>
          <div style="display:flex;gap:.625rem;justify-content:flex-end;margin-top:1.25rem">
            <button type="button" class="btn btn-ghost" @click="showAddModal = false">Annuler</button>
            <button type="submit" class="btn btn-primary">Ajouter l'usage</button>
          </div>
        </form>
      </div>
    </div>

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
  name: 'UsagesView',
  data() {
    return {
      themeIcon: '',
      showAddModal: false,
      currentPage: 1,
      filters: {
        category: '',
        period: 'week',
        sort: 'date-desc'
      },
      usages: [
        { id: 1, platform: 'Netflix', date: '2025-04-13', dateDisplay: '13 avr. 2025', category: 'streaming', categoryLabel: '▶ Streaming', duration: '2 h 30 min', co2: '0.85 kg', color: 'var(--rd)' },
        { id: 2, platform: 'Gmail', date: '2025-04-13', dateDisplay: '13 avr. 2025', category: 'email', categoryLabel: '@ Email', duration: '45 emails', co2: '0.14 kg', color: 'var(--bl)' },
        { id: 3, platform: 'Instagram', date: '2025-04-12', dateDisplay: '12 avr. 2025', category: 'social', categoryLabel: '# Social', duration: '1 h 15 min', co2: '0.21 kg', color: 'var(--am)' },
        { id: 4, platform: 'Google Drive', date: '2025-04-12', dateDisplay: '12 avr. 2025', category: 'cloud', categoryLabel: '↑ Cloud', duration: '2.3 Go', co2: '0.18 kg', color: 'var(--ac)' },
        { id: 5, platform: 'YouTube', date: '2025-04-11', dateDisplay: '11 avr. 2025', category: 'streaming', categoryLabel: '▶ Streaming', duration: '3 h 00 min', co2: '1.02 kg', color: 'var(--rd)' },
        { id: 6, platform: 'Twitter / X', date: '2025-04-10', dateDisplay: '10 avr. 2025', category: 'social', categoryLabel: '# Social', duration: '45 min', co2: '0.21 kg', color: 'var(--am)' }
      ],
      newUsage: {
        category: '',
        platform: '',
        duration: '',
        unit: 'min',
        date: new Date().toISOString().split('T')[0]
      },
      formErrors: {}
    }
  },
  mounted() {
    this.updateThemeIcon();
  },
  methods: {
    addUsage() {
      this.formErrors = {};
      if (!this.newUsage.category) this.formErrors.category = 'Catégorie requise';
      if (!this.newUsage.platform) this.formErrors.platform = 'Plateforme requise';
      if (!this.newUsage.duration) this.formErrors.duration = 'Valeur requise';

      if (Object.keys(this.formErrors).length === 0) {
        const newId = Math.max(...this.usages.map(u => u.id), 0) + 1;
        this.usages.push({
          id: newId,
          platform: this.newUsage.platform,
          date: this.newUsage.date,
          dateDisplay: new Date(this.newUsage.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }),
          category: this.newUsage.category,
          categoryLabel: this.getCategoryLabel(this.newUsage.category),
          duration: this.newUsage.duration + ' ' + this.newUsage.unit,
          co2: '0.X kg',
          color: this.getCategoryColor(this.newUsage.category)
        });
        this.showAddModal = false;
        this.newUsage = { category: '', platform: '', duration: '', unit: 'min', date: new Date().toISOString().split('T')[0] };
      }
    },
    editUsage(usage) {
      alert('Modifier: ' + usage.platform);
    },
    deleteUsage(id) {
      if (confirm('Supprimer cet usage ?')) {
        this.usages = this.usages.filter(u => u.id !== id);
      }
    },
    getCategoryLabel(cat) {
      const labels = { streaming: '▶ Streaming', email: '@ Email', social: '# Social', cloud: '↑ Cloud' };
      return labels[cat] || '';
    },
    getCategoryColor(cat) {
      const colors = { streaming: 'var(--rd)', email: 'var(--bl)', social: 'var(--am)', cloud: 'var(--ac)' };
      return colors[cat] || 'var(--t)';
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
.usages-page {
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


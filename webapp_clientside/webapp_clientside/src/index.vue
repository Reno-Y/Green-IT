<script setup>

</script>

<template>

  <!-- ===== NAV ===== -->
  <nav class="nav" aria-label="Navigation principale">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" aria-label="EcoTrace accueil">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M4 18C4 18 6.5 9.5 11 6C15.5 2.5 18 3 18 3C18 3 18.5 5.5 15 10C11.5 14.5 4 18 4 18Z"
                fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M4 18L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        EcoTrace
      </a>
      <div class="nav-end">
        <button class="btn-icon" data-theme-toggle title="Changer de thème" aria-label="Changer de thème">
          <span data-theme-icon></span>
        </button>
        <a href="login.html" class="btn btn-ghost btn-sm">Connexion</a>
        <a href="register.html" class="btn btn-primary btn-sm">S'inscrire</a>
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
          <a href="register.html" class="btn btn-primary btn-lg">Commencer gratuitement</a>
          <a href="dashboard.html" class="btn btn-outline btn-lg">Voir la démo</a>
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

          <article class="feat-card" role="listitem">
            <div class="feat-icon fi-stream" aria-hidden="true">▶</div>
            <h3>Streaming vidéo</h3>
            <p>Netflix, YouTube, Twitch… La vidéo en ligne représente 60 % du trafic mondial et une part majeure des émissions numériques.</p>
            <span class="feat-co2">≈ 36 g CO₂/h en HD</span>
          </article>

          <article class="feat-card" role="listitem">
            <div class="feat-icon fi-email" aria-hidden="true">@</div>
            <h3>Emails</h3>
            <p>Un email avec pièce jointe émet jusqu'à 50 g de CO₂. Suivi de vos envois, newsletters reçues et nettoyage de boîte.</p>
            <span class="feat-co2">≈ 0.3–50 g CO₂/email</span>
          </article>

          <article class="feat-card" role="listitem">
            <div class="feat-icon fi-social" aria-hidden="true">#</div>
            <h3>Réseaux sociaux</h3>
            <p>Scroll infini, stories, reels… L'usage passif des réseaux sociaux cumule des heures de serveurs actifs chaque jour.</p>
            <span class="feat-co2">≈ 2.5 g CO₂/min</span>
          </article>

          <article class="feat-card" role="listitem">
            <div class="feat-icon fi-cloud" aria-hidden="true">↑</div>
            <h3>Stockage cloud</h3>
            <p>Google Drive, Dropbox, iCloud… Chaque fichier synchronisé transite par des datacenters qui tournent 24h/24.</p>
            <span class="feat-co2">≈ 7 g CO₂/Go stocké/an</span>
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
          <div class="how-step" role="listitem">
            <div class="how-num" aria-hidden="true">01</div>
            <h3>Créez votre compte</h3>
            <p>Inscription en moins d'une minute. Aucune donnée vendue, aucun tracking publicitaire.</p>
          </div>
          <div class="how-step" role="listitem">
            <div class="how-num" aria-hidden="true">02</div>
            <h3>Saisissez vos usages</h3>
            <p>Renseignez votre streaming, vos emails, votre temps sur les réseaux sociaux et votre stockage cloud.</p>
          </div>
          <div class="how-step" role="listitem">
            <div class="how-num" aria-hidden="true">03</div>
            <h3>Réduisez votre impact</h3>
            <p>Visualisez votre bilan carbone et suivez les recommandations personnalisées pour le diminuer.</p>
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
        <a href="register.html" class="btn btn-primary btn-lg">Créer mon compte</a>
      </div>
    </section>

  </main>


</template>

<style scoped>

</style>
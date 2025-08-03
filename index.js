// IIFE : fonction auto-exécutée pour isoler le scope et éviter les conflits globaux
(function () {
  // Récupère l'élément HTML avec l'ID "background-blur"
  const elem = document.querySelector("#background-blur");

  // Ajoute un écouteur d'événement pour suivre les mouvements de la souris
  document.addEventListener("mousemove", parallax);

  // Fonction qui crée un effet de parallaxe en décalant le background selon la position de la souris
  function parallax(e) {
    // Centre horizontal et vertical de la fenêtre
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;

    // Position X et Y de la souris dans la fenêtre
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;

    // Calcul des différentes positions de background pour simuler la profondeur (parallax)
    // Le pourcentage est calculé pour déplacer le background légèrement en fonction du décalage souris/centre
    let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
    let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
    let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;

    // Combine ces trois positions pour un effet de plusieurs couches
    let x = `${_depth3}, ${_depth2}, ${_depth1}`;

    // Applique la nouvelle position du background à l’élément
    elem.style.backgroundPosition = x;
  }
})();

// Animation de l’image d’en-tête lors du chargement de la page
window.onload = function () {
  // Sélectionne l’image ayant la classe 'header-img'
  const headerImage = document.querySelector('.header-img');

  // Liste d’animations possibles (ici une seule pour l’instant)
  const animations = ['bounce'];

  // Sélectionne une animation au hasard (utile si plusieurs animations sont ajoutées)
  const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

  // Si l’image existe, ajoute la classe d’animation
  if (headerImage) {
    headerImage.classList.add(randomAnimation);
  }
};

// Fonction pour gérer les effets au passage de la souris sur les images Pokémon
function addImageHoverListeners() {
  // Récupère toutes les zones contenant une image et ses infos (wrapper)
  const wrappers = document.querySelectorAll('.image-wrapper');

  // Récupère toutes les images avec la classe 'image-blur' (celles à flouter)
  const otherImages = document.querySelectorAll('.image-blur');

  // Récupère l’élément de fond flouté
  const backgroundBlur = document.getElementById('background-blur');

  // Récupère l’élément audio qui joue un son au hover
  const hoverSound = document.getElementById("hover-sound");

  // Définit le volume du son si l’élément audio existe
  if (hoverSound) {
    hoverSound.volume = 0.1;
  }

  // Pour chaque wrapper (image + stats), ajoute des écouteurs d’événements souris
  wrappers.forEach(wrapper => {
    // Quand la souris entre dans la zone
    wrapper.addEventListener('mouseenter', () => {
      // Floute tous les autres wrappers sauf celui survolé
      wrappers.forEach(otherWrapper => {
        if (otherWrapper !== wrapper) {
          otherWrapper.classList.add('blur-all-but-focus');
        }
      });

      // Floute toutes les autres images
      otherImages.forEach(blurImg => {
        blurImg.classList.add('blur-all-but-focus');
      });

      // Ajoute une classe pour marquer le wrapper focusé
      wrapper.classList.add('focused');

      // Applique un flou de 8px au background si présent
      if (backgroundBlur) backgroundBlur.style.filter = 'blur(8px)';

      // Joue le son de hover depuis le début, en ignorant les erreurs éventuelles (ex: pas d’autoplay)
      if (hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => { });
      }

      // Ajoute une aura aléatoire sur l’image principale de la wrapper
      const mainImg = wrapper.querySelector('img.main-img');
      if (mainImg) {
        // Si une aura existait déjà, la retire
        if (mainImg.dataset.aura) {
          mainImg.classList.remove(mainImg.dataset.aura);
          delete mainImg.dataset.aura;
        }

        // Liste des classes d’aura possibles
        const auraOptions = [
          'aura-gold', 'aura-purple', 'aura-blue', 'aura-red', 'aura-green',
          'aura-pink', 'aura-cyan', 'aura-white', 'aura-orange',
          'aura-turquoise', 'aura-rainbow'
        ];

        // Choisit une aura au hasard
        const auraClass = auraOptions[Math.floor(Math.random() * auraOptions.length)];

        // Ajoute la classe d’aura et la stocke dans dataset pour pouvoir la retirer après
        mainImg.classList.add(auraClass);
        mainImg.dataset.aura = auraClass;
      }

      // Ajoute une bordure animée dorée sur le wrapper
      wrapper.classList.add('gold-border-animated');
    });

    // Quand la souris sort de la zone
    wrapper.addEventListener('mouseleave', () => {
      // Enlève le flou sur tous les wrappers et images
      wrappers.forEach(otherWrapper => {
        otherWrapper.classList.remove('blur-all-but-focus');
      });
      otherImages.forEach(blurImg => {
        blurImg.classList.remove('blur-all-but-focus');
      });

      // Retire la classe focus du wrapper
      wrapper.classList.remove('focused');

      // Enlève le filtre blur sur le background
      if (backgroundBlur) backgroundBlur.style.filter = 'blur(0px)';

      // Retire l’aura sur l’image principale si présente
      const mainImg = wrapper.querySelector('img.main-img');
      if (mainImg && mainImg.dataset.aura) {
        mainImg.classList.remove(mainImg.dataset.aura);
        delete mainImg.dataset.aura;
      }

      // Retire la bordure animée dorée
      wrapper.classList.remove('gold-border-animated');
    });
  });
}

// Classe représentant une carte Pokémon shiny
class PokemonCard {
  constructor({ name, img, dex, method, sold, encounters, aura = '' }) {
    this.name = name;           // Nom du Pokémon
    this.img = img;             // Nom du fichier image
    this.dex = dex;             // Numéro Pokédex
    this.method = method;       // Méthode d’obtention
    this.sold = sold;           // Indique si vendu ou non
    this.encounters = encounters ?? "?"; // Nombre de rencontres, ou "?" si non renseigné
  }

  // Méthode qui génère le HTML de la carte
  render() {
    return `
    <div class="pokemon-card col-6 col-md-4 col-lg-2 mb-4">
      <div class="image-wrapper">
        <img src="Images/Shinys/${this.img}" alt="${this.name}" class="img-fluid main-img ${this.aura} animate-on-load">
        <img src="Images/shiny-effect.gif" alt="" class="shiny-effect">
      </div>
      <div class="stats-panel">
        <ul>
          <li><strong>Encounters :</strong> ${this.encounters}</li>
          <li><strong>Encounter type :</strong> ${this.method}</li>
          <li><strong>Pokédex :</strong> ${this.dex}</li>
          <li><strong>Name :</strong> ${this.name}</li>
          <li><strong>Sold :</strong> ${this.sold}</li>
        </ul>
      </div>
    </div>
  `;
  }
}

// Classe représentant une carte Current Hunt
class CurrentHuntCard {
  constructor({ name, img, encounters, method }) {
    this.name = name;               // Nom du Pokémon
    this.img = img;                 // Image
    this.encounters = encounters ?? "?"; // Rencontres ou "?"
    this.method = method ?? "5x hordes"; // Méthode d’obtention par défaut
  }

  // Génère le HTML de la carte current hunt
  render() {
    return `
    <div class="pokemon-card col-6 col-md-4 col-lg-2 mb-4">
      <div class="image-wrapper">
        <img src="Images/Shinys/${this.img}" alt="${this.name}" class="img-fluid main-img animate-on-load">
        <img src="Images/shiny-effect.gif" alt="" class="shiny-effect">
      </div>
      <div class="stats-panel">
        <ul>
          <li><strong>Encounter type :</strong> ${this.method}</li>
          <li><strong>Encounters :</strong> ${this.encounters}</li>
        </ul>
      </div>
    </div>
  `;
  }
}

// Données Pokémon
const pokemonList = [
  { name: "Poliwag", img: "ptitard.png", dex: "060", method: "5x hordes", sold: "✔" },
  { name: "Druddigon", img: "druddigon.gif", dex: "621", method: "5x hordes", sold: "✔" },
  { name: "Lopunny", img: "lopunny.gif", dex: "428", method: "3x hordes", sold: "✘" },
  { name: "Duskull", img: "duskull.gif", dex: "355", method: "5x hordes", sold: "✘" },
  { name: "Sableye", img: "sableye.gif", dex: "302", method: "5x hordes", sold: "✔" },
  { name: "Roserade", img: "roserade.gif", dex: "407", method: "3x hordes", sold: "✘" },
  { name: "Duskull", img: "Meowth.gif", dex: "052", method: "5x hordes", sold: "✘" },
  { name: "Magikarp", img: "Magikarp.gif", dex: "129", method: "5x hordes", sold: "✔" },
  { name: "Gothitelle", img: "Gothitelle.png", dex: "576", method: "5x hordes", sold: "✘" },
  ...Array(9).fill({ name: "Bibarel", img: "Bibarel.png", dex: "400", method: "3x hordes", sold: "✔" }),
  { name: "Bibarel", img: "Bibarel.png", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Bibarel", img: "Bibarel.png", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Bibarel", img: "Bibarel.png", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Gardevoir", img: "Gardevoir.gif", dex: "282", method: "3x hordes", sold: "✘" },
  { name: "Gallade", img: "Sgallade.gif", dex: "475", method: "3x hordes", sold: "✘" },
  { name: "Smeargle", img: "Smeargle.gif", dex: "235", method: "5x hordes", sold: "✘" },
  { name: "Cofagrigus", img: "Cofagrigus.gif", dex: "563", method: "5x hordes", sold: "✘" },
  { name: "Golem", img: "Graveler.png", dex: "076", method: "5x hordes", sold: "✘", encounters: 3214 },
  { name: "Graveler", img: "gravalanche.png", dex: "075", method: "5x hordes", sold: "✘", encounters: 38064 },
  { name: "Graveler", img: "gravalanche.png", dex: "075", method: "5x hordes", sold: "✘", encounters: 5652 },
  { name: "Graveler", img: "gravalanche.png", dex: "075", method: "5x hordes", sold: "✘", encounters: 35420 },
  { name: "Walrein", img: "Walrein.gif", dex: "365", method: "5x hordes", sold: "✘", encounters: 31139 },
  { name: "Sealeo", img: "Sealeo.png", dex: "364", method: "5x hordes", sold: "✘", encounters: 42202 },
  { name: "Lairon", img: "Lairon.png", dex: "305", method: "5x hordes", sold: "✘", encounters: 46914 },
  { name: "Wooper", img: "Wooper.png", dex: "194", method: "5x hordes", sold: "✘", encounters: 25228 },
  { name: "Krookodile", img: "Krokorok.png", dex: "552", method: "5x hordes", sold: "✘", encounters: 5461 },
];

const currentHunts = [
  { name: "Snorunt", img: "Snorunt.png", encounters: 27920, method: "5x hordes" },
  { name: "Deino", img: "Deino.png", encounters: 3578, method: "5x hordes" },
  { name: "Ledian", img: "Ledian.png", encounters: 0, method: "Singles" },
  { name: "Pinsir", img: "Pinsir.png", encounters: 0, method: "Singles" },
  { name: "Heracross", img: "Heracross.png", encounters: 0, method: "Singles" },
  { name: "Beedrill", img: "Beedrill.png", encounters: 0, method: "Singles" },
];

// Mise à jour du compteur shiny dans l'interface
const shinyCount = document.getElementById("shiny-count");
if (shinyCount) {
  shinyCount.innerHTML = `<li><strong>Shiny count :</strong> ${pokemonList.length}</li>`;
}

// Affiche toutes les cartes shiny dans le conteneur "shiny-showcase"
const showcaseContainer = document.getElementById("shiny-showcase");
if (showcaseContainer) {
  pokemonList.forEach(pkm => {
    const card = new PokemonCard(pkm);
    // Ajoute le HTML de la carte au conteneur
    showcaseContainer.innerHTML += card.render();
  });
  // Ajoute les effets de hover sur toutes les cartes affichées
  addImageHoverListeners();
}

// Affiche toutes les cartes current hunt dans le conteneur "current-hunts"
const currentHuntContainer = document.getElementById("current-hunts");
if (currentHuntContainer) {
  currentHunts.forEach(hunt => {
    const card = new CurrentHuntCard(hunt);
    currentHuntContainer.innerHTML += card.render();
  });
  // Ajoute aussi les effets hover pour ces cartes
  addImageHoverListeners();
}
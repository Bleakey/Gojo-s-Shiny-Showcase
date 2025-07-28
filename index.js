// Fonction IIFE (Immediately Invoked Function Expression) pour isoler le scope
(function () {
  const elem = document.querySelector("#background-blur"); // Récupère l'élément avec l'ID "background-blur"

  // Écouteur de mouvement de la souris sur tout le document
  document.addEventListener("mousemove", parallax);

  // Fonction qui applique un effet de parallaxe au fond
  function parallax(e) {
    let _w = window.innerWidth / 2;  // Centre de l'écran en largeur
    let _h = window.innerHeight / 2; // Centre de l'écran en hauteur
    let _mouseX = e.clientX;         // Position X de la souris
    let _mouseY = e.clientY;         // Position Y de la souris

    // Calcul de différents niveaux de profondeur pour l'effet de parallaxe
    let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
    let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
    let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;

    // Combine les positions pour créer un effet de couches
    let x = `${_depth3}, ${_depth2}, ${_depth1}`;
    elem.style.backgroundPosition = x; // Applique les positions comme background-position
  }
})();

// ANIMATION D'EN-TÊTE AU CHARGEMENT DE LA PAGE
window.onload = function () {
  const headerImage = document.querySelector('.header-img'); // Cible l’image d’en-tête
  const animations = ['bounce']; // Liste d’animations possibles (une seule ici, extensible)
  const randomAnimation = animations[Math.floor(Math.random() * animations.length)]; // Choisit une animation au hasard
  headerImage.classList.add(randomAnimation); // Applique l’animation
};

// Gestion du flou lors du survol d’une image
const images = document.querySelectorAll('.image-wrapper'); // Toutes les images principales
const otherImages = document.querySelectorAll('.image-blur'); // Autres éléments pouvant être floutés

images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    // Floute toutes les autres .image-wrapper sauf celle survolée
    images.forEach(otherImg => {
      if (otherImg !== img) {
        otherImg.classList.add('blur-all-but-focus');
      }
    });

    // Floute également les éléments .image-blur
    otherImages.forEach(blurImg => {
      blurImg.classList.add('blur-all-but-focus');
    });

    // Garde nette l’image survolée
    img.classList.add('focused');
  });

  img.addEventListener('mouseleave', () => {
    // Supprime tous les flous quand la souris quitte l’image
    images.forEach(otherImg => {
      otherImg.classList.remove('blur-all-but-focus');
    });

    otherImages.forEach(blurImg => {
      blurImg.classList.remove('blur-all-but-focus');
    });

    img.classList.remove('focused');
  });

  wrapper.addEventListener('mouseenter', () => {
  // ... ton code existant de flou etc.

  // Son hover
  if (isSoundUnlocked && hoverSound) {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {});
  }

  // ... suite du code
});
});

// Flou du fond pendant le survol d’une image
const backgroundBlur = document.getElementById('background-blur');

images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    backgroundBlur.style.filter = 'blur(8px)'; // Applique un flou sur l’arrière-plan
  });

  img.addEventListener('mouseleave', () => {
    backgroundBlur.style.filter = 'blur(0px)'; // Supprime le flou
  });
});

// Fonction permettant d’activer ou désactiver le flou avec une classe CSS
const bg = document.getElementById('background-blur');

function toggleBlur(active) {
  if (active) {
    bg.classList.add('blur-active'); // Active le flou via une classe CSS
  } else {
    bg.classList.remove('blur-active'); // Désactive le flou
  }
}

class PokemonCard {
  constructor({ name, img, dex, method, sold, encounters }) {
    this.name = name;
    this.img = img;
    this.dex = dex;
    this.method = method;
    this.sold = sold;
    this.encounters = encounters ?? "?";
  }

  render() {
    return `
      <div class="pokemon-card col-6 col-md-3 col-lg-2 mb-4">
        <div class="image-wrapper">
          <img src="Images/Shinys/${this.img}" alt="${this.name}" class="img-fluid main-img image-wrapper animate-on-load">
          <img src="Images/shiny-effect.gif" alt="" class="shiny-effect">
        </div>
        <div class="stats-panel">
          <ul>
            <li><strong>Ecounters :</strong> ${this.encounters}</li>
            <li><strong>Ecounter type : </strong> ${this.method}</li>
            <li><strong>Pokédex :</strong> ${this.dex}</li>
            <li><strong>Name :</strong> ${this.name}</li>
            <li><strong>Sold :</strong> ${this.sold}</li>
          </ul>
        </div>
      </div>
    `;
  }
}

class CurrentHuntCard {
  constructor({ name, img, encounters, method }) {
    this.name = name;
    this.img = img;
    this.encounters = encounters ?? "?";
    this.method = method ?? "5x hordes";
  }

  render() {
    return `
      <div class="pokemon-card col-6 col-md-3 col-lg-2 mb-4">
        <div class="image-wrapper">
          <img src="Images/Shinys/${this.img}" alt="${this.name}" class="img-fluid main-img image-wrapper animate-on-load">
          <img src="Images/shiny-effect.gif" alt="" class="shiny-effect">
        </div>
        <div class="stats-panel">
          <ul>
            <li><strong>Ecounter type :</strong> ${this.method}</li>
            <li><strong>Ecounters :</strong> ${this.encounters}</li>
          </ul>
        </div>
      </div>
    `;
  }
}

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
];

const currentHunts = [
  { name: "Snorunt", img: "Snorunt.png", encounters: 27920, method: "5x hordes" },
  { name: "Wooper", img: "Wooper.png", encounters: 17740, method: "5x hordes" },
  { name: "Deino", img: "Deino.png", encounters: 3578, method: "5x hordes" },
  { name: "Lairon", img: "Lairon.png", encounters: 15230, method: "5x hordes" },
];

const showcaseContainer = document.getElementById("shiny-showcase");
pokemonList.forEach(pkm => {
  const card = new PokemonCard(pkm);
  showcaseContainer.innerHTML += card.render();
  addImageHoverListeners();
});

const currentHuntContainer = document.getElementById("current-hunts");
currentHunts.forEach(pkm => {
  const hunt = new CurrentHuntCard(pkm);
  currentHuntContainer.innerHTML += hunt.render();
});
addImageHoverListeners(); // appliquer aussi le blur à ces images

function addImageHoverListeners() {
  const wrappers = document.querySelectorAll('.image-wrapper');
  const otherImages = document.querySelectorAll('.image-blur');
  const backgroundBlur = document.getElementById('background-blur');
  const hoverSound = document.getElementById("hover-sound");

  if (hoverSound) {
    hoverSound.volume = 0.1;
  }

  wrappers.forEach(wrapper => {
    const mainImg = wrapper.querySelector('img.main-img');
    if (!mainImg) return;

    wrapper.addEventListener('mouseenter', () => {
      // Floute les autres wrappers sauf celui survolé
      wrappers.forEach(otherWrapper => {
        if (otherWrapper !== wrapper) {
          otherWrapper.classList.add('blur-all-but-focus');
        }
      });
      otherImages.forEach(blurImg => {
        blurImg.classList.add('blur-all-but-focus');
      });

      wrapper.classList.add('focused');
      backgroundBlur.style.filter = 'blur(8px)';

      // Son hover
      if (hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
      }

      // Retirer aura précédente sur l'image
      if (mainImg.dataset.aura) {
        mainImg.classList.remove(mainImg.dataset.aura);
        delete mainImg.dataset.aura;
      }

      // Choisir aura aléatoire
      const auraOptions = ['aura-gold', 'aura-purple', 'aura-blue'];
      const auraClass = auraOptions[Math.floor(Math.random() * auraOptions.length)];
      mainImg.classList.add(auraClass);
      mainImg.dataset.aura = auraClass;

      console.log('Aura ajoutée:', auraClass);
    });

    wrapper.addEventListener('mouseleave', () => {
      wrappers.forEach(otherWrapper => {
        otherWrapper.classList.remove('blur-all-but-focus');
      });
      otherImages.forEach(blurImg => {
        blurImg.classList.remove('blur-all-but-focus');
      });
      wrapper.classList.remove('focused');
      backgroundBlur.style.filter = 'blur(0px)';

      if (mainImg.dataset.aura) {
        console.log('Aura retirée:', mainImg.dataset.aura);
        mainImg.classList.remove(mainImg.dataset.aura);
        delete mainImg.dataset.aura;
      }
    });
  });
}

let isSoundUnlocked = false;
const hoverSound = document.getElementById("hover-sound");
const activateSoundBtn = document.getElementById("activate-sound-btn");

activateSoundBtn.addEventListener('click', () => {
  if (!isSoundUnlocked) {
    hoverSound.play().then(() => {
      hoverSound.pause();
      hoverSound.currentTime = 0;
      isSoundUnlocked = true;
      activateSoundBtn.textContent = "Sons activés ✔";
      activateSoundBtn.disabled = true;
      console.log("Son débloqué par clic utilisateur");
    }).catch(() => {
      console.log("Impossible de débloquer le son");
    });
  }
});
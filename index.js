// parallaxe background
(function () {
  const elem = document.querySelector("#background-blur");
  document.addEventListener("mousemove", parallax);
  function parallax(e) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;
    let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
    let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
    let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
    let x = `${_depth3}, ${_depth2}, ${_depth1}`;
    if (elem) elem.style.backgroundPosition = x;
  }
})();

// Animation image header au chargement
window.onload = function () {
  const headerImage = document.querySelector('.header-img');
  const animations = ['bounce'];
  const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
  if (headerImage) headerImage.classList.add(randomAnimation);
};

// Gestion activation/désactivation du son via bouton
let soundActivated = false;
const soundToggleBtn = document.getElementById('activate-sound-btn');
const hoverSound = document.getElementById("hover-sound");
if (hoverSound) hoverSound.volume = 0.1;

if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    soundActivated = !soundActivated;
    soundToggleBtn.textContent = soundActivated ? 'Turn off sounds' : 'Turn on sounds';
  });
}

// Effets au hover sur les images Pokémon
function addImageHoverListeners() {
  const wrappers = document.querySelectorAll('.image-wrapper');
  const otherImages = document.querySelectorAll('.image-blur');
  const backgroundBlur = document.getElementById('background-blur');

  wrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseenter', () => {
      wrappers.forEach(otherWrapper => {
        if (otherWrapper !== wrapper) otherWrapper.classList.add('blur-all-but-focus');
      });
      otherImages.forEach(blurImg => blurImg.classList.add('blur-all-but-focus'));
      wrapper.classList.add('focused');
      if (backgroundBlur) backgroundBlur.style.filter = 'blur(8px)';

      // Joue le son si activé
      if (soundActivated && hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => { });
      }

      // Aura aléatoire
      const mainImg = wrapper.querySelector('img.main-img');
      if (mainImg) {
        if (mainImg.dataset.aura) {
          mainImg.classList.remove(mainImg.dataset.aura);
          delete mainImg.dataset.aura;
        }
        const auraOptions = [
          'aura-gold', 'aura-purple', 'aura-blue', 'aura-red', 'aura-green',
          'aura-pink', 'aura-cyan', 'aura-white', 'aura-orange',
          'aura-turquoise', 'aura-rainbow'
        ];
        const auraClass = auraOptions[Math.floor(Math.random() * auraOptions.length)];
        mainImg.classList.add(auraClass);
        mainImg.dataset.aura = auraClass;
      }

      wrapper.classList.add('gold-border-animated');
    });

    wrapper.addEventListener('mouseleave', () => {
      wrappers.forEach(otherWrapper => otherWrapper.classList.remove('blur-all-but-focus'));
      otherImages.forEach(blurImg => blurImg.classList.remove('blur-all-but-focus'));
      wrapper.classList.remove('focused');
      if (backgroundBlur) backgroundBlur.style.filter = 'blur(0px)';

      const mainImg = wrapper.querySelector('img.main-img');
      if (mainImg && mainImg.dataset.aura) {
        mainImg.classList.remove(mainImg.dataset.aura);
        delete mainImg.dataset.aura;
      }

      wrapper.classList.remove('gold-border-animated');
    });
  });
}

// Classes Pokémon
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
      <div class="pokemon-card col-6 col-md-4 col-lg-2 mb-4">
        <div class="image-wrapper">
          <img src="Images/Shinys/${this.img}" alt="${this.name}" class="img-fluid main-img animate-on-load">
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

class CurrentHuntCard {
  constructor({ name, img, encounters, method }) {
    this.name = name;
    this.img = img;
    this.encounters = encounters ?? "?";
    this.method = method ?? "5x hordes";
  }

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
  { name: "Ptitard", img: "Ptitard.gif", dex: "060", method: "5x hordes", sold: "✔" },
  { name: "Druddigon", img: "Druddigon.gif", dex: "621", method: "5x hordes", sold: "✔" },
  { name: "Lopunny", img: "Lopunny.gif", dex: "428", method: "3x hordes", sold: "✘" },
  { name: "Duskull", img: "Duskull.gif", dex: "355", method: "5x hordes", sold: "✘" },
  { name: "Sableye", img: "Sableye.gif", dex: "302", method: "5x hordes", sold: "✔" },
  { name: "Roserade", img: "Roserade.gif", dex: "407", method: "3x hordes", sold: "✘" },
  { name: "Meowth", img: "Meowth.gif", dex: "052", method: "5x hordes", sold: "✘" },
  { name: "Magikarp", img: "Magikarp.gif", dex: "129", method: "5x hordes", sold: "✔" },
  { name: "Gothitelle", img: "Gothitelle.gif", dex: "576", method: "5x hordes", sold: "✘" },
  ...Array(9).fill({ name: "Bibarel", img: "Bibarel.gif", dex: "400", method: "3x hordes", sold: "✔" }),
  { name: "Bibarel", img: "Bibarel.gif", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Bibarel", img: "Bibarel.gif", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Bibarel", img: "Bibarel.gif", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Gardevoir", img: "Gardevoir.gif", dex: "282", method: "3x hordes", sold: "✘" },
  { name: "Gallade", img: "Gallade.gif", dex: "475", method: "3x hordes", sold: "✘" },
  { name: "Smeargle", img: "Smeargle.gif", dex: "235", method: "5x hordes", sold: "✘" },
  { name: "Cofagrigus", img: "Cofagrigus.gif", dex: "563", method: "5x hordes", sold: "✘" },
  { name: "Golem", img: "Golem.gif", dex: "076", method: "5x hordes", sold: "✘", encounters: 3214 },
  { name: "Graveler", img: "Graveler.gif", dex: "075", method: "5x hordes", sold: "✘", encounters: 38064 },
  { name: "Graveler", img: "Graveler.gif", dex: "075", method: "5x hordes", sold: "✘", encounters: 5652 },
  { name: "Graveler", img: "Graveler.gif", dex: "075", method: "5x hordes", sold: "✘", encounters: 35420 },
  { name: "Walrein", img: "Walrein.gif", dex: "365", method: "5x hordes", sold: "✘", encounters: 31139 },
  { name: "Sealeo", img: "Sealeo.gif", dex: "364", method: "5x hordes", sold: "✘", encounters: 42202 },
  { name: "Lairon", img: "Lairon.gif", dex: "305", method: "5x hordes", sold: "✘", encounters: 46914 },
  { name: "Wooper", img: "Wooper.gif", dex: "194", method: "5x hordes", sold: "✘", encounters: 25228 },
  { name: "Krookodile", img: "Krokorok.gif", dex: "552", method: "5x hordes", sold: "✘", encounters: 5461 },
  { name: "Butterfree", img: "Butterfree.gif", dex: "012", method: "Singles", sold: "✘", encounters: 2064 },
];
/*
const currentHunts = [
  { name: "Snorunt", img: "Snorunt.png", encounters: 27920, method: "5x hordes" },
  { name: "Deino", img: "Deino.png", encounters: 3578, method: "5x hordes" },
  { name: "Ledian", img: "Ledian.png", encounters: 0, method: "Singles" },
  { name: "Pinsir", img: "Pinsir.png", encounters: 0, method: "Singles" },
  { name: "Heracross", img: "Heracross.png", encounters: 0, method: "Singles" },
  { name: "Beedrill", img: "Beedrill.png", encounters: 0, method: "Singles" },
];*/

// Mise à jour compteur shiny
const shinyCount = document.getElementById("shiny-count");
if (shinyCount) {
  shinyCount.innerHTML = `<h2><strong>Shiny count :</strong> ${pokemonList.length}</h2>`;
}

// Affiche cartes shiny
const showcaseContainer = document.getElementById("shiny-showcase");
if (showcaseContainer) {
  pokemonList.forEach(pkm => {
    const card = new PokemonCard(pkm);
    showcaseContainer.innerHTML += card.render();
  });
  addImageHoverListeners();
}

// Affiche cartes current hunt
const currentHuntContainer = document.getElementById("current-hunts");
if (currentHuntContainer) {
  currentHunts.forEach(hunt => {
    const card = new CurrentHuntCard(hunt);
    currentHuntContainer.innerHTML += card.render();
  });
  addImageHoverListeners();
}

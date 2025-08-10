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
  constructor({ name, img, dex, method, sold, encounters, video }) {
    this.name = name;
    this.img = img;
    this.dex = dex;
    this.method = method;
    this.sold = sold;
    this.encounters = encounters ?? "?";
    this.video = video; // can be YouTube embed link
  }

  render() {
    const videoAttr = this.video ? `data-video="${this.video}"` : `data-video=""`;
    return `
    <div class="pokemon-card col-3 col-md-4 col-lg-2 mb-4">
      <div class="image-wrapper">
        <img src="Images/Shinys/${this.img}" 
             alt="${this.name}" 
             class="img-fluid main-img animate-on-load" 
             ${videoAttr}>
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
  { name: "tentacruel", img: "tentacruel.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "magikarp", img: "magikarp.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "luxray", img: "luxray.gif", dex: "?", method: "3x hordes", sold: "?", encounters: 0, video: "" },
  { name: "torkoal", img: "torkoal.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "haxorus", img: "haxorus.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "smeargle", img: "smeargle.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "politoed", img: "politoed.gif", dex: "?", method: "Singles", sold: "?", encounters: 0, video: "" },
  { name: "primeape", img: "primeape.gif", dex: "?", method: "Singles", sold: "?", encounters: 0, video: "" },
  ...Array(9).fill({ name: "raticate", img: "raticate.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" }),
  { name: "banette", img: "banette.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "duskull", img: "duskull.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "magcargo", img: "magcargo.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "meowth", img: "meowth.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "petilil", img: "petilil.gif", dex: "?", method: "3x hordes", sold: "?", encounters: 0, video: "" },
  { name: "miltank", img: "miltank.gif", dex: "?", method: "Singles", sold: "?", encounters: 0, video: "" },
  { name: "milotic", img: "milotic.gif", dex: "?", method: "Singles", sold: "?", encounters: 0, video: "" },
  { name: "sneasel", img: "sneasel.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "weavile-f", img: "weavile-f.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "buneary", img: "buneary.gif", dex: "?", method: "3x hordes", sold: "?", encounters: 0, video: "" },
  { name: "lopunny", img: "lopunny.gif", dex: "?", method: "3x hordes", sold: "?", encounters: 0, video: "" },
  { name: "swellow", img: "swellow.gif", dex: "?", method: "Singles", sold: "?", encounters: 0, video: "" },
  { name: "lunatone", img: "lunatone.gif", dex: "?", method: "Singles", sold: "?", encounters: 0, video: "" },
  { name: "piloswine", img: "piloswine.gif", dex: "?", method: "Singles", sold: "?", encounters: 0, video: "" },
  { name: "spinda", img: "spinda.gif", dex: "?", method: "3x hordes", sold: "?", encounters: 0, video: "" },
  { name: "beedrill", img: "beedrill.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "timburr", img: "timburr.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
  { name: "crobat", img: "crobat.gif", dex: "?", method: "5x hordes", sold: "?", encounters: 0, video: "" },
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
  shinyCount.innerHTML = `<div class="sprite-title">
    <img src="Images/sprite1.png" alt="Sprite gauche" class="sprite">
    <h2 class="wavy-text-y">
        <span>Shiny count : ${pokemonList.length}</span>
    </h2>
    <img src="Images/sprite2.png" alt="Sprite droite" class="sprite">
</div>`;
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

// Affichage des cartes dans la page
const cardsContainer = document.getElementById('cardsContainer');
if (cardsContainer) {
  pokemonList.forEach(pokemon => {
    const card = new PokemonCard(pokemon);
    cardsContainer.innerHTML += card.render();
  });
  addImageHoverListeners();
}

// Ouverture modal vidéo ou message no video
document.addEventListener("click", function (e) {
  if (e.target.matches(".main-img")) {
    const videoSrc = e.target.getAttribute("data-video");
    const iframe = document.getElementById("shinyVideoIframe");
    const noVideoMsg = document.getElementById("noVideoMessage");
    const modalEl = document.getElementById("shinyReactionModal");
    const modal = new bootstrap.Modal(modalEl);
    const ratioDiv = iframe.parentElement; // div.ratio

    if (!videoSrc) {
      ratioDiv.style.display = "none";
      iframe.style.display = "none";
      noVideoMsg.style.display = "block";
      modal.show();
      return;
    } else {
      ratioDiv.style.display = "block";
      iframe.style.display = "block";
      noVideoMsg.style.display = "none";
      iframe.src = videoSrc + "?autoplay=1";
      modal.show();
    }

    modalEl.addEventListener("hidden.bs.modal", () => {
      iframe.src = "";
      ratioDiv.style.display = "block";
      iframe.style.display = "block";
      noVideoMsg.style.display = "none";
    }, { once: true });
  }

  if (e.target.closest("#modalClose")) {
    const modalEl = document.getElementById("shinyReactionModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth < 992) {
    const modalEl = document.getElementById("shinyReactionModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) {
      modal.hide();
    }
  }
});
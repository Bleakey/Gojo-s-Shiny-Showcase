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
     style="width: 120px; height: 120px; object-fit: contain;" 
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
  { name: "Ptitard", img: "tartard.png", dex: "060", method: "5x hordes", sold: "✔" },
  { name: "Druddigon", img: "druddigon.png", dex: "621", method: "5x hordes", sold: "✔" },
  { name: "Lopunny", img: "lopunny.png", dex: "428", method: "3x hordes", sold: "✘" },
  { name: "Duskull", img: "duskull.png", dex: "355", method: "5x hordes", sold: "✘" },
  { name: "Sableye", img: "sableye.png", dex: "302", method: "5x hordes", sold: "✔" },
  { name: "Roserade", img: "roserade.png", dex: "407", method: "3x hordes", sold: "✘" },
  { name: "Meowth", img: "meowth.png", dex: "052", method: "5x hordes", sold: "✘" },
  { name: "Magikarp", img: "magikarp.png", dex: "129", method: "5x hordes", sold: "✔" },
  { name: "Gothitelle", img: "gothitelle.png", dex: "576", method: "5x hordes", sold: "✘" },
  ...Array(9).fill({ name: "Bibarel", img: "bibarel.png", dex: "400", method: "3x hordes", sold: "✔" }),
  { name: "Bibarel", img: "bibarel.png", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Bibarel", img: "bibarel.png", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Bibarel", img: "bibarel.png", dex: "400", method: "3x hordes", sold: "✘" },
  { name: "Gardevoir", img: "gardevoir.png", dex: "282", method: "3x hordes", sold: "✘" },
  { name: "Gallade", img: "gallade.png", dex: "475", method: "3x hordes", sold: "✘" },
  { name: "Smeargle", img: "smeargle.png", dex: "235", method: "5x hordes", sold: "✘" },
  { name: "Cofagrigus", img: "cofagrigus.png", dex: "563", method: "5x hordes", sold: "✘" },
  { name: "Golem", img: "golem.png", dex: "076", method: "5x hordes", sold: "✘", encounters: 3214 },
  { name: "Graveler", img: "graveler.png", dex: "075", method: "5x hordes", sold: "✘", encounters: 38064 },
  { name: "Graveler", img: "graveler.png", dex: "075", method: "5x hordes", sold: "✘", encounters: 5652 },
  { name: "Graveler", img: "graveler.png", dex: "075", method: "5x hordes", sold: "✘", encounters: 35420 },
  { name: "Walrein", img: "walrein.png", dex: "365", method: "5x hordes", sold: "✘", encounters: 31139 },
  { name: "Sealeo", img: "sealeo.png", dex: "364", method: "5x hordes", sold: "✘", encounters: 42202 },
  { name: "Lairon", img: "lairon.png", dex: "305", method: "5x hordes", sold: "✘", encounters: 46914, video: "https://www.youtube.com/embed/s4cN9MFE-nw" },
  { name: "Wooper", img: "wooper.png", dex: "194", method: "5x hordes", sold: "✘", encounters: 25228, video: "https://www.youtube.com/embed/cSPhx7i79tE" },
  { name: "Krookodile", img: "krokorok.png", dex: "552", method: "5x hordes", sold: "✘", encounters: 5461 },
  { name: "Butterfree", img: "butterfree.png", dex: "012", method: "Singles", sold: "✘", encounters: 2064, video: "https://www.youtube.com/embed/fiu50H10m0M" },
  { name: "Krabby", img: "krabby.png", dex: "098", method: "Singles", sold: "✘", encounters: 12089, video: "https://www.youtube.com/embed/3FFZ3KnMypM" },
  { name: "Cinccino", img: "cinccino.png", dex: "573", method: "3x hordes", sold: "✘", encounters: 1336, video: "https://www.youtube.com/embed/Rb_cz_zZ0yU" },
  { name: "Tentacruel", img: "tentacruel.png", dex: "073", method: "5x hordes", sold: "✘", encounters: 2439, video: "https://www.youtube.com/embed/dZiGaAMx9hI" },
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
  shinyCount.innerHTML = `<h2 class="wavy-text-y"><span>Shiny count :${pokemonList.length}</span> </h2>`;
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

// Tous les types d'images qui peuvent s'agrandir
const clickableImages = document.querySelectorAll('.trainer-img');

clickableImages.forEach(img => {
  img.addEventListener('click', () => {
    img.classList.toggle('enlarged');
  });
});

// Timer général
let startTime = null;
let timerInterval = null;

function startRun() {
  startTime = Date.now();
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    document.querySelectorAll('.city-timer').forEach((span, index) => {
      span.textContent = formatTime(elapsed);
    });
  }, 1000);
}

// Formater le temps en hh:mm:ss
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Ajouter le timestamp à chaque ville via la trainer-img
document.querySelectorAll('.trainer-img').forEach((img) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {

    const cityTimer = img.closest('.city-section').querySelector('.city-timer');
    const elapsed = Date.now() - startTime;
    cityTimer.textContent = formatTime(elapsed);
    console.log(`Ville terminée à : ${formatTime(elapsed)}`);
  });
});

// --- Timer général ---
let globalStartTime = null;
let globalTimerInterval = null;
let pausedTime = 0; // temps déjà écoulé quand on stoppe

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  let m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  let s = String(totalSeconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const startBtn = document.getElementById("start-global");
const stopBtn = document.getElementById("stop-global");

// --- Helpers ---
function updateTrainerAvailability() {
  document.querySelectorAll(".city-section .trainer-img").forEach(trainerImg => {
    if (!globalTimerInterval) {
      // Griser uniquement si ce n'est pas bloqué par la saison
      if (!trainerImg.classList.contains("season-unavailable")) {
        trainerImg.classList.add("unavailable");
        trainerImg.style.opacity = 0.6;
        trainerImg.style.cursor = 'not-allowed';
      }
    } else {
      // Rendre disponible si ce n'est pas bloqué par la saison
      if (!trainerImg.classList.contains("season-unavailable")) {
        trainerImg.classList.remove("unavailable");
        trainerImg.style.opacity = 1;
        trainerImg.style.cursor = 'pointer';
      }
    }
  });
}

// --- Démarrer / Reprendre le run ---
if (startBtn) {
  startBtn.addEventListener("click", () => {
    if (!globalTimerInterval) {
      globalStartTime = Date.now() - pausedTime;
      globalTimerInterval = setInterval(() => {
        pausedTime = Date.now() - globalStartTime;
        document.getElementById("global-timer").textContent = formatTime(pausedTime);
      }, 1000);

      updateTrainerAvailability(); // rendre les trainers disponibles
    }
  });
}

// --- Stopper (pause) le run ---
if (stopBtn) {
  stopBtn.addEventListener("click", () => {
    if (globalTimerInterval) {
      clearInterval(globalTimerInterval);
      globalTimerInterval = null;
      updateTrainerAvailability(); // re-griser si run stoppé
    }
  });
}

// --- Timestamp par ville ---
document.querySelectorAll(".city-section .trainer-img").forEach(trainerImg => {
  // Au départ, griser si le run n'a pas commencé (sauf saison)
  if (pausedTime === 0 && !globalTimerInterval) {
    if (!trainerImg.classList.contains("season-unavailable")) {
      trainerImg.classList.add("unavailable");
      trainerImg.style.opacity = 0.6;
      trainerImg.style.cursor = 'not-allowed';
    }
  }

  trainerImg.addEventListener("click", (e) => {
    if (!globalTimerInterval) {
      alert("You need to start the timer first!");
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    if (trainerImg.classList.contains("locked")) return;

    // Ajouter le timestamp
    const formatted = formatTime(pausedTime);
    const citySection = trainerImg.closest(".city-section");
    const tsContainer = citySection.querySelector(".city-timestamps");
    if (tsContainer) {
      const entry = document.createElement("p");
      entry.textContent = `⏱ Ended at ${formatted}`;
      tsContainer.appendChild(entry);
    }

    trainerImg.classList.add("locked");
    trainerImg.style.cursor = "not-allowed";
    trainerImg.style.opacity = 0.6;
  });
});

// --- Quand le DOM est prêt ---
document.addEventListener("DOMContentLoaded", () => {
  const monthToSeason = [
    "Spring", "Summer", "Autumn", "Winter",
    "Spring", "Summer", "Autumn", "Winter",
    "Spring", "Summer", "Autumn", "Winter"
  ];
  const currentSeason = monthToSeason[new Date().getMonth()];

  function getAllowedSeasonsFromSection(section) {
    const labelSpan = Array.from(section.querySelectorAll("h1 span span"))
      .find(s => /\[.+Only\]/i.test(s.textContent));
    if (!labelSpan) return [];
    const m = labelSpan.textContent.match(/\[(.*?)\s*Only\]/i);
    const list = (m && m[1]) ? m[1] : "";
    return list.split("/").map(s => s.trim());
  }

  function recalcRouteTotal() {
    let total = 0;
    document.querySelectorAll("section.city-section").forEach(section => {
      if (section.dataset.unavailable === "true") return;
      const greenSpan = section.querySelector('h1 span span[style*="rgb(88, 255, 66)"]');
      if (!greenSpan) return;
      const moneyMatches = greenSpan.textContent.match(/\$([\d,]+)/g);
      if (moneyMatches) {
        moneyMatches.forEach(m => {
          const n = parseInt(m.replace(/[^0-9]/g, ""), 10);
          if (!isNaN(n)) total += n;
        });
      }
    });
    const totalEl = document.getElementById("route-total");
    if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
  }

  // --- Gestion Cynthia ---
  const cynthiaImg = document.querySelector('.city-section .trainers img[alt="Cynthia"]');
  if (cynthiaImg) {
    const section = cynthiaImg.closest(".city-section");
    const allowed = getAllowedSeasonsFromSection(section);
    const isAvailable = (allowed.length === 0) || allowed.includes(currentSeason);

    if (!isAvailable) {
      cynthiaImg.classList.add("unavailable", "season-unavailable");
      section.dataset.unavailable = "true";
      const wrapper = cynthiaImg.closest(".trainer-img-wrapper");
      if (wrapper) {
        const label = document.createElement("div");
        label.className = "unavailable-label";
        label.textContent = `Unavailable : ${currentSeason}`;
        wrapper.appendChild(label);
      }
    }
  }

  recalcRouteTotal();
});

const dingSound = new Audio('sounds/ding.wav');

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("run-progress");
  const trainers = Array.from(document.querySelectorAll(".trainer-img"));
  const totalTrainers = trainers.length;

  trainers.forEach(trainer => {
    // Marquer les trainers indisponibles comme déjà cliqués
    if (trainer.classList.contains("season-unavailable")) {
      trainer.dataset.clicked = "true";
    }

    trainer.addEventListener("click", () => {
      if (trainer.dataset.clicked === "true") return;
      trainer.dataset.clicked = "true";

      // Jouer le son
      dingSound.play();

      // Calcul du pourcentage
      const clickedCount = trainers.filter(t => t.dataset.clicked === "true").length;
      const newWidth = (clickedCount / totalTrainers) * 100;

      progressBar.style.width = newWidth + "%";
      progressBar.textContent = Math.round(newWidth) + "%";

      // --- STOPPER LE TIMER SI 100% ---
      if (Math.round(newWidth) >= 100 && globalTimerInterval) {
        clearInterval(globalTimerInterval);
        globalTimerInterval = null;
        // Optionnel : mettre à jour l’affichage de tous les trainers
        document.querySelectorAll(".city-section .trainer-img").forEach(t => {
          t.style.cursor = 'not-allowed';
        });
        console.log("Run terminé, timer stoppé !");
      }
    });
  });

  // Calcul initial si certains trainers sont déjà cliqués
  const clickedCountInit = trainers.filter(t => t.dataset.clicked === "true").length;
  const newWidthInit = (clickedCountInit / totalTrainers) * 100;
  progressBar.style.width = newWidthInit + "%";
  progressBar.textContent = Math.round(newWidthInit) + "%";

  // Si déjà à 100% au chargement
  if (Math.round(newWidthInit) >= 100 && globalTimerInterval) {
    clearInterval(globalTimerInterval);
    globalTimerInterval = null;
  }
});

const screenshotBtn = document.getElementById("screenshot-btn");

if (screenshotBtn) {
  screenshotBtn.addEventListener("click", () => {
    const globalTime = document.getElementById("global-timer")?.textContent || "00:00:00";
    const cities = document.querySelectorAll(".city-section");
    const cityData = [];

    cities.forEach(city => {
      const h1 = city.querySelector("h1.wavy-text");
      let cityName = "Unknown City";
      if (h1) {
        const span = h1.querySelector("span");
        if (span) {
          // Récupère le texte sans celui du span imbriqué
          const cloned = span.cloneNode(true);
          const innerSpan = cloned.querySelector("span");
          if (innerSpan) innerSpan.remove();
          cityName = cloned.textContent.trim();
        }
      }

      const timestamps = Array.from(city.querySelectorAll(".city-timestamps p"))
        .map(p => p.textContent);

      cityData.push({ city: cityName, timestamps });
    });

    const output = {
      globalTime,
      cities: cityData
    };

    const blob = new Blob([JSON.stringify(output, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "shiny_run_timestamps.json";
    a.click();

    URL.revokeObjectURL(url);
  });
}

document.addEventListener('DOMContentLoaded', () => {
    function checkScreen() {
        const warning = document.getElementById('screen-warning');
        if (!warning) return;
        if (window.innerWidth < 900) {
            warning.style.display = 'flex';
        } else {
            warning.style.display = 'none';
        }
    }

    // Vérifie au chargement
    checkScreen();
    // Vérifie au redimensionnement
    window.addEventListener('resize', checkScreen);
});
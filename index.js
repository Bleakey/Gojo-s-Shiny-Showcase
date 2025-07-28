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

// SFX Quand on passe sur une image
const shinyHoverSound = new Audio('sounds/hover.mp3');
shinyHoverSound.volume = 0.1;

const shinyCards = document.querySelectorAll('.image-wrapper');

shinyCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    shinyHoverSound.currentTime = 0; 
    shinyHoverSound.play();       
  });
});
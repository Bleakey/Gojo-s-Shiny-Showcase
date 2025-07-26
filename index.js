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
    elem.style.backgroundPosition = x;
  }
})();

// ANIMATION D'EN-TÊTE AU CHARGEMENT DE LA PAGE
window.onload = function () {
    const headerImage = document.querySelector('.header-img');
    const animations = ['bounce']; // Tu pourrais ajouter plus d'animations ici
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    headerImage.classList.add(randomAnimation);
};

const images = document.querySelectorAll('.image-wrapper');
const otherImages = document.querySelectorAll('.image-blur');

images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    // Flouter toutes les autres .image-wrapper sauf celle survolée
    images.forEach(otherImg => {
      if (otherImg !== img) {
        otherImg.classList.add('blur-all-but-focus');
      }
    });

    // Flouter toutes les .image-blur
    otherImages.forEach(blurImg => {
      blurImg.classList.add('blur-all-but-focus');
    });

    // L'image survolée reste nette
    img.classList.add('focused');
  });

  img.addEventListener('mouseleave', () => {
    // Enlever le flou sur toutes les .image-wrapper
    images.forEach(otherImg => {
      otherImg.classList.remove('blur-all-but-focus');
    });

    // Enlever le flou sur toutes les .image-blur
    otherImages.forEach(blurImg => {
      blurImg.classList.remove('blur-all-but-focus');
    });

    // Enlever la classe focused sur l'image survolée
    img.classList.remove('focused');
  });
});

const backgroundBlur = document.getElementById('background-blur');

images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    backgroundBlur.style.filter = 'blur(8px)';
  });

  img.addEventListener('mouseleave', () => {
    backgroundBlur.style.filter = 'blur(0px)';
  });
});

const bg = document.getElementById('background-blur');

function toggleBlur(active) {
  if (active) {
    bg.classList.add('blur-active');
  } else {
    bg.classList.remove('blur-active');
  }
}
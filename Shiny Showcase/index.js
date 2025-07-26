(function () {
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector("#container");

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
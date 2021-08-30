// Индикация пункта меню

(function () {

    let navArr = document.querySelectorAll('.nav__link');

    navArr[2].classList.add('nav__link_active');

}());

// Подключение Слайдера

new Swiper('.swiper-container', {
    loop: true,
    spaceBetween: 30,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    speed: 1000,

});
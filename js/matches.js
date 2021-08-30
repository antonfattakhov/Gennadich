// Индикация пункта меню

(function () {

    let navArr = document.querySelectorAll('.nav__link');

    navArr[3].classList.add('nav__link_active');

}());

// Фильтр Предстоящие-Результаты

(function () {

    const nextBtn = document.querySelector('.button-next-js');
    const resBtn = document.querySelector('.button-results-js');

    let next = document.querySelector('.match-next');
    let results = document.querySelector('.match-results');

    nextBtn.addEventListener('click', showNext);
    resBtn.addEventListener('click', showResults);

    results.style.display = 'none';

    function showNext () {

        nextBtn.classList.add('top-nav__button-active');
        resBtn.classList.remove('top-nav__button-active');

        next.style.display = 'block';
        results.style.display = 'none';
    }

    function showResults () {

        nextBtn.classList.remove('top-nav__button-active');
        resBtn.classList.add('top-nav__button-active');

        next.style.display = 'none';
        results.style.display = 'block';
        
    }

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
// Индикация пункта меню

(function () {

    let navArr = document.querySelectorAll('.nav__link');

    navArr[0].classList.add('nav__link_active');

}());




// Фильтр Все-Интервью-Мнение

(function () {

    const all = document.querySelector('.button-all-js');
    const interview = document.querySelector('.button-interview-js');
    const opinion = document.querySelector('.button-opinion-js');

    let allArr = document.querySelectorAll('.news-post');
    let newsArr = document.querySelectorAll('.topic-news');
    let interviewArr = document.querySelectorAll('.topic-interview');
    let opinionArr = document.querySelectorAll('.topic-opinion');

    all.classList.add('top-nav__button-active');

    function showAll () {

        interview.classList.remove('top-nav__button-active');
        all.classList.add('top-nav__button-active');
        opinion.classList.remove('top-nav__button-active');

        allArr.forEach(function (element, index, arr) {
            element.style.display = 'block';
        })
    }
    function showInterview () {

        interview.classList.add('top-nav__button-active');
        all.classList.remove('top-nav__button-active');
        opinion.classList.remove('top-nav__button-active');

        interviewArr.forEach(function (element, index, arr) {
            element.style.display = 'block';
        })
        newsArr.forEach(function (element, index, arr) {
            element.style.display = 'none';
        });
        opinionArr.forEach(function (element, index, arr) {
            element.style.display = 'none';
        })
    }
    function showOpinion () {

        interview.classList.remove('top-nav__button-active');
        all.classList.remove('top-nav__button-active');
        opinion.classList.add('top-nav__button-active');

        opinionArr.forEach(function (element, index, arr) {
            element.style.display = 'block';
        });
        newsArr.forEach(function (element, index, arr) {
            element.style.display = 'none';
        });
        interviewArr.forEach(function (element, index, arr) {
            element.style.display = 'none';
        })
    }

    all.addEventListener('click', showAll);
    interview.addEventListener('click', showInterview);
    opinion.addEventListener('click', showOpinion);

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
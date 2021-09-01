// Стартовое открытие страницы с учетом фильтра ссылок из шапки

let article = document.querySelector('.way');
let club = document.querySelector('.club');
let data = localStorage.getItem("a");

if (data === "way") {
    article.style.display = 'block';
    club.style.display = 'none';
    localStorage.clear();
} else if (data === "photos") {
    article.style.display = 'none';
    club.style.display = 'block';
    localStorage.clear();
} else {
    article.style.display = 'block';
    club.style.display = 'none';
}


// Индикация пункта меню

(function () {

    let navArr = document.querySelectorAll('.nav__link');

    navArr[1].classList.add('nav__link_active');

}());


// Фильтр Путь-Фото

(function () {

    const way = document.querySelector('.button-way-js');
    const photos = document.querySelector('.button-photos-js');

    way.addEventListener('click', showWay);
    photos.addEventListener('click', showClub);

    if (article.style.display === 'block') {
       way.classList.add('top-nav__button-active');
    } else {
        photos.classList.add('top-nav__button-active');
    } 

    function showWay () {

        way.classList.add('top-nav__button-active');
        photos.classList.remove('top-nav__button-active');

        article.style.display = 'block';
        club.style.display = 'none';
    }

    function showClub () {

        way.classList.remove('top-nav__button-active');
        photos.classList.add('top-nav__button-active');

        article.style.display = 'none';
        club.style.display = 'block';
        
    }

}());


// Подключение слайдера Екб

(function () {

    let ekbSlider = new Swiper('.swiper-ekb', {
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        speed: 1000,
    }); 

}());


// Подключение Слайдера галлереи

(function () {
    const photoArr = document.querySelectorAll('.club__item');
    const swiper = document.querySelector('.photo-swiper');
    const swiperWrapper = document.querySelector('.photo-swiper-wrapper');
    const swiperPhotoArr = document.querySelectorAll('.swiper-item-photo');

    let photoSlider;

    photoArr.forEach(function(element, index, arr) {
        element.addEventListener('click', () => {
            hideScroll();
            showSlider(index);
        });
    });

    swiperPhotoArr.forEach(function(element, index, arr) {
        element.addEventListener('click', (event) => {
        event.stopPropagation();});
    });

    swiperWrapper.addEventListener('click', () => {
        swiper.style.display = 'none';
        showScroll();
        window.removeEventListener('keydown', pressEsc);
    });

    function showSlider (index) {
        swiper.style.display = 'block';

        photoSlider = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            loop: true,
            initialSlide: index,
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },
        });
    }
}());



// Показать/скрыть скролл

function hideScroll () {
    
    const getScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    header.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.overflowY = 'hidden';
    document.body.addEventListener('touchmove', hideforIOS, { passive: false });
    window.addEventListener('keydown', pressEsc);
} 

function hideforIOS (event) {
    event.preventDefault();
}

function showScroll (event) {

    header.style.paddingRight = '';
    document.body.style.paddingRight = '';
    document.body.style.overflowY = 'visible';
    document.body.removeEventListener('touchmove', hideforIOS);
    window.removeEventListener('keydown', pressEsc);
}

function pressEsc (event) {
    if (event.keyCode == 27) {
        swiper.style.display = 'none';
        showScroll();
    }
};

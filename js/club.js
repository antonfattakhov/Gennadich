// Фильтр Тренировки-Игры

(function () {

    const way = document.querySelector('.button-way-js');
    const photos = document.querySelector('.button-photos-js');

    let article = document.querySelector('.way');
    let club = document.querySelector('.club');

    way.addEventListener('click', showWay);
    photos.addEventListener('click', showClub);

    club.style.display = 'none';

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
            delay: 2000,
            disableOnInteraction: false
        },
        speed: 500,
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

        window.addEventListener('keydown', pressEsc);
    }

    function pressEsc (event) {
        if (event.keyCode == 27) {
            swiper.style.display = 'none';
            showScroll();
            window.removeEventListener('keydown', esc);
        }
    };
}());


// Hide/Show scroll

function hideScroll () {
    
    const getScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;;
    document.body.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.overflowY = 'hidden';
    document.body.addEventListener('touchmove', hideforIOS, { passive: false }); 
} 

function hideforIOS (event) {
    event.preventDefault();
}

function showScroll (event) {

    document.body.style.paddingRight = '';
    document.body.style.overflowY = 'visible';
    document.body.removeEventListener('touchmove', hideforIOS);
}
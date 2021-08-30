// Индикация пункта меню

(function () {

    let navArr = document.querySelectorAll('.nav__link');

    navArr[0].classList.add('nav__link_active');

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


// Hide/Show scroll


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
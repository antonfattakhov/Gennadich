// Динамический адаптив

class DynamicAdapt {
    constructor(type) {
      this.type = type;
    }
  
    init() {
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = [...document.querySelectorAll('[data-da]')];
  
      // наполнение оbjects объктами
      this.nodes.forEach((node) => {
        const data = node.dataset.da.trim();
        const dataArray = data.split(',');
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
      });
  
      this.arraySort(this.оbjects);
  
      // массив уникальных медиа-запросов
      this.mediaQueries = this.оbjects
        .map(({
          breakpoint
        }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
        .filter((item, index, self) => self.indexOf(item) === index);
  
      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      this.mediaQueries.forEach((media) => {
        const mediaSplit = media.split(',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];
  
        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = this.оbjects.filter(
          ({
            breakpoint
          }) => breakpoint === mediaBreakpoint
        );
        matchMedia.addEventListener('change', () => {
          this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      });
    }
  
    // Основная функция
    mediaHandler(matchMedia, оbjects) {
      if (matchMedia.matches) {
        оbjects.forEach((оbject) => {
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        });
      } else {
        оbjects.forEach(
          ({ parent, element, index }) => {
            if (element.classList.contains(this.daClassname)) {
              this.moveBack(parent, element, index);
            }
          }
        );
      }
    }
  
    // Функция перемещения
    moveTo(place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
        destination.append(element);
        return;
      }
      if (place === 'first') {
        destination.prepend(element);
        return;
      }
      destination.children[place].before(element);
    }
  
    // Функция возврата
    moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].before(element);
      } else {
        parent.append(element);
      }
    }
  
    // Функция получения индекса внутри родителя
    indexInParent(parent, element) {
      return [...parent.children].indexOf(element);
    }
  
    // Функция сортировки массива по breakpoint и place 
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    arraySort(arr) {
      if (this.type === 'min') {
        arr.sort((a, b) => {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }
            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }
            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }
            return a.place - b.place;
          }
          return a.breakpoint - b.breakpoint;
        });
      } else {
        arr.sort((a, b) => {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }
            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }
            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }
            return b.place - a.place;
          }
          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    }
  }

  const da = new DynamicAdapt("max");  
da.init();


// Burger

(function () {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger-js');
    const menu = document.querySelector('.header__menu');
    // const menuCloseItem = document.querySelector('.header__nav__close');
    // const menuLinks = document.querySelectorAll('.nav__link');
    
    function burgerClick () {
        menu.classList.toggle('header__menu_active');
        burger.classList.toggle('header__burger_active');
        // hideScroll();
        // menuLinks.forEach(each => {each.addEventListener('click', linkClick)});       
    };

    // function linkClick () {
    //     menu.classList.remove('header__nav__active');
    //     header.classList.add('header__active');
    //     menu.addEventListener('transitionend', showScrollafterBurger);
    //     menuLinks.forEach(each => {each.removeEventListener('click', linkClick)});
    // };

    // function closeClick () {
    //     menu.classList.remove('header__nav__active');
    //     if (window.pageYOffset > 84) {header.classList.add('header__active')}
    //     header.removeChild(blur);
    //     menu.addEventListener('transitionend', showScrollafterBurger);
    // };    
    burger.addEventListener('click', burgerClick);
    // menuCloseItem.addEventListener('click', closeClick)
}());

// Inner-list animation

(function () {
    let posX, posY;
    let hoverObject;
    const menuLinks = document.querySelectorAll('.nav__link');
    const innerList = document.querySelector('.header__inner-list');
    
    function innerListOpen (element) {
        
        if (innerList.classList.contains('header__inner-list-active') != true) {
            innerList.classList.add('header__inner-list-active');
            console.log('вывод на экран иннер-лист');
            innerList.addEventListener('mouseleave', innerListClose);

            hoverObject = element.getBoundingClientRect();
            console.dir(hoverObject);
            
            document.addEventListener('mousemove', mouseMove);
      } 
    }

    function mouseMove (event) {
        posX = event.clientX;
        posY = event.clientY;
        
        console.log('курсор'+posX, "право"+hoverObject.right, "лево"+hoverObject.left); 
        console.log("курсор"+posY, "верх"+hoverObject.top, "низ"+hoverObject.bottom);
        if (hoverObject.top - 2 > posY || hoverObject.left - 2 > posX || hoverObject.right < posX) {
            innerListClose();
            console.log('вышел за рамки');
        } else if (hoverObject.bottom < posY) {
            document.removeEventListener('mousemove', mouseMove);
            console.log('ремув маусмув');
        }
    }
    function innerListClose () {
        innerList.classList.remove('header__inner-list-active');
        innerList.removeEventListener('mouseleave', innerListClose);
        document.removeEventListener('mousemove', mouseMove);
        console.log('ремув оооол');
    } 
    

    menuLinks.forEach((element, index, array) => {
      element.addEventListener('mouseover', function () {
        innerListOpen(element);
      });
    });
}());


// Scroll into inner-list

(function innerListHeight() {
    const innerList = document.querySelector('.header__inner-list');
    const breakpoint = window.matchMedia("(max-height: 600px)");

    if (breakpoint.matches === true) {
        innerList.style.height = `${window.innerHeight * 2 / 3}px`;
    }

    breakpoint.addEventListener('change', () => {
        if (breakpoint.matches) {
            innerList.style.height = `${window.innerHeight * 2 / 3}px`;
        } else {
            innerList.style.height = `auto`;
        }
    });
}());
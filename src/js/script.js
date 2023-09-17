// Функция для переключения меню бургера
function toggleBurgerMenu() {
    const header = document.querySelector('.header');
    const body = document.querySelector('body');
  
    header.classList.toggle('active');
    body.classList.toggle('lock');
  }
  
  // Функция для добавления класса .scrolled при прокрутке
  function handleScroll() {
    const header = document.querySelector("header");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
    if (scrollTop > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  
  // Функция для проверки, является ли устройство сенсорным
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }
  
  // Функция для добавления/удаления класса .hover при касании
  function handleTouchHover(selector) {
    const cardsItems = document.querySelectorAll(selector);
  
    if (isTouchDevice()) {
      cardsItems.forEach((item) => {
        item.addEventListener('click', () => {
          item.classList.toggle('hover');
        });
      });
    }
  }
  
  // Функция для добавления класса .show и настройки translateY для .circle__subtext при наведении
  function handleCircleSubtext() {
    const circleItems = document.querySelectorAll('.circle__item');
  
    circleItems.forEach((circleItem) => {
      if (isTouchDevice()) {
        circleItem.addEventListener('click', () => {
          const subtext = circleItem.closest('.circle__content').querySelector('.circle__subtext');
  
          if (subtext) {
            const isTopSubtext = subtext.classList.contains('circle__subtext_top');
            isTopSubtext ? subtext.classList.toggle('show_top') : subtext.classList.toggle('show_bottom');
          }
        });
      } else {
        circleItem.addEventListener('mouseover', () => {
          const subtext = circleItem.closest('.circle__content').querySelector('.circle__subtext');
  
          if (subtext) {
            const isTopSubtext = subtext.classList.contains('circle__subtext_top');
            isTopSubtext ? subtext.classList.add('show_top') : subtext.classList.add('show_bottom');
          }
        });
  
        circleItem.addEventListener('mouseout', () => {
          const subtext = circleItem.closest('.circle__content').querySelector('.circle__subtext');
  
          if (subtext) {
            subtext.classList.remove('show_top', 'show_bottom');
          }
        });
      }
    });
  }

//   '.circle__content:nth-child(2) > .circle__subtext' 'circle__subtext_bottom' 'circle__subtext_top'
  
// Функция для проверки ширины экрана и изменения классов элементов
function changeDirectionSubText(selector, remove, add) {
  const screenWidth = window.innerWidth;
  const circleSubText = document.querySelector(selector);

  if (screenWidth < 1200) {
    circleSubText.classList.remove(remove);
    circleSubText.classList.add(add);
  } else {
    circleSubText.classList.remove(add);
    circleSubText.classList.add(remove);
  }
 
}

// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener('load', changeDirectionSubText('.circle__content:nth-child(2) > .circle__subtext', 'circle__subtext_bottom', 'circle__subtext_top'));
window.addEventListener('load', changeDirectionSubText('.circle__content:nth-child(3) > .circle__subtext', 'circle__subtext_top', 'circle__subtext_bottom'));



  // Вызываем функции
  document.querySelector('.header__burger').addEventListener('click', toggleBurgerMenu);
  window.addEventListener("scroll", handleScroll);
  handleTouchHover('.cards__item');
  handleTouchHover('.circle__item');
  handleCircleSubtext();
  
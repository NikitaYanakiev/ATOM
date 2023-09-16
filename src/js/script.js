document.querySelector('.header__burger').addEventListener('click', () => {
    document.querySelector('.header').classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');
});


window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Проверяем, является ли устройство сенсорным
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// Функция для добавления/удаления класса при касании
function handleTouchHover() {
  const cardsItems = document.querySelectorAll('.cards__item');
  item.classList.remove('hover');


  // Проверяем, является ли устройство сенсорным
  if (isTouchDevice()) {
    cardsItems.forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('hover'); // Добавляем класс при касании
      });
    });
  }
  
}

// Вызываем функцию
handleTouchHover();

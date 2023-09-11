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
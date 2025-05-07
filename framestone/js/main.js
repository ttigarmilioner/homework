(function () {
  // Бургер

  document.addEventListener("click", burgerInit);

  function burgerInit(e) {
    const burgerIcon = e.target.closest(".burger-icon");
    const burgerNavLink = e.target.closest(".nav__link");
    const burgerButton = e.target.closest(".header-button");

    if (!burgerIcon && !burgerNavLink) return;
    if (document.documentElement.clientWidth > 1300) return;

    if (!document.body.classList.contains("body--oppend-menu")) {
      document.body.classList.add("body--oppend-menu");
    } else {
      document.body.classList.remove("body--oppend-menu");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header__top");
    const mainSection = document.querySelector("main");
    const navLinks = document.querySelectorAll(".nav__link");
    const logoText = document.querySelector(".header__logo span");

    // Функция для проверки положения скролла
    function updateHeaderStyles() {
      const headerRect = header.getBoundingClientRect();
      const mainRect = mainSection.getBoundingClientRect();

      // Если шапка достигла main секции
      if (headerRect.bottom >= mainRect.top) {

        // Изменяем цвет текста
        navLinks.forEach((link) => {
          link.style.color = "var(--general-text)";
        });

        if (logoText) {
          logoText.style.color = "var(--general-text)";
        }
      } else {
        // Возвращаем исходные стили
        header.style.backgroundColor = "transparent";
        header.style.boxShadow = "none";

        navLinks.forEach((link) => {
          link.style.color = "var(--header-text)";
        });

        if (logoText) {
          logoText.style.color = "var(--header-text)";
        }
      }
    }

    // Добавляем обработчик скролла
    window.addEventListener("scroll", updateHeaderStyles);

    // Вызываем сразу для проверки начального состояния
    updateHeaderStyles();
  });

  // Модалка

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const modalButtons = document.querySelectorAll(".header-button"); // Все кнопки!

    if (!modal || modalButtons.length === 0) {
      console.error("Не найдены модальное окно или кнопки");
      return;
    }

    // Вешаем обработчик на ВСЕ кнопки
    modalButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        if (this.tagName === "A") e.preventDefault(); // Если кнопка — это <a>
        document.body.classList.add("body--opened-modal");
      });
    });

    // Закрытие модалки
    modal.addEventListener("click", function (e) {
      if (e.target.closest(".modal__cancel") || e.target === modal) {
        document.body.classList.remove("body--opened-modal");
      }
    });

    // Чекбокс (если нужно)
    document.querySelectorAll(".field-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => e.stopPropagation());
    });
  });

  // Слайдер-галерея

  new Swiper(".projects__slider", {
    spaceBetween: 15,
    slidesPerView: 1,

    navigation: {
      nextEl: ".projects__next",
      prevEl: ".projects__prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },

    breakpoints: {
      601: {
        slidesPerView: 1,
      },
      801: {
        spaceBetween: 32,
      },
      1101: {
        slidesPerView: 1,
      },
    },
  });

  // // Слайдер-отзывы
  new Swiper(".testimonials__slider", {
    // Основные настройки
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 56,
    centeredSlides: false,
    loop: false,
    navigation: {
      nextEl: ".testimonials__next",
      prevEl: ".testimonials__prev",
    },
    threshold: 15,
    resistance: false,
    followFinger: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      801: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 32,
      },
      1101: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 56,
      },
    },
  });

  // // Аккардеон
  const accordionLists = document.querySelectorAll(".accordion-list");

  accordionLists.forEach((el) => {
    el.addEventListener("click", (e) => {
      const accordionList = e.currentTarget;
      const accordionOpenedItem = accordionList.querySelector(
        ".accordion-list__item--opened"
      );
      const accordionOpenedContent = accordionList.querySelector(
        ".accordion-list__item--opened .accordion-list__content"
      );

      const accordionControl = e.target.closest(".accordion-list__control");
      if (!accordionControl) return;
      e.preventDefault();
      const accordionItem = accordionControl.parentElement;
      const accordionContent = accordionControl.nextElementSibling;

      if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
        accordionOpenedItem.classList.remove("accordion-list__item--opened");
        accordionOpenedContent.style.maxHeight = null;
      }
      accordionItem.classList.toggle("accordion-list__item--opened");

      if (accordionItem.classList.contains("accordion-list__item--opened")) {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      } else {
        accordionContent.style.maxHeight = null;
      }
    });
  });

  // // Маска
  const telInouts = document.querySelectorAll('input[type="tel"]');
  const im = new Inputmask("+7 (999) 999-99-99");
  im.mask(telInouts);
})();

$(document).ready(function () {
    var mySwiper = new Swiper(".swiper-container", {
        loop: true,
        spaceBetween: 4,
        slidesPerView: 1,
        centeredSlides: true,
        speed: 400,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        pagination: {
            el: '.swiper-paginationFirst',
            clickable: true,
        },

        breakpoints: {
            768: {
                slidesPerView: 1.5
            },
            1024: {
                slidesPerView: 2.1
            }
        }
    });
});
var swiperVert = new Swiper(".mySwiperCart-vert", {
    slidesPerView: 2,
    spaceBetween: 67,
    direction: 'vertical',
    pagination: {
        el: '.swiper-pagination-vert',
        clickable: true,
        direction: 'vertical', 
    },
});


var mySwiperRev = new Swiper(".mySwiperRev", {
    slidesPerView: 6,
    spaceBetween: 11,
    pagination: {
        el: '.swiper-pagination-rev',
        clickable: true,
    },
    breakpoints: {
        1920: {
            slidesPerView: 6,
        },
        1500: {
            slidesPerView: 6,
        },
        1300: {
            slidesPerView: 6,
        },
        1000: {
            slidesPerView: 5,
        },
        750: {
            slidesPerView: 4,
        },
        575: {
            slidesPerView: 3,
        },
        400: {
            slidesPerView: 2,
        },
        320: {
            slidesPerView: 1.5,
        },
    },
});

window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const rate = 0.2; // Настройте скорость
    document.body.style.backgroundPosition = `center ${-scrolled * rate}px`;
});

document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const slides = document.querySelectorAll('.swiper-slide');
    const swiperContainer = document.querySelector('.swiper.mySwiperRev');

    let activeFilters = ['all'];

    function filterTeam() {
        swiperContainer.classList.add('updating');

        let visibleSlides = 0;

        slides.forEach(slide => {
            const slideDept = slide.dataset.department;
            const matchesFilter = activeFilters.includes('all') || activeFilters.includes(slideDept);

            if (matchesFilter) {
                slide.classList.remove('filtered-out');
                visibleSlides++;
            } else {
                slide.classList.add('filtered-out');
            }
        });

        setTimeout(() => {
            swiperContainer.classList.remove('updating');
            if (typeof mySwiperRev !== 'undefined' && mySwiperRev instanceof Swiper) {
                mySwiperRev.update();
                mySwiperRev.slideTo(0);
            }
        }, 300);

        showNoResultsMessage(visibleSlides === 0);
    }

    function toggleFilter(filter) {
        if (filter === 'all') {
            // Если нажали ALL, сбрасываем все фильтры
            activeFilters = ['all'];
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                const badge = btn.querySelector('.filter-badge');
                if (badge) badge.remove();
            });
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            allBtn.classList.add('active');
        } else {
            // Убираем ALL из активных фильтров
            activeFilters = activeFilters.filter(f => f !== 'all');

            // Убираем активный класс с кнопки ALL
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            allBtn.classList.remove('active');

            // Переключаем выбранный фильтр
            if (activeFilters.includes(filter)) {
                // Удаляем фильтр если он уже активен
                activeFilters = activeFilters.filter(f => f !== filter);
                const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                btn.classList.remove('active');
                const badge = btn.querySelector('.filter-badge');
                if (badge) badge.remove();
            } else {
                // Добавляем фильтр
                activeFilters.push(filter);
                const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                btn.classList.add('active');
            }

            // Если нет активных фильтров, включаем ALL
            if (activeFilters.length === 0) {
                activeFilters = ['all'];
                allBtn.classList.add('active');
            }
        }

        filterTeam();
    }

    function showNoResultsMessage(show) {
        let message = document.querySelector('.no-results-message');

        if (show && !message) {
            message = document.createElement('div');
            message.className = 'no-results-message';
            message.innerHTML = `
        <div>
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить параметры фильтрации</p>
        </div>
      `;
            swiperContainer.parentNode.insertBefore(message, swiperContainer.nextSibling);
        } else if (!show && message) {
            message.remove();
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.dataset.filter;
            toggleFilter(filter);
        });
    });

    filterTeam();
});

document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.head-menu a, .menu__box a');
    const sections = document.querySelectorAll('section');
    function setActiveMenu() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        menuItems.forEach(item => {
            item.classList.remove('head-menu-active');
        });
        if (currentSection) {
            menuItems.forEach(item => {
                if (item.getAttribute('href') === `#${currentSection}` ||
                    item.getAttribute('href').includes(currentSection)) {
                    item.classList.add('head-menu-active');
                }
            });
        }
    }
    window.addEventListener('scroll', setActiveMenu);
    setActiveMenu();
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu__toggle');
    const menuLinks = document.querySelectorAll('.menu__box a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Снимаем галочку с чекбокса - это закроет меню
            menuToggle.checked = false;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenCards = document.querySelectorAll('.hidden-card');

    let cardsToShow = 2;
    let currentIndex = 0;

    if (loadMoreBtn && hiddenCards.length > 0) {
        loadMoreBtn.addEventListener('click', function () {
            for (let i = currentIndex; i < currentIndex + cardsToShow && i < hiddenCards.length; i++) {
                hiddenCards[i].classList.add('show');
            }

            currentIndex += cardsToShow;

            if (currentIndex >= hiddenCards.length) {
                loadMoreBtn.classList.add('hidden');
            }

            const remainingCards = hiddenCards.length - currentIndex;
            if (remainingCards > 0 && remainingCards < cardsToShow) {
                loadMoreBtn.textContent = `Показать оставшиеся ${remainingCards}`;
            }
        });
    }

    if (hiddenCards.length === 0) {
        loadMoreBtn.style.display = 'none';
    }
});


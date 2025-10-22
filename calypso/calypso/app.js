$(document).ready(function () {
    // Assign some jquery elements we'll need
    var $swiper = $(".swiper-container");
    var $bottomSlide = null; // Slide whose content gets 'extracted' and placed
    // into a fixed position for animation purposes
    var $bottomSlideContent = null; // Slide content that gets passed between the
    // panning slide stack and the position 'behind'
    // the stack, needed for correct animation style

    var mySwiper = new Swiper(".swiper-container", {
        spaceBetween: 4,
        slidesPerView: 2.1,
        centeredSlides: true,
        initialSlide: 1,
        roundLengths: true,
        loopAdditionalSlides: 30,
        pagination: {
            el: '.swiper-paginationFirst',
            clickable: true,
        },
        breakpoints: {
            1920: {
                slidesPerView: 2.1,
            },
            1500: {
                slidesPerView: 2.1,
            },
            1300: {
                slidesPerView: 2.1,
            },
            1000: {
                slidesPerView: 1.5,
            },
            700: {
                slidesPerView: 1.2,
            },
            500: {
                slidesPerView: 1.1,
            },
            320: {
                slidesPerView: 1.1,
            },
        },
    });
});

var swiperVert = new Swiper(".mySwiperCart-vert", {
    slidesPerView: 2,
    spaceBetween: 67,
    direction: 'vertical',
    pagination: {
        el: '.swiper-pagination-vert',
        clickable: true,
        direction: 'vertical',      // Вертикальный стиль пагинации
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
            slidesPerView: 1,
        },
    },
});

window.addEventListener('scroll', function () {
    if (window.innerWidth < 768) return;

    const scrolled = window.pageYOffset;
    const rate = 0.2; // Настройте скорость
    document.body.style.backgroundPosition = `center ${-scrolled * rate}px`;
});

// Функциональность фильтрации с множественным выбором по обычному клику
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const slides = document.querySelectorAll('.swiper-slide');
    const swiperContainer = document.querySelector('.swiper.mySwiperRev');

    // Массив активных фильтров
    let activeFilters = ['all'];

    function filterTeam() {
        // Показываем индикатор обновления
        swiperContainer.classList.add('updating');

        let visibleSlides = 0;

        slides.forEach(slide => {
            const slideDept = slide.dataset.department;

            // Фильтруем по активным фильтрам (логическое ИЛИ)
            const matchesFilter = activeFilters.includes('all') || activeFilters.includes(slideDept);

            if (matchesFilter) {
                slide.classList.remove('filtered-out');
                visibleSlides++;
            } else {
                slide.classList.add('filtered-out');
            }
        });

        // Обновляем Swiper если он инициализирован
        setTimeout(() => {
            swiperContainer.classList.remove('updating');
            if (typeof mySwiperRev !== 'undefined' && mySwiperRev instanceof Swiper) {
                mySwiperRev.update();
                mySwiperRev.slideTo(0);
            }
        }, 300);

        // Если нет видимых слайдов, показываем сообщение
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

    // Инициализация обработчиков событий
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.dataset.filter;
            toggleFilter(filter);
        });
    });

    // Инициализация при загрузке
    filterTeam();
});



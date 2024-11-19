

(function () {


    //Бургер-меню
    document.addEventListener('click', burgerInit)

    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger__icon')
        const burgerNavLink = e.target.closest('.nav__link')

        if (!burgerIcon && !burgerNavLink) return
        if (document.documentElement.clientWidth > 1365) return

        if (!document.body.classList.contains('body--opened-menu')) {
            document.body.classList.add('body--opened-menu')
        } else {
            document.body.classList.remove('body--opened-menu')
        }

    }


    // Свайпер
    const swiper = new Swiper('.swiper', {
        loop: true,

        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',

        },

        navigation: {
            nextEl: '.room__slider-button',
        },
    });


    // Аккардеон
    const smallButtons = document.querySelectorAll('.toggleSmallButton');
    const bigElements = document.querySelectorAll('.big-element');
    const smallElements = document.querySelectorAll('.small-element');

    // Показать соответствующий большой элемент при нажатии на маленький
    smallButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bigId = this.getAttribute('data-big-id'); // Получаем ID большого элемента
            const bigElement = document.getElementById(bigId); // Получаем элемент по ID

            // Остальные большие элементы скрываем
            bigElements.forEach(el => {
                if (el !== bigElement) {
                    el.classList.add('hidden'); // Скрываем все большие элементы, кроме выбранного
                    // Найдем соответствующий маленький элемент и покажем его
                    const smallId = `smallElement${el.id.charAt(el.id.length - 1)}`;
                    document.getElementById(smallId).classList.remove('hidden');
                }
            });

            // Скрываем текущий маленький элемент
            const smallElement = this.parentElement; // Получаем родительский элемент (маленький элемент)
            smallElement.classList.add('hidden'); // Скрываем маленький элемент

            // Показываем выбранный большой элемент
            bigElement.classList.remove('hidden'); // Показываем текущий большой элемент
        });
    });

    // Получаем все кнопки для больших элементов
    const bigButtons = document.querySelectorAll('.toggleBigButton');

    bigButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bigElement = this.parentElement;

            // Скрываем текущий большой элемент
            bigElement.classList.add('hidden');

            // Показать соответствующий маленький элемент
            const smallId = `smallElement${bigElement.id.charAt(bigElement.id.length - 1)}`;
            const smallElement = document.getElementById(smallId);
            smallElement.classList.remove('hidden'); // Показываем соответствующий маленький элемент
        });
    })
})()
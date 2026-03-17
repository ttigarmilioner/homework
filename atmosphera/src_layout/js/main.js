// Atmosphere 9 Website - Pure JavaScript Logic
/* global Swiper */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('main-header');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const backToTop = document.getElementById('back-to-top');
  const floatingActions = document.getElementById('floating-actions');
  const modalForm = document.getElementById('modal-form');
  const modalContent = document.getElementById('modal-content');

  // Scroll Handler
  window.addEventListener('scroll', () => {
    // Header state
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 400) {
      backToTop?.classList.remove('hidden');
    } else {
      backToTop?.classList.add('hidden');
    }
  });

  // Mobile Menu Toggle
  mobileMenuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.remove('hidden');
    floatingActions?.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  });

  mobileMenuClose?.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
    floatingActions?.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = ''; // Restore scroll
  });

  // Close mobile menu on link click
  const mobileLinks = mobileMenu?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
      floatingActions?.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    });
  });

  // Modal Logic
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const formFields = document.getElementById('form-fields');
  const modalSubmit = document.getElementById('modal-submit');

  const formConfigs = {
    callback: {
      title: 'Заказать обратный звонок',
      desc: 'Оставьте ваш номер, и мы перезвоним вам в течение 15 минут.',
      submit: 'Жду звонка',
      fields: ['name', 'phone']
    },
    measurement: {
      title: 'Записаться на замер',
      desc: 'Наш технолог приедет в удобное время, сделает точные замеры и проконсультирует.',
      submit: 'Записаться',
      fields: ['name', 'phone', 'address']
    },
    price: {
      title: 'Узнать стоимость',
      desc: 'Опишите ваш проект, и мы подготовим предварительный расчет.',
      submit: 'Получить расчет',
      fields: ['name', 'phone', 'message']
    },
    drawing: {
      title: 'Отправить чертеж',
      desc: 'Загрузите ваш чертеж или эскиз для точного расчета стоимости.',
      submit: 'Отправить на расчет',
      fields: ['name', 'phone', 'file', 'message']
    },
    message: {
      title: 'Написать сообщение',
      desc: 'Есть вопросы или предложения? Напишите нам, мы обязательно ответим.',
      submit: 'Отправить сообщение',
      fields: ['name', 'email', 'message']
    }
  };

  const fieldTemplates = {
    name: `
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Ваше имя</label>
        <input type="text" required placeholder="Иван Иванов" class="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-[#1E4A3B] transition-colors">
      </div>`,
    phone: `
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Телефон</label>
        <input type="tel" required placeholder="+7 (___) ___-__-__" class="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-[#1E4A3B] transition-colors">
      </div>`,
    email: `
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Email</label>
        <input type="email" required placeholder="example@mail.ru" class="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-[#1E4A3B] transition-colors">
      </div>`,
    address: `
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Адрес объекта</label>
        <input type="text" placeholder="г. Москва, ул. ..." class="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-[#1E4A3B] transition-colors">
      </div>`,
    message: `
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Сообщение</label>
        <textarea placeholder="Опишите детали..." class="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 focus:outline-none focus:border-[#1E4A3B] transition-colors h-24 resize-none"></textarea>
      </div>`,
    file: `
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Прикрепить файл</label>
        <div class="relative group">
          <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
          <div class="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-dashed border-neutral-300 group-hover:border-[#1E4A3B] transition-colors flex items-center justify-center gap-2 text-neutral-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Выберите файл
          </div>
        </div>
      </div>`
  };

  const openModal = (e) => {
    const trigger = e.currentTarget;
    const type = trigger.getAttribute('data-form-type') || 'callback';
    const config = formConfigs[type];

    if (modalTitle) modalTitle.textContent = config.title;
    if (modalDesc) modalDesc.textContent = config.desc;
    if (modalSubmit) modalSubmit.textContent = config.submit;

    if (formFields) {
      formFields.innerHTML = config.fields.map(f => fieldTemplates[f]).join('');
    }

    modalForm?.classList.remove('hidden');
    setTimeout(() => {
      modalContent?.classList.remove('scale-95', 'opacity-0');
      modalContent?.classList.add('scale-100', 'opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalContent?.classList.remove('scale-100', 'opacity-100');
    modalContent?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      modalForm?.classList.add('hidden');
      if (mobileMenu?.classList.contains('hidden')) {
        document.body.style.overflow = '';
      }
    }, 300);
  };

  document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-close')) {
      closeModal();
    }
  });

  // Form Submission
  const dynamicForm = document.getElementById('dynamic-form');
  dynamicForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success state
    const originalContent = modalContent?.innerHTML;
    if (modalContent) {
      modalContent.innerHTML = `
        <div class="p-12 text-center">
          <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 class="text-2xl font-serif mb-2 text-neutral-900">Заявка отправлена!</h3>
          <p class="text-neutral-500 mb-8">Спасибо за доверие. Мы свяжемся с вами в течение 15 минут.</p>
          <button class="modal-close w-full bg-[#1E4A3B] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#2A5C4A] transition-colors shadow-lg">Закрыть</button>
        </div>
      `;
      
      // Restore content after modal is hidden
      setTimeout(() => {
        const checkClosed = setInterval(() => {
          if (modalForm?.classList.contains('hidden')) {
            if (modalContent && originalContent) modalContent.innerHTML = originalContent;
            clearInterval(checkClosed);
          }
        }, 100);
      }, 500);
    }
  });

  // Close modal on Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Back to top click
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Portfolio Filtering (Category + Media Type)
  const portfolioFilters = document.getElementById('portfolio-filters');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const showMoreBtn = document.getElementById('show-more-portfolio');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const mediaTabs = document.querySelectorAll('.media-tab');

  if (portfolioGrid && portfolioItems.length > 0) {
    let currentCategory = 'all';
    let currentMediaType = 'photo';
    const limit = 6;

    const filterPortfolio = (isShowMore = false) => {
      let visibleCount = 0;
      let totalMatchCount = 0;

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const mediaType = item.getAttribute('data-media-type');
        const categoryMatch = currentCategory === 'all' || category === currentCategory;
        const mediaMatch = mediaType === currentMediaType;

        if (categoryMatch && mediaMatch) {
          totalMatchCount++;
          if (isShowMore || visibleCount < limit) {
            item.classList.remove('hidden');
            visibleCount++;
          } else {
            item.classList.add('hidden');
          }
        } else {
          item.classList.add('hidden');
        }
      });

      // Show/Hide "Show More" button
      if (showMoreBtn) {
        if (!isShowMore && totalMatchCount > limit) {
          showMoreBtn.classList.remove('hidden');
        } else {
          showMoreBtn.classList.add('hidden');
        }
      }
    };

    // Category Filter Click
    portfolioFilters?.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-filter') || 'all';
        
        // Update active button
        portfolioFilters.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('bg-brand-green', 'text-white', 'shadow-lg', 'active');
          b.classList.add('bg-neutral-50', 'text-neutral-400');
        });
        btn.classList.add('bg-brand-green', 'text-white', 'shadow-lg', 'active');
        btn.classList.remove('bg-neutral-50', 'text-neutral-400');

        filterPortfolio();
      });
    });

    // Media Type Tab Click
    mediaTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        currentMediaType = tab.getAttribute('data-media-type') || 'photo';
        
        // Update active tab
        mediaTabs.forEach(t => {
          t.classList.remove('active', 'bg-white', 'shadow-sm');
          t.classList.add('text-neutral-400');
        });
        tab.classList.add('active', 'bg-white', 'shadow-sm');
        tab.classList.remove('text-neutral-400');

        filterPortfolio();
      });
    });

    // Show More Click
    showMoreBtn?.addEventListener('click', () => {
      filterPortfolio(true);
    });

    // Initial Filter
    filterPortfolio();
  }

  // Service Gallery Filtering
  const serviceGalleryTabs = document.querySelectorAll('.service-gallery-tab');
  const serviceGalleryItems = document.querySelectorAll('.service-gallery-item');

  if (serviceGalleryTabs.length > 0) {
    serviceGalleryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const mediaType = tab.getAttribute('data-media-type');
        
        // Update active tab
        serviceGalleryTabs.forEach(t => {
          t.classList.remove('active', 'bg-white', 'shadow-sm');
          t.classList.add('text-neutral-400');
        });
        tab.classList.add('active', 'bg-white', 'shadow-sm');
        tab.classList.remove('text-neutral-400');

        // Filter items
        serviceGalleryItems.forEach(item => {
          if (item.getAttribute('data-media-type') === mediaType) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // FAQ Accordion
  const faqAccordions = document.querySelectorAll('#faq-accordion');
  faqAccordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.faq-item');
    items.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');
      const icon = item.querySelector('.faq-icon');

      trigger?.addEventListener('click', () => {
        const isOpen = content?.style.maxHeight && content.style.maxHeight !== '0px';

        // Close all items in this accordion
        items.forEach(otherItem => {
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherContent) otherContent.style.maxHeight = '0px';
          otherIcon?.classList.remove('rotate-180');
        });

        if (!isOpen && content) {
          content.style.maxHeight = content.scrollHeight + 'px';
          icon?.classList.add('rotate-180');
        }
      });
    });
  });

  // Video Review Logic
  const videoReviewContainer = document.getElementById('video-review-container');
  const videoReviewIframe = document.getElementById('video-review-iframe');
  const videoReviewPlaceholder = document.getElementById('video-review-placeholder');

  if (videoReviewContainer && videoReviewIframe && videoReviewPlaceholder) {
    videoReviewContainer.addEventListener('click', () => {
      // Use a placeholder video ID
      const videoId = 'dQw4w9WgXcQ'; // Rickroll for now, or any other
      videoReviewIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      videoReviewIframe.classList.remove('hidden');
      videoReviewPlaceholder.classList.add('hidden');
    });
  }

  // Swiper Initialization (if Swiper is loaded)
  if (typeof Swiper !== 'undefined') {
    // Reviews Slider
    const reviewsSwipers = document.querySelectorAll('.reviews-swiper');
    reviewsSwipers.forEach(container => {
      const parent = container.closest('section');
      new Swiper(container, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        loopedSlides: 5, // Add loopedSlides for better stability
        navigation: {
          nextEl: parent.querySelector('.reviews-next'),
          prevEl: parent.querySelector('.reviews-prev'),
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    });

    // Certificates Slider
    const certsSwipers = document.querySelectorAll('.certs-swiper');
    certsSwipers.forEach(container => {
      const parent = container.closest('section');
      new Swiper(container, {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        loopedSlides: 5, // Add loopedSlides for better stability
        centeredSlides: false, // Disable centeredSlides as it can be buggy with loop and few slides
        pagination: {
          el: parent.querySelector('.certs-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: parent.querySelector('.certs-next'),
          prevEl: parent.querySelector('.certs-prev'),
        },
        breakpoints: {
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 } // Reduce to 4 to match the number of slides we have
        }
      });
    });
  }

  // Certificate Lightbox Slider
  const lightbox = document.createElement('div');
  lightbox.id = 'certificate-lightbox';
  lightbox.className = 'fixed inset-0 bg-black/95 z-[100] hidden flex flex-col items-center justify-center p-6';
  lightbox.innerHTML = `
    <div class="swiper lightbox-swiper w-full h-full">
      <div class="swiper-wrapper"></div>
      <div class="swiper-button-next text-white"></div>
      <div class="swiper-button-prev text-white"></div>
    </div>
    <button class="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110] lightbox-close">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;
  document.body.appendChild(lightbox);

  let lightboxSwiper = null;

  const openLightbox = (index) => {
    const certItems = document.querySelectorAll('.cert-item');
    const wrapper = lightbox.querySelector('.swiper-wrapper');
    wrapper.innerHTML = '';

    certItems.forEach(item => {
      const imgSrc = item.getAttribute('data-cert-src') || item.querySelector('img')?.src;
      wrapper.innerHTML += `
        <div class="swiper-slide flex items-center justify-center p-4 md:p-12">
          <img src="${imgSrc}" class="max-w-full max-h-full object-contain shadow-2xl rounded-lg" alt="Certificate Full View">
        </div>
      `;
    });

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (lightboxSwiper) lightboxSwiper.destroy();
    lightboxSwiper = new Swiper('.lightbox-swiper', {
      initialSlide: index,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
      },
    });
  };

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
    if (lightboxSwiper) lightboxSwiper.destroy();
    lightboxSwiper = null;
  };

  lightbox.addEventListener('click', (e) => {
    if (e.target.closest('.lightbox-close') || e.target.classList.contains('swiper-slide')) {
      closeLightbox();
    }
  });

  document.querySelectorAll('.cert-item').forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Service Page Gallery / Slider
  const mainGalleryImage = document.querySelector('main section .aspect-\\[4\\/3\\] img');
  const thumbnails = document.querySelectorAll('main section .grid-cols-4 div');

  if (mainGalleryImage && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.querySelector('img')?.getAttribute('src');
        if (newSrc) {
          // Fade effect
          mainGalleryImage.style.opacity = '0';
          setTimeout(() => {
            mainGalleryImage.setAttribute('src', newSrc);
            mainGalleryImage.style.opacity = '1';
          }, 200);

          // Update active thumbnail border
          thumbnails.forEach(t => t.classList.remove('border-2', 'border-brand-green'));
          thumb.classList.add('border-2', 'border-brand-green');
        }
      });
    });
    
    // Add transition to main image
    mainGalleryImage.style.transition = 'opacity 0.3s ease';
  }
});

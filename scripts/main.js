 // AOS初期化
 AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  // スクロールヘッダー
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const headerHeight = document.querySelector('header').offsetHeight;
      const elementPosition = target.offsetTop;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    });
  });

  // モバイルメニュー
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.className = 'mobile-menu-button';
  mobileMenuButton.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  document.querySelector('.header-container').appendChild(mobileMenuButton);

  mobileMenuButton.addEventListener('click', () => {
    const nav = document.querySelector('header nav');
    nav.classList.toggle('active');
  });

  // リサイズ時のメニュー調整
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.querySelector('header nav').classList.remove('active');
    }
  });
    // スライドショー制御
    const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.slide-indicator');
  let currentSlide = 0;
  
  function changeSlide(index) {
    // 現在のスライドを非アクティブに
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // 新しいスライドをアクティブに
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }
  
  // 自動スライド切り替え
  function autoSlide() {
    let nextSlide = (currentSlide + 1) % slides.length;
    changeSlide(nextSlide);
  }
  
  // インジケーターのクリックイベント
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      changeSlide(index);
      // 自動再生タイマーをリセット
      clearInterval(slideInterval);
      slideInterval = setInterval(autoSlide, 5000);
    });
  });
  
  // 5秒ごとに自動切り替え
  let slideInterval = setInterval(autoSlide, 5000);
  
  // マウスオーバー時に自動切り替えを一時停止
  const heroSection = document.querySelector('.hero');
  heroSection.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  heroSection.addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
  });

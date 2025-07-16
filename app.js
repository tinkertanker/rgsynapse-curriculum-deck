class PresentationController {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.totalSlides = this.slides.length;
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.progressText = document.getElementById('progressText');
    this.dotNav = document.getElementById('dotNav');
    
    this.init();
  }

  init() {
    this.createDotNavigation();
    this.updateProgress();
    this.updateButtons();
    this.bindEvents();
  }

  createDotNavigation() {
    this.dotNav.innerHTML = '';
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      if (i === this.currentSlide) {
        dot.classList.add('active');
      }
      dot.setAttribute('data-slide', i);
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      
      // Create a closure to capture the current index
      const slideIndex = i;
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.goToSlide(slideIndex);
      });
      
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          this.goToSlide(slideIndex);
        }
      });
      
      this.dotNav.appendChild(dot);
    }
  }

  bindEvents() {
    // Button event listeners
    this.prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.prevSlide();
    });
    
    this.nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.nextSlide();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Don't interfere with form inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
          break;
      }
    });

    // Handle swipe gestures on touch devices
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      if (!startX || !startY) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // Only process horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
          if (diffX > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
      }
      
      startX = 0;
      startY = 0;
    });
  }

  goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
    if (slideIndex === this.currentSlide) return; // No need to change if already on this slide
    
    // Remove active class from current slide
    this.slides[this.currentSlide].classList.remove('active');
    
    // Add transition classes for smooth animation
    if (slideIndex > this.currentSlide) {
      this.slides[this.currentSlide].classList.add('prev');
      this.slides[slideIndex].classList.remove('next');
    } else {
      this.slides[this.currentSlide].classList.add('next');
      this.slides[slideIndex].classList.remove('prev');
    }
    
    this.currentSlide = slideIndex;
    
    // Activate new slide
    this.slides[this.currentSlide].classList.add('active');
    
    this.updateProgress();
    this.updateButtons();
    this.updateDotNavigation();
    
    // Clean up transition classes after animation
    setTimeout(() => {
      this.slides.forEach(slide => {
        slide.classList.remove('prev', 'next');
      });
    }, 250);
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToSlide(this.currentSlide + 1);
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  updateProgress() {
    if (this.progressText) {
      this.progressText.textContent = `Slide ${this.currentSlide + 1} of ${this.totalSlides}`;
    }
  }

  updateButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentSlide === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }
  }

  updateDotNavigation() {
    const dots = this.dotNav.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Make sure all elements are available before initialization
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressText = document.getElementById('progressText');
  const dotNav = document.getElementById('dotNav');
  
  if (!slides.length || !prevBtn || !nextBtn || !progressText || !dotNav) {
    console.error('Required elements not found');
    return;
  }
  
  const presentation = new PresentationController();
  
  // Ensure initial state is correct
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev', 'next');
    if (index === 0) {
      slide.classList.add('active');
    }
  });
  
  // Add loading state management
  document.body.classList.add('loaded');
  
  // Add a subtle loading animation
  const style = document.createElement('style');
  style.textContent = `
    body:not(.loaded) .slide {
      opacity: 0;
    }
    
    body.loaded .slide {
      transition: all var(--duration-normal) var(--ease-standard);
    }
    
    body.loaded .slide.active {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
  
  // Store presentation instance globally for debugging
  window.presentation = presentation;
});
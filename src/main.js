import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Link Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE MENUS (3 Custom Styles) ---
  // Style 1: Slide-out drawer from the right (Luxury index.html)
  const toggle1 = document.getElementById('mobile-toggle-1');
  const menu1 = document.getElementById('mobile-menu-1');
  const close1 = document.getElementById('mobile-close-1');
  const backdrop1 = document.getElementById('mobile-menu-backdrop-1');

  if (toggle1 && menu1) {
    const openMenu1 = () => {
      menu1.classList.remove('translate-x-full');
      menu1.classList.add('translate-x-0');
      if (backdrop1) backdrop1.classList.remove('hidden');
    };
    const closeMenu1 = () => {
      menu1.classList.remove('translate-x-0');
      menu1.classList.add('translate-x-full');
      if (backdrop1) backdrop1.classList.add('hidden');
    };
    
    toggle1.addEventListener('click', openMenu1);
    if (close1) close1.addEventListener('click', closeMenu1);
    if (backdrop1) backdrop1.addEventListener('click', closeMenu1);
    menu1.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu1));
  }

  // Style 2: Fullscreen Cinematic Overlay (Bold home2.html)
  const toggle2 = document.getElementById('mobile-toggle-2');
  const menu2 = document.getElementById('mobile-menu-2');
  const close2 = document.getElementById('mobile-close-2');

  if (toggle2 && menu2) {
    const openMenu2 = () => {
      menu2.classList.remove('-translate-y-full');
      menu2.classList.add('translate-y-0');
    };
    const closeMenu2 = () => {
      menu2.classList.remove('translate-y-0');
      menu2.classList.add('-translate-y-full');
    };
    
    toggle2.addEventListener('click', openMenu2);
    if (close2) close2.addEventListener('click', closeMenu2);
    menu2.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu2));
  }

  // Style 3: Floating Organic Dialog Card (Coastal Minimalist home3.html)
  const toggle3 = document.getElementById('mobile-toggle-3');
  const menu3 = document.getElementById('mobile-menu-3');
  const close3 = document.getElementById('mobile-close-3');
  const backdrop3 = document.getElementById('mobile-menu-backdrop-3');

  if (toggle3 && menu3) {
    const openMenu3 = () => {
      menu3.classList.remove('pointer-events-none', 'opacity-0', 'scale-90');
      menu3.classList.add('pointer-events-auto', 'opacity-100', 'scale-100');
      if (backdrop3) backdrop3.classList.remove('hidden');
    };
    const closeMenu3 = () => {
      menu3.classList.remove('pointer-events-auto', 'opacity-100', 'scale-100');
      menu3.classList.add('pointer-events-none', 'opacity-0', 'scale-90');
      if (backdrop3) backdrop3.classList.add('hidden');
    };

    toggle3.addEventListener('click', openMenu3);
    if (close3) close3.addEventListener('click', closeMenu3);
    if (backdrop3) backdrop3.addEventListener('click', closeMenu3);
    menu3.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu3));
  }

  // --- GENERAL ANIMATIONS ---
  const revealElements = document.querySelectorAll('.reveal-up');
  revealElements.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // --- HOMEPAGE 1: MODERN LUXURY ---
  // Hero Background Slideshow
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    const slideDuration = 6000;

    setInterval(() => {
      let nextSlide = (currentSlide + 1) % heroSlides.length;
      
      // Cinematic transition
      gsap.to(heroSlides[currentSlide], { opacity: 0, scale: 1.01, duration: 1.5, ease: 'power2.inOut' });
      gsap.to(heroSlides[nextSlide], { opacity: 0.6, scale: 1.05, duration: 1.5, ease: 'power2.inOut' });

      currentSlide = nextSlide;
    }, slideDuration);
  }

  // Vertical Image Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabImages = document.querySelectorAll('.tab-image');
  
  if (tabButtons.length > 0 && tabImages.length > 0) {
    let activeIndex = 0;
    let autoPlayTimer = null;

    const switchTab = (index) => {
      activeIndex = index;
      const targetBtn = tabButtons[index];
      const targetTab = targetBtn.getAttribute('data-tab');

      // Update active buttons
      tabButtons.forEach(b => b.classList.remove('active', 'border-luxury-gold', 'text-white', 'bg-luxury-gold/5'));
      tabButtons.forEach(b => b.classList.add('border-transparent', 'text-gray-400'));
      targetBtn.classList.add('active', 'border-luxury-gold', 'text-white', 'bg-luxury-gold/5');
      targetBtn.classList.remove('border-transparent', 'text-gray-400');

      // Transition images
      tabImages.forEach((img) => {
        if (img.getAttribute('id') === targetTab) {
          gsap.to(img, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', display: 'block' });
        } else {
          gsap.to(img, { opacity: 0, scale: 0.98, duration: 0.5, ease: 'power2.out', display: 'none' });
        }
      });
    };

    const startAutoPlay = () => {
      autoPlayTimer = setInterval(() => {
        let nextIndex = (activeIndex + 1) % tabButtons.length;
        switchTab(nextIndex);
      }, 5000);
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    };

    tabButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        switchTab(index);
        resetAutoPlay();
      });
    });

    // Start autoplay
    startAutoPlay();
  }

  // --- HOMEPAGE 2: BOLD CONTEMPORARY ---
  // Hero Heading Swipe Reveal
  const revealTexts = document.querySelectorAll('.hero-title .reveal-text');
  const paintSweeps = document.querySelectorAll('.hero-title .paint-sweep');
  
  if (revealTexts.length > 0 && paintSweeps.length > 0) {
    const tl = gsap.timeline({ delay: 0.3 });

    paintSweeps.forEach((sweep, index) => {
      const text = revealTexts[index];
      
      // Sweep covers line, resolves text to opacity 1, then sweeps off to reveal text
      tl.to(sweep, { width: '100%', duration: 0.55, ease: 'power2.inOut' }, index * 0.25)
        .set(text, { opacity: 1 })
        .to(sweep, { left: '100%', width: '0%', duration: 0.45, ease: 'power2.inOut' });
    });
  }

  // (Swipe reveals are initialized below the horizontal scroll section to preserve ScrollTrigger calculation order)

  // Spotlight Cursor Mask Reveal
  const spotlightContainer = document.querySelector('.spotlight-container');
  const spotlightBefore = document.querySelector('.spotlight-before');
  const spotlightLens = document.querySelector('.spotlight-lens');

  if (spotlightContainer && spotlightBefore && spotlightLens) {
    let rect = spotlightContainer.getBoundingClientRect();
    let isHovering = false;
    let autoAnim = null;

    const getSpotlightRadius = () => {
      return window.innerWidth < 768 ? 80 : 160;
    };

    const handleMove = (clientX, clientY) => {
      rect = spotlightContainer.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const r = getSpotlightRadius();
      // Update clip-path and lens center relative coordinates
      spotlightBefore.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;
      spotlightLens.style.left = `${x}px`;
      spotlightLens.style.top = `${y}px`;
      spotlightLens.style.width = `${r * 2}px`;
      spotlightLens.style.height = `${r * 2}px`;
    };

    // Auto-wandering coordinates relative to bounds
    const wanderTarget = { x: rect.width / 2 || 200, y: rect.height / 2 || 150 };

    const updateWander = () => {
      if (isHovering) return;
      const r = getSpotlightRadius();
      spotlightBefore.style.clipPath = `circle(${r}px at ${wanderTarget.x}px ${wanderTarget.y}px)`;
      spotlightLens.style.left = `${wanderTarget.x}px`;
      spotlightLens.style.top = `${wanderTarget.y}px`;
      spotlightLens.style.width = `${r * 2}px`;
      spotlightLens.style.height = `${r * 2}px`;
    };

    const startAutoWander = () => {
      rect = spotlightContainer.getBoundingClientRect();
      const r = getSpotlightRadius();
      gsap.killTweensOf(wanderTarget);
      
      // Reveal spotlight lens
      gsap.to(spotlightLens, { opacity: 1, duration: 0.5 });

      // Constrain wandering coordinates to keep circle inside bounds on mobile
      const minX = r;
      const maxX = Math.max(r, rect.width - r);
      const minY = r;
      const maxY = Math.max(r, rect.height - r);

      autoAnim = gsap.timeline({ repeat: -1 })
        .to(wanderTarget, {
          x: minX + (maxX - minX) * 0.1,
          y: minY + (maxY - minY) * 0.2,
          duration: 3.5,
          ease: 'sine.inOut',
          onUpdate: updateWander
        })
        .to(wanderTarget, {
          x: minX + (maxX - minX) * 0.85,
          y: minY + (maxY - minY) * 0.35,
          duration: 4,
          ease: 'sine.inOut',
          onUpdate: updateWander
        })
        .to(wanderTarget, {
          x: minX + (maxX - minX) * 0.15,
          y: minY + (maxY - minY) * 0.8,
          duration: 3.5,
          ease: 'sine.inOut',
          onUpdate: updateWander
        })
        .to(wanderTarget, {
          x: minX + (maxX - minX) * 0.8,
          y: minY + (maxY - minY) * 0.65,
          duration: 4,
          ease: 'sine.inOut',
          onUpdate: updateWander
        })
        .to(wanderTarget, {
          x: rect.width / 2,
          y: rect.height / 2,
          duration: 3,
          ease: 'sine.inOut',
          onUpdate: updateWander
        });
    };

    spotlightContainer.addEventListener('mousemove', (e) => {
      isHovering = true;
      if (autoAnim) {
        autoAnim.kill();
        autoAnim = null;
      }
      handleMove(e.clientX, e.clientY);
    });

    spotlightContainer.addEventListener('touchmove', (e) => {
      isHovering = true;
      if (autoAnim) {
        autoAnim.kill();
        autoAnim = null;
      }
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    spotlightContainer.addEventListener('mouseleave', () => {
      isHovering = false;
      startAutoWander();
    });

    spotlightContainer.addEventListener('mouseenter', () => {
      isHovering = true;
      if (autoAnim) {
        autoAnim.kill();
        autoAnim = null;
      }
      gsap.to(spotlightLens, { opacity: 1, duration: 0.3 });
    });

    // Start auto wander on page load
    setTimeout(() => {
      startAutoWander();
    }, 600);
  }

  // Pinned Horizontal Scroll Showcase (Desktop Only: min-width: 768px)
  const horizontalSection = document.querySelector('.horizontal-scroll-container');
  const horizontalTrack = document.querySelector('.horizontal-scroll-track');
  
  if (horizontalSection && horizontalTrack) {
    let scrollTriggerInstance = null;

    const setupScrollTrigger = () => {
      if (window.innerWidth >= 768) {
        // Desktop horizontal scroll
        scrollTriggerInstance = gsap.to(horizontalTrack, {
          x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSection,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${horizontalTrack.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          }
        });
      } else {
        // Clear desktop pin if resized to mobile
        if (scrollTriggerInstance) {
          scrollTriggerInstance.scrollTrigger.kill(true);
          scrollTriggerInstance = null;
        }
        gsap.set(horizontalTrack, { x: 0 });
      }
    };

    setupScrollTrigger();
    window.addEventListener('resize', setupScrollTrigger);
  }

  // Scroll-triggered block reveals for headings (Initialized after horizontal scroll trigger to preserve proper layout calculation)
  const headingsToReveal = document.querySelectorAll('.swipe-reveal-heading');
  headingsToReveal.forEach(heading => {
    const originalText = heading.innerHTML;
    heading.innerHTML = '';
    heading.classList.add('relative', 'inline-block', 'overflow-hidden', 'py-1');
    
    const textSpan = document.createElement('span');
    textSpan.className = 'reveal-text opacity-0 inline-block';
    textSpan.innerHTML = originalText;
    
    // Custom sweep bar color based on container context
    const sweepColor = heading.closest('.bg-boldtheme-amber') ? '#0A192F' : '#F59E0B';
    const sweepBar = document.createElement('span');
    sweepBar.className = `paint-sweep absolute left-0 top-0 h-full w-0 rounded-sm z-10`;
    sweepBar.style.backgroundColor = sweepColor;
    
    heading.appendChild(textSpan);
    heading.appendChild(sweepBar);
    
    gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })
    .to(sweepBar, { width: '100%', duration: 0.55, ease: 'power2.inOut' })
    .set(textSpan, { opacity: 1 })
    .to(sweepBar, { left: '100%', width: '0%', duration: 0.45, ease: 'power2.inOut' });
  });

  // Scroll-triggered block reveals for images (Initialized after horizontal scroll trigger to preserve proper layout calculation)
  const imagesToReveal = document.querySelectorAll('.swipe-reveal-image');
  imagesToReveal.forEach(img => {
    const parent = img.parentElement;
    parent.classList.add('relative', 'overflow-hidden');
    img.classList.add('opacity-0');
    
    const sweepBar = document.createElement('span');
    sweepBar.className = 'paint-sweep absolute left-0 top-0 w-full h-full bg-boldtheme-amber rounded-xl z-10 origin-left';
    parent.appendChild(sweepBar);
    
    gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
    .fromTo(sweepBar, { width: '0%', left: '0%' }, { width: '100%', duration: 0.65, ease: 'power2.inOut' })
    .set(img, { opacity: 1 })
    .fromTo(sweepBar, { left: '0%', width: '100%' }, { left: '100%', width: '0%', duration: 0.55, ease: 'power2.inOut' })
    .set(sweepBar, { display: 'none' });
  });

  // Force ScrollTrigger to refresh start/end locations to account for horizontal pinning
  ScrollTrigger.refresh();

  // Circular Work Process Dial Logic (Homepage 2)
  const processNodes = document.querySelectorAll('.process-node');
  const processDescs = document.querySelectorAll('.process-desc-block');
  const processImages = document.querySelectorAll('.process-step-img');
  const centerStepNum = document.getElementById('center-step-num');

  if (processNodes.length > 0 && processDescs.length > 0) {
    let activeStep = 0;
    let processTimer = null;

    const switchStep = (stepIndex) => {
      activeStep = stepIndex;
      
      // Update center text (e.g. 01, 02) if it exists
      if (centerStepNum) {
        centerStepNum.textContent = `0${stepIndex + 1}`;
      }

      // Update active nodes styling
      processNodes.forEach((node, idx) => {
        if (idx === stepIndex) {
          node.classList.add('active', 'border-boldtheme-amber', 'text-white', 'shadow-[0_0_15px_rgba(245,158,11,0.5)]');
          node.classList.remove('border-gray-700', 'text-gray-400');
        } else {
          node.classList.remove('active', 'border-boldtheme-amber', 'text-white', 'shadow-[0_0_15px_rgba(245,158,11,0.5)]');
          node.classList.add('border-gray-700', 'text-gray-400');
        }
      });

      // Crossfade center images
      if (processImages.length > 0) {
        processImages.forEach((img, idx) => {
          if (idx === stepIndex) {
            img.classList.remove('opacity-0', 'z-0');
            img.classList.add('opacity-100', 'z-10');
          } else {
            img.classList.add('opacity-0', 'z-0');
            img.classList.remove('opacity-100', 'z-10');
          }
        });
      }

      // Crossfade text descriptions
      processDescs.forEach((desc, idx) => {
        if (idx === stepIndex) {
          desc.classList.remove('hidden');
          gsap.fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        } else {
          desc.classList.add('hidden');
          gsap.set(desc, { opacity: 0 });
        }
      });
    };

    const startAutoProcess = () => {
      processTimer = setInterval(() => {
        let nextStep = (activeStep + 1) % processNodes.length;
        switchStep(nextStep);
      }, 4000);
    };

    const resetAutoProcess = () => {
      clearInterval(processTimer);
      startAutoProcess();
    };

    processNodes.forEach((node, idx) => {
      node.addEventListener('click', () => {
        switchStep(idx);
        resetAutoProcess();
      });
    });

    // Start auto advance
    startAutoProcess();
  }

  // --- HOMEPAGE 3: MINIMALIST CLEAN ---
  // Rotating service tabs (Clean, 100% bug-free split tabs)
  const serviceTabs = document.querySelectorAll('.service-tab-btn');
  const serviceTabImages = document.querySelectorAll('.service-tab-img');
  const serviceTabDescs = document.querySelectorAll('.service-tab-desc');

  if (serviceTabs.length > 0 && serviceTabImages.length > 0 && serviceTabDescs.length > 0) {
    let activeTabIdx = 0;
    let tabTimer = null;

    const switchServiceTab = (targetIdx) => {
      activeTabIdx = targetIdx;

      // Update button classes
      serviceTabs.forEach((btn, idx) => {
        if (idx === targetIdx) {
          btn.classList.add('border-minimal-sage', 'bg-minimal-sage/5');
          btn.classList.remove('border-minimal-sand', 'bg-white');
          const h4 = btn.querySelector('h4');
          if (h4) {
            h4.classList.add('text-minimal-sage');
            h4.classList.remove('text-minimal-charcoal');
          }
        } else {
          btn.classList.remove('border-minimal-sage', 'bg-minimal-sage/5');
          btn.classList.add('border-minimal-sand', 'bg-white');
          const h4 = btn.querySelector('h4');
          if (h4) {
            h4.classList.remove('text-minimal-sage');
            h4.classList.add('text-minimal-charcoal');
          }
        }
      });

      // Crossfade and zoom images
      serviceTabImages.forEach((img, idx) => {
        if (idx === targetIdx) {
          img.classList.remove('opacity-0', 'scale-95', 'z-0');
          img.classList.add('opacity-100', 'scale-100', 'z-10');
        } else {
          img.classList.add('opacity-0', 'scale-95', 'z-0');
          img.classList.remove('opacity-100', 'scale-100', 'z-10');
        }
      });

      // Crossfade descriptions
      serviceTabDescs.forEach((desc, idx) => {
        if (idx === targetIdx) {
          desc.classList.remove('hidden');
          gsap.fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        } else {
          desc.classList.add('hidden');
          gsap.set(desc, { opacity: 0 });
        }
      });
    };

    const startTabAutoplay = () => {
      tabTimer = setInterval(() => {
        let nextIdx = (activeTabIdx + 1) % serviceTabs.length;
        switchServiceTab(nextIdx);
      }, 5000);
    };

    const resetTabAutoplay = () => {
      clearInterval(tabTimer);
      startTabAutoplay();
    };

    serviceTabs.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        switchServiceTab(idx);
        resetTabAutoplay();
      });
    });

    // Start auto cycle
    startTabAutoplay();
  }

  // --- HOMEPAGE 3: PHILOSOPHY IMAGE SLIDER ---
  const philosophySlides = document.querySelectorAll('.philosophy-slide');
  const philosophyDots = document.querySelectorAll('.philosophy-dot');
  const prevBtn = document.getElementById('prev-philosophy-slide');
  const nextBtn = document.getElementById('next-philosophy-slide');

  if (philosophySlides.length > 0 && philosophyDots.length > 0) {
    let currentSlideIdx = 0;
    let slideTimer = null;

    const showSlide = (idx) => {
      currentSlideIdx = idx;

      // Toggle slide visibility classes
      philosophySlides.forEach((slide, sIdx) => {
        if (sIdx === idx) {
          slide.classList.remove('opacity-0', 'z-0');
          slide.classList.add('opacity-100', 'z-10');
        } else {
          slide.classList.add('opacity-0', 'z-0');
          slide.classList.remove('opacity-100', 'z-10');
        }
      });

      // Toggle dot active states
      philosophyDots.forEach((dot, dIdx) => {
        if (dIdx === idx) {
          dot.classList.add('bg-white', 'w-4');
          dot.classList.remove('bg-white/50', 'w-2');
        } else {
          dot.classList.remove('bg-white', 'w-4');
          dot.classList.add('bg-white/50', 'w-2');
        }
      });
    };

    const nextSlide = () => {
      let targetIdx = (currentSlideIdx + 1) % philosophySlides.length;
      showSlide(targetIdx);
    };

    const prevSlide = () => {
      let targetIdx = (currentSlideIdx - 1 + philosophySlides.length) % philosophySlides.length;
      showSlide(targetIdx);
    };

    const startAutoPlay = () => {
      slideTimer = setInterval(nextSlide, 4500);
    };

    const resetAutoPlay = () => {
      clearInterval(slideTimer);
      startAutoPlay();
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    philosophyDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        resetAutoPlay();
      });
    });

    // Initial configuration
    philosophyDots[0].classList.add('w-4');
    philosophyDots[0].classList.remove('w-2');
    startAutoPlay();
  }

  // Before After Drag Comparison Slider (GSAP Autopilot Sweeper)
  const slider = document.querySelector('.before-after-container');
  const afterContainer = document.querySelector('.after-container');
  const handle = document.querySelector('.slider-handle');

  if (slider && afterContainer && handle) {
    // Disable all mouse/touch interactions
    slider.style.pointerEvents = 'none';
    slider.style.cursor = 'default';
    if (handle) handle.style.cursor = 'default';

    // Autopilot sweep using GSAP yoyo
    const playhead = { value: 50 };
    gsap.to(playhead, {
      value: 95, // Sweeps close to the margins
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        handle.style.left = `${playhead.value}%`;
        afterContainer.style.width = `${100 - playhead.value}%`;
      }
    });
  }

  // --- HOMEPAGE 3: PORTFOLIO LIGHTBOX ---
  const marqueeImages = document.querySelectorAll('.animate-marquee img');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightboxBtn = document.getElementById('close-lightbox');

  if (marqueeImages.length > 0 && lightbox && lightboxImg) {
    marqueeImages.forEach(img => {
      // Configure cursor controls and pointer events
      img.style.cursor = 'zoom-in';
      img.style.pointerEvents = 'auto';
      
      img.addEventListener('click', (e) => {
        const src = e.target.getAttribute('src');
        lightboxImg.setAttribute('src', src);
        lightbox.classList.remove('hidden');
        
        // Halt document background scroll
        document.body.style.overflow = 'hidden';
        
        // Pop in the modal image
        gsap.fromTo(lightboxImg, 
          { scale: 0.9, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }
        );
      });
    });

    const closeLightbox = () => {
      gsap.to(lightboxImg, {
        scale: 0.95,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          lightbox.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    };

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking the backdrop
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === closeLightboxBtn) {
        closeLightbox();
      }
    });

    // Close on Escape keyboard click
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
      }
    });
  }

  // --- HOMEPAGE 3: TESTIMONIALS SLIDER ---
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');

  if (testimonialSlides.length > 0 && testimonialDots.length > 0) {
    let activeSlideIdx = 0;
    let testimonialTimer = null;

    const showTestimonial = (targetIdx) => {
      activeSlideIdx = targetIdx;

      // Update slide visibility
      const isHome4 = !!document.getElementById('mobile-toggle-4');
      const track4 = document.getElementById('testimonial-track');

      if (isHome4 && track4) {
        track4.style.transform = `translateX(-${targetIdx * 100}%)`;
      } else {
        testimonialSlides.forEach((slide, idx) => {
          if (idx === targetIdx) {
            slide.classList.remove('hidden');
            gsap.fromTo(slide, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
          } else {
            slide.classList.add('hidden');
            gsap.set(slide, { opacity: 0 });
          }
        });
      }

      // Determine active theme color variables dynamically
      const activeColor = isHome4 ? 'bg-japandi-clay' : 'bg-minimal-sage';
      const inactiveColor = isHome4 ? 'bg-japandi-sand' : 'bg-minimal-sand';

      // Update active dot visual classes
      testimonialDots.forEach((dot, idx) => {
        if (idx === targetIdx) {
          dot.classList.add(activeColor, 'w-4');
          dot.classList.remove(inactiveColor, 'w-2');
        } else {
          dot.classList.remove(activeColor, 'w-4');
          dot.classList.add(inactiveColor, 'w-2');
        }
      });
    };

    const nextTestimonial = () => {
      let nextIdx = (activeSlideIdx + 1) % testimonialSlides.length;
      showTestimonial(nextIdx);
    };

    const startTestimonialAutoplay = () => {
      testimonialTimer = setInterval(nextTestimonial, 5000);
    };

    const resetTestimonialAutoplay = () => {
      clearInterval(testimonialTimer);
      startTestimonialAutoplay();
    };

    testimonialDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showTestimonial(idx);
        resetTestimonialAutoplay();
      });
    });

    // Initial dot configurations
    const isHome4 = !!document.getElementById('mobile-toggle-4');
    const activeColor = isHome4 ? 'bg-japandi-clay' : 'bg-minimal-sage';
    const inactiveColor = isHome4 ? 'bg-japandi-sand' : 'bg-minimal-sand';

    testimonialDots[0].classList.add(activeColor, 'w-4');
    testimonialDots[0].classList.remove(inactiveColor, 'w-2');
    startTestimonialAutoplay();
  }

  // --- HOMEPAGE 3: MOBILE ACTIVE PROCESS CARD OBSERVER ---
  const processCards = document.querySelectorAll('#process .grid > div');
  if (processCards.length > 0 && window.innerWidth < 768) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Triggers when the card enters the central viewport band
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('process-card-active');
        } else {
          entry.target.classList.remove('process-card-active');
        }
      });
    }, observerOptions);

    processCards.forEach(card => observer.observe(card));
  }

  // --- HOMEPAGE 4: FULLSCREEN OVERLAY MENU (STUNNING ANIMATIONS) ---
  const toggle4 = document.getElementById('mobile-toggle-4');
  const menu4 = document.getElementById('fullscreen-menu-4');
  const close4 = document.getElementById('fullscreen-close-4');
  const menuLinks4 = document.querySelectorAll('.fs-menu-link');

  if (toggle4 && menu4 && close4) {
    const openMenu4 = () => {
      menu4.classList.remove('translate-x-full');
      // Stagger animate links using GSAP
      gsap.fromTo(menuLinks4, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.25, overwrite: 'auto' }
      );
    };

    const closeMenu4 = () => {
      menu4.classList.add('translate-x-full');
    };

    toggle4.addEventListener('click', openMenu4);
    close4.addEventListener('click', closeMenu4);
    menuLinks4.forEach(link => {
      link.addEventListener('click', closeMenu4);
    });
  }

  // --- HOMEPAGE 5: MOBILE LEFT DRAWER ---
  const toggle5 = document.getElementById('mobile-toggle-5');
  const menu5 = document.getElementById('mobile-menu-5');
  const close5 = document.getElementById('mobile-close-5');
  const backdrop5 = document.getElementById('mobile-menu-backdrop-5');

  if (toggle5 && menu5) {
    const openMenu5 = () => {
      menu5.classList.remove('-translate-x-full');
      menu5.classList.add('translate-x-0');
      if (backdrop5) backdrop5.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    };
    const closeMenu5 = () => {
      menu5.classList.remove('translate-x-0');
      menu5.classList.add('-translate-x-full');
      if (backdrop5) backdrop5.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    };

    toggle5.addEventListener('click', openMenu5);
    if (close5) close5.addEventListener('click', closeMenu5);
    if (backdrop5) backdrop5.addEventListener('click', closeMenu5);
    menu5.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu5));
  }

  // --- HOMEPAGE 4: FILTERABLE PORTFOLIO SHOWCASE ---
  const filterButtons = document.querySelectorAll('#portfolio-filters button');
  const showcaseItems = document.querySelectorAll('.showcase-item');

  if (filterButtons.length > 0 && showcaseItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterVal = button.getAttribute('data-filter');

        // Toggle active button visuals
        filterButtons.forEach(btn => {
          btn.className = 'px-4 py-2 rounded-full text-xs font-bold border border-japandi-stone text-gray-600 hover:text-japandi-clay transition-all';
        });
        button.className = 'px-4 py-2 rounded-full text-xs font-bold border border-japandi-charcoal bg-japandi-charcoal text-japandi-cream transition-all';

        // Filter cards
        showcaseItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (filterVal === 'all' || itemCat === filterVal) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // --- HOMEPAGE 5: LIVE PRICE CALCULATOR ---
  const calcButtons = document.querySelectorAll('[data-calc-service]');
  const sqftSlider = document.getElementById('sqft-slider');
  const sqftVal = document.getElementById('sqft-val');
  const calcMin = document.getElementById('calc-min');
  const calcMax = document.getElementById('calc-max');

  if (sqftSlider && calcMin && calcMax) {
    let activeService = 'flooring';

    const updateCalculator = () => {
      const sqft = parseInt(sqftSlider.value, 10);
      if (sqftVal) sqftVal.textContent = sqft.toLocaleString();

      let rateMin = 8;
      let rateMax = 15;

      if (activeService === 'kitchen') {
        rateMin = 80;
        rateMax = 150;
      } else if (activeService === 'bath') {
        rateMin = 120;
        rateMax = 200;
      }

      const totalMin = sqft * rateMin;
      const totalMax = sqft * rateMax;

      calcMin.textContent = totalMin.toLocaleString();
      calcMax.textContent = totalMax.toLocaleString();
    };

    // Service Selection
    calcButtons.forEach(button => {
      button.addEventListener('click', () => {
        activeService = button.getAttribute('data-calc-service');
        
        calcButtons.forEach(btn => {
          btn.className = 'py-2.5 px-2 border border-industrial-steel/50 bg-transparent text-gray-400 text-center rounded font-bold hover:border-industrial-orange transition-all text-xxs uppercase';
        });
        button.className = 'py-2.5 px-2 border border-industrial-orange bg-industrial-orange/10 text-white text-center rounded font-bold transition-all text-xxs uppercase';

        updateCalculator();
      });
    });

    // Slider Input
    sqftSlider.addEventListener('input', updateCalculator);

    // Run once on load
    updateCalculator();
  }

  // --- HOMEPAGE 4: HERO TEXT STAGGER REVEAL ---
  const home4Texts = document.querySelectorAll('.home4-reveal-text');
  if (home4Texts.length > 0) {
    gsap.to(home4Texts, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2
    });
  }

  // --- HOMEPAGE 4: PORTFOLIO CAROUSEL SLIDER WITH CONTROLS & DOTS ---
  const portfolioTrack = document.getElementById('portfolio-track');
  const portPrev = document.getElementById('portfolio-prev');
  const portNext = document.getElementById('portfolio-next');
  const portDots = document.querySelectorAll('.portfolio-dot');

  if (portfolioTrack) {
    let slideIdx = 0;
    const cards = portfolioTrack.children;
    const totalCards = cards.length;

    const getVisibleCount = () => {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 640) return 2;
      return 1;
    };

    const updateSlider = () => {
      const visible = getVisibleCount();
      const maxIndex = totalCards - visible;
      
      // Clamp index bounds
      if (slideIdx < 0) slideIdx = maxIndex;
      if (slideIdx > maxIndex) slideIdx = 0;

      const cardWidth = cards[0].offsetWidth;
      const gap = 24; 
      const offsetValue = slideIdx * (cardWidth + gap);
      portfolioTrack.style.transform = `translateX(-${offsetValue}px)`;

      // Update dots active classes
      if (portDots.length > 0) {
        portDots.forEach((dot, idx) => {
          if (idx === slideIdx) {
            dot.classList.add('bg-japandi-clay', 'w-4');
            dot.classList.remove('bg-japandi-sand', 'w-2');
          } else {
            dot.classList.remove('bg-japandi-clay', 'w-4');
            dot.classList.add('bg-japandi-sand', 'w-2');
          }
        });
      }
    };

    const nextSlide = () => {
      slideIdx++;
      updateSlider();
    };

    const prevSlide = () => {
      slideIdx--;
      updateSlider();
    };

    let autoplayTimer = setInterval(nextSlide, 4000);

    const resetTimer = () => {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(nextSlide, 4000);
    };

    if (portNext) portNext.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (portPrev) portPrev.addEventListener('click', () => { prevSlide(); resetTimer(); });

    if (portDots.length > 0) {
      portDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          slideIdx = idx;
          updateSlider();
          resetTimer();
        });
      });
      // Initial dot config
      portDots[0].classList.add('w-4');
      portDots[0].classList.remove('w-2');
    }

    window.addEventListener('resize', () => {
      clearInterval(autoplayTimer);
      slideIdx = 0;
      updateSlider();
      autoplayTimer = setInterval(nextSlide, 4000);
    });
  }

  // --- HOMEPAGE 5: LUXURY DARK CONCEPT INTERACTIVE CONTROLS ---
  const isHome5 = !!document.getElementById('mobile-toggle-5');

  // FAQ Accordion
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');
      const parent = toggle.parentElement;
      
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
        parent.classList.remove('border-[#C5A880]');
        parent.classList.add('border-[#C5A880]/20');
      } else {
        document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = '0px');
        document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');
        document.querySelectorAll('.faq-toggle').forEach(t => {
          t.parentElement.classList.remove('border-[#C5A880]');
          t.parentElement.classList.add('border-[#C5A880]/20');
        });

        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(45deg)';
        parent.classList.add('border-[#C5A880]');
        parent.classList.remove('border-[#C5A880]/20');
      }
    });
  });

  // ── Home5 Scroll Animations ────────────────────────────────────────────────

  if (isHome5) {
    // Mobile = anything below 1280px (covers phones AND tablets where ±180px translations fly off screen)
    const isMobile = window.innerWidth < 1280;

    // 1. Hero dims as About enters (desktop only — no pin needed)
    if (!isMobile) {
      gsap.to('.stack-section:first-of-type', {
        scale: 0.92, opacity: 0.3, yPercent: -6, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top top', scrub: true }
      });
    }

    // 2. (Zoom-in entry removed — conflicts with pin animation)

    // 3. About Us — card swap
    const card1 = document.getElementById('about-card-1');
    const card2 = document.getElementById('about-card-2');
    if (card1 && card2) {
      if (!isMobile) {
        // Desktop: pinned scrubbed card swap (original style)
        const swapTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#about', start: 'center center', end: '+=450',
            pin: true, pinSpacing: true, scrub: 0.15,
          }
        });
        swapTl
          .to(card1, { x: -180, y: 70, scale: 0.78, opacity: 0.2, duration: 0.4, ease: 'power2.in' }, 0)
          .to(card2, { x: 180, y: -70, scale: 0.78, opacity: 0.2, duration: 0.4, ease: 'power2.in' }, 0)
          .set(card1, { zIndex: 30 })
          .set(card2, { zIndex: 10 })
          .to(card1, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
          .to(card2, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, '<');
      } else {
        // Mobile: scrubbed swap without pinning.
        // Card 1 & Card 2 slide outward slightly, swap z-index, and return to x: 0, y: 0.
        const mobileSwapTl = gsap.timeline({
          scrollTrigger: {
            trigger: card1.parentElement,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.2,
          }
        });

        mobileSwapTl
          .to(card1, { x: 30, y: -20, duration: 0.5, ease: 'power1.inOut' }, 0)
          .to(card2, { x: -30, y: 20, duration: 0.5, ease: 'power1.inOut' }, 0)
          .set(card1, { zIndex: 30 }, 0.5)
          .set(card2, { zIndex: 10 }, 0.5)
          .to(card1, { x: 0, y: 0, duration: 0.5, ease: 'power1.inOut' }, 0.5)
          .to(card2, { x: 0, y: 0, duration: 0.5, ease: 'power1.inOut' }, 0.5);
      }
    }

    // 4. (Why Choose Us zoom-in entry removed — conflicts with pin animation)

    // 5. Why Choose Us — card swap
    const whyCard1 = document.getElementById('why-card-1');
    const whyCard2 = document.getElementById('why-card-2');
    if (whyCard1 && whyCard2) {
      if (!isMobile) {
        // Desktop: original pinned x/y swap
        const whySwapTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#why-choose-us', start: 'center center', end: '+=450',
            pin: true, pinSpacing: true, scrub: 0.15,
          }
        });
        whySwapTl
          .to(whyCard1, { x: 180, y: -70, scale: 0.78, opacity: 0.2, duration: 0.4, ease: 'power2.in' }, 0)
          .to(whyCard2, { x: -180, y: 70, scale: 0.78, opacity: 0.2, duration: 0.4, ease: 'power2.in' }, 0)
          .set(whyCard1, { zIndex: 30 })
          .set(whyCard2, { zIndex: 10 })
          .to(whyCard1, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
          .to(whyCard2, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, '<');
      } else {
        // Mobile: scrubbed depth swap returning to 0,0
        const mobileWhySwapTl = gsap.timeline({
          scrollTrigger: {
            trigger: whyCard1.parentElement,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.2,
          }
        });

        mobileWhySwapTl
          .to(whyCard1, { x: 30, y: 20, duration: 0.5, ease: 'power1.inOut' }, 0)
          .to(whyCard2, { x: -30, y: -20, duration: 0.5, ease: 'power1.inOut' }, 0)
          .set(whyCard1, { zIndex: 30 }, 0.5)
          .set(whyCard2, { zIndex: 10 }, 0.5)
          .to(whyCard1, { x: 0, y: 0, duration: 0.5, ease: 'power1.inOut' }, 0.5)
          .to(whyCard2, { x: 0, y: 0, duration: 0.5, ease: 'power1.inOut' }, 0.5);
      }
    }

    // 6. Process Section — smooth scrubbed deck rotation
    const procCards = [
      document.getElementById('proc-card-1'),
      document.getElementById('proc-card-2'),
      document.getElementById('proc-card-3'),
      document.getElementById('proc-card-4'),
    ];
    const procLabel = document.getElementById('process-step-label');
    const procWrapper = document.getElementById('process-cards-wrapper');

    if (procWrapper && procCards.every(Boolean)) {
      if (!isMobile) {
        // Deck positions: front → back (offset increases for depth illusion)
        const dp = [
          { x: 0,  y: 0,  scale: 1,    zIndex: 40, opacity: 1    },
          { x: 10, y: 10, scale: 0.96, zIndex: 30, opacity: 0.72 },
          { x: 20, y: 20, scale: 0.92, zIndex: 20, opacity: 0.50 },
          { x: 30, y: 30, scale: 0.88, zIndex: 10, opacity: 0.32 },
        ];

        // Set initial stacked positions
        procCards.forEach((card, i) => gsap.set(card, dp[i]));

        // Step labels
        const stepLabels = ['Step 01 of 04', 'Step 02 of 04', 'Step 03 of 04', 'Step 04 of 04'];

        // Smooth scrubbed timeline — each card eases in and out between positions
        // scrub:2 = 2-second lag for buttery smooth feel
        const procTl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '#process',
            start: 'center center',
            end: '+=1200',
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            onUpdate: (self) => {
              if (procLabel) {
                const step = Math.min(Math.floor(self.progress * 3), 2);
                procLabel.textContent = stepLabels[step + 1];
              }
            }
          }
        });

        // Rotation per segment (each segment = 1 unit of timeline duration):
        //  Step 0→1: C0 goes to back (dp3), C1 comes front (dp0), C2→dp1, C3→dp2
        //  Step 1→2: C1 goes to back (dp3), C2 comes front (dp0), C3→dp1, C0→dp2
        //  Step 2→3: C2 goes to back (dp3), C3 comes front (dp0), C0→dp1, C1→dp2
        procTl
          // Segment 0 → 1
          .to(procCards[0], { ...dp[3], duration: 1 }, 0)
          .to(procCards[1], { ...dp[0], duration: 1 }, 0)
          .to(procCards[2], { ...dp[1], duration: 1 }, 0)
          .to(procCards[3], { ...dp[2], duration: 1 }, 0)
          // Segment 1 → 2
          .to(procCards[0], { ...dp[2], duration: 1 }, 1)
          .to(procCards[1], { ...dp[3], duration: 1 }, 1)
          .to(procCards[2], { ...dp[0], duration: 1 }, 1)
          .to(procCards[3], { ...dp[1], duration: 1 }, 1)
          // Segment 2 → 3
          .to(procCards[0], { ...dp[1], duration: 1 }, 2)
          .to(procCards[1], { ...dp[2], duration: 1 }, 2)
          .to(procCards[2], { ...dp[3], duration: 1 }, 2)
          .to(procCards[3], { ...dp[0], duration: 1 }, 2);

      } else {
        // Mobile: show all 4 cards as a vertical stack — animate in one by one
        procCards.forEach((card, i) => {
          gsap.set(card, { position: 'relative', inset: 'auto', transform: 'none',
            opacity: 0, y: 30, marginBottom: '12px', zIndex: 10 - i });
          gsap.to(card, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
            delay: i * 0.1,
          });
        });
        // On mobile show all cards in flow layout
        procWrapper.style.height = 'auto';
        procWrapper.style.display = 'flex';
        procWrapper.style.flexDirection = 'column';
      }
    }

    // 7. Scroll text highlight — About Us + Why Choose Us paragraphs
    const GOLD_WORDS = [
      'CRAFTSMANSHIP','ALIGN','REFINED','FLUSH','WATERPROOF','ACCURACY',
      'LASER','TOLERANCE','REINFORCED','ENGINEERED','PRECISION',
      'EPOXY','SOFT-CLOSE','BOLTED','VERIFIED',
    ];
    document.querySelectorAll('.text-reveal-para').forEach(para => {
      const text = para.innerText;
      para.innerHTML = text.split(' ').map(word => {
        const isGold = GOLD_WORDS.some(k => word.toUpperCase().includes(k));
        const cls = isGold
          ? 'text-reveal-word text-[#C5A880] inline-block mr-1.5'
          : 'text-reveal-word text-white/25 inline-block mr-1.5';
        return `<span class="${cls}" style="transition:color 0.4s,opacity 0.4s">${word}</span>`;
      }).join('');

      const words = para.querySelectorAll('.text-reveal-word');
      gsap.fromTo(words,
        { opacity: 0.15 },
        {
          opacity: 1,
          color: (_, t) => t.classList.contains('text-[#C5A880]') ? '#C5A880' : '#ffffff',
          duration: 0.6,
          stagger: { each: 0.045, from: 'start' },
          ease: 'power2.out',
          scrollTrigger: { trigger: para, start: 'top 80%', end: 'bottom 40%', scrub: 0.8 }
        }
      );
    });

    // Flush after layout settles (images/fonts loaded)
    gsap.delayedCall(0.4, () => ScrollTrigger.refresh());
  }

  // Before/After Slider Interaction
  const baContainer = document.getElementById('before-after-container');
  const baOverlay = document.getElementById('before-after-overlay');
  const baHandle = document.getElementById('before-after-handle');
  const baImg = baOverlay ? baOverlay.querySelector('img') : null;

  if (baContainer && baOverlay && baHandle && baImg) {
    const updateSliderWidth = () => {
      baImg.style.width = baContainer.offsetWidth + 'px';
    };
    
    updateSliderWidth();
    window.addEventListener('resize', updateSliderWidth);

    const dragSlider = (e) => {
      const rect = baContainer.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      
      const pct = (x / rect.width) * 100;
      baOverlay.style.width = pct + '%';
      baHandle.style.left = pct + '%';
    };

    let isDragging = false;
    const startDragging = (e) => {
      isDragging = true;
      dragSlider(e);
      window.addEventListener('mousemove', dragSlider);
      window.addEventListener('touchmove', dragSlider);
    };

    const stopDragging = () => {
      if (isDragging) {
        window.removeEventListener('mousemove', dragSlider);
        window.removeEventListener('touchmove', dragSlider);
        isDragging = false;
      }
    };

    baContainer.addEventListener('mousedown', startDragging);
    baContainer.addEventListener('touchstart', startDragging);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
  }
});

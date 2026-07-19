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
      testimonialSlides.forEach((slide, idx) => {
        if (idx === targetIdx) {
          slide.classList.remove('hidden');
          gsap.fromTo(slide, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        } else {
          slide.classList.add('hidden');
          gsap.set(slide, { opacity: 0 });
        }
      });

      // Update active dot visual classes
      testimonialDots.forEach((dot, idx) => {
        if (idx === targetIdx) {
          dot.classList.add('bg-minimal-sage', 'w-4');
          dot.classList.remove('bg-minimal-sand', 'w-2');
        } else {
          dot.classList.remove('bg-minimal-sage', 'w-4');
          dot.classList.add('bg-minimal-sand', 'w-2');
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
    testimonialDots[0].classList.add('w-4');
    testimonialDots[0].classList.remove('w-2');
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
});

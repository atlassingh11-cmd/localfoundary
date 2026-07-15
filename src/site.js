document.documentElement.classList.add('js');

(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileMotion = window.matchMedia('(max-width: 820px)');
  window.dataLayer = window.dataLayer || [];
  const track = (event, details = {}) => {
    const payload = { event, page_path: window.location.pathname, ...details };
    window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('lf:analytics', { detail: payload }));
  };
  const loader = document.querySelector('[data-page-loader]');
  const loaderNumber = document.querySelector('[data-loader-number]');
  const loaderProgress = document.querySelector('[data-loader-progress]');
  const scrollProgress = document.querySelector('[data-scroll-progress]');
  const scrollNumber = document.querySelector('[data-scroll-number]');

  if (!reducedMotion.matches) {
    if (window.location.hash) window.setTimeout(() => document.documentElement.classList.add('smooth-scroll'), 500);
    else document.documentElement.classList.add('smooth-scroll');
  }

  const releasePage = ({ animate = true } = {}) => {
    try { sessionStorage.setItem('lf-intro-seen', 'true'); } catch (_) { /* Storage can be unavailable. */ }
    document.body.classList.remove('intro-active', 'intro-pending');
    document.body.classList.add('intro-ready');
    document.dispatchEvent(new CustomEvent('lf:intro-ready'));
    if (!loader) return;
    if (!animate) {
      loader.hidden = true;
      return;
    }
    loader.classList.add('is-complete');
    window.setTimeout(() => { loader.hidden = true; }, 380);
  };

  if (loader) {
    let introSeen = false;
    try { introSeen = sessionStorage.getItem('lf-intro-seen') === 'true'; } catch (_) { /* Storage can be unavailable. */ }

    if (introSeen || reducedMotion.matches) {
      releasePage({ animate: false });
    } else {
      document.body.classList.add('intro-active');
      const started = performance.now();
      let displayedProgress = 0;

      const paintProgress = () => {
        const elapsed = performance.now() - started;
        const documentReady = document.readyState === 'complete';
        const target = documentReady ? 100 : Math.min(92, 18 + elapsed / 10);
        displayedProgress += (target - displayedProgress) * .13;
        const rounded = Math.min(100, Math.round(displayedProgress));
        if (loaderNumber) loaderNumber.textContent = String(rounded).padStart(2, '0');
        if (loaderProgress) loaderProgress.style.width = `${rounded}%`;

        if (documentReady && rounded >= 99 && elapsed > 300) {
          if (loaderNumber) loaderNumber.textContent = '100';
          if (loaderProgress) loaderProgress.style.width = '100%';
          window.setTimeout(() => releasePage(), 40);
          return;
        }
        requestAnimationFrame(paintProgress);
      };
      requestAnimationFrame(paintProgress);
      window.setTimeout(() => {
        if (!document.body.classList.contains('intro-ready')) releasePage();
      }, 800);
    }
  } else {
    releasePage({ animate: false });
  }

  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 28);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (toggle && navigation) {
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const closeMenu = ({ restoreFocus = false } = {}) => {
      navigation.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('.sr-only').textContent = 'Open navigation';
      document.body.classList.remove('menu-open');
      if (restoreFocus) toggle.focus();
    };

    const openMenu = () => {
      navigation.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.querySelector('.sr-only').textContent = 'Close navigation';
      document.body.classList.add('menu-open');
      navigation.querySelector('a')?.focus();
    };

    toggle.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') closeMenu();
      else openMenu();
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (!navigation.classList.contains('open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...navigation.querySelectorAll(focusableSelector), toggle].filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.matchMedia('(min-width: 821px)').addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  const progressiveItems = document.querySelectorAll([
    '.section-heading',
    '.statement-grid > *',
    '.proof-grid > *',
    '.pricing-preview-grid > *',
    '.faq-grid > *',
    '.cost-grid > *',
    '.principle-grid > *',
    '.directory-grid > a',
    '.case-story article',
    '.case-delivery-grid > *',
    '.expectation-grid > *',
    '.advantage-grid > *',
    '.problem-list > *',
    '.solution-list > *',
    '.industry-sector',
    '.process-detail-grid > *',
    '.insight-grid > *',
    '.contact-grid > *',
  ].join(','));
  progressiveItems.forEach((item, index) => {
    item.setAttribute('data-reveal', '');
    item.style.setProperty('--reveal-delay', `${(index % 3) * 45}ms`);
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  const revealSequence = ['rise', 'slide', 'scale'];
  revealItems.forEach((item, index) => {
    if (item.matches('.section-heading')) item.dataset.revealStyle = 'heading';
    else if (item.matches('.project-row, .work-entry')) item.dataset.revealStyle = 'project';
    else if (item.matches('.capability-card, .portfolio-card, .pricing-card, .directory-grid > a')) item.dataset.revealStyle = 'scale';
    else item.dataset.revealStyle = revealSequence[index % revealSequence.length];
  });
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px 8% 0px', threshold: .04 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const splitTextTargets = document.querySelectorAll([
    '.section-heading h2',
    '.transformation-intro h2',
    '.presence-intro h2',
    '.final-cta h2',
    '.work-entry-head h2',
    '.solution-intro h2',
    '.industry-sector-head h2',
    '.insight-grid h2',
  ].join(','));

  if (!reducedMotion.matches) {
    splitTextTargets.forEach((target) => {
      let wordIndex = 0;
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);
      textNodes.forEach((node) => {
        if (!node.textContent.trim()) return;
        const fragment = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.append(document.createTextNode(part));
            return;
          }
          const word = document.createElement('span');
          word.className = 'word-reveal';
          word.style.setProperty('--word-index', wordIndex++);
          word.textContent = part;
          fragment.append(word);
        });
        node.replaceWith(fragment);
      });
      target.dataset.splitText = '';
    });

    if ('IntersectionObserver' in window) {
      const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('words-visible');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px 8% 0px', threshold: .05 });
      splitTextTargets.forEach((target) => textObserver.observe(target));
    } else {
      splitTextTargets.forEach((target) => target.classList.add('words-visible'));
    }
  }

  const imageRevealItems = document.querySelectorAll('.project-visual, .portfolio-card-media, .case-visual-secondary');
  imageRevealItems.forEach((item) => { item.dataset.imageReveal = ''; });
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('image-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    imageRevealItems.forEach((item) => imageObserver.observe(item));
  } else {
    imageRevealItems.forEach((item) => item.classList.add('image-visible'));
  }

  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.count || 0);
    const prefix = counter.dataset.countPrefix || '';
    const started = performance.now();
    const duration = 1050;
    const tick = (now) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - ((1 - progress) ** 4);
      counter.textContent = `${prefix}${Math.round(target * eased).toLocaleString('en-GB')}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .65 });
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  const scrollSections = [...document.querySelectorAll('main > section')];
  scrollSections.forEach((section) => section.setAttribute('data-scroll-section', ''));
  const openingHero = document.querySelector('.hero, .page-hero, .case-hero');
  const heroMotionStage = document.querySelector('.hero-system');
  const heroStageCards = heroMotionStage ? [...heroMotionStage.querySelectorAll('[data-hero-card]')] : [];
  const heroStageNumber = heroMotionStage?.querySelector('[data-hero-stage-number]');
  const heroStageLabel = heroMotionStage?.querySelector('[data-hero-stage-label]');
  const heroStageLabels = ['Identity', 'Website', 'Visibility', 'Trust', 'Enquiry'];
  let activeHeroStage = 0;
  const setHeroStage = (stage) => {
    if (!heroMotionStage || stage === activeHeroStage) return;
    activeHeroStage = stage;
    heroMotionStage.dataset.scrollStage = String(stage);
    heroMotionStage.style.setProperty('--hero-stage-progress', (stage / heroStageLabels.length).toFixed(3));
    if (heroStageNumber) heroStageNumber.textContent = String(stage).padStart(2, '0');
    if (heroStageLabel) heroStageLabel.textContent = heroStageLabels[stage - 1];
    heroStageCards.forEach((card) => {
      const cardStage = Number(card.dataset.heroCard);
      card.classList.toggle('active', cardStage === stage);
      card.classList.toggle('complete', cardStage < stage);
    });
  };
  setHeroStage(1);
  if (heroMotionStage && !reducedMotion.matches) {
    let heroMotionTimer;
    const activateHeroMotion = () => {
      window.clearTimeout(heroMotionTimer);
      heroMotionTimer = window.setTimeout(() => heroMotionStage.classList.add('motion-live'), 720);
    };
    if (document.body.classList.contains('intro-ready')) activateHeroMotion();
    else document.addEventListener('lf:intro-ready', activateHeroMotion, { once: true });
  }
  const motionItems = [];
  const registerMotion = (selector, type, strength) => {
    document.querySelectorAll(selector).forEach((item, index) => {
      item.dataset.scrollMotion = type;
      motionItems.push({ item, type, strength, direction: index % 2 ? 1 : -1 });
    });
  };
  if (!reducedMotion.matches) {
    registerMotion('.project-visual', 'visual', 24);
    registerMotion('.portfolio-card-media', 'visual', 10);
    registerMotion('.capability-art', 'art', 12);
    registerMotion('.price-poster', 'price', 18);
    registerMotion('.final-cta-inner', 'cta', 14);
  }
  let scrollFrame;
  const updateScrollStory = () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maximum));
      const percentage = Math.round(progress * 100);
      if (scrollProgress) scrollProgress.style.setProperty('--scroll-ratio', progress.toFixed(4));
      if (scrollNumber) scrollNumber.textContent = String(percentage).padStart(2, '0');

      scrollSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionProgress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height * .45)));
        section.style.setProperty('--section-progress', sectionProgress.toFixed(3));
      });

      if (openingHero) {
        const heroRect = openingHero.getBoundingClientRect();
        const heroExit = Math.min(1, Math.max(0, -heroRect.top / Math.max(1, heroRect.height * .72)));
        openingHero.style.setProperty('--hero-exit', heroExit.toFixed(3));
        setHeroStage(Math.min(heroStageLabels.length, Math.floor(heroExit * heroStageLabels.length) + 1));
      }

      const motionScale = mobileMotion.matches ? .42 : 1;
      motionItems.forEach(({ item, type, strength, direction }) => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < -250 || rect.top > window.innerHeight + 250) return;
        const relativeCenter = (rect.top + rect.height / 2 - window.innerHeight / 2) / Math.max(1, window.innerHeight + rect.height);
        const offset = Math.min(1, Math.max(-1, relativeCenter));
        const shift = offset * strength * motionScale;
        item.style.setProperty('--motion-shift', `${shift.toFixed(2)}px`);
        item.style.setProperty('--motion-shift-inverse', `${(-shift).toFixed(2)}px`);
        item.style.setProperty('--motion-tilt', `${(offset * direction * .65 * motionScale).toFixed(3)}deg`);
        item.style.setProperty('--screen-shift', `${(-shift * .18).toFixed(2)}px`);
        if (type === 'art') {
          const artProgress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / Math.max(1, window.innerHeight + rect.height)));
          const artShift = (artProgress - .5) * 38 * motionScale;
          item.style.setProperty('--art-progress', artProgress.toFixed(3));
          item.style.setProperty('--art-shift', `${artShift.toFixed(2)}px`);
          item.style.setProperty('--art-shift-inverse', `${(-artShift).toFixed(2)}px`);
          item.style.setProperty('--art-rotate', `${((artProgress - .5) * 20 * direction * motionScale).toFixed(2)}deg`);
          item.style.setProperty('--art-line', `${(artProgress * 112 - 6).toFixed(1)}%`);
        }
      });
    });
  };
  updateScrollStory();
  window.addEventListener('scroll', updateScrollStory, { passive: true });
  window.addEventListener('resize', updateScrollStory, { passive: true });

  const presenceStory = document.querySelector('[data-presence-story]');
  if (presenceStory) {
    const presenceSteps = [...presenceStory.querySelectorAll('[data-presence-step]')];
    const presenceNodes = [...presenceStory.querySelectorAll('[data-presence-node]')];
    const presencePaths = [...presenceStory.querySelectorAll('[data-presence-path]')];
    const presenceStageVisual = presenceStory.querySelector('[data-presence-stage]');
    const presenceGhost = presenceStory.querySelector('[data-presence-ghost]');
    const presenceSceneNumber = presenceStory.querySelector('[data-presence-scene-number]');
    const presenceSceneTitle = presenceStory.querySelector('[data-presence-scene-title]');
    const presenceSceneCopy = presenceStory.querySelector('[data-presence-scene-copy]');
    const presenceNumber = presenceStory.querySelector('[data-presence-number]');
    const presenceLabel = presenceStory.querySelector('[data-presence-label]');
    let currentPresenceStage = 0;
    const setPresenceStage = (stage) => {
      const activeStep = presenceSteps[stage - 1];
      if (!activeStep || stage === currentPresenceStage) return;
      currentPresenceStage = stage;
      presenceStory.dataset.active = String(stage);
      presenceStory.style.setProperty('--presence-progress', `${stage / presenceSteps.length}`);
      presenceSteps.forEach((step, index) => {
        step.classList.toggle('complete', index < stage - 1);
        step.classList.toggle('active', index === stage - 1);
        step.classList.toggle('upcoming', index > stage - 1);
      });
      presenceNodes.forEach((node, index) => {
        node.classList.toggle('complete', index < stage - 1);
        node.classList.toggle('active', index === stage - 1);
      });
      presencePaths.forEach((path, index) => {
        path.classList.toggle('complete', index < stage - 1);
        path.classList.toggle('active', index === stage - 1);
      });
      const activeLabel = activeStep.querySelector('h3')?.textContent || '';
      const activeCopy = activeStep.querySelector('p')?.textContent || '';
      if (presenceGhost) presenceGhost.textContent = activeLabel;
      if (presenceSceneNumber) presenceSceneNumber.textContent = String(stage).padStart(2, '0');
      if (presenceSceneTitle) presenceSceneTitle.textContent = activeLabel;
      if (presenceSceneCopy) presenceSceneCopy.textContent = activeCopy;
      if (presenceStageVisual) {
        presenceStageVisual.classList.remove('stage-shift');
        void presenceStageVisual.offsetWidth;
        presenceStageVisual.classList.add('stage-shift');
      }
      if (presenceNumber) presenceNumber.textContent = String(stage).padStart(2, '0');
      if (presenceLabel) presenceLabel.textContent = activeLabel;
    };
    setPresenceStage(1);
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      const presenceObserver = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setPresenceStage(Number(visible.target.dataset.presenceStep));
      }, { rootMargin: '-32% 0px -42% 0px', threshold: [0, .2, .4, .6, .8] });
      presenceSteps.forEach((step) => presenceObserver.observe(step));
    } else if (reducedMotion.matches) {
      presenceNodes.forEach((node) => node.classList.add('complete'));
      presencePaths.forEach((path) => path.classList.add('complete'));
      presenceSteps.forEach((step) => step.classList.add('active'));
    }
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
    document.querySelectorAll('.button, .nav-cta').forEach((target) => {
      target.addEventListener('pointermove', (event) => {
        const rect = target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 7;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 5;
        target.style.setProperty('--magnetic-x', `${x.toFixed(2)}px`);
        target.style.setProperty('--magnetic-y', `${y.toFixed(2)}px`);
      });
      target.addEventListener('pointerleave', () => {
        target.style.setProperty('--magnetic-x', '0px');
        target.style.setProperty('--magnetic-y', '0px');
      });
    });
  }

  const parallax = document.querySelector('[data-parallax]');
  if (parallax && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion.matches) {
    let frame;
    parallax.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = parallax.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        parallax.style.transform = `perspective(900px) rotateY(${x * 2.5}deg) rotateX(${y * -2.5}deg)`;
      });
    });
    parallax.addEventListener('pointerleave', () => { parallax.style.transform = ''; });
  }

  if (parallax && 'IntersectionObserver' in window) {
    const motionObserver = new IntersectionObserver(([entry]) => {
      parallax.classList.toggle('paused', !entry.isIntersecting);
    }, { threshold: .05 });
    motionObserver.observe(parallax);
  }

  const transformation = document.querySelector('[data-transformation]');
  if (transformation) {
    const steps = [...transformation.querySelectorAll('[data-stage]')];
    const number = transformation.querySelector('[data-stage-number]');
    const label = transformation.querySelector('[data-stage-label]');
    const setStage = (stage) => {
      const current = steps[stage - 1];
      if (!current) return;
      transformation.dataset.active = String(stage);
      steps.forEach((step) => step.classList.toggle('active', step === current));
      if (number) number.textContent = String(stage).padStart(2, '0');
      if (label) label.textContent = current.querySelector('h3')?.textContent || '';
    };
    setStage(1);
    if ('IntersectionObserver' in window && window.matchMedia('(min-width: 821px)').matches) {
      const stageObserver = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setStage(Number(visible.target.dataset.stage));
      }, { rootMargin: '-30% 0px -30% 0px', threshold: [0, .25, .5, .75] });
      steps.forEach((step) => stageObserver.observe(step));
    }
  }

  const process = document.querySelector('[data-process]');
  if (process) {
    let processFrame;
    const updateProcess = () => {
      cancelAnimationFrame(processFrame);
      processFrame = requestAnimationFrame(() => {
        const rect = process.getBoundingClientRect();
        const available = rect.height - window.innerHeight;
        const progress = available > 0 ? Math.min(1, Math.max(0, -rect.top / available)) : 1;
        process.style.setProperty('--process-progress', `${progress * 100}%`);
      });
    };
    updateProcess();
    window.addEventListener('scroll', updateProcess, { passive: true });
    window.addEventListener('resize', updateProcess, { passive: true });
  }

  const form = document.querySelector('[data-project-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const validatedFields = [...form.querySelectorAll('input, select, textarea')]
      .filter((field) => !field.closest('.honeypot'));
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === 'error') {
      status.textContent = 'We could not send that enquiry. Please try again or email info@localfoundary.co.uk.';
      status.scrollIntoView({ block: 'center' });
      track('lf_form_error', { reason: 'delivery_redirect' });
    }

    const messageFor = (field) => {
      if (field.validity.valueMissing) return field.type === 'checkbox' ? 'Please confirm you are happy for us to respond.' : 'Please complete this field.';
      if (field.validity.typeMismatch) return field.type === 'email' ? 'Enter a valid email address.' : 'Enter a complete website address, including https://.';
      return 'Check this field and try again.';
    };

    const showFieldState = (field) => {
      const error = document.getElementById(`${field.id}-error`);
      const valid = field.checkValidity();
      field.setAttribute('aria-invalid', String(!valid));
      if (error) {
        error.textContent = valid ? '' : messageFor(field);
        if (!valid) field.setAttribute('aria-describedby', error.id);
        else field.removeAttribute('aria-describedby');
      }
      return valid;
    };

    validatedFields.forEach((field) => {
      field.addEventListener('blur', () => showFieldState(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') showFieldState(field);
      });
    });

    form.addEventListener('submit', (event) => {
      const invalid = validatedFields.filter((field) => !showFieldState(field));
      if (!invalid.length) {
        status.textContent = 'Sending your enquiry…';
        track('lf_form_submit', { service: form.elements.service?.value || 'not_selected' });
        return;
      }
      event.preventDefault();
      status.textContent = `Please check ${invalid.length === 1 ? 'the highlighted field' : 'the highlighted fields'} and try again.`;
      track('lf_form_error', { reason: 'validation', invalid_fields: invalid.map((field) => field.name).join(',') });
      invalid[0].focus();
    });
  }

  if (window.location.pathname === '/thanks/' || window.location.pathname === '/thanks.html') {
    track('lf_form_success');
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const isPrimaryCta = link.matches('.button, .nav-cta, .text-link, .whatsapp-button');
    const destination = link.getAttribute('href') || '';
    if (isPrimaryCta) track('lf_cta_click', { destination, label: link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80) });
    if (destination.startsWith('mailto:')) track('lf_contact_click', { channel: 'email', destination });
    if (destination.includes('wa.me/') || destination.includes('api.whatsapp.com/')) track('lf_contact_click', { channel: 'whatsapp', destination });
  });
})();

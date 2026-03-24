// ── PARWAH Animated Letter Slider ──────────────────────────────────────────
(function initParwahSlider() {
    const descriptions = [
        'Psycho-social and Peer Support',
        'Academic and Aspirational Development',
        'Relationships and Resilience',
        'Well-being in the Digital Age',
        'Awareness of Self and Identity',
        'Health and Habits'
    ];

    const letters = document.querySelectorAll('.parwah-letter');
    const dots    = document.querySelectorAll('.parwah-dot');
    const counter = document.getElementById('parwahCounter');
    const desc    = document.getElementById('parwahDescription');

    if (!letters.length) return; // guard: not on this page

    let current     = 0;
    let autoTimer   = null;
    let resumeTimer = null;

    /* ── Core: activate a given index ── */
    function setActive(index) {
        // Update letter states
        letters.forEach(l => l.classList.remove('active'));
        dots.forEach(d   => d.classList.remove('active'));

        letters[index].classList.add('active');
        dots[index].classList.add('active');

        // Counter
        counter.textContent = (index + 1) + ' / ' + letters.length;

        // Fade description out → swap → fade in
        desc.classList.add('fade-out');
        setTimeout(() => {
            desc.textContent = descriptions[index];
            desc.classList.remove('fade-out');
        }, 290);
    }

    /* ── Start the auto-timer ── */
    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            current = (current + 1) % letters.length;
            setActive(current);
        }, 2500);
    }

    /* ── Handle any user interaction ── */
    function onUserSelect(index) {
        current = index;
        setActive(current);

        // Pause auto then resume after 4 s
        clearInterval(autoTimer);
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(startAuto, 4000);
    }

    /* ── Click listeners on letters ── */
    letters.forEach((letter, i) => {
        letter.addEventListener('click', () => onUserSelect(i));
    });

    /* ── Click listeners on dots ── */
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => onUserSelect(i));
    });

    // Kick off
    setActive(0);
    startAuto();
})();



// Horizontal Carousel Auto-Scroll (Optional)
const testimonialContainer = document.querySelector('.testimonials-container');
if (testimonialContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - testimonialContainer.offsetLeft;
        scrollLeft = testimonialContainer.scrollLeft;
    });
    testimonialContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });
    testimonialContainer.addEventListener('mouseup', () => {
        isDown = false;
    });
    testimonialContainer.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialContainer.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialContainer.scrollLeft = scrollLeft - walk;
    });
}




// ── THE PARWAH CYCLE INTERACTION (USER PROVIDED) ─────────────────────────────
let currentCycle = 1;
let cycleInterval;

function activateCycle(step) {
  for (let i = 1; i <= 5; i++) {
    let node = document.querySelector('.node-' + i);
    let card = document.getElementById('cycle-card-' + i);
    if (node) node.classList.remove('active');
    if (card) card.style.display = 'none';
  }
  let activeNode = document.querySelector('.node-' + step);
  let activeCard = document.getElementById('cycle-card-' + step);

  if (activeNode) activeNode.classList.add('active');
  if (activeCard) activeCard.style.display = 'block';

  currentCycle = step;
  clearInterval(cycleInterval);
  startCycleTimer();
}

function nextCycle() {
  let next = currentCycle >= 5 ? 1 : currentCycle + 1;
  activateCycle(next);
}

function prevCycle() {
  let prev = currentCycle <= 1 ? 5 : currentCycle - 1;
  activateCycle(prev);
}

function startCycleTimer() {
  cycleInterval = setInterval(() => {
    let next = currentCycle >= 5 ? 1 : currentCycle + 1;
    activateCycle(next);
  }, 6000);
}

// Global exposure for onclick attributes in HTML
window.activateCycle = activateCycle;
window.nextCycle = nextCycle;
window.prevCycle = prevCycle;

setTimeout(startCycleTimer, 1000);





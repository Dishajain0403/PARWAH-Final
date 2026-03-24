/**
 * School Page Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inject the "What We Offer" diagram component, then animate nodes
    injectComponent('offer-section', 'components/offer.html', initOfferDiagram);

    initImplementationAnimation();
    initTimelineAnimation();
    initImpactAnimation();
});

/**
 * Animates the peripheral nodes in the offer diagram
 * (called as callback after component is injected)
 */
function initOfferDiagram() {
    const nodes = document.querySelectorAll('.fade-item');
    if (!nodes.length) return;

    // Clockwise order: item1 (TL), item2 (TR), item4 (BR), item5 (B), item3 (BL)
    const clockwiseOrder = [1, 2, 4, 5, 3];
    const ordered = Array.from(nodes).sort((a, b) => {
        const aNum = parseInt(Array.from(a.classList).find(c => c.startsWith('item'))?.replace('item', '') || 0);
        const bNum = parseInt(Array.from(b.classList).find(c => c.startsWith('item'))?.replace('item', '') || 0);
        return clockwiseOrder.indexOf(aNum) - clockwiseOrder.indexOf(bNum);
    });

    ordered.forEach((node, i) => {
        setTimeout(() => node.classList.add('visible'), i * 400);
    });
}

/**
 * Animates the Implementation Model cards and arrows sequentially
 */
function initImplementationAnimation() {
    const implSection = document.getElementById('implementation');
    if (!implSection) return;

    const items = implSection.querySelectorAll('.seq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(implSection);
}

/**
 * Animates the Comparison Timeline
 */
function initTimelineAnimation() {
    const timelineTrigger = document.getElementById('timeline-trigger');
    if (!timelineTrigger) return;

    const lineFill = document.getElementById('line-fill');
    const nodes = timelineTrigger.querySelectorAll('.timeline-node');
    const cards = timelineTrigger.querySelectorAll('.anim-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate line
                if (lineFill) lineFill.classList.add('visible');
                
                // Animate cards sequentially based on data-delay
                cards.forEach(card => {
                    const delay = parseInt(card.getAttribute('data-delay') || 0);
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, delay);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(timelineTrigger);
}

/**
 * Animates the Impact cards
 */
function initImpactAnimation() {
    const impactCards = document.querySelectorAll(".impact-card");
    if (impactCards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    impactCards.forEach(card => observer.observe(card));
}
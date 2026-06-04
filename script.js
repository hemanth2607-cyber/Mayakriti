/* ═══════════════════════════════════════════════════
   MAYAKRITI — script.js
   ═══════════════════════════════════════════════════ */

/* ── 1. Fantasy Background Canvas ──────────────── */
(function () {
    const canvas = document.getElementById('fantasy-bg');
    const ctx    = canvas.getContext('2d');
    let W, H, t = 0;

    /* Spiral seeds — each has its own orbit, speed, colour */
    const spirals = [
        { ox: .18, oy: .25, r: .38, speed: .00018, hue: 340, arms: 5 },
        { ox: .82, oy: .72, r: .42, speed: .00013, hue:   0, arms: 4 },
        { ox: .50, oy: .50, r: .55, speed: .00009, hue: 320, arms: 6 },
        { ox: .15, oy: .78, r: .28, speed: .00022, hue: 280, arms: 3 },
        { ox: .88, oy: .20, r: .30, speed: .00016, hue:  15, arms: 4 },
    ];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function drawSpiral(sp, time) {
        const cx  = sp.ox * W;
        const cy  = sp.oy * H;
        const R   = sp.r  * Math.min(W, H);
        const rot = time  * sp.speed;

        for (let arm = 0; arm < sp.arms; arm++) {
            const armAngle = (arm / sp.arms) * Math.PI * 2;

            ctx.beginPath();
            let first = true;

            for (let i = 0; i <= 300; i++) {
                const frac   = i / 300;
                const angle  = armAngle + rot + frac * Math.PI * 8;
                const radius = frac * R;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;

                if (first) { ctx.moveTo(x, y); first = false; }
                else         ctx.lineTo(x, y);
            }

            /* Opacity pulses gently over time */
            const alpha = 0.07 + 0.04 * Math.sin(time * 0.0003 + arm);
            ctx.strokeStyle = `hsla(${sp.hue + arm * 8}, 70%, 55%, ${alpha})`;
            ctx.lineWidth   = 1;
            ctx.stroke();
        }

        /* Soft glowing core */
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * .35);
        const coreAlpha = 0.04 + 0.02 * Math.sin(time * 0.0004);
        grad.addColorStop(0,   `hsla(${sp.hue}, 80%, 65%, ${coreAlpha + .04})`);
        grad.addColorStop(0.5, `hsla(${sp.hue}, 70%, 50%, ${coreAlpha})`);
        grad.addColorStop(1,   `hsla(${sp.hue}, 60%, 40%, 0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, R * .35, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
    }

    function loop(timestamp) {
        /* Dark wipe — semi-transparent so trails linger */
        ctx.fillStyle = 'rgba(13, 0, 5, 0.18)';
        ctx.fillRect(0, 0, W, H);

        spirals.forEach(sp => drawSpiral(sp, timestamp));

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
})();


/* ── 2. Smooth Scroll (Lenis) ───────────────────── */
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.1,
});
(function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })();


/* ── 3. Navbar hide / show ──────────────────────── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY <= 30) {
        navbar.classList.remove('nav-hidden');
        navbar.classList.add('nav-solid');
    } else {
        navbar.classList.add('nav-hidden');
        navbar.classList.remove('nav-solid');
    }
}, { passive: true });


/* ── 4. Enquiry Slider ──────────────────────────── */
function toggleSlider() {
    const slider = document.getElementById('enquirySlider');
    if (!slider) return;
    const isOpen = slider.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    isOpen ? lenis.stop() : lenis.start();
    if (isOpen) slider.querySelector('.close-slider')?.focus();
}

window.addEventListener('click', (e) => {
    const slider = document.getElementById('enquirySlider');
    if (e.target === slider) toggleSlider();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const slider = document.getElementById('enquirySlider');
        if (slider?.classList.contains('active')) toggleSlider();
    }
});


/* ── 5. Custom Cursor + Particles ──────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.getElementById('custom-cursor');
    let lastX = 0, lastY = 0;

    document.addEventListener('mousemove', (e) => {
        if (!cursor) return;
        cursor.style.opacity = '1';
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        // Spawns a new sparkle whenever the cursor traverses 35 pixels
        if (Math.hypot(e.clientX - lastX, e.clientY - lastY) > 35) {
            createMagicSparkle(e.clientX, e.clientY);
            lastX = e.clientX; 
            lastY = e.clientY;
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => { if (cursor) cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { if (cursor) cursor.style.opacity = '1'; });
}

function createMagicSparkle(x, y) {
    const p = document.createElement('div');
    p.className = 'particle';

    // Magic palette matching the deep fantasy background
    const magicColors = [
        '#e8b4b8', // Rose-gold
        '#ffdf00', // Warm sparkle gold
        '#ffffff', // Pure white ember
        '#b03060', // Vibrant maroon
        '#e0b0ff'  // Mauve sparkle
    ];
    const chosenColor = magicColors[Math.floor(Math.random() * magicColors.length)];
    const size = 10 + Math.random() * 16; // Random size variation from 10px to 26px

    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${x - size / 2}px`;
    p.style.top = `${y - size / 2}px`;
    p.style.color = chosenColor;
    p.style.setProperty('--sparkle-glow', chosenColor);

    // Dynamic SVG injection of a four-pointed magical star
    p.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2L14.8,9.2L22,12L14.8,14.8L12,22L9.2,14.8L2,12L9.2,9.2L12,2Z"/>
        </svg>
    `;

    document.body.appendChild(p);

    // Calculated trajectories (shoots out organically and drifts upwards)
    const angle = Math.random() * Math.PI * 2;
    const distance = 15 + Math.random() * 35;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance - (20 + Math.random() * 30); // Negative drift forces upward climb
    const rotation = (Math.random() - 0.5) * 360;

    const anim = p.animate(
        [
            { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
            { transform: `translate(${targetX}px, ${targetY}px) scale(0) rotate(${rotation}deg)`, opacity: 0 }
        ],
        {
            duration: 900 + Math.random() * 600, // Dynamic fading lifetime
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth cubic easing
            fill: 'forwards'
        }
    );

    // Safely remove element from DOM upon fade completion
    anim.onfinish = () => p.remove();
}
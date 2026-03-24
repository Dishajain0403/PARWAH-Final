/**
 * Parwah Components Data
 * This file contains the HTML strings for shared components.
 * This approach allows the site to work without a local server (via file:// protocol)
 * by avoiding fetch() calls for local components.
 */

window.ParwahComponents = {
    navbar: `
<header class="navbar">
    <div class="logo">
        <a href="index.html">
            <img alt="Parwah Logo" src="img/logo.svg" />
        </a>
    </div>
    <nav id="nav-menu">
        <a href="school.html">For schools</a>
        <a href="booksession.html">Book a session</a>
        <a href="login.html">
            <button class="login-btn">Login</button>
        </a>
    </nav>
    <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>
</header>
`,
    footer: `
<footer class="footer">
    <div class="footer-container">
        <div class="footer-brand">
            <img alt="Parwah Logo" class="logo-img" src="img/logowhite.png" />
            <p>The inner voice that matters</p>
        </div>
        <div class="footer-column">
            <h4>Company</h4>
            <a href="index.html">Home</a>
            <a href="school.html">For Schools</a>
            <a href="booksession.html">Book a Session</a>
        </div>
        <div class="footer-column">
            <h4>Address</h4>
            <p>B-165 Amar Colony, Lajpat 4, New Delhi, India 110024</p>
        </div>
        <div class="footer-column">
            <h4>Email</h4>
            <a href="mailto:office@parwah.in">office@parwah.in</a>
        </div>
        <div class="footer-column">
            <h4>Phone</h4>
            <a href="tel:7017202001">7017202001</a>
        </div>
    </div>
    <div class="footer-bottom">
        <p>© 2025 Parwah.in. All rights reserved.</p>
        <div class="social-icons">
            <a href="https://www.linkedin.com/company/parwah/" target="_blank" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" class="social-icon">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            </a>
            <a href="https://chat.whatsapp.com/HX20sEz3UOg2FWdLrS1jD9" target="_blank" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" class="social-icon">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.724.843 3.42 1.282 5.289 1.283 5.312 0 9.635-4.322 9.638-9.636.001-2.574-1.003-4.994-2.827-6.82-1.825-1.826-4.247-2.829-6.824-2.83-5.312 0-9.635 4.322-9.638 9.636-.001 1.83.481 3.567 1.395 5.176l-.924 3.376 3.491-.915zm10.741-6.176c-.221-.11-.351-.112-1.341-.601-.11-.055-.19-.083-.281-.083-.09 0-.17.028-.281.194-.111-.166-.434-.555-.532-.656-.09-.09-.181-.11-.392-.027-.221.11-.937.363-1.189.589-.252.227-.472.227-.693.117-.221-.11-.934-.344-1.779-.99-.658-.501-1.102-1.12-1.231-1.341-.129-.221-.014-.341.097-.451.101-.0$.221-.258.332-.387.111-.129.148-.221.221-.369.074-.148.037-.277-.018-.387-.056-.111-.281-.689-.385-.941-.09-.221-.183-.189-.251-.189-.068-.001-.146-.001-.225-.001-.079 0-.206.03-.314.12-.108.09-.412.404-.412.984s.423 1.159.482 1.25c.059.09.833 1.272 2.018 1.783.282.121.502.193.673.248.282.088.539.076.741.046.226-.033.693-.284.79-.559.098-.274.098-.51.069-.559-.029-.049-.111-.077-.332-.187z"/>
                </svg>
            </a>
        </div>
    </div>
</footer>
`,
    offer: `
<style>
    .offer-framework {
        padding: 80px 4%;
        background: radial-gradient(circle at center, #ffffff 0%, #f4f7f6 100%);
        text-align: center;
        overflow: hidden;
        position: relative;
    }

    .offer-framework h2 {
        font-size: clamp(32px, 4vw, 44px);
        color: #1a365d;
        margin-bottom: 8px;
        font-weight: 700;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s forwards;
    }

    .offer-framework p.framework-subtitle {
        font-size: clamp(18px, 1.5vw, 22px);
        color: #2e6f57;
        margin-bottom: 0;
        font-weight: 500;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s 0.2s forwards;
    }

    .framework-container {
        max-width: 1200px;
        height: 700px; /* Increased for better label clearance */
        margin: 0 auto;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* Orbit Background */
    .orbit-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
        animation: orbitPulse 10s infinite ease-in-out;
    }

    /* Center Node */
    .center-node {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        width: 350px;
        text-align: center;
        animation: centerFloat 6s infinite ease-in-out;
    }

    .center-image-wrap {
        width: 280px;
        height: 280px;
        background: white;
        border-radius: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        border: 2px solid #eef2f1;
        overflow: hidden;
    }

    .center-image-wrap img {
        width: 85%;
        height: auto;
    }

    /* Peripheral Nodes */
    .offer-node {
        position: absolute;
        z-index: 15;
        width: 200px;
        cursor: pointer;
        opacity: 0;
        text-align: center;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.6s ease;
    }

    .offer-node.visible {
        opacity: 1;
    }

    .node-image-wrap {
        width: 180px; /* Sizing matched to screenshot */
        height: 180px;
        background: white;
        border-radius: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.03);
        border: 1px solid #f0f4f3;
        overflow: hidden;
        transition: all 0.4s ease;
    }

    .node-image-wrap img {
        width: 100%; /* Using 100% since labels are inside the PNG */
        height: auto;
    }

    /* Mathematically Precise Positions for 5-Point Orbit */
    .offer-node.tl { top: 22%; left: 26.5%; transform: translate(-50%, -50%); }
    .offer-node.tr { top: 22%; left: 73.5%; transform: translate(-50%, -50%); }
    .offer-node.br { top: 61%; left: 88%; transform: translate(-50%, -50%); }
    .offer-node.bc { top: 85%; left: 50%; transform: translate(-50%, -50%); }
    .offer-node.bl { top: 61%; left: 12%; transform: translate(-50%, -50%); }

    /* Hover Effects */
    .offer-node:hover .node-image-wrap {
        transform: scale(1.08); /* Subtle scale as images have text */
        box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        border-color: #5fa89c;
    }

    /* Animations - Removed floating for static look */
    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
    @keyframes orbitPulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.01); }
    }

    @media (max-width: 992px) {
        .framework-container { width: 100%; height: 60vw; min-height: 500px; max-height: 700px; }
        .orbit-line { width: 80%; height: 75%; opacity: 0.9; }
        .center-node { width: 30%; max-width: 250px; animation: none; }
        .center-image-wrap { width: 100%; height: auto; aspect-ratio: 1/1; }
        .offer-node { width: 180px; animation: none; }
        .node-image-wrap { width: 100%; height: auto; aspect-ratio: 1/1; }
        
        .offer-node.tl { left: 25%; top: 20%; }
        .offer-node.tr { left: 75%; top: 20%; }
        .offer-node.br { left: 88%; top: 61%; }
        .offer-node.bc { left: 50%; top: 86%; }
        .offer-node.bl { left: 12%; top: 61%; }
    }

    @media (max-width: 850px) {
        .framework-container { height: 80vw; min-height: 450px; }
        .orbit-line { width: 78%; height: 78%; opacity: 0.9; }
        .center-node { width: 35%; }
        .offer-node { width: 150px; }
        
        .offer-node.tl { left: 24%; top: 18%; }
        .offer-node.tr { left: 76%; top: 18%; }
        .offer-node.bl { left: 16%; top: 70%; }
        .offer-node.br { left: 84%; top: 70%; }
        .offer-node.bc { left: 50%; top: 88%; } /* Added for consistency */
    }

    @media (max-width: 600px) {
        .framework-container { height: 100vw; min-height: 400px; }
        .orbit-line { width: 82%; height: 82%; opacity: 0.9; }
        .center-node { width: 40%; }
        .offer-node { width: 130px; }
        
        .offer-node.tl { left: 18%; top: 15%; }
        .offer-node.tr { left: 82%; top: 15%; }
        .offer-node.bl { left: 12%; top: 74%; }
        .offer-node.br { left: 88%; top: 74%; }
        .offer-node.bc { top: 92%; }
    }

    @media (max-width: 480px) {
        .offer-framework { padding: 40px 0; width: 100%; overflow: hidden; }
        .framework-container { height: 110vw; width: 100% !important; max-width: 100% !important; min-height: 380px; }
        .orbit-line { width: 78%; height: 85%; opacity: 0.9; }
        .center-node { width: 45%; }
        .offer-node { width: 103px; }
        
        .offer-node.tl { left: 22%; top: 12%; }
        .offer-node.tr { left: 78%; top: 12%; }
        .offer-node.bl { left: 18%; top: 78%; }
        .offer-node.br { left: 82%; top: 78%; }
        .offer-node.bc { left: 50%; top: 92%; }

        .offer-framework h2 { font-size: 24px; padding: 0 10px; }
        .offer-framework p.framework-subtitle { font-size: 15px; margin-bottom: 20px; padding: 0 15px; }
    }
</style>

<div class="offer-framework">
    <h2>What We Offer to Schools</h2>
    <p class="framework-subtitle">A Holistic Wellbeing Framework for the School Ecosystem</p>
    <div class="framework-container" id="offerContainer">
        <!-- Orbit Background Line -->
        <div class="orbit-line"></div>
        <div class="center-node">
            <div class="center-image-wrap">
                <img src="img/school.png" alt="School Framework" />
            </div>
        </div>
        <div class="offer-node tl fade-item item1"><div class="node-image-wrap"><img src="img/img1.png" alt="Student Wellbeing" /></div></div>
        <div class="offer-node tr fade-item item2"><div class="node-image-wrap"><img src="img/img5.png" alt="Wellbeing Culture Initiatives" /></div></div>
        <div class="offer-node br fade-item item4"><div class="node-image-wrap"><img src="img/img4.png" alt="Educator Capacity Building" /></div></div>
        <div class="offer-node bc fade-item item5"><div class="node-image-wrap"><img src="img/img2.png" alt="Wellbeing Insights & Tracking" /></div></div>
        <div class="offer-node bl fade-item item3"><div class="node-image-wrap"><img src="img/img3.png" alt="Accessible Counselling Support" /></div></div>
    </div>
</div>
`
};

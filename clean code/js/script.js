/**
 * Parwah Website Main Script
 * Handles component injection and responsive navbar
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, injecting components...');
    
    // Inject Components
    // Using relative paths from the root since all HTML files are in root
    injectComponent('navbar', 'components/navbar.html', initNavbar);
    injectComponent('footer', 'components/footer.html');
});

/**
 * Fetches and injects an HTML component into a placeholder element
 * @param {string} elementId - ID of the placeholder element
 * @param {string} filePath - Path to the HTML component file
 * @param {function} callback - Optional callback after injection
 */
async function injectComponent(elementId, filePath, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Placeholder #${elementId} not found on this page.`);
        return;
    }

    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const html = await response.text();
            element.innerHTML = html;
            console.log(`Successfully injected: ${filePath}`);
            if (callback) callback();
        } else {
            console.error(`Failed to load component: ${filePath} (Status: ${response.status})`);
            // Check if user is running on filesystem (file://)
            if (window.location.protocol === 'file:') {
                element.innerHTML = `<div style="padding: 20px; background: #fee; border: 1px solid #f99; color: #c33; margin: 10px 0; border-radius: 8px;">
                    <strong>Local File System Detected:</strong> Fetch API (used for components) may be blocked by your browser's security settings (CORS). 
                    Please use a local server (e.g., Live Server in VS Code) to view this site correctly.
                </div>`;
            }
        }
    } catch (error) {
        console.error(`Error injecting component ${filePath}:`, error);
    }
}

/**
 * Initializes navbar functionality (hamburger menu)
 */
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    if (hamburger && navMenu) {
        console.log('Initializing interactive navbar...');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    } else {
        console.warn('Navbar elements not found in injected HTML.');
    }
}

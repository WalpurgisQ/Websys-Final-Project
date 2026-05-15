// ===== HIGHLIGHT ACTIVE NAVIGATION LINK =====
// This makes the current page's link highlighted in the navbar

document.addEventListener('DOMContentLoaded', function() {
    // Get the current page filename (e.g., "index.html" from "http://...index.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Loop through each link
    navLinks.forEach(link => {
        // Remove the 'active' class from all links first
        link.classList.remove('active');
        
        // Check if this link's href matches the current page
        if (link.getAttribute('href') === currentPage) {
            // Add 'active' class to highlight it
            link.classList.add('active');
        }
    });
});

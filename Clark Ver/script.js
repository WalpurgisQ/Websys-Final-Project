// ===== HIGHLIGHT ACTIVE NAVIGATION LINK =====
// This makes the current page's link highlighted in the navbar

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    let pageKey = currentPage;
    // Map subpages to their main navbar category
    if (currentPage === 'styling-gallery.html' || currentPage === 'styling-packages.html') {
        pageKey = 'styling.html';
    } else if (currentPage === 'alacarte.html') {
        pageKey = 'menu-packages.html';
    }
    
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === pageKey) {
            link.classList.add('active');
        }
    });

    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const revealItems = document.querySelectorAll('.reveal-item');

    if (filterButtons.length && galleryCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                galleryCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    if (revealItems.length) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealItems.forEach(item => revealObserver.observe(item));
    }

    // ===== GALLERY LIGHTBOX MODAL =====
    const modal = document.getElementById("gallery-modal");
    const modalContainer = document.getElementById("modal-image-container");
    const modalCaption = document.getElementById("modal-caption");
    
    if (modal && galleryCards.length) {
        const closeBtn = document.querySelector(".modal-close");
        
        galleryCards.forEach(card => {
            card.addEventListener('click', function() {
                const photoDiv = this.querySelector('.gallery-photo');
                const label = this.querySelector('.gallery-label').innerText;
                
                // Replicate the background of the thumbnail into the modal window
                const computedStyle = window.getComputedStyle(photoDiv);
                modalContainer.style.background = computedStyle.background;
                modalContainer.style.backgroundSize = "cover";
                modalContainer.style.backgroundPosition = "center";
                
                modalCaption.innerText = label;
                modal.style.display = 'block';
                
                // Tiny delay to allow CSS transitions (fade-in) to work properly
                setTimeout(() => modal.classList.add('show'), 10);
            });
        });
        
        // Close when clicking the 'X' or anywhere on the background
        window.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeBtn) {
                modal.classList.remove('show');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        });
    }
});

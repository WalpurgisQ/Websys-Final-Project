// ===== HIGHLIGHT ACTIVE NAVIGATION LINK =====
// This makes the current page's link highlighted in the navbar

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageKey = currentPage === 'styling-gallery.html' || currentPage === 'styling-packages.html' ? 'styling.html' : currentPage;
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
});

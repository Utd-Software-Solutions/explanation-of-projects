document.addEventListener('DOMContentLoaded', function () {
    // Old navbar toggle
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('open');
        });
    }

    // Sidebar accordion
    document.querySelectorAll('.sidebar-section-title').forEach(function (title) {
        title.addEventListener('click', function () {
            this.parentElement.classList.toggle('open');
        });
    });

    // Sidebar subsection accordion
    document.querySelectorAll('.sidebar-subsection-title').forEach(function (title) {
        title.addEventListener('click', function () {
            this.parentElement.classList.toggle('open');
        });
    });

    // Sidebar: scroll to active link and preserve position
    var sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        var activeLink = sidebar.querySelector('.sidebar-subitems a.active, .sidebar-sub-items a.active');
        if (activeLink) {
            var savedPos = sessionStorage.getItem('sidebarScroll');
            if (savedPos) {
                sidebar.scrollTop = parseInt(savedPos);
            } else {
                setTimeout(function () {
                    activeLink.scrollIntoView({ block: 'center', behavior: 'instant' });
                }, 50);
            }
        }

        sidebar.addEventListener('scroll', function () {
            sessionStorage.setItem('sidebarScroll', sidebar.scrollTop);
        });
    }

    // Sidebar mobile toggle
    var sidebarToggle = document.querySelector('.sidebar-toggle-btn');
    var overlay = document.querySelector('.sidebar-overlay');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('mobile-open');
        });
        if (overlay) {
            overlay.addEventListener('click', function () {
                sidebar.classList.remove('mobile-open');
            });
        }
    }

    // Active section on scroll
    var sections = document.querySelectorAll('section[id]');
    var sidebarLinks = document.querySelectorAll('.sidebar-subitems a[href^="#"]');
    if (sections.length && sidebarLinks.length) {
        window.addEventListener('scroll', function () {
            var scrollPos = window.scrollY + 120;
            sections.forEach(function (section) {
                if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                    sidebarLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + section.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Page content animations on scroll
    var animatedElements = document.querySelectorAll('.card, .flow-step, .info-box, .warning-box, .stats-bar, .table-wrapper, .page-header, .section-title, .section-desc, .pricing-card');
    if (animatedElements.length && window.IntersectionObserver) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        animatedElements.forEach(function (el) {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }
});

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

    // Sidebar mobile toggle
    var sidebarToggle = document.querySelector('.sidebar-toggle-btn');
    var sidebar = document.querySelector('.sidebar');
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
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const icon = navbar.querySelector('.icon');

    icon.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var bio = document.querySelector('.bio-text');
    if (!bio) return;

    var content = document.querySelector('.bio-content');
    var cursor = document.querySelector('.terminal-cursor');
    var text = bio.getAttribute('data-bio');
    var alreadyPlayed = sessionStorage.getItem('bio-typed');

    if (alreadyPlayed) {
        content.textContent = text;
        return;
    }

    var i = 0;
    var speed = 25;

    function type() {
        if (i < text.length) {
            content.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed + Math.random() * 20);
        } else {
            sessionStorage.setItem('bio-typed', '1');
        }
    }

    type();
});

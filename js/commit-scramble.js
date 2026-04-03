document.addEventListener('DOMContentLoaded', function() {
    var link = document.querySelector('.commit-hash');
    if (!link) return;

    var original = link.textContent;
    var hexChars = '0123456789abcdef';
    var interval = null;

    link.addEventListener('mouseenter', function() {
        var iterations = 0;
        var length = original.length;

        clearInterval(interval);
        interval = setInterval(function() {
            var scrambled = '';
            for (var i = 0; i < length; i++) {
                if (i < iterations) {
                    scrambled += original[i];
                } else {
                    scrambled += hexChars[Math.floor(Math.random() * hexChars.length)];
                }
            }
            link.textContent = scrambled;
            iterations += 1 / 3;

            if (iterations >= length) {
                clearInterval(interval);
                link.textContent = original;
            }
        }, 40);
    });

    link.addEventListener('mouseleave', function() {
        clearInterval(interval);
        link.textContent = original;
    });
});

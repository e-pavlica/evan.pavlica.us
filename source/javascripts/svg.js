document.addEventListener('DOMContentLoaded', function() {

    'use strict';
    var svg = document.querySelector('#dynamic');
    var pathEl = svg.querySelector('path');
    var padding = window.innerHeight * 0.025;

    // Set the Viewbox to the viewport
    svg.setAttribute('viewBox', '0 0 ' + window.innerWidth + ' ' + window.innerHeight);

    var traceElements = [
        '.hero-image',
        '.landing-panel .section-content'
    ];

    var lastY = Math.floor(window.innerHeight * 0.1);
    var lastX = 0;
    var first = true;

    // Path starts at 10% down the page
    var path = 'M' + [lastX, lastY].join(' ');

    // traceElements.forEach(function(selector) {
        // console.log(selector);
        var el = document.querySelector('.hero-image');
        var bounds = el.getBoundingClientRect();

        var ctlX, ctlY, destX, destY;
        // The Quadratic Bezier curve to the element
        if (first) {
            ctlX = lastX;
            ctlY = bounds.y - padding;
            destX = bounds.x;
            destY = bounds.y - padding;
            path = path + ' Q' + [ctlX, ctlY, destX, destY].join(' ');
            first = false;
        } else {
            ctlX = bounds.x;
            ctlY = lastY;
            destX = bounds.x;
            destY = bounds.y - padding;
            path = path + ' Q' + [ctlX, ctlY, destX, destY].join(' ');
        }

        // The line across  the top of the element
        destX = lastX = bounds.x + bounds.width + padding;
        destY = lastY = bounds.y - padding;
        path = path + ' L ' + [destX, destY].join(' ');
    // });

    pathEl.setAttribute('d', path);

});

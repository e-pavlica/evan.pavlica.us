//= require web-animations-js/web-animations-next-lite.min.js
//= require movr.js

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var getCurrentSlide = function(el) {
        var parent = el.parentElement;
        if (parent.nodeName === 'SECTION') { return parent; }

        while(parent !== document.body) {
            parent = parent.parentElement;
            if (parent.nodeName === 'SECTION') { return parent; }
        }
    };

    var animateSlide = function(e, forward) {
        var target = e.target;
        var currentSlide = getCurrentSlide(target);
        var nextSlide = document.querySelector(target.dataset.animationTarget);
        var inPosition = { transform: 'translate(0, 0)' };
        var outPostitionNext = { transform: 'translate(100vw, 0)' };
        var outPostitionPrevious = { transform: 'translate(-100vw, 0)' };
        var transformIn = [forward ? outPostitionNext : outPostitionPrevious, inPosition];
        var transformOut = [inPosition, forward ? outPostitionPrevious : outPostitionNext];
        var animationConfig = { duration: 500, easing: 'ease-out', fill: 'forwards' };

        if (forward) {
            currentSlide.animate(transformOut, animationConfig);
            nextSlide.animate(transformIn, animationConfig);
        } else {
            currentSlide.animate(transformOut, animationConfig);
            nextSlide.animate(transformIn, animationConfig);
        }
        target.animate([
            { opacity: getComputedStyle(target).opacity },
            { opacity: 0 }
        ], { duration: 600, easing: 'ease-out' });
    };

    var animateBackSlide = function(e) {
        animateSlide(e, false);
    };

    var animateNextSlide = function(e) {
        animateSlide(e, true);
    };

    var buttons = document.querySelectorAll('.page-btn');
    Array.prototype.forEach.call(buttons, function(btn) {
        if (btn.classList.contains('next-btn')) {
            btn.addEventListener('click', animateNextSlide, false);
        } else if (btn.classList.contains('back-btn')) {
            btn.addEventListener('click', animateBackSlide, false);
        }
    });

    var jobs = document.querySelectorAll('.job');
    var openCloseJob = function() {
        var target = this;
        Array.prototype.forEach.call(jobs, function(jobEl) {
            jobEl.classList.remove('open');
        });
        target.classList.add('open');
    };

    Array.prototype.forEach.call(jobs, function(jobEl) {
        jobEl.addEventListener('click', openCloseJob);
    });
}, false);

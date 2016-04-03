//= require web-animations-js/web-animations-next-lite.min.js
//= require hammerjs/hammer.js

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var slides = {
        available: [
            '.landing-panel',
            '.work-history',
            '.education'
        ],
        current: 0
    };

    var nextBtn = document.querySelector('.next-btn');
    var backBtn = document.querySelector('.back-btn');

    var hide = function(el) {
        el.classList.add('hidden');
        el.disabled = true;
    };
    var show = function(el) {
        el.classList.remove('hidden');
        el.disabled = false;
    };

    // Show / Hide the page buttons
    var showHideButtons = function() {
        if (slides.available[slides.current + 1] !== undefined) {
            show(nextBtn); 
        } else {
            hide(nextBtn);
        }

        if (slides.available[slides.current - 1] !== undefined) {
            show(backBtn);
        } else {
            hide(backBtn);
        }
    };
    showHideButtons();

    var animateSlide = function(e, forward) {
        var currentSlide = document.querySelector(slides.available[slides.current]);
        var nextSlide = document.querySelector(slides.available[ forward ? slides.current + 1 : slides.current - 1]);
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

        slides.current = forward ? slides.current + 1 : slides.current - 1;

        showHideButtons();
    };

    var animateBackSlide = function(e) {
        if (slides.available[slides.current - 1] === undefined) { return; }
        animateSlide(e, false);
    };

    var animateNextSlide = function(e) {
        if (slides.available[slides.current + 1] === undefined) { return; }
        animateSlide(e, true);
    };

    nextBtn.addEventListener('click', animateNextSlide, false);
    backBtn.addEventListener('click', animateBackSlide, false);

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


    // Setup Hammer JS to recognize Swipe Gestures
    var mc = new Hammer.Manager(document.body);
    mc.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL }));
    mc.on('swipeleft', animateNextSlide);
    mc.on('swiperight', animateBackSlide);
}, false);

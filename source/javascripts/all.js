//= require web-animations-js/web-animations-next.min.js
//= require hammerjs/hammer.js
//= require Snap.svg/dist/snap.svg.js

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
        if (el === undefined) { return; }
        el.classList.add('hidden');
        el.disabled = true;
    };
    var show = function(el) {
        if (el === undefined) { return; }
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

    var animateSlide = function(_e, forward) {
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
        if (target.classList.contains('open')) {
            target.classList.remove('open');
            return;
        }
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

    // Listen for arrow keys
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 39) { animateNextSlide(e); }
        if (e.keyCode === 37) { animateBackSlide(e); }
    }, false);

    // Animate the "Projects" svg
    var showInfo = function(selector, show, cb) {
        var txt = new Snap(selector);
        if (show) {
            txt.node.style.visibility = 'visible';
            txt.animate({opacity: 1}, 333, undefined, function() {
                cb();
            });
        } else {
            txt.animate({opacity: 0}, 333, undefined, function() {
                cb();
                txt.node.style.visibility = 'hidden';
            });
        }
    };
    var animateTriangle = function(el, openPath, infoEl) {
        var snapEl = new Snap(el);
        snapEl.data('open', false);
        snapEl.click(function() {
            if (!snapEl.data('open')) {
                // Move the node to the bottom of the SVG to ensure it's on top
                var parent = snapEl.node.parentElement;
                parent.removeChild(snapEl.node);
                parent.appendChild(snapEl.node);

                snapEl.addClass('open');
                snapEl.data('resetPath', snapEl.attr('d'));
                snapEl.animate({
                    d: openPath
                }, 333);
                snapEl.data('open', true);
                showInfo(infoEl, true);
            } else {
                snapEl.removeClass('open');
                showInfo(infoEl, false, function() {
                    snapEl.animate({
                        d: snapEl.data('resetPath')
                    }, 333);
                    snapEl.data('open', false);
                });
            }
        });
    };

    animateTriangle('.boombotix',
                    'M0 0 L 1000 0 L 1000 500 L 0 500 Z',
                    '#boombotix-text'
                   );
    animateTriangle('.snappic',
                    'M0 0 L 1000 0 L 1000 500 L 0 500 Z',
                    '#snappic-text'
                   );
}, false);

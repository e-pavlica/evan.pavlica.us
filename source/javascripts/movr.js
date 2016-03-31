// document.addEventListener('DOMContentLoaded', function() {
//     var dot1 = document.querySelector('.bg-dot-1');
//     var dot2 = document.querySelector('.bg-dot-2');
//
//     var throttle = function(type, name, obj) {
//         obj = obj || window;
//         var running = false;
//         var func = function(e) {
//             if (running) { return; }
//             running = true;
//             requestAnimationFrame(function() {
//                 obj.dispatchEvent(new CustomEvent(name, {
//                     detail: {
//                         x: e.clientX,
//                         y: e.clientY
//                     }
//                 }));
//                 running = false;
//             });
//         };
//         obj.addEventListener(type, func);
//     };
//
//     throttle('mousemove', 'optimizeMouseMove');
//     window.addEventListener('optimizeMouseMove', function(e) {
//         console.log(e);
//         var percentX = e.detail.x / window.innerWidth;
//         var percentY = e.detail.y / window.innerHeight;
//         dot1.style.transform = 'translate(' + percentX + '%, ' + percentY + '%)';
//     });
// });

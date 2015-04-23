$(document).ready(function() {
  var aboutEl = $('#about');
  var navBar = $('#navbar');
  $(window).on('scroll', function() {
    if ($(this).scrollTop() >= aboutEl.position().top) {
      navBar.show();
    } else {
      navBar.hide();
    }
  });
});

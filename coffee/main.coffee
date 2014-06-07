# $ ->
#   $(window).scroll ->
#     if $(window).scrollTop() > 0 && $(window).scrollTop() < window.innerHeight
#       target = $('#about')
#       $('body').animate({
#         scrollTop: target.offset().top
#         }, 1000)
#       return false

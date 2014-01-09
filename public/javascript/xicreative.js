// requires jquery

// **** js for evan.pavlica.us / xicreative.net, Jan 2014 **** //


var menuOpen = false;


$(function() {

    // bind clicks to the dropdown button
    $('#dropdownMenuBtn').click(showHideMenu);
    // create the dropdown menu
    var drop = $('#dropdownMenu');
    drop.append($('.nav-column').html());

    // open the contact card
    $('.contactBtn').click(function(e){
      e.preventDefault();
      openContact();
    });

    function openContact() {
      $('#contactCard').fadeIn();
    }

    // close the contact card
    $('#closeContact').click(closeContact);

    function closeContact() {
      $('#contactCard').fadeOut();
    }

    function showHideMenu() {
        if (menuOpen === false) {
            // open the dropdown
            drop.slideDown();
            menuOpen = true;
        } else {
            //slide the dropdown closed
            drop.slideUp();
            menuOpen = false;
        }
    }
});

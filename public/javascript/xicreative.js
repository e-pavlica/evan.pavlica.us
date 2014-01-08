// requires jquery

// **** js for evan.pavlica.us / xicreative.net, Jan 2014 **** //

var $;

var menuOpen = false;

$(function() {
    console.log('jq loded');


    // bind clicks to the dropdown button
    $('#dropdownMenuBtn').click(showHideMenu);
    // create the dropdown menu
    var drop = $('#dropdownMenu');
    drop.append($('.nav-column').html());

    function showHideMenu() {
        console.log('click event!');

        if (menuOpen === false) {
            //create the dropdown and slide it down
            drop.slideDown();
            menuOpen = true;
        } else {
            //slide the dropdown closed
            drop.slideUp();
            menuOpen = false;
        }
    }

});

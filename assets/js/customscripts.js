
// $('.rightMenu').height($(".nav").height());


$( document ).ready(function() {

    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
    // position as your scroll. if you have a lot of nav items, this height may not work for you.
    var h = $('#toc').height();
    $(".inner").css("height", h)
    var s = $('#mydocsidebar').height();
    $(".sidebar-inner").css("height", s)
    console.log (h);
    if (h > 800) {
        $( ".mydocsidebar" ).attr("class", "affix");
    }
    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    /**
     * AnchorJS
     */
    anchors.add('h2,h3,h4,h5');

});

// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    // for bootstrap 3 use 'shown.bs.tab', for bootstrap 2 use 'shown' in the next line
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        // save the latest tab; use cookies if you like 'em better:
        localStorage.setItem('lastTab', $(this).attr('href'));
    });

    // go to the latest tab, if it exists:
    var lastTab = localStorage.getItem('lastTab');
    if (lastTab) {
        $('[href="' + lastTab + '"]').tab('show');
    }
});

/**
 * Smooth scrolling to a specific element 
 **/
function scrollTo(target) {
    if (target) {
        let positionElt = target.offset().top
        $("html, body").animate({
            scrollTop: positionElt - 75 + 'px'
        }, 1500);
    }
};
// Evenements sur clic des éléments nav pour un défilement en douceur vers l'ancre de la page 
$("#linkPresentation").on("click", function () {
    scrollTo($("#presentation"))
});

$("#linkCarousel").on("click", function () {
    scrollTo($("#sectionCarousel"))
});

$("#linkCarte").on("click", function () {
    scrollTo($("#carteEtInformations"))
});

$("#linkContact").on("click", function () {
    scrollTo($("#contact"))
});

$("#linkLogo").on("click", function () {
    /**
     * Smooth scrolling to the top of page
     **/
    $("html, body").animate({
        scrollTop: 0
    }, 1500);
})
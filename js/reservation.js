const reservationElt = $("#reservation");
const carteElt = $("#carte");
const informationElt = $(".infoStation");

$(".monBouton").on("click", event =>{
    reservationElt.css("display","flex");
    reservationElt.css("position","absolute");
    carteElt.css("opacity",0.5);
    informationElt.css("opacity",0.5);
    maCarte.dragging.disable();//désactivation du déplacement de la carte par la souris
    $(".bloquerCarte").css("z-index",2);

})
$(".cmdFermerReservation").on("click", event =>{
    fermerFormulaireReservation();
})

function fermerFormulaireReservation(){
    reservationElt.css("display","none");
    reservationElt.css("position","none");
    carteElt.css("opacity",1);
    informationElt.css("opacity",1);
    maCarte.dragging.enable();
}
const reservationElt = $(".reservation");
const carteElt = $("#carte");
$(".monBouton").on("click", event =>{
    reservationElt.css("display","flex");
    reservationElt.css("position","absolute");
    carteElt.css("opacity",0.3);
})

$(".cmdFermerReservation").on("click", event =>{
    reservationElt.css("display","none");
    reservationElt.css("position","none");
    carteElt.css("opacity",1);
})

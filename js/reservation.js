const reservationElt = $("#reservation");
const carteElt = $("#carte");
const informationElt = $(".infoStation");
const confirmationStationElt = $(".confirmationStation");
let stationEnregistree = "";


boutonReservationElt.on("click", event => {
    reservationElt.css("display", "flex");
    reservationElt.css("position", "absolute");
    carteElt.css("opacity", 0.5);
    informationElt.css("opacity", 0.5);
    maCarte.dragging.disable(); //désactivation du déplacement de la carte par la souris
    $(".bloquerCarte").css("z-index", 2);
    boutonReservationElt.css("display", "none");

})
$(".cmdFermerReservation").on("click", event => {
    fermerFormulaireReservation();
})

function fermerFormulaireReservation() {
    reservationElt.css("display", "none");
    reservationElt.css("position", "none");
    carteElt.css("opacity", 1);
    informationElt.css("opacity", 1);
    maCarte.dragging.enable();
    boutonReservationElt.css("display", "block");
}

function enregistrerReservation() {
    stationEnregistree = nomStationElt[0].textContent;
    ajoutLocalStorage();
    fermerFormulaireReservation();
    finMinuteur();
    $(".dureeMinSec").html("00:10");
    minuteur();
    confirmationStationElt.text(nomStationElt[0].textContent);
    afficherMessageConfirmation();
}

function afficherMessageConfirmation() {
    // $(".confirmationReservation").slideToggle( 500, function(){
    //     $(this).css("display", "flex");
    // });
    $(".confirmationReservation").animate({
        height: "100px",
        opacity: "1"
    });
}

function supprReservation(){
    finMinuteur();
    dureeMinSecElt.html("00:00");
    sessionStorage.clear();
    document.location.reload(true);//Rechargement de la page 
}

$(".formReservation").submit(function (e) {
    testSiCanvasVide();
    e.preventDefault(); //Empeche le comportement normal de l'input afin de gérer le cas où l'utisateur ne change que la signature (pas de fermeture du formulaire si ce cas se présente)
    if (nomReservationElt.value === "" || prenomReservationElt.value === "" || testCanvas === 0) { //Tests si nom et prénom sont vides et si la position x du canvas est 0 (point d'origine)
        alert("Veuillez compléter tous les champs");
        return false;
    }
    if (stationEnregistree === "") {
        enregistrerReservation();
        return false;
    }
    if (stationEnregistree != nomStationElt[0].textContent) {
        let messageConfirmation = confirm(`il existe déjà une réservation pour la station${stationEnregistree}. Voulez-vous la remplacer ?`)
        if (messageConfirmation === true) {
            enregistrerReservation();
            return false;
        } else {
            return false;
        }
    }
    if (stationEnregistree === nomStationElt[0].textContent) {
        let messageConfirmation = confirm(`"Une réservation est déjà effectuée à cette station !". Voulez-vous la modifier ?`)
        if (messageConfirmation === true) {
            enregistrerReservation();
            return false;
        } else {
            return false;
        }
    }
})

$(".annulerReservation").on('click', event => {

    $(".confirmationReservation").slideUp(500, function(){
        supprReservation();
    });
    
});
const reservationElt = $("#reservation");
const carteElt = $("#carte");
const informationElt = $(".infoStation");
const confirmationStationElt = $(".confirmationStation");


boutonReservationElt.on("click", event => {
    reservationElt.css("display", "flex");
    reservationElt.css("position", "absolute");
    carteElt.css("opacity", 0.5);
    informationElt.css("opacity", 0.5);
    maCarte.dragging.disable(); //désactivation du déplacement de la carte par la souris
    maCarte.scrollWheelZoom.disable();
    $(".bloquerCarte").css("z-index", 2);
    boutonReservationElt.css("display", "none");

})
$(".cmdFermerReservation").on("click", event => {
    fermerFormulaireReservation();
})

function fermerFormulaireReservation() {
    reservationElt.css("display", "none");
    reservationElt.css("position", "none");
    infoStationElt.css("display", "none");
    $(".carte").css("width", "100%");
    maCarte.scrollWheelZoom.disable();
    carteElt.css("opacity", 1);
    informationElt.css("opacity", 1);
    maCarte.dragging.enable();
    boutonReservationElt.css("display", "block");
    maCarte.scrollWheelZoom.enable();
}

function enregistrerReservation() {
    ajoutLocalStorage();
    fermerFormulaireReservation();
    infoStationElt.css("display", "none");
    $(".carte").css("width", "100%");
    maCarte.scrollWheelZoom.disable();
    finMinuteur();
    $(".dureeMinSec").html("20:00");
    minuteur();
    confirmationStationElt.text(nomStationElt[0].textContent);
    afficherMessageConfirmation();
}

function afficherMessageConfirmation() {
    $(".confirmationReservation").animate({
        height: "150px",
        opacity: "1"
    });
}

function supprReservation() {
    finMinuteur();
    dureeMinSecElt.html("00:00");
    sessionStorage.clear();
    ctx.clearRect(0, 0, canvas.width, canvas.height); //cf canvas.js
    lastX = 0 //cf canvas.js
}

$(".formReservation").submit(function (e) {
    testSiCanvasVide();
    e.preventDefault(); //Empeche le comportement normal de l'input afin de gérer le cas où l'utisateur ne change que la signature (pas de fermeture du formulaire si ce cas se présente)
    if (nomReservationElt.value === "" || prenomReservationElt.value === "" || testCanvas === 0) { //Tests si nom et prénom sont vides et si la position x du canvas est 0 (point d'origine)
        alert("Veuillez compléter tous les champs");
        return false;
    }
    if (sessionStorage.nomStation === undefined) {
        enregistrerReservation();
        return false;
    }
    if (sessionStorage.nomStation != nomStationElt[0].textContent) {
        let messageConfirmation = confirm(`il existe déjà une réservation pour la station${sessionStorage.nomStation}. Voulez-vous la remplacer ?`)
        if (messageConfirmation === true) {
            enregistrerReservation();
            return false;
        } else {
            return false;
        }
    }
    if (sessionStorage.nomStation === nomStationElt[0].textContent) {
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

    $(".confirmationReservation").animate({
        height: "1px",
        opacity: "0"
    });
    supprReservation();

});
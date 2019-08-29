const statutDeLaStationElt =  $(".statutDeLaStation");
const boutonReservationElt = $(".monBouton");
const nomStationElt = $(".nomStation");
const infoStationElt = $(".infoStation");

/**
 * Evénement sur click d'un marqueur
 */
function clickMarker(marker, data, e) {
    marker.bindPopup(`Adresse : ${data[e].address}`)//pop up sur click
    markerClusters.addLayer(marker); // Ajout groupe marqueurs
    maCarte.addLayer(markerClusters);
    marker.on("click", event => {//Evénement pour faire apparaître le formulaire à côté de la map
        nomDeLaStation(data, e);
        recupDonneesDynamiques(data, e);
        miseEnFormeInformations(data, e);
    })
};
/**
 * Evénement sur click dans la carte : fait disparaitre les informations dans l'aside
 */
function mapClick(data, e){
    maCarte.on("click", event => {
        infoStationElt.css("display","none");
        $(".carte").css("width","100%");
    })
}
/**
 * Nom de la station sans son identifiant #XXXXXX pour mettre en titre du formulaire
 */
function nomDeLaStation(data, e){
    const nom = data[e].name.split("-");
    nomStationElt.empty();
    nomStationElt.append(` ${nom[1]}`);
}
//Données dynamiques
function recupDonneesDynamiques(data, e){
    $(".nombreMax").text(data[e].mainStands.capacity)
    $(".nombreVelo").text(data[e].mainStands.availabilities.bikes);
}
// Mise en forme des informations à côté de la carte
function miseEnFormeInformations(data, e){
    infoStationElt.hide().animate({width:'toggle'},300);//Animation pour faire apparaître les infos. Adaptation auto de la largeur. Hide sur reclic.
    
    if(data[e].status === "OPEN" && data[e].mainStands.availabilities.bikes > 0){
        statutDeLaStationElt.text("Ouvert");
        statutDeLaStationElt.css("background-color","#00bdaa");
        boutonReservationElt.css("display", "block");
    }
    else if(data[e].status === "CLOSED" || data[e].mainStands.availabilities.bikes === 0){
        statutDeLaStationElt.text("Fermé");
        statutDeLaStationElt.css("background-color","#f30067");
        boutonReservationElt.css("display", "none");
    }
}

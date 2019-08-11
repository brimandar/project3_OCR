//Evénement sur click d'un marqueur
function formulaireClick(marker, data, e) {
    marker.bindPopup(`Adresse : ${data[e].address}`)//pop up sur click
    markerClusters.addLayer(marker); // Ajout groupe marqueurs
    maCarte.addLayer(markerClusters);
    marker.on("click", event => {//Evénement pour faire apparaître le formulaire à côté de la map
        nomDeLaStation(data, e);
        recupDonneesDynamiques(data, e);
        miseEnFormeInformations(data, e);
    })
};
// Evénement sur click dans la carte : fait disparaitre les informations dans l'aside
function mapClick(data, e){
    maCarte.on("click", event => {
        $(".infoStation").css("display","none");
        $(".carte").css("width","100%");
    })
}
//Nom de la station sans son identifiant #XXXXXX pour mettre en titre du formulaire
function nomDeLaStation(data, e){
    const nom = data[e].name.split("-");
    $(".nomStation").empty();
    $(".nomStation").append(` ${nom[1]}`);
}
//Données dynamiques
function recupDonneesDynamiques(data, e){
    $(".nombreMax").text(data[e].mainStands.capacity)
    $(".nombreVelo").text(data[e].mainStands.availabilities.bikes);
}
// Mise en forme des informations à côté de la carte
function miseEnFormeInformations(data, e){
    $(".infoStation").css("display","block");
    $(".infoStation").css("width", "30%");
    if(data[e].status === "OPEN" && data[e].mainStands.availabilities.bikes > 0){
        $(".statutDeLaStation").text("Ouvert");
        $(".statutDeLaStation").css("background-color","#00bdaa");
    }
    else if(data[e].status === "CLOSED" || data[e].mainStands.availabilities.bikes === 0){
        $(".statutDeLaStation").text("Fermé");
        $(".statutDeLaStation").css("background-color","#f30067");
    }
}
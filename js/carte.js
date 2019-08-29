// On initialise la latitude et la longitude de Nantes (centre de la carte)
const lat = 47.218371;
const lon = -1.553621;
let maCarte = null;
// Variable groupes de marqueurs
const markerClusters = L.markerClusterGroup();

// Icone personnalisé
class iconPerso {
    constructor(url){
        this.iconUrl = url;
        this.iconSize = [38, 65];
        this.iconAnchor = [22, 64];
        this.popupAnchor = [-3, -56];
    }
}
const myIconRouge = new iconPerso("./img/iconBicycleRed.png");
const myIconVert = new iconPerso("./img/iconBicycleGreen.png");

// Fonction d'initialisation de la carte
function initMap(ville) {
    // 1 Créer l'objet "macarte" dans l'élément HTML qui a l'ID "carte"
    maCarte = L.map('carte').setView([lat, lon], 12);
    // 2 Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        //Lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(maCarte);
    // 3 Ajout des marqueurs + appel fonction événement sur click d'un marqueur pour la réservation
    const JCDecauxAPI = "https://api.jcdecaux.com/vls/v3/stations?&apiKey=06b7a3e6425a12ae242ec8fab44b445278c4ab24";//Récupération des stations
    $.getJSON(JCDecauxAPI,function(data){
        $.each( data, e => {//Boucle sur chaque station de l'API
        let latitudeMarker = data[e].position.latitude;
        let longitudeMarker = data[e].position.longitude;

            if(data[e].contractName === ville){//Si la station est dans la ville sélectionnée
                if(data[e].status === "CLOSED" || data[e].mainStands.availabilities.bikes === 0){
                    let marker = L.marker([latitudeMarker, longitudeMarker],{icon: L.icon(myIconRouge)});//Ajout marqueur 
                    clickMarker(marker, data, e);
                }else if(data[e].status === "OPEN" && data[e].mainStands.availabilities.bikes > 0){
                    let marker = L.marker([latitudeMarker, longitudeMarker],{icon: L.icon(myIconVert)});//Ajout marqueur
                    clickMarker(marker, data, e);
                }
            }
            mapClick(data,e);
            //Gestion du scroll sur la carte pour éviter de perturber la navigation sur la page
            maCarte.scrollWheelZoom.disable(); 
                maCarte.on('click', function() { 
                    if (maCarte.scrollWheelZoom.enabled()) { 
                        maCarte.scrollWheelZoom.disable(); 
                    } 
                    else { 
                        maCarte.scrollWheelZoom.enable(); 
                    } 
                })
        });
    });
}
// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
window.onload = function(){
    initMap("nantes"); 
};

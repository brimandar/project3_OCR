// On initialise la latitude et la longitude de Paris (centre de la carte)
const lat = 47.218371;
const lon = -1.553621;
let maCarte = null;

// Icone personnalisé
var myIcon = L.icon({
    iconUrl: './img/iconBicycle.png',
    iconSize: [38, 65],
    iconAnchor: [22, 64],
    popupAnchor: [-3, -56],
});

// Fonction d'initialisation de la carte
function initMap(ville) {

    // 1 Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    maCarte = L.map('carte').setView([lat, lon], 12);
    // 2 Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(maCarte);
    // 3 Nous ajoutons les marqueurs
    // 3-1 Récupération des stations
    const JCDecauxAPI = "https://api.jcdecaux.com/vls/v3/stations?&apiKey=06b7a3e6425a12ae242ec8fab44b445278c4ab24";
    $.getJSON(JCDecauxAPI,function(data){
        $.each( data, e => {
            if(data[e].contractName === ville){
                let marker = L.marker([data[e].position.latitude, data[e].position.longitude],{icon: myIcon}).addTo(maCarte);
                marker.bindPopup(data[e].address)
            }
        });
    });
}
window.onload = function(){
    // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
    initMap("nantes"); 
};

$(".leaflet-marker-icon").on("click", function(){
    console.log("test");
})
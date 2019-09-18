const nomReservationElt = document.getElementById('nom');
const prenomReservationElt = document.getElementById('prenom');
const localNom = localStorage.getItem('nom');
const localPrenom = localStorage.getItem('prenom');
const localCanvas = sessionStorage.getItem('signature');
let testCanvas = 0

// Au chargement, on lance la fonction de récupération des données de localstorage uniquement si le champ nom n'est pas vide
if (localStorage.getItem('nom')) {
  recupLocalStorage(); //Nom et Prénom
  recupDataCanvas(localCanvas, canvas) //Canvas
}

function recupDataCanvas(strDataURI, canvas) { //Récupération du canvas dans sessionStorage
  const img = new window.Image();
  img.addEventListener("load", function () {
    canvas.getContext("2d").drawImage(img, 0, 0);
  });
  img.setAttribute("src", strDataURI); //La source de l'image est le DataURL stocké dans le sessionStorage
}

function ajoutLocalStorage() {
  localStorage.setItem('nom', nomReservationElt.value);
  localStorage.setItem('prenom', prenomReservationElt.value);
  sessionStorage.setItem('nomStation', nomStationElt[0].textContent);
  var url = canvas.toDataURL();
  sessionStorage.setItem('signature', url);
}

function recupLocalStorage() {
  nomReservationElt.value = localNom;
  prenomReservationElt.value = localPrenom;
}
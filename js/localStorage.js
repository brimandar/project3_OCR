const nomReservationElt = document.getElementById('nom');
const prenomReservationElt = document.getElementById('prenom');
const localNom = localStorage.getItem('nom');
const localPrenom = localStorage.getItem('prenom');
const localCanvas = localStorage.getItem('signature');
let testCanvas = 0

// Au chargement, on lance la fonction de récupération des données de localstorage uniquement si le champ nom n'est pas vide
if(localStorage.getItem('nom')) {
  recupLocalStorage();//Nom et Prénom
  repucDataCanvas(localCanvas,canvas)//Canvas
}

function repucDataCanvas(strDataURI, canvas) {//Récupération du canvas dans localStorage
  const img = new window.Image();
  img.addEventListener("load", function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
  });
  img.setAttribute("src", strDataURI);//LA source de l'image est le DataURL stocké dans le localStorage
}

function ajoutLocalStorage() {
  localStorage.setItem('nom', nomReservationElt.value);
  localStorage.setItem('prenom', prenomReservationElt.value);
  var url = canvas.toDataURL();
  localStorage.setItem('signature', url);
}

function recupLocalStorage() {
  nomReservationElt.value = localNom;
  prenomReservationElt.value = localPrenom;
 }

 function testSiCanvasVide(){//Fonction pour tester sur clic submit si le canvas est vide (dessin et localStorage)
   let testLastX = 0
   let testLocalStorageSignature = 0
   if (localCanvas != null){
    testLocalStorageSignature = 1
   }
   if (lastX != 0){
    testLastX = 1
   }
   testCanvas = testLastX + testLocalStorageSignature
 }

$(".formReservation").submit(function(e){
  testSiCanvasVide();
  e.preventDefault();//Empeche le comportement normal de l'input afin de gérer le cas où l'utisateur ne change que la signature (pas de fermeture du formulaire si ce cas se présente)
  if(nomReservationElt.value === "" || prenomReservationElt.value === "" || testCanvas === 0){//Tests si nom et prénom sont vides et si la position x du canvas est 0 (point d'origine)
   alert("Veuillez compléter tous les champs");
   return false;
  }
  else{
    ajoutLocalStorage();
    fermerFormulaireReservation();
  }
})

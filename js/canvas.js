const canvas = document.querySelector('#signature');
const boutonEffacer = document.querySelector('#reset');
const ctx = canvas.getContext('2d');//contexte en 2D
ctx.strokestyle = "#15bfa2";//couleur de la bordure
ctx.lineJoin = 'round';//détermine la forme à utiliser pour joindre deux segments de ligne à leur intersection - rond
ctx.lineCap = 'round';//détermine la façon dont les extrémités de chaque ligne sont dessinées - rond
ctx.lineWidth = 5;//taille du trait du crayon

let actionDessiner = false;//Par défaut, dessin désactivé
let lastX = 0;//Position initiales de l'origine (qui sera modifiée dans l'événement)
let lastY = 0;

function dessiner(e){
    if(!actionDessiner) return;//Stop la fonction si la variable actionDessiner est false (voir événement dessous)
    ctx.beginPath();//Crée un nouveau trajet
    //start from
    ctx.moveTo(lastX,lastY);//Déplace le stylo aux coordonnées x et y.
    //go to
    ctx.lineTo(e.offsetX,e.offsetY);//Dessine une ligne depuis la position de dessin courante jusqu'à la position spécifiée par x et y (offset position par rapport à l'élément)
    ctx.stroke();//Dessine la forme en traçant son contour.
    [lastX, lastY] = [e.offsetX,e.offsetY]
}

//Evénement sur mouvement de la souris
canvas.addEventListener("mousedown", (e) =>{//déclenché lorsque la souris est pressée sur un élément (comme un bouton)
actionDessiner = true;
[lastX, lastY] = [e.offsetX,e.offsetY]//Récupération des coordonnées actuelles pour débuter le trait
});
canvas.addEventListener("mousemove",dessiner);//se déclenche quand la souris se déplace alors qu'elle est au dessus d'un élément.
canvas.addEventListener("mouseup", () => actionDessiner = false);//déclenché quand la souris est relâchée au dessus d'un élément. Arret fonction
canvas.addEventListener("mouseout", () => actionDessiner = false);//déclenché quand la souris est déplacée hors de l'élément mis sur écoute ou un de ses enfants. Arret fonction.

// Clear canvas :
boutonEffacer.addEventListener('click', function() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
});
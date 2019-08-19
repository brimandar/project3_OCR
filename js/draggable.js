//Code pour rendre déplaçable (draggable) le formulaire de réservation
dragElement(document.getElementById("reservation"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // Déplacement si clic souris sur la div reservationHeader
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
      console.log(e);
    e = e || window.event;//Evenement différent de la fenetre
    e.preventDefault();
    // Position de la souris initiale lors du clic:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;//arret fonction lors du relachement de la souris
    // Appel fonction si souris bouge:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // Nouvelle position de la souris:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Modification du style de l'objet avec les nouvelles positions:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
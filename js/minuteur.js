let decompteUneSeconde = null;
const dureeMinSecElt = $(".dureeMinSec");

function decompte() {
    const timerMinSecElt = $(".timerMinSec");

    let myTime = dureeMinSecElt.html();
    let dureeMinSecSplit = myTime.split(":");
    let dt = new Date();//Variable date contenant la durée définie en HTML au format xx:xx
    dt.setHours(0);
    dt.setMinutes(dureeMinSecSplit[0]);//Récup minutes
    dt.setSeconds(dureeMinSecSplit[1]);//Récup sec

    let dt2 = new Date(dt.valueOf()-1000);//seconde date
    let temp = dt2.toTimeString().split(" ");//Renvoie date en heures format hh:mm:ss GMT-0600 + création array à l'aide de l'espace
    let ts = temp[0].split(":");//Sélection date et création array
    if(ts[1] === "00" && ts[2] === "00"){
        finMinuteur();
        dureeMinSecElt.html("00:00");
        sessionStorage.clear();
        document.location.reload(true);//Rechargement de la page 
    }
    else{
        dureeMinSecElt.html(ts[1]+":"+ts[2]);//Remplacement de la durée dans le HTML
    }
}
    
    function minuteur(){
    decompteUneSeconde = setInterval(decompte, 1000);
    }

    function finMinuteur(){
        clearInterval(decompteUneSeconde);
    }

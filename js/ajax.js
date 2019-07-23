// Exécute un appel AJAX GET

//La fonction ajaxGet permet d'exécuter une requête HTTP asynchrone. Elle prend en paramètres l'URL cible et la fonction 
//appelée en cas de succès de la requête. En effet, JavaScript permet de passer des fonctions en paramètre 
//comme n'importe quelle autre valeur. Le terme callback utilisé ici comme nom du second paramètre 
//est souvent employé pour désigner une fonction appelée ultérieurement, en réaction à un certain événement.
//Les messages d'erreur ont été améliorés et affichent à présent l'URL cible en plus des autres informations.
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    const req4 = new XMLHttpRequest();
    req4.open("GET", url);
    req4.addEventListener("load", function () {
        if (req4.status >= 200 && req4.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req4.responseText);
        } else {
            console.error(req4.status + " " + req4.statusText + " " + url);
        }
    });
    req4.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req4.send(null);
}
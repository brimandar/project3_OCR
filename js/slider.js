/**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options.slidesToScroll Nb d'élément à scroller
     * @param {Object} options.slidesVisible Nb d'élément visible
     */
class slider {
    constructor (element, options = {}) {
        this.element = element;//Element du DOM qui va contenir le slider
        this.options = options;
        let children = [].slice.call(element.children);//Dans un tbl vide [], avec slice on appel les enfants HTML sans ceux qui vont être crés en JS ci-dessous (les 4 img)
        this.currentItem = 0;//variable pour disposer du numéro de la slide (pour la navigation et setIntervall)
        this.rootElt = this.createDivWithClass('slider');//Création div contenant l'ensemble du slider avec x slides
        this.element.appendChild(this.rootElt);

        this.container = this.createDivWithClass('sliderContainer');//Création sous div du slider
        this.rootElt.appendChild(this.container);
        
        this.items = children.map((slide) => {//On parcours la table avec map et pour chaque slide :
            let item = this.createDivWithClass('sliderItem')//On place chaque slide dans une div ayant une classe sliderItem pour faciliter le CSS
            item.appendChild(slide);
            this.container.appendChild(item);
            return item;
        });
        this.setStyle();//Style du width du slider à l'écran
        this.createNavigation();
        this.autoPlay();
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle(){
        let ratio = this.items.length / this.options.slidesVisible;//pour afficher x slide à l'écran on indique le ration nb total/nb visible
        this.container.style.width = (ratio * 100) + '%';//Le container à un width de x % correspondant au ratio
        this.items.forEach(item => item.style.width = (100 / this.options.slidesVisible / ratio) + '%'); //chaque image à un width par rapport au ratio et au nb de slides visibles
        };
    
/**
 * Création des boutons de navigations
 */
    createNavigation () {
        let nextButton = this.createDivWithClass('carouselNext');
        let prevButton = this.createDivWithClass('carouselPrev');
        this.rootElt.appendChild(nextButton);
        this.rootElt.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }

    next () {
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev () {
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }
/**
 * Passage d'une slide à l'autre en boucle
 * @param {integer} index Nombre de slides à afficher
 */
    goToItem(index){
        if (index < 0){
            index = this.items.length - this.options.slidesVisible
        }
        else if (index >= this.items.length) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index;
    }
    /**
     * Défilement auto du slider
     */
    autoPlay() {
        setInterval(() => this.next(), 5000);
    }
    /**
     * Fonction permettant de retourner une div avec une class
     * @param {string} className
     * @returns {HTMLElement}
    */
    createDivWithClass (className){
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }
}

document.addEventListener('DOMContentLoaded', function(){//Après chargement du DOM sans attendre le chargement complet de la page
    new slider(document.querySelector('#carousel'), {
        slidesToScroll : 1,
        slidesVisible : 1
    })
})

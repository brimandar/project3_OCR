/**
 * 
 * @param {HTMLElement} element 
 * @param {Object} options.slidesToScroll Nb d'élément à scroller
 * @param {Object} options.slidesVisible Nb d'élément visible
 * @param {boolean} options.pagination= Création d'una pagination
 */
class slider {
    constructor(element, options = {}) {
        this.element = element; //Element du DOM qui va contenir le slider
        this.options = options;
        let children = [].slice.call(element.children); //Dans un tbl vide [], avec slice on appel les enfants HTML sans ceux qui vont être crés en JS ci-dessous (les 4 img)
        this.currentItem = 0; //variable pour disposer du numéro de la slide (pour la navigation et setIntervall)
        this.rootElt = this.createElementWithClass('div', 'slider'); //Création div contenant l'ensemble du slider avec x slides
        this.element.appendChild(this.rootElt);

        this.container = this.createElementWithClass('div', 'sliderContainer'); //Création sous div du slider
        this.rootElt.appendChild(this.container);

        this.items = children.map((slide) => { //On parcours la table avec map et pour chaque slide :
            let item = this.createElementWithClass('div', 'sliderItem') //On place chaque slide dans une div ayant une classe sliderItem pour faciliter le CSS
            item.appendChild(slide);
            this.container.appendChild(item);
            return item;
        });

        this.setStyle(); //Style du width du slider à l'écran
        this.createNavigation();
        this.createPagination();
        this.createCommand();
        this.observerTimer();

    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle() {
        let ratio = this.items.length / this.options.slidesVisible; //pour afficher x slide à l'écran on indique le ration nb total/nb visible
        this.container.style.width = (ratio * 100) + '%'; //Le container à un width de x % correspondant au ratio
        this.items.forEach(item => item.style.width = (100 / this.options.slidesVisible / ratio) + '%'); //chaque image à un width par rapport au ratio et au nb de slides visibles
    };

    /**
     * Création des boutons de navigations
     */
    createNavigation() {
        const nextButton = this.createElementWithClass('div', 'carouselNext');
        const prevButton = this.createElementWithClass('div', 'carouselPrev');
        this.rootElt.appendChild(nextButton);
        this.rootElt.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                clearInterval(this.playCarousel)
                this.next()
            }
        })
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                clearInterval(this.playCarousel)
                this.prev()
            }
        })
        const arrowNext = this.createElementWithClass('i', 'fas fa-arrow-right');
        const arrowPrev = this.createElementWithClass('i', 'fas fa-arrow-left');
        nextButton.appendChild(arrowNext);
        prevButton.appendChild(arrowPrev);
    }

    next() {
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev() {
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    /**
     * Passage d'une slide à l'autre en boucle
     * @param {integer} index Nombre de slides à afficher
     */
    goToItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length) {
            index = 0
        }
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index;
        let buttonActive = document.querySelector(".carouselPagination").childNodes[index]; //var du numéro du bouton actif
        buttonActive.classList.add('carouselPaginationButton_active'); //Ajout class pour faire un scale sur le bouton actif
        // Boucle pour supprimer la class grossissant les boutons non actifs
        for (let i = 0; i < this.items.length; i++) {
            if (i !== index) {
                document.querySelector(".carouselPagination").childNodes[i].classList.remove('carouselPaginationButton_active');
            }
        }
    }

    /**
     * Création d'une pagination
     */
    createPagination() {
        const pagination = this.createElementWithClass('div', 'carouselPagination');
        let buttons = []; //array contenant les boutons
        this.rootElt.appendChild(pagination); //création de la div contenant les boutons
        for (let i = 0; i < this.items.length; i = i + this.options.slidesToScroll) { //Création de n boutons = nb de slides
            let button = this.createElementWithClass('div', 'carouselPaginationButton');
            button.addEventListener("click", () => { //Sur clic d'un bouton pagination on va sur la slide
                clearInterval(this.playCarousel)
                this.goToItem(i)
            })
            pagination.appendChild(button);
            buttons.push(button); //Alimentation array avec les boutons créés
        }
    }

    /**
     * Création commande marche / arrêt défilement auto du slider
     */
    createCommand() {
        const commandElt = this.createElementWithClass('div', 'carouselCommand');
        const commandStopElt = this.createElementWithClass('i', 'far fa-stop-circle');
        const commandPlayElt = this.createElementWithClass('i', 'far fa-play-circle');
        this.rootElt.appendChild(commandElt);
        commandElt.appendChild(commandPlayElt);
        commandElt.appendChild(commandStopElt);
        commandStopElt.addEventListener("click", () => { //Sur clic d'un bouton pagination on va sur la slide
            clearInterval(this.playCarousel);
        })
        commandPlayElt.addEventListener("click", () => { //Sur clic d'un bouton pagination on va sur la slide
            this.playCarousel = setInterval(() => this.next(), 5000);
        })
    }

    /**
     * Fonction permettant de retourner une div avec une class
     * @param {element} element à créer
     * @param {string} className nom de la class de l'élément
     * @returns {HTMLElement}
     */
    createElementWithClass(element, className) {
        let eltCreate = document.createElement(element);
        eltCreate.setAttribute('class', className);
        return eltCreate;
    }

    /**
     * Fonction permettant de déclencher un setInterval sur affichage du carousel dans le viewport
     */
    observerTimer() {
        const target = document.querySelector('#carousel');
        var intersectionObserver = new IntersectionObserver(entries => {
            // Si l'élément est hors du viewport, annulation setinterval
            console.log(entries[0].intersectionRatio)
            if (entries[0].intersectionRatio <= 1) {
                clearInterval(this.playCarousel);;
            } //Sinon, 
            this.playCarousel = setInterval(() => this.next(), 5000);
        });
        intersectionObserver.observe(target);
    }

}

document.addEventListener('DOMContentLoaded', function () { //Après chargement du DOM sans attendre le chargement complet de la page
    new slider(document.querySelector('#carousel'), {
        slidesToScroll: 1,
        slidesVisible: 1,
    })
})
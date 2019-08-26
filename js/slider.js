class slider {
    constructor (element, options = {}) {
        this.element = element;//Element du DOM qui va contenir le slider
        this.options = options;
        let rootElt = this.createDivWithClass('slider');//Création div du slider
        this.element.appendChild(rootElt)
        let container = this.createDivWithClass('sliderContainer');//Création div enfant du slider
        rootElt.appendChild(container);
        this.children = [].slice.call(element.children)
        this.children.forEach((child) => {
            let item = this.createDivWithClass('sliderItem')
            item.appendChild(child);
            container.appendChild(item)
            
        });
        
    }
    /**
     * @param {string} className
     * @returns {HTMLElement}
    */
    createDivWithClass (className){//fonction permettant de retourner une div avec une class
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }
}

document.addEventListener('DOMContentLoaded', function(){//Après chargement du DOM
    new slider(document.querySelector('.carousel'), {
        slidesToScroll : 3,
        slidesVisible : 1
    })
})

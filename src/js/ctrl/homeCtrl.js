
class homeCtrl {
    constructor() {
        //super();
    }
    init() {
        console.log('loaded');
        document.getElementById('app-container').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/jh-hzbG5FzI?autoplay=1" frameborder="0" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    }
}

export const init = homeCtrl.prototype.init;
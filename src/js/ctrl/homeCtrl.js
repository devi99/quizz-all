import $ from 'jquery';

class homeCtrl {
    constructor() {
        //super();
    }
    init() {
        console.log('loaded');
        let urlMedia = prompt('url?');
        //let urlMedia = 'https://www.youtube.com/embed/aSLZFdqwh7E?start=10&autoplay=1';
        $('#app-container').html("<div class='embed-container'><iframe id='youtubeplayer' src='"+urlMedia+"' frameborder='0' allow='autoplay;encrypted-media'></iframe><div class='bar'></div></div>");
        //document.getElementById('app-container').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/y3jIkLwozRs?autoplay=1" frameborder="0" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    }
}

export const init = homeCtrl.prototype.init;
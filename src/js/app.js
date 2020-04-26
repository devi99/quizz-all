// import './css/simplegrid.css';
// import './css/main.css';
import uiuxCtrl from './modules/uiux';

//import { getSelectedOptions, score_on, score_off} from '../libs/utilitycode';

var db;

class App {
    constructor() {
        this.ui = null;
        this.handleUI(); 
        this.initNav();
    }    

    handleUI() {
        this.ui = new uiuxCtrl();
    }

    initNav(){
        import('../navlist.json').then(res => {
            window.navList = res;
            this.ui.createSubNav(res.navigation);
            this.ui.handleURL(res.routes);
        }).catch(err => {
            console.debug(err);
        });
    }

    // doLoginGoogle(){

    //     authenticateToGoogle();
    //     //window.location = "/auth/google";
    // }
}


(function () {

    window.config = {
        //apiUrl: 'https://kwispel.herokuapp.com'
        //apiUrl: 'https://qwizz-api.herokuapp.com'
        apiUrl: 'http://localhost:3000',
        socketUrl: 'ws://localhost:3000'
        //socketUrl: 'wss://kwispel.herokuapp.com'
        //apiUrl: process.env.API_URL
    };

    window.onpopstate = function (e) {
        location.reload();
    }

    let app = new App();
  
    // document.addEventListener('DOMContentLoaded', () => {
	// 		console.log('dom content loaded');

    //         handleClientLoad();
    //         let app = new App();

    // });

})();
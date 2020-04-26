import loadAppController from "../modules/baseFunc";
// import { authenticateToGoogle, handleClientLoad } from '../modules/googlephotos';

class questionCtrl {
    constructor() {
        //super();
        this.load();
    }
    
    load(){
        import(
            /* webpackMode: "lazy" */
            '../templates/_question.js').then(_template => {
                //var output = Mustache.render(_template.content, _template.templateVars);
                let output = _template.content;
                document.getElementById('app-container').innerHTML = output;
            }).catch(err => {
                console.error(err);
            });
    }
}

function init() {
    console.log('loaded now class');
    new questionCtrl();
}

//export const init = formCtrl.prototype.init;
export { init };
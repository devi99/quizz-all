import loadAppController from "../modules/baseFunc";
import Mustache from "mustache";
import { newEl, apiCall, getElById, positionFooter, renderTooltips, confirmModal } from "../modules/modUtility.js";

// import { authenticateToGoogle, handleClientLoad } from '../modules/googlephotos';

class questionCtrl {
    constructor() {
        //super();
        this.load();
    }
    
    saveQuestion() {
        let fullPath = window.location.pathname.substr(window.location.pathname.indexOf('/') + 1);
        fullPath = fullPath.toLowerCase();
        let pathArr = fullPath.split('/');

        //let _questionID = pathArr[1];
        //let _questionTitle = getElById('title').value
        //let _typeQuestion = getElById('typeQuestion').value

        let questionUpdate = {
                id: pathArr[1],
                title: getElById('title').value,
                typequestion: getElById('typeQuestion').value
        };

        apiCall(window.config.apiUrl, '/api/question/update', questionUpdate, "PUT")
            .then(res => {
                //alert("The contract details have been saved...")
                window.scrollTo({top: 0});
                document.getElementById('save-confirm').classList.remove('hidden');
                document.getElementById('save-confirm').classList.add('flex-vertical-center');
            })
            .catch(err => console.log('apiCall err: ', err));      
    }

    load(){
        import(
            /* webpackMode: "lazy" */
            '../templates/_question.js').then(_template => {

                let fullPath = window.location.pathname.substr(window.location.pathname.indexOf('/') + 1);
                fullPath = fullPath.toLowerCase();
                let pathArr = fullPath.split('/');

                apiCall(window.config.apiUrl, '/api/question/' + pathArr[1], {}, "GET").then(result => {
                    console.log(result);
                    output = Mustache.render(_template.content, result);
                    document.getElementById('app-container').innerHTML = output;
                    document.getElementById('saveQuestion').addEventListener('click', this.saveQuestion);
                });
                //var output = Mustache.render(_template.content, _template.templateVars);
                let output = _template.content;

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
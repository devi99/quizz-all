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
        let selectGenre = document.getElementById('genres');
        var selectedGenres = [...selectGenre.selectedOptions]
                          .map(option => option.value);
        let questionUpdate = {
                question_id: parseInt(pathArr[1]),
                title: getElById('title').value,
                subtext: getElById('subText').value,
                typequestion: parseInt(getElById('answerTypes').value),
                correctanswer: getElById('correctAnswer').value,  
                fakeanswer1: getElById('fakeAnswer1').value, 
                fakeanswer2: getElById('fakeAnswer2').value, 
                fakeanswer3: getElById('fakeAnswer3').value,
                fakeanswer4: getElById('fakeAnswer4').value, 
                fakeanswer5: getElById('fakeAnswer5').value, 
                typemedia: parseInt(getElById('typeMedia').value), 
                urlmedia: getElById('urlMedia').value,
                genres: selectedGenres
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
                
                if(pathArr[0] == 'new-question')  {
                    apiCall(window.config.apiUrl, '/api/questions/new', {}, "POST").then(result => {
                        let varInput = JSON.stringify(result);
                        let output = Mustache.render(_template.content, varInput);
                        document.getElementById('app-container').innerHTML = output;
                        document.getElementById('saveQuestion').addEventListener('click', this.saveQuestion);
                    });                    
                }else{
                    apiCall(window.config.apiUrl, '/api/question/' + pathArr[1], {}, "GET").then(result => {
                        let output = Mustache.render(_template.content, result);
                        document.getElementById('app-container').innerHTML = output;
                        let answerTypes = document.getElementById("answerTypes");
                        let indexTypes = result.typequestion > 0 ? result.typequestion - 1 : 0; 
                        answerTypes.options[indexTypes].selected = true;
                        let mediaTypes = document.getElementById("typeMedia");
                        indexTypes = result.typemedia > 0 ? result.typemedia - 1 : 0; 
                        mediaTypes.options[indexTypes].selected = true; 
                        let genres = document.getElementById("genres");
                        if(result.genres != null) {
                            result.genres.forEach(element => {
                                indexTypes = element > 0 ? element - 1 : 0; 
                                genres.options[indexTypes].selected = true;                                  
                            });
                        } 
                        document.getElementById('saveQuestion').addEventListener('click', this.saveQuestion);
                    });
                }
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
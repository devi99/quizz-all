import loadAppController from "../modules/baseFunc";
import * as htmlTemplate from '../templates/_form';
import { requiredFeaturesSupported, uploadRecord } from '../modules/indexedDB';
import uploadSingleImage from "../modules/uploadSingleImage";
// import { authenticateToGoogle, handleClientLoad } from '../modules/googlephotos';

class formCtrl {
    constructor() {
        //super();
        this.db = null;
        this.dbVersion = 1;
		this.dbReady = false;
        this.load();
    }
    
    load(){
        import(
            /* webpackMode: "lazy" */
            '../templates/_form.js').then(_template => {
                //var output = Mustache.render(_template.content, _template.templateVars);
                let output = _template.content;
                document.getElementById('app-container').innerHTML = output;
                requiredFeaturesSupported();
                //getElById('course-create-submit').addEventListener('click', update);
                let configUploadSingleImage = {
                    "parentNodeID": "image-upload",
                    "imageContainer": "parcel-image",
                    "event": {
                        "upload": function(items) {
                            //this.initDb();
                            let request = indexedDB.open('localFileStorage', this.dbVersion);

                            request.onerror = function(e) {
                                console.error('Unable to open database.');
                            }
                    
                            request.onsuccess = function(e) {
                                let db = e.target.result;
                                console.log('db opened');
                                ([...items]).forEach(file => {
                                    let reader = new FileReader();
                                    reader.readAsBinaryString(file);
                                    reader.onload = function(e) {
                                        let bits = e.target.result;
                                        let ob = {
                                            created:new Date(),
                                            name:document.getElementById("recordName").value,
                                            referentie:document.getElementById("recordReferentie").value,
                                            data:bits
                                        };
                            
                                        let trans = db.transaction(['fileObjects'], 'readwrite');
                                        let addReq = trans.objectStore('fileObjects').add(ob);
                            
                                        addReq.onerror = function(e) {
                                            console.log('error storing data');
                                            console.error(e);
                                        }
                            
                                        trans.oncomplete = function(e) {
                                            console.log('data stored');
                                        }
                                    }
                                }); 
                            }
                    
                            request.onupgradeneeded = function(e) {
                                let db = e.target.result;
                                db.createObjectStore('fileObjects', {keyPath:'id', autoIncrement: true});
                                //dbReady = true;
                            }          
                        }
                    }
                };
                let imageSelectEl = new uploadSingleImage(configUploadSingleImage);
                imageSelectEl.render();
            }).catch(err => {
                console.error(err);
            });
        // let gameArea  = document.getElementById("root");
        // gameArea.innerHTML = htmlTemplate.introScreenTemplate;
        // //document.querySelector('#pictureTest').addEventListener('change', this.doFile);
        // document.querySelector('#testImageBtn').addEventListener('click', this.doImageTest);
        // document.getElementById('login').addEventListener('click', authenticateToGoogle);
        // document.getElementById('uploadImageBtn').addEventListener('click', uploadRecord);

    }

    initDb() {
        let request = indexedDB.open('localFileStorage', this.dbVersion);

        request.onerror = function(e) {
            console.error('Unable to open database.');
        }

        request.onsuccess = function(e) {
            this.db = e.target.result;
            console.log('db opened');
        }

        request.onupgradeneeded = function(e) {
            db = e.target.result;
            db.createObjectStore('fileObjects', {keyPath:'id', autoIncrement: true});
            dbReady = true;
        }
    }
    
    doFile(e) {
        console.log('change event fired for input field');

        let file = e.target.files[0];
        var reader = new FileReader();
//				reader.readAsDataURL(file);
        reader.readAsBinaryString(file);

        reader.onload = function(e) {
            //alert(e.target.result);
            let bits = e.target.result;
            let ob = {
                created:new Date(),
                data:bits
            };

            let trans = db.transaction(['fileObjects'], 'readwrite');
            let addReq = trans.objectStore('fileObjects').add(ob);

            addReq.onerror = function(e) {
                console.log('error storing data');
                console.error(e);
            }

            trans.oncomplete = function(e) {
                console.log('data stored');
            }
        }
    }

    doImageTest() {
        console.log('doImageTest');
        let image = document.querySelector('#testImage');
        let recordToLoad = parseInt(document.querySelector('#recordToLoad').value,10);
        if(recordToLoad === '') recordToLoad = 1;

        let trans = db.transaction(['fileObjects'], 'readonly');
        //hard coded id
        let req = trans.objectStore('fileObjects').get(recordToLoad);
        req.onsuccess = function(e) {
            let record = e.target.result;
            console.log('get success', record);
            image.src = 'data:image/jpeg;base64,' + btoa(record.data);

            // Get window.URL object
            var URL = window.URL || window.webkitURL;
            // Create and revoke ObjectURL
            const url = URL.createObjectURL(record);
            const a = document.createElement('a');
            
            // Set the href and download attributes for the anchor element
            // You can optionally set other attributes like `title`, etc
            // Especially, if the anchor element will be attached to the DOM
            a.href = url;
            a.download = filename || 'download';
            
            // Click handler that releases the object URL after the element has been clicked
            // This is required for one-off downloads of the blob content
            const clickHandler = () => {
                setTimeout(() => {
                URL.revokeObjectURL(url);
                this.removeEventListener('click', clickHandler);
                }, 150);
            };
            
            // Add the click event listener on the anchor element
            // Comment out this line if you don't want a one-off download of the blob content
            a.addEventListener('click', clickHandler, false);
            
            // Programmatically trigger a click on the anchor element
            // Useful if you want the download to happen automatically
            // Without attaching the anchor element to the DOM
            // Comment out this line if you don't want an automatic download of the blob content
            a.click();
            
        }
    }
}

function init() {
    console.log('loaded now class');
    new formCtrl();
}

//export const init = formCtrl.prototype.init;
export { init };
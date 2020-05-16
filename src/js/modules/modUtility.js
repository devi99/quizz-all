/*

Use this class to extend the entryController from your app. It provides you with recurring functionalities across the itgApps platform.

*/
//import { relativeTimeRounding } from "moment";

export default class modUtility {
    constructor() {
        this.userRole = "All";
        this.currentFocus = '';
    }

    /* Apps + controllers */

    loadAppController(ctrlName) {

        let langSelect = window.selectedLang;

        import(
            /* webpackMode: "lazy" */
            // the js file with the entryCtrl entry from the json file is loaded from the ctrl folder by calling it's init function
            '../ctrl/' + ctrlName + '.js').then(res => {
                let appCtrl = res;
                loadLang(langSelect).then(res => {
                    appCtrl.init(res);
                }).catch(err => {
                    console.error(err);
                })
            }).catch(err => {
                // if the controller doesn't exist = app doesn't exist
                console.debug('Could not load controller ' + ctrlName, err);
                document.getElementById('app-container').innerHTML = `<h2>4-Oh-4</h2>${ctrlName} ?!? That's not a app, that's a bad URL`;
            });

    }

    // API call functions

    apiCall(apiUrl, apiPath, data = {}, type = "GET", contentType = "application/json") {

        return new Promise((resolve, reject) => {
            if (type.toLowerCase() == "get" || type.toLowerCase() == "head") {
                fetch(apiUrl + apiPath, {
                    method: 'GET',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': contentType
                    }
                }).then(res => {

                    if(contentType =="application/json") {
                        resolve(res.json());    
                    } else {
                        resolve(res);
                    }
                        
                }).catch(err => {
                    reject(err);
                });
            } else {
                fetch(apiUrl + apiPath, {
                    method: type,
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': contentType
                    },
                    redirect: 'follow',
                    referrer: 'no-referer',
                    body: JSON.stringify(data)
                }).then(res => {
                    if (contentType == "application/json" && type != "DELETE") {
                        if(res.status == 200) {
                            resolve(res.json());
                        } else {
                            console.log('resolve null');
                            reject(res);
                        }
                            
                    } else {
                        resolve(res);
                    }
                })
                    .catch(err => {
                    console.log('apiCall err: ', err);
                    reject(err);
                });
            }
        });

        /*
        if (type.toLowerCase() == "get" || type.toLowerCase() == "head") {
           acquireToken().then(bearerToken => {
               return fetch(window.config.api.apiUrl + apiPath, {
                    method: type,
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': contentType,
                        'Authorization': 'Bearer ' + bearerToken
                    },
                    redirect: 'follow',
                    referrer: 'no-referer'
                }).then(res => {
                    if (contentType == "application/json") {
                        return res.json();
                    } else {
                        return res;
                    }
                }).catch(err => {
                    console.log('apiCall err: ', err);
                });
            });
        }
        else { // PUT & POST ...
            return fetch(window.config.api.apiUrl + apiPath, {
                method: type,
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': contentType,
                    'Authorization': 'Bearer ' + bearerToken
                },
                redirect: 'follow',
                referrer: 'no-referer',
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (contentType == "application/json") {
                        return res.json();
                    } else {
                        return res;
                    }

                }).catch(err => {
                    console.log('apiCall err: ', err);
                });
        }
        */
    }

    apiUpload(apiPath, formData, progressID) {
        
        return new Promise((resolve, reject) => {
            fetch(window.config.api.apiUrl + apiPath, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': '*/*',
                    'Authorization': 'Bearer ' + token
                },
                redirect: 'follow',
                referrer: 'no-referer',
                body: formData
                
            }).then(res => {
                consumeUpload(res.body);
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.error('apiUpload err: ', err);
                reject(err);
            });
        });
    }

    consumeUpload(stream, total = 0) {
        while(stream.state === "readable") {
            var data = stream.read();
            total += data.byteLength;
            console.log('upload total: ', total);
        }

        if(stream.state === "waiting") {
            stream.ready.then(() => consumeUpload(stream, total));
        }

        return stream.closed;
    }

    fileExists(file) {
        return new Promise((resolve, reject) => {
            fetch(file, {
                method: 'GET',
                cache: 'no-cache'
            }).then(res => {
                console.log('file status: ', res.status);
                if (res.status == 200 || res.status == 304) {
                    resolve();
                } else {
                    reject();
                }
            }).catch(err => {
                reject();
            })
        });
    }

    uniqueArr(arrArg) {
        return arrArg.filter(function (elem, pos, arr) {
            return arr.indexOf(elem) == pos;
        });
    };

    // DOM & Form functions

    newEl(el) {
        return document.createElement(el);
    }

    getValueById(id) {
        // get the value from a form element by ID
        return document.getElementById(id).value;
    }

    getCheckboxState(id) {
        return document.getElementById(id).checked;
    }

    getElById(id) {
        return document.getElementById(id);
    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    fullMinutes(dt) {
        // adds a leading zero to minutes below 10 (9 -> 09)

        let d = new Date(dt);
        if (d.getMinutes() < 10) {
            return '0' + d.getMinutes();
        } else {
            return d.getMinutes();
        }
    }

    checkFutureDate(date) {
        let today = new Date();
        let d = new Date(date);
        if (today > d) {
            return false;
        } else {
            return true;
        }
    }

    showModal(q, t, f) {
        let modalbg = getElById('modal-bg');
        let modal = getElById('confirm-dialog');

        modalbg.style.display="block";
        modal.style.display = 'block';
        
        modalbg.style.height = document.body.clientHeight + "px";
        modal.style.top = window.scrollY + 150 + "px" ;  

        let modalQuestion = getElById('confirm-dialog-question');
        let modalFalse = getElById('confirm-dialog-false');
        let modalTrue = getElById('confirm-dialog-true');
        modalQuestion.innerHTML = q || "Are you sure?";
        modalTrue.innerHTML = t || "Yes";
        modalFalse.innerHTML = f || "No";
    }

    confirmModal(question, truebtn, falsebtn) {
        return new Promise((resolve, reject) => {

            showModal(question, truebtn, falsebtn);
            
            let modalbg = getElById('modal-bg');
            let modal = getElById('confirm-dialog');
            let modalFalse = getElById('confirm-dialog-false');
            let modalTrue = getElById('confirm-dialog-true');

            modalFalse.addEventListener('click',() => {
                reject();
                modal.style.display="none";
                modalbg.style.display="none";
            })

            modalTrue.addEventListener('click',() => {
                resolve();
                modal.style.display="none";
                modalbg.style.display="none";
            })
        });
    }

    closeAllTypeAheadLists() {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
 //           if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
//            }
        }
    }

    addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    capitalizeString(x) {
        return x.charAt(0).toUpperCase() + x.slice(1);
    }

    openDocument(docID, contentType, newTab) {
        
        // https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams

        return new Promise((resolve, reject) => {
            apiCall(window.config.api.apiUrl,'/api/document/' + docID, {}, "GET", "application/pdf")
            .then(docStream => new Response(docStream.body))
                .then(response => {
                    return response.blob();
                })
                .then(blob => {
                    // make sure the content-type is set to application/pdf
                    // so do some blob slicing and set a specific content type. 
                    // response.blob() doesn't take care of the content type.
                    blob = blob.slice(0, blob.size, contentType);
                    return blob;
                })    
                .then(blob => {
                    
                    // to bypass adBlockers use following:
                    //
                    // let win = window.open('/', '_blank');
                    // win.location = url;
                    // win.onload = () => {
                    //     win.location = URL.createObjectURL(blob);
                    // }

                    // this might get blocked by adBlockers
                    //
                    if(newTab) {
                        window.open(URL.createObjectURL(blob), '_blank');
                    } else {
                        window.open(URL.createObjectURL(blob));
                    }
                    resolve();
                })
                .catch(err => {
                    reject(err);
            })
        });
    }

    elementExists(el) {
        if(typeof(el) != 'undefined' && el != null) {
            return true;
        } else {
            return false;
        }
    }

    positionFooter() {
        let footer = document.getElementById('footer');
        let windowHeight = window.innerHeight;
        let documentHeight = document.body.clientHeight ;
        if(documentHeight < windowHeight) {
            footer.style.position = 'absolute';
            footer.style.bottom = 0;
        } else {
            footer.style.position = 'relative';
        }
    }

    stringToDom(str) {
        let domEl = document.createRange().createContextualFragment(str);
        return domEl;
    }

    renderTooltips() {
        let labels = document.querySelectorAll("label");
        labels.forEach(label => {
            let tooltipTxt = label.getAttribute('data-tooltip');
            if(tooltipTxt && tooltipTxt != "") {
                label.addEventListener('mouseover', (e) => {
                    // console.log(e.clientX + " : " + e.clientY);
                    let tooltipDiv = document.createElement('div');
                    tooltipDiv.id = 'active-tooltip';
                    tooltipDiv.innerHTML = '<i class="fas fa-question-circle"></i>'+tooltipTxt;
                    tooltipDiv.classList.add('tooltip-s');
                    // tooltipDiv.style.top = (e.clientY - 20) + "px";
                    // tooltipDiv.style.left = e.clientX + "px";
                    
                    e.target.parentNode.insertBefore(tooltipDiv, e.target.nextSibling);
                });
    
                label.addEventListener('mouseout', (e) => {
                    let activeTooltip = document.getElementById('active-tooltip');
                    if(activeTooltip) {
                        activeTooltip.remove();
                    }
                })
            }
            
        })
    }

    setInputsFromLocalStorage(storageIDs) {
        // loop through storageIDs
        storageIDs.forEach(item => {
            let el = document.getElementById(item);
            switch(el.tagName) {
                case 'SELECT':
                    //handle select
                    let opts = el.getElementsByTagName('OPTION');
                    for(let i = 0; i < opts.length; i++) {
                        opts[i].value == localStorage.getItem(item) ? opts[i].selected = true : opts[i].selected = false;
                    }
                    
                    break;
                case 'INPUT':
                    switch(el.type) {
                        case 'text':
                            //handle input text
                            localStorage.getItem(item) ? el.value = localStorage.getItem(item) : el.value='';
                            break;
                        case 'checkbox':
                            //handle checkbox
                            localStorage.getItem(item) ? el.checked = localStorage.getItem(item) : el.checked = false;
                            break;
                        case 'radio':
                            //handle radio
                            // TODO:
                            break;
                        default:
                            break;
                    }
                case 'TEXTAREA':
                    //handle textarea
                    localStorage.getItem(item) ? el.value = localStorage.getItem(item) : el.value = "";
                    break;
                default:
                    console.error('element has no tagName');
                    break;
            }
        });
    }

    clearInputsFromLocalStorage(storageIDs) {
        storageIDs.forEach(item => {
            localStorage.removeItem(item);
        })
    }

    generateTabulatorColumnSelect(table, toggleBoxed, container) {

        // toggle columns: 

        toggleBoxed.forEach(toggle => {
            let toggleDiv = document.createElement('div');
            toggleDiv.classList.add("column-toggle");
            
            toggleDiv.innerHTML = `
                <label class="toggle-label" id="label-${toggle.name}"><input type="checkbox" id="toggle-${toggle.name}" column-name="${toggle.name}" class="input-switch-xs"> &nbsp;&nbsp;${toggle.label}</label>
            `;

            container.append(toggleDiv);
        })

        
        let toggles = document.querySelectorAll('[id^="toggle-"]');
         // cookie has value
        toggles.forEach(t => {
               
            // if(toggleArr.length) { // use cookie settings
            //     let state = toggleArr.filter(tt => {
            //         return tt.name == t.getAttribute('column-name');
            //     });
            //     t.checked = state[0].state;
            //     if(state[0].state) {
            //         table.showColumn(state[0].name);
            //     } else {
            //         table.hideColumn(state[0].name);
            //     }
            // } else { // no cookie: default columns
                let tempCol  = table.getColumn(t.getAttribute('column-name'));            
                t.checked = tempCol._column.visible;
            //}
            t.addEventListener('click', (e) => {
                toggleColumn(table, e.target.getAttribute('column-name'));
            });
        });

        document.getElementById('show-toggles').addEventListener('click', (e) => {
            let toggles = document.getElementById("table-toggles");
            if( toggles.style.display == "block") {
                toggles.style.display = "none";
            } else {
                toggles.style.display = "block";
            }
        })
        // 
    }

    toggleColumn(table, colName) {
        table.toggleColumn(colName);
        
        // let cookieData = [];
        // let toggles = document.querySelectorAll('[id^="toggle-"]');
        // toggles.forEach(t => {
        //     cookieData.push({
        //         'name': t.getAttribute('column-name'),
        //         'state': t.checked
        //     })
        // })
    
        // // update cookie with toggle 
        // document.cookie = "columnToggle="+JSON.stringify(cookieData)+"; expires=Thu, 01 Jan 2040 12:00:00 UTC; path=/";

    }

    fixDate(d) {
        let dd = d.split('/');
        if(dd.length == 3) {
            return dd[2] + '-' + dd[1] + '-' + dd[0];
        } else {
            return '';
        }
        
    }
}

export const createSubNav = modUtility.prototype.createSubNav;
export const loadAppController = modUtility.prototype.loadAppController;
export const loadITMRooms = modUtility.prototype.loadITMRooms;
export const apiCall = modUtility.prototype.apiCall;
export const apiUpload = modUtility.prototype.apiUpload;
export const consumeUpload = modUtility.prototype.consumeUpload;
export const parseURL = modUtility.prototype.parseURL;
export const newEl = modUtility.prototype.newEl;
export const getValueById = modUtility.prototype.getValueById;
export const getElById = modUtility.prototype.getElById;
export const getCheckboxState = modUtility.prototype.getCheckboxState;
export const validateEmail = modUtility.prototype.validateEmail;
export const fullMinutes = modUtility.prototype.fullMinutes;
export const fileExists = modUtility.prototype.fileExists;
export const elementExists = modUtility.prototype.elementExists;
export const getAdDisplayName = modUtility.prototype.getAdDisplayName;
export const getExternalUserDisplayName = modUtility.prototype.getExternalUserDisplayName;
export const checkFutureDate = modUtility.prototype.checkFutureDate;
export const uniqueArr = modUtility.prototype.uniqueArr;
export const showModal = modUtility.prototype.showModal;
export const confirmModal = modUtility.prototype.confirmModal;
export const autocompleteSender = modUtility.prototype.autocompleteSender;
export const closeAllTypeAheadLists = modUtility.prototype.closeAllTypeAheadLists;
export const addActive = modUtility.prototype.addActive;
export const removeActive = modUtility.prototype.removeActive;
export const capitalizeString = modUtility.prototype.capitalizeString;
export const positionFooter = modUtility.prototype.positionFooter;
export const openDocument = modUtility.prototype.openDocument;
export const stringToDom = modUtility.prototype.stringToDom;
export const renderTooltips = modUtility.prototype.renderTooltips;
export const setInputsFromLocalStorage = modUtility.prototype.setInputsFromLocalStorage;
export const clearInputsFromLocalStorage = modUtility.prototype.clearInputsFromLocalStorage;
export const generateTabulatorColumnSelect = modUtility.prototype.generateTabulatorColumnSelect;
export const toggleColumn = modUtility.prototype.toggleColumn;
export const fixDate = modUtility.prototype.fixDate;

export var userRole = modUtility.prototype.userRole;
export var currentFocus = modUtility.prototype.currentFocus;
export var subCtrl = modUtility.prototype.subCtrl;
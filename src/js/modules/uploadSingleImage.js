//import { apiUpload } from "./modUtility";

export default class uploadSingleImage {
    constructor(jsonConfig) {
        //parentID = parentNodeID;
        inputData = jsonConfig;

        _template = `
          <div class="btn-upload-container">
            <div class="doc-upload">
              <input type="file" class="btn-upload-input" id="btn-upload-input">
              <i class="btn-upload fas fa-arrow-alt-circle-up" id="btn-upload"></i>Select an image... 
            </div> 
            <div class="drop-file padding-top-10" id="drop-file">
              Or drop an image...
            </div>
          </div>
    `;
    }

    render() {
        //let output = Mustache.render(_template, inputData);
        let container = document.getElementById(inputData.parentNodeID);
        container.innerHTML = _template;
        generateDragDrop();
        //let inputField = getElById(inputData.elementID);

        ////Get the courier list from the api and replace the index value with the courier name
        //apiCall(inputData.server, inputData.api, {}, "GET").then(res => {
        //    window[inputData.elementName] = res;
        //    autocomplete(inputField, res);
        //    Object.entries(res).forEach(([key, value]) => {
        //        if (value[inputData.apiFieldId] == inputData.elementValue) {
        //            inputField.value = value[inputData.apiFieldValue];
        //        }
        //    });

        //})
    }

    generateDragDrop() {
        let imgUpload = document.getElementById('image-upload');
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            imgUpload.addEventListener(eventName, preventDefaults, false);
        });
        imgUpload.addEventListener('dragover', dragOver, false);
        imgUpload.addEventListener('dragleave', dragLeave, false);
        imgUpload.addEventListener('drop', dragDrop, false);
        document.getElementById('btn-upload-input').addEventListener('change', function(){
            if (typeof (inputData.event) != "undefined") {
                if (typeof (inputData.event.upload) != "undefined") {
                    inputData.event.upload(this.files);
                }
            }
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    dragOver(e) {
        var t = e.target.id;
        if (t.includes("image-upload")) {
            e.target.classList.add('drop-highlight');
        } else {
            e.target.parentElement.classList.add('drop-highlight');
        }
    }

    dragLeave(e) {
        var t = e.target.id;
        if (t.includes("image-upload")) {
            e.target.classList.remove('drop-highlight');
        } else {
            e.target.parentElement.classList.remove('drop-highlight');
        }
    }

    dragDrop(e) {
        var t = e.target.id;
        if (t.includes("image-upload")) {
            e.target.classList.remove('drop-highlight');
        } else {
            e.target.parentElement.classList.remove('drop-highlight');
        }

        let dt = e.dataTransfer;
        let files = dt.files;
        handleUpload(files);
    }

    handleUpload(files) {
        ([...files]).forEach(file => {
            let tempSize = file.size / (1024 * 1024); // bytes to MB
            console.log(tempSize);
            // if (tempSize < 30) {
            //     let formData = new FormData();
            //     formData.append('file', file);
            //     formData.append('parcelId', inputData.linkToId);
            //     apiUpload(inputData.api, formData).then(res => {
            //         console.log('upload succeeded');
            //         let imageContainer = document.getElementById(inputData.imageContainer);
            //         imageContainer.style.display = 'block';
            //         imageContainer.src = '/img/parcels/' + inputData.linkToId + '.jpg?' + new Date().getTime();
            //         console.log('upload succeeded 2');
            //     }).catch(err => {
            //         console.error(err);
            //     });
            // } else {
            //     window.confirm("Filesize exceeds 30MB, please use a smaller file or zip it.");
            // }

        });
    }

    buttonUpload() {
        //handleUpload(this.files);
        if (typeof (_inputData.event) != "undefined") {
            if (typeof (_inputData.event.upload) != "undefined") {
                _inputData.event.upload(this.files);
            }
        }
    }

}

export var inputData = uploadSingleImage.prototype.inputData;
export var _template = uploadSingleImage.prototype._template;

export const render = uploadSingleImage.prototype.render;
export const generateDragDrop = uploadSingleImage.prototype.generateDragDrop;
export const preventDefaults = uploadSingleImage.prototype.preventDefaults;
export const dragLeave = uploadSingleImage.prototype.dragLeave;
export const uploadOver = uploadSingleImage.prototype.uploadOver;
export const dragDrop = uploadSingleImage.prototype.dragDrop;
export const dragOver = uploadSingleImage.prototype.dragOver;
export const handleUpload = uploadSingleImage.prototype.handleUpload;
export const buttonUpload = uploadSingleImage.prototype.buttonUpload;
export const loadCropper = uploadSingleImage.prototype.loadCropper;
export const confirmCropper = uploadSingleImage.prototype.confirmCropper;
export const hideCropper = uploadSingleImage.prototype.hideCropper;
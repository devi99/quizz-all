import Tabulator from 'tabulator-tables';

class syncCtrl {
    constructor() {
        //super();
        this.loadTemplate();
    }

    loadData() {
        return new Promise((resolve, reject) => {
            let tableData = [];
            let request = indexedDB.open('localFileStorage', this.dbVersion);

            request.onerror = function(e) {
                console.error('Unable to open database.');
            }
    
            request.onsuccess = function(e) {
                let db = e.target.result;
                console.log('db opened');
                var transaction = db.transaction("fileObjects", (IDBTransaction.READ_ONLY ? IDBTransaction.READ_ONLY : 'readonly')); // This is either successful or it throws an exception. Note that the ternary operator is for browsers that only support the READ_ONLY value.
                var objectStore = transaction.objectStore("fileObjects");
                try {
                    let cursorData = [];   
                    var cursorRequest = objectStore.openCursor();
              
                    cursorRequest.onerror = function(evt) {
                      console.log("cursorRequest.onerror fired in displayDB() - error code: " + (evt.target.error ? evt.target.error : evt.target.errorCode));
                      reject((evt.target.error ? evt.target.error : evt.target.errorCode));
                    }
                    cursorRequest.onsuccess = function(evt) {
                      console.log("cursorRequest.onsuccess fired in displayDB()");
              
                      var cursor = evt.target.result; // Get an object from the object store.
   
                      if (cursor) {
                        let item = {
                            "ID":cursor.value.id,
                            "created":cursor.value.created.toJSON(),
                            "name":cursor.value.name,
                            "referentie":cursor.value.referentie
                        };
                        cursorData.push(item);
                        cursor.continue(); // Move to the next object (that is, file) in the object store.
                        }else{
                            resolve(cursorData);
                      } 
              
                    } // cursorRequest.onsuccess
                  } // inner try
                  catch (innerException) {
                    console.log("Inner try exception in displayDB() - " + innerException.message);
                    reject(innerException);
                  } 
            }     
        });

    }

    drawTable(){

        var table = new Tabulator("#example-table", {
            data:tableData, //set initial table data
            columns:[
                {title:"ID", field:"ID"},
                {title:"Created", field:"created"},
                {title:"Name", field:"name"},
                {title:"Referentie", field:"referentie"}

            ],
        });
    }

    loadTemplate() {
        import(
            /* webpackMode: "lazy" */
            '../templates/_sync.js').then(_template => {
                document.getElementById('app-container').innerHTML = _template.content;
                this.loadData().then(tableData => {
                    var table = new Tabulator("#example-table", {
                        data:tableData, //set initial table data
                        columns:[
                            {title:"ID", field:"ID"},
                            {title:"Created", field:"created"},
                            {title:"Name", field:"name"},
                            {title:"Referentie", field:"referentie"}
                        ],
                    });
                });

            }).catch(err => {
                console.log(err);
            });
    }
}


function init() {
    console.log('loaded now sync');
    new syncCtrl();
}

//export const init = formCtrl.prototype.init;
export { init };
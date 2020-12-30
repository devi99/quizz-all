import Tabulator from 'tabulator-tables';
import { apiCall } from "../modules/modUtility.js";

class questionOverviewCtrl {
    constructor() {
        //super();
        this.loadTemplate();
    }

    drawTable(){
        var table = new Tabulator("#questions-table", {
            height:"600px",
            layout:"fitColumns",
            pagination:"local",
            paginationSize:20,
            columns:[
                {title:"Id", field:"question_id", visible:false},
                {title:"Title", field:"title",editor:true},
                {title:"Type", field:"typequestion", formatter:"lookup", formatterParams:{"1": "MultipleChoice","2": "SingleTextInput"}, editor:"select", editorParams:{values:{"0":"MultipleChoice", "1":"SingleTextInput"}}},
            ],
            ajaxURL:window.config.apiUrl+'/api/questions', //ajax URL
            cellEdited:function(cell){
                var data = cell.getData();

                let questionUpdate = {
                    'op': 'replace',
                    'path': cell.getField(),
                    'value': cell.getValue(),
                };
    
                apiCall(window.config.apiUrl, '/api/question/' + data.question_id + '/update', questionUpdate, "PATCH")
                .then(res => {
                        console.log("The contract details have been saved...")
                    })
                .catch(err => console.log('apiCall err: ', err));    
                //updateRow(data);
            },
            rowDblClick:function(e, row){
                var data = row.getData();

                displayRow(data.question_id);
                //e - the click event object
                //row - row component
            },
        });
             
        async function displayRow(id) {
            window.location.href = window.config.apiUrl + '/question/'+id;    
        }
    }

    loadTemplate() {
        import(
            /* webpackMode: "lazy" */
            '../templates/_questionOverview.js').then(_template => {
                document.getElementById('app-container').innerHTML = _template.content;
                this.drawTable();

            }).catch(err => {
                console.log(err);
            });
    }
}


function init() {
    console.log('loaded now sync');
    new questionOverviewCtrl();
}

//export const init = formCtrl.prototype.init;
export { init };
import Tabulator from 'tabulator-tables';

class genreOverviewCtrl {
    constructor() {
        //super();
        this.loadTemplate();
    }

    drawTable(){
        var table = new Tabulator("#gensres-table", {
            height:"600px",
            layout:"fitColumns",
            pagination:"local",
            paginationSize:20,
            columns:[
                {title:"Id", field:"id", visible:false},
                {title:"Title", field:"title",editor:true},
                {title:"Type", field:"typequestion", formatter:"lookup", formatterParams:{"0": "MultipleChoice","1": "SingleTextInput"}, editor:"select", editorParams:{values:{"0":"MultipleChoice", "1":"SingleTextInput"}}},
            ],
            ajaxURL:window.config.apiUrl+'/questions', //ajax URL
            cellEdited:function(cell){
                var data = cell.getData();
                updateRow(data);
            },
            rowDblClick:function(e, row){
                var data = row.getData();

                displayRow(data.id);
                //e - the click event object
                //row - row component
            },
        });

        async function updateRow(row) {

            let promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: window.config.apiUrl + '/questions',
                    dataType: 'json',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(row),
                    success: function( data, textStatus, jQxhr ){
                        $('#response pre').html( data );
                    },
                    error: function( jqXhr, textStatus, errorThrown ){
                        console.log( errorThrown );
                    }
                });
            });

            let result = await promise; // wait till the promise resolves (*)

        }
                 
        async function displayRow(id) {
            window.location.href = window.config.apiUrl + '/questions/'+id;    
        }
    }

    loadTemplate() {
        import(
            /* webpackMode: "lazy" */
            '../templates/_genreOverview.js').then(_template => {
                document.getElementById('app-container').innerHTML = _template.content;
                this.drawTable();

            }).catch(err => {
                console.log(err);
            });
    }
}


function init() {
    console.log('loaded now sync');
    new genreOverviewCtrl();
}

//export const init = formCtrl.prototype.init;
export { init };
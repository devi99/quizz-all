export default class baseFunc {

    constructor() {
    }

    loadAppController(ctrlName) {

        import(
            /* webpackMode: "lazy" */
            // the js file with the entryCtrl entry from the json file is loaded from the ctrl folder by calling it's init function
            '../ctrl/' + ctrlName + '.js').then(res => {
                res.init();
                //this.ui = new uiuxCtrl();
            }).catch(err => {
                // if the controller doesn't exist = app doesn't exist
                console.debug('Could not load controller ' + ctrlName, err);
                document.getElementById('app-container').innerHTML = `<h2>4-Oh-4</h2>${ctrlName} ?!? That's not a app, that's a bad URL`;
            });
    }
}

///export { loadAppController };
export const loadAppController = baseFunc.prototype.loadAppController;


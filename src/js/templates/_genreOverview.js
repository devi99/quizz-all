//Main Title Screen that appears when the page loads for the first time
export let content = `
<div class="container-fluid">
    <div id="genres-table"></div>
</div>

<div class="grid grid-pad">
    <div class="col-1-1">
        <div id="buttons">
        <button id="openButton">Create/Open DB</button>
        <!-- Clicking this opens the database. If there's no database to open, a database is created. -->
        <button id="displayButton">Display DB</button>
        <button id="deleteButton">Delete DB</button>
        <button class="gp-button raised" id="login">Connect to Google Photos</button>
        </div>
        <div id="messages">
        <p>If the database does not exist, clicking <strong>Create/Open DB</strong> creates it. If the database already exists, clicking <strong>Create/Open DB</strong> opens it.</p>
        <p>Thus, you must click the <strong>Create/Open DB</strong> button before clicking the <strong>Choose file</strong> button.</p>
        </div>    
    </div>
</div>
`;
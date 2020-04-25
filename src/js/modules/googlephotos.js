const config = require('./config');

 // Client ID and API key from the Developer Console
 var CLIENT_ID = config.oAuthClientID;

 // Array of API discovery doc URLs for APIs used by the quickstart
 var DISCOVERY_DOCS = ['https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest'];

 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
 var SCOPES = "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.readonly";

 //var authorizeButton = document.getElementById('authorize_button');
 //var signoutButton = document.getElementById('signout_button');

 /**
  *  On load, called to load the auth2 library and API client library.
  */
 function handleClientLoad() {
   gapi.load('client:auth2', initClient);
 }

 /**
  *  Initializes the API client library and sets up sign-in state
  *  listeners.
  */
 function initClient() {
   gapi.client.init({
   clientId: CLIENT_ID,
   discoveryDocs: DISCOVERY_DOCS,
   scope: SCOPES
 }).then(function () {
   // Listen for sign-in state changes.
   gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

 // Handle the initial sign-in state.
   updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
   //authorizeButton.onclick = handleAuthClick;
   //signoutButton.onclick = handleSignoutClick;
   });
 }

 /**
  *  Called when the signed in status changes, to update the UI
  *  appropriately. After a sign-in, the API is called.
  */
 function updateSigninStatus(isSignedIn) {
   if (isSignedIn) {
     //authorizeButton.style.display = 'none';
     //signoutButton.style.display = 'block';
     //execute();
   } else {
     //authorizeButton.style.display = 'block';
     //signoutButton.style.display = 'none';
   }
 }

 /**
  *  Sign in the user upon button click.
  */
 function authenticateToGoogle(event) {
   gapi.auth2.getAuthInstance().signIn();
 }

 /**
  *  Sign out the user upon button click.
  */
 function handleSignoutClick(event) {
   gapi.auth2.getAuthInstance().signOut();
 }

 function upload(image) {
    var i, l, d, array;
    d = image.data;
    l = d.length;
    array = new Uint8Array(l);
    for (var i = 0; i < l; i++){
        array[i] = d.charCodeAt(i);
    }
    var b = new Blob([array], {type: 'application/octet-stream'});

    var accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
    
    fetch('https://photoslibrary.googleapis.com/v1/uploads', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': 'Bearer '+ accessToken,
        'X-Goog-Upload-Protocol': 'raw'
        },
        body:b,
    })
    .then(function(response) {
        response.text().then(function(token) {
          uploadPhoto(token);
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    })  
    
    //console.log(getUploadToken);
    //uploadPhoto('CAISiQMAu+DD9Ku+J9Ni+1ESX9jYJFFm4DF8cyvuVPKF4NkX+U3vAtx50hn/SAsUxNZ4DHWWqKWBgmgW1zuCE/YS+AihhSKGAu4V3IWp3S7DYC8gO2zi6hEQF7VUqDO8BD4j+ekEMGzF3NHoihuhp7QRWPYoG+jTw2ovypsf6alt9SYvw378iYSsiKa3FzaaawGY8bsiUHUWQftguN0YrviEuS0T2zF+k7MgdmUDsFpnHbKAVkd0UzQHJQCEiuOyj72ZW8mL31sorK3L6Y9521zN6dYDAiABmJ2FVFBQtnmqlmdpJNY6ffXpkrSK2ubRZcR+/NmTfiVWTKd1v0ZPnZt/9ibwkFxQYcopDxzohpQNkNCDt60buZMQ947v3o4K+wrNU5hlo3ls1lX/YA6GhUlBTsb9S2JQMn/otT6t8+9NvhKowbK2lSP71S6OM1uEY3aCr73WYXnyUF9Dg7pul385mSRy5js+NrMv6g3TJ7jDPxdlV8K4xT7LYKAyHqmmtoKkFyiRzxRHWsLNdxw')
    
  
}
  
  function uploadPhoto(token){
    var accessToken = gapi.auth.getToken().access_token;

    fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accessToken,
        },
        body:JSON.stringify({
            //"albumId": albumId,
            "newMediaItems": [
                {
                    "description": "Event Photo",
                    "simpleMediaItem": {
                        "uploadToken": token
                    }
                }]
            })
    })
    .then((response) => {
        console.log('actual upload: ',response)
        //this.setState({ ready: true, image: null })
    }).catch((error) => {
        console.error('Error:', error);
    })
  }
  
  export { authenticateToGoogle, upload, handleClientLoad };
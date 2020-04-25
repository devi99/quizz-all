//Main Title Screen that appears when the page loads for the first time
export let introScreenTemplate = `
<div class="row">
    <div class="buttons">            
        <button id="btnCreateGame" class="btn left">CREATE</button>                
        <button id="btnJoinGame" class="btn right">JOIN</button>
    </div>
</div>
<div class="row">
    <div class="titleWrapper">
        <div class="title">
            kwispel 2.0 !
        </div>
    </div>
</div>
`;

// This screen appears when a user clicks "CREATE" on the Title Screen -->
export let createGameTemplate = `
    <section>
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i class="fas fa-4x fa-gem text-primary mb-3 sr-icon-1"></i>
                <h3 class="mb-3">Gametype:</h3>
                  <select id="gameTypes" class="form-control">
                      <option value="1">Fast Game</option>
                      <option value="2">Turn-based Game</option>
                  </select>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i class="fas fa-4x fa-paper-plane text-primary mb-3 sr-icon-2"></i>
                <h3 class="mb-3">Number of users:</h3>
                  <input type="number" id="nUsers" class="form-control" value="1">
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i class="fas fa-4x fa-code text-primary mb-3 sr-icon-3"></i>
                <h3 class="mb-3">Number of Questions: </h3>
                  <input type="number" id="nQuestions" class="form-control" value="4">                  
              </div>
            </div>
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i class="fas fa-4x fa-code text-primary mb-3 sr-icon-3"></i>
                <h3 class="mb-3">Genres: </h3>
                  <select id="selectedGenres" class="mdb-select md-form" multiple>
                  </select>        
              </div>
            </div>          
          </div>
        </div>
          <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 text-center">
              <div class="service-box mt-5 mx-auto">
                <i class="fas fa-4x fa-gem text-primary mb-3 sr-icon-1"></i>
                <h3 class="mb-3">Type of Answer:</h3>
                  <select id="answerTypes" class="form-control">
                      <option value="1">Multiple Choice</option>
                      <option value="2">Text Input</option>
                  </select>
              </div>
            </div>      
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <hr class="my-4">          
              <div class="buttons">
              <button id="btnStartGame" class="btn">START</button>
              <div style="clear:both"></div>
              </div>   
            </div>
          </div>
        </div>      
      </section>
`;


//<!-- This screen appears when a user clicks "START" on the Title Screen -->
export let startGameTemplate = `
    <div class="startGameWrapper">

        <div class="info">Open this site on your mobile device:</div>
        <div id="gameURL" class="infoBig">Error!</div>

        <div class="info">Then click <strong>JOIN</strong> and <br/> enter the following Game ID:</div>
        <div id="spanNewGameCode" class="gameId">Error!</div>

        <div id="playersWaiting"></div>

        <div class="info buttons">
            <button id="btnStartAnyway" class="btn">Start Anyway!</button>
        </div>
    </div>
    `;

//<!-- This scrreen appears when a player clicks "JOIN" on the Title Screen -->
export let joinGameTemplate = `
    <div class="joinGameWrapper">
        <div class="info">
            <label for="inputPlayerName">Your Name:</label>
            <input id="inputPlayerName" type="text" value="davy"/>
        </div>
  
        <div class="info">
            <label for="inputGameId">Game ID:</label>
            <input id="inputGameId" type="text"/>
        </div>
  
        <div class="info buttons">
            <button id="btnStart" class="btn">Start</button>
            <div id="playerWaitingMessage"></div>
        </div>
      </div>
`;

//<!-- This is the 'Host' screen. It displays the word for each player to match -->
export let hostGameTemplate = `
    <div id="playerScores" onclick="score_off()">
        <h3 id="Answer"></h3>
        <h2 id="countdownOverlay"></h2>
      </div>
      <div class="row">
        <div class="col-sm-2"></div>
        <div id="wordArea" class="col-sm-8">     
          <div id="hostWord"></div>
        </div> 
        <div class="col-sm-2"></div>
      </div>
      <div class="row">
        <div id="hostMedia" class="col-sm-12">
                <!-- <iframe width="100%" height="500" src="https://www.youtube.com/embed/VOcABtJTpho?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe> -->
                <!-- <img  src="http://www.lawyersgunsmoneyblog.com/wp-content/uploads/2015/12/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg" /> -->
        </div> 
      </div>
`;

export let leaderboardTemplate = ``;

    

import $ from 'jquery';
//import { playerObject } from '../libs/youtube';

class homeCtrl {
    constructor() {
        //super();
    }
    init() {
        console.log('loaded');
        $('#hostMedia').html("<div class='embed-container'><div id='yt'></div><div class='bar'></div></div>");
        this.videosPlayer = new YT.Player('yt', {
            width: '682',
            height: '383',
			videoId: '',
			playerVars: {
				origin : window.location.host
			},
            events: {
                'onReady': function(event){
                    console.debug(event.target.getPlayerState())
                    event.target.playVideo();
                  },
                'onStateChange': function(event){
                    console.debug(event.target.getPlayerState())
                  },
                'onError': function(e){
                    console.debug('ytError: ' + e)
                }
            }
        })

        //let urlMedia = prompt('url?');
        //let urlMedia = 'm2YJ7aR25P0';
        
        //playerObject.onYouTubeIframeAPIReady(urlMedia);
        //playerObject.playVideo();

        //document.getElementById('app-container').innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/y3jIkLwozRs?autoplay=1" frameborder="0" allow="autoplay;encrypted-media" allowfullscreen></iframe>';
    }
}

export const init = homeCtrl.prototype.init;
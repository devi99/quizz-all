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
    }
}

export const init = homeCtrl.prototype.init;
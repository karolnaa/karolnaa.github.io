function play(){
    var bgmusic = document.getElementById('bgmusic');
    var muteicon = document.getElementById('muteicon1');
    var muteicon2 = document.getElementById('muteicon2');
    var audio = document.getElementById('shoutsAudio');
    
    
    if (audio.paused) {
    audio.play();
    bgmusic.muted = true;
    muteicon2.classList.remove("la-play-circle");
    muteicon.classList.remove("la-volume-up")
    }else{
    audio.pause();
    bgmusic.muted = false;
    audio.currentTime = 0;
    muteicon2.classList.add("la-play-circle")
    muteicon.classList.add("la-volume-up")
    
    
    
}
audio.addEventListener('ended', (event) => {
    audio.pause();
    bgmusic.muted = false;
    audio.currentTime = 0;
    muteicon2.classList.add("la-play-circle")
    muteicon.classList.add("la-volume-up")
        });

}

function playbg(){
    var bgmusic = document.getElementById('bgmusic');
    var playIcon = document.getElementById('playicon');
     
    if (!bgmusic.paused) {
    bgmusic.pause();
    playIcon.classList.add("la-play-circle")

    }else{
    bgmusic.play();
    bgmusic.currentTime = 0;
    playIcon.classList.remove("la-play-circle");
    }
}

function mute(){
    var bgmusic = document.getElementById('bgmusic');
    var muteicon = document.getElementById('muteicon1');
    
    
  if(bgmusic.muted == false){
    bgmusic.muted = true;
    muteicon.classList.remove("la-volume-up")
    
  } else {
    bgmusic.muted = false;
    muteicon.classList.add("la-volume-up")
    
  }

  

}
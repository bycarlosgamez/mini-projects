const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//FUNCTIONS
//Play & pause video
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}

//Update play/pause icon
function updatePlayIcon(){
    if(video.paused){
        playBtn.innerHTML = '<i class="fa fa-play fa-2x">'
    } else {
        playBtn.innerHTML = '<i class="fa fa-pause fa-2x">'
    }
}

//Update preogress bar & timestamp
function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100;
    //UPDATE TIME and pass it to html
    //Get Minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }

    //Get Seconds
    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10){
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

//Set video time to preogress
function setVideoProgress(){
    video.currentTime = (progress.value * video.duration) / 100;
}

//Stop video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

//EVENT LISTENERS
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playBtn.addEventListener('click', toggleVideoStatus);

stopBtn.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
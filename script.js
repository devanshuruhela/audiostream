const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')
const audioElement = document.querySelector('audio');
const progresscontainer = document.getElementById('progress-container');
const progress = document.getElementById("progress");
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');


const currenttimeElt = document.getElementById('current-time');
const durationElt = document.getElementById('duration');

let isplaying = false;

const songs = [
  {
    name: "sample1",
    songname: "Music One",
    artist: "Artist One",
    image: "image1",
  },
  {
    name: "sample2",
    songname: "Music Two",
    artist: "Artist Two",
    image: "image2",
  },
  {
    name: "sample3",
    songname: "Music Three",
    artist: "Artist Three",
    image: "image3",
  },
  {
    name: "sample4",
    songname: "Music Four",
    artist: "Artist Four",
    image: "image4",
  }
];

function playmusic()
{
  isplaying = true;
  audioElement.play();
  play.classList.replace('fa-play' , 'fa-pause')
  play.setAttribute('title' , 'Pause')
}

function pausemusic()
{
  isplaying = false;
  audioElement.pause();
  play.classList.replace("fa-pause", "fa-play");
  play.setAttribute("title", "Play");
}


let songindex = 0;

function prevsong()
{
  songindex--;
  if(songindex<0)
  {
    songindex = songs.length - 1;
  }
  getsong(songs[songindex]);
  playmusic();
}

function nextsong()
{
  songindex++;
  if(songindex > songs.length)
  {
    songindex = 0;
  }
  
  getsong(songs[songindex]);
  playmusic();
}


function getsong(song)
{
  title.textContent = song.songname;
  artist.textContent = song.artist;
  audioElement.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.image}.jpg`;
}

function updateprogress(event)
{
  if(isplaying ===true)
  {
    const {duration , currentTime} = event.srcElement;
    const progressperc = (currentTime/duration)*100;
    progress.style.width = `${progressperc}%`

    //for duration
    let durationmin = Math.floor( duration/60);
    let durationsec = Math.floor(duration%60);
    if(durationsec < 10)
    {
      durationsec  = `0${durationsec}`
    }
    if(durationsec)
    {
      durationElt.textContent = `${durationmin}:${durationsec}`;
    }
    // for current time
        let currentmin = Math.floor(currentTime / 60);
        let currentsec = Math.floor(currentTime % 60);
        if (currentsec < 10) {
          currentsec = `0${currentsec}`;
        }
        currenttimeElt.textContent = `${currentmin}:${currentsec}`;
  }

}

function progressclickchange(event)
{
  const click = event.offsetX;
  const{duration} = audioElement;
  audioElement.currentTime = (click / this.clientWidth) * duration;
  playmusic();
}

play.addEventListener("click", () => (isplaying ? pausemusic() : playmusic()));

prev.addEventListener('click', prevsong);
next.addEventListener('click' , nextsong);

audioElement.addEventListener('ended' , nextsong);


progresscontainer.addEventListener('click', progressclickchange);
audioElement.addEventListener('timeupdate' , updateprogress)
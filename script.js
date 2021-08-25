const audioElement = document.querySelector('audio');

const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next')

let isplaying = false;

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

play.addEventListener('click' ,()=> (isplaying ? pausemusic() : playmusic()));

const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainter = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const currentTimeEl = document.getElementById("current-time");
const durartionEl = document.getElementById("duration");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];
// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");

  music.pause();
}

// Play or Pause Event Listener

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// NExt song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// Prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}
// On Load  - Select Fist Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMintues = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration element to avoid NaN
    if (durationSeconds) {
      durartionEl.textContent = `${durationMintues}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMintues = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMintues}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  console.log(e);
  const width = this.clientWidth;
  console.log(width, "width");
  // where we clicked on the progress container === offsetX
  const clickX = e.offsetX;
  const { duration } = music;
  console.log(music, "music");
  console.log(music.currentTime, "currentTime");
  music.currentTime = (clickX / width) * duration;
}

// Event Listners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    isPlaying ? pauseSong() : playSong();
  }
});
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
// In an event, this refers to the element that received the event.
progressContainter.addEventListener("click", setProgressBar);

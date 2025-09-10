document.addEventListener('DOMContentLoaded', function() {
  // REPRODUCTOR DE MÚSICA - VERSIÓN SIMPLIFICADA SIN ANALIZADOR DE AUDIO
  const audioPlayer = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const playlistItems = document.querySelectorAll('.playlist-item');
  const trackName = document.querySelector('.track-name');
  const artist = document.querySelector('.artist');
  const progressBar = document.querySelector('.progress');
  const progressContainer = document.querySelector('.progress-bar');
  const currentTimeEl = document.querySelector('.current-time');
  const durationEl = document.querySelector('.duration');
  const volumeSlider = document.getElementById('volume-slider');
  const visualizer = document.getElementById('visualizer');

  if (audioPlayer && playBtn && prevBtn && nextBtn && trackName && artist &&
    progressBar && progressContainer && currentTimeEl && durationEl &&
    volumeSlider && visualizer) {

    let visualizerCtx = null;
    try {
      visualizerCtx = visualizer.getContext('2d');
    } catch (e) {
      console.error("No se puede obtener el contexto del visualizador:", e);
    }

    const songs = [
      { name: "Knockin' On Heaven's Door", artist: "Guns N' Roses", file: "assets/music/guns.mp3" },
      { name: "Boulevard of Broken Dreams", artist: "Green Day", file: "assets/music/greenday.mp3" },
      { name: "Psychosocial", artist: "Slipknot", file: "assets/music/slipknot.mp3" }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let animationFrame;

    function drawVisualizer() {
      if (!isPlaying || !visualizerCtx) return;

      animationFrame = requestAnimationFrame(drawVisualizer);

      visualizerCtx.fillStyle = '#0a0a12';
      visualizerCtx.fillRect(0, 0, visualizer.width, visualizer.height);

      const barWidth = (visualizer.width / 32) * 2.5;
      let x = 0;

      for (let i = 0; i < 32; i++) {
        const barHeight = 10 + Math.random() * 40;
        const gradient = visualizerCtx.createLinearGradient(0, 0, 0, visualizer.height);
        gradient.addColorStop(0, '#ff00ff');
        gradient.addColorStop(0.5, '#00ffff');
        gradient.addColorStop(1, '#00ff41');

        visualizerCtx.fillStyle = gradient;
        visualizerCtx.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    function updateSongInfo() {
      trackName.textContent = songs[currentSongIndex].name;
      artist.textContent = songs[currentSongIndex].artist;
      audioPlayer.src = songs[currentSongIndex].file;
      audioPlayer.load();

      playlistItems.forEach((item, index) => {
        if (index === currentSongIndex) item.classList.add('active');
        else item.classList.remove('active');
      });
    }

    function playSong() {
      const playPromise = audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isPlaying = true;
          playBtn.textContent = "⏸";
          drawVisualizer();
        }).catch(error => console.log("Error al reproducir:", error));
      }
    }

    function pauseSong() {
      audioPlayer.pause();
      isPlaying = false;
      playBtn.textContent = "▶";
      cancelAnimationFrame(animationFrame);
      if (visualizerCtx) {
        visualizerCtx.fillStyle = '#0a0a12';
        visualizerCtx.fillRect(0, 0, visualizer.width, visualizer.height);
      }
    }

    function nextSong() {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      updateSongInfo();
      if (isPlaying) playSong();
    }

    function prevSong() {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      updateSongInfo();
      if (isPlaying) playSong();
    }

    function updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      if (!isFinite(duration)) return;

      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;

      const durationMinutes = Math.floor(duration / 60);
      const durationSeconds = Math.floor(duration % 60);
      const currentMinutes = Math.floor(currentTime / 60);
      const currentSeconds = Math.floor(currentTime % 60);

      durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    }

    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audioPlayer.duration;
      if (isFinite(duration)) audioPlayer.currentTime = (clickX / width) * duration;
    }

    playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    playlistItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentSongIndex = index;
        updateSongInfo();
        playSong();
      });
    });
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', function() { audioPlayer.volume = this.value; });
    audioPlayer.addEventListener('ended', nextSong);
    audioPlayer.addEventListener('error', () => { setTimeout(nextSong, 2000); });

    updateSongInfo();
    audioPlayer.load();
  }
});

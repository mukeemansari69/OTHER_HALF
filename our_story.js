window.onload = () => {
  if (window.innerWidth <= 768) {
    changeImage(0);
  }

  // Add play button overlay functionality for video in Heart Behind section
  const playButton = document.querySelector('.play-button-overlay');
  const video = document.querySelector('.main-visual-image');

  if (playButton && video) {
    // Add play and pause icons inside the play button overlay
    playButton.innerHTML = `
      <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white" style="display:none;">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </svg>
    `;

    const playIcon = playButton.querySelector('.play-icon');
    const pauseIcon = playButton.querySelector('.pause-icon');

    playButton.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        video.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    });

    // Initialize icons based on video state
    if (video.paused) {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    } else {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    }

    // Always show play button overlay
    playButton.style.display = 'flex';
  }
};


/* ########################################################################################################  Made by Dog People Seaction  sliding image             ################################################### */  

function scrollToCard(index) {
    const slider = document.getElementById('slider');
    const cardWidth = slider.children[0].offsetWidth;
    slider.scrollTo({ left: index * cardWidth, behavior: 'smooth' });

    const dots = document.querySelectorAll('.carousel-lines .line');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }


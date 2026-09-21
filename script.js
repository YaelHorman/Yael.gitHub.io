
const video = document.querySelector("#custom-video-player");

const artworkButtons = document.querySelectorAll(".artwork-list button");

const playPauseBtn = document.querySelector("#play-pause-btn");

const progressBar = document.querySelector("#progress-bar-fill");

const progressBarContainer = document.querySelector("#progress-bar");

const artworkNumber = document.querySelector("#artwork-number");

const artworkTitle = document.querySelector("#artwork-title");

const artworkCategory = document.querySelector("#artwork-category");

const artworkDescription = document.querySelector("#artwork-description");

const artworkYear = document.querySelector("#artwork-year");

const artworkAuthor = document.querySelector("#artwork-author");


// Remove the browser's default controls

video.removeAttribute("controls");

/*
  The artwork selector is the main interaction of the archive. When an 
  artwork is selected, the video and information panel update together 
  so that the media and its metadata stay synchronised.
  
  I used AI assistance to understand how data attributes could be read 
  with JavaScript and used to connect each artwork button with its 
  corresponding content.
*/

artworkButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const videoFile = button.dataset.video;

    const artworkIndex = button.dataset.number;

    const artworkName = button.dataset.title;

    const artworkCategoryText = button.dataset.category;

    const artworkDescriptionText = button.dataset.description;

    const artworkYearText = button.dataset.year;

    const artworkAuthorText = button.dataset.author;


    // Change video

    video.src = "video/" + videoFile;

    video.load();

    video.play();



   
    // Change play button

    playPauseBtn.textContent = "PAUSE";


    // Change artwork information

    artworkNumber.textContent = artworkIndex + " / 04";

    artworkTitle.textContent = artworkName;

    artworkCategory.textContent = artworkCategoryText;

    artworkDescription.textContent = artworkDescriptionText;

    artworkYear.textContent = artworkYearText;

    artworkAuthor.textContent = artworkAuthorText;

  });

});

/*
  The play button provides simple control over the viewing experience.
  It checks whether the video is currently playing or paused, 
  then changes both the video state and button text to provide 
  immediate feedback.
*/
// Play / Pause

playPauseBtn.addEventListener("click", togglePlayPause);


function togglePlayPause() {

  if (video.paused || video.ended) {

    video.play();

    playPauseBtn.textContent = "PAUSE";

  } else {

    video.pause();

    playPauseBtn.textContent = "PLAY";

  }

}

/*
  The progress bar gives the viewer visual feedback about the current
  position of the video. Its width is updated according to the video's
  current time and total duration.
*/
// Update progress bar

video.addEventListener("timeupdate", updateProgressBar);


function updateProgressBar() {

  const value =
    (video.currentTime / video.duration) * 100;

  progressBar.style.width = value + "%";

}

/*
  Clicking the progress bar allows the viewer to jump to another
  position in the video. The click position is converted into a 
  percentage of the video's total duration.
*/
// Click progress bar to change time

progressBarContainer.addEventListener("click", function (event) {

  const width = progressBarContainer.clientWidth;

  const clickPosition = event.offsetX;

  const newTime =
    (clickPosition / width) * video.duration;

  video.currentTime = newTime;

});

/*
  AI acknowledgement:
  ChatGPT was used to explain unfamiliar JavaScript concepts,assist
  with debugging, and help structure parts of the interaction.
  I reviewed and adapted the code and design decisions for the
  final project.
*/
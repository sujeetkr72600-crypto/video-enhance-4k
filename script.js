
const videoFile = document.getElementById("videoFile");
const videoPreview = document.getElementById("videoPreview");
const videoInfo = document.getElementById("videoInfo");
const enhanceBtn = document.getElementById("enhanceBtn");
const status = document.getElementById("status");

let selectedVideo = null;
let selectedQuality = "1080p";
let previewURL = null;

// Video upload
videoFile.addEventListener("change", function () {

  const file = this.files[0];

  if (!file) return;

  const allowedTypes = [
    "video/mp4",
    "video/quicktime",
    "video/webm"
  ];

  if (!allowedTypes.includes(file.type)) {
    status.textContent = "Please select MP4, MOV or WEBM video.";
    this.value = "";
    return;
  }

  if (file.size > 100 * 1024 * 1024) {
    status.textContent = "Video size must be under 100 MB.";
    this.value = "";
    return;
  }

  selectedVideo = file;

  if (previewURL) {
    URL.revokeObjectURL(previewURL);
  }

  previewURL = URL.createObjectURL(file);

  videoPreview.src = previewURL;
  videoPreview.hidden = false;

  videoInfo.textContent =
    "Selected: " + file.name +
    " | Size: " + (file.size / (1024 * 1024)).toFixed(2) + " MB";

  status.textContent = "Video uploaded in browser. Ready for next step.";
});

// Quality selection
const qualityButtons = document.querySelectorAll(".quality");

qualityButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    qualityButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    this.classList.add("active");

    selectedQuality = this.dataset.quality;

    status.textContent =
      "Selected output quality: " + selectedQuality;
  });

});

// AI Enhancement button
enhanceBtn.addEventListener("click", function () {

  if (!selectedVideo) {
    status.textContent = "Please upload a video first.";
    return;
  }

  status.textContent =
    "Your video is ready. AI processing engine will be connected in the next development step. Selected quality: " +
    selectedQuality;

});

window.addEventListener("beforeunload", function () {
  if (previewURL) {
    URL.revokeObjectURL(previewURL);
  }
});

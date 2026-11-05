
const videoFile = document.getElementById("videoFile");
const videoPreview = document.getElementById("videoPreview");
const videoInfo = document.getElementById("videoInfo");
const enhanceBtn = document.getElementById("enhanceBtn");
const status = document.getElementById("status");

let selectedVideo = null;
let selectedQuality = "1080p";
let previewURL = null;

// Video Upload
videoFile.addEventListener("change", function () {

  const file = this.files[0];

  if (!file) return;

  const allowedTypes = [
    "video/mp4",
    "video/quicktime",
    "video/webm"
  ];

  if (!allowedTypes.includes(file.type)) {
    status.textContent = "Unsupported video format!";
    this.value = "";
    return;
  }

  if (file.size > 100 * 1024 * 1024) {
    status.textContent = "Maximum video size is 100 MB.";
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
    "Video: " + file.name +
    " | Size: " +
    (file.size / (1024 * 1024)).toFixed(2) + " MB";

  status.textContent = "Video selected successfully!";
});

// Quality Selection
const qualityButtons =
  document.querySelectorAll(".quality");

qualityButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    qualityButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    this.classList.add("active");

    selectedQuality = this.dataset.quality;

    status.textContent =
      "Selected Quality: " + selectedQuality;

  });

});

// Enhance Button
enhanceBtn.addEventListener("click", function () {

  if (!selectedVideo) {
    status.textContent = "Please upload a video first!";
    return;
  }

  status.textContent =
    "Video ready for AI processing. Selected: " +
    selectedQuality +
    ". AI engine will be connected soon.";

});


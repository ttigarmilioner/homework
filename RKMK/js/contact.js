document.addEventListener("DOMContentLoaded", function () {
  const showUploadAreaBtn = document.getElementById("showUploadArea");
  const uploadArea = document.getElementById("uploadArea");
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const filePreview = document.getElementById("filePreview");

  // Массив для хранения всех файлов
  let uploadedFiles = [];

  // Показать область загрузки
  showUploadAreaBtn.addEventListener("click", function () {
    uploadArea.style.display = "block";
    this.style.display = "none";
  });

  // Обработка выбора файлов
  fileInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      addFiles(this.files);
      this.value = ""; // Сбрасываем значение для повторной загрузки тех же файлов
    }
  });

  // Drag and Drop обработчики
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    dropArea.classList.add("drag-over");
  }

  function unhighlight() {
    dropArea.classList.remove("drag-over");
  }

  dropArea.addEventListener("drop", function (e) {
    const dt = e.dataTransfer;
    if (dt.files.length > 0) {
      addFiles(dt.files);
    }
  });

  // Добавление новых файлов
  function addFiles(newFiles) {
    const filesArray = Array.from(newFiles);
    filesArray.forEach((file) => {
      uploadedFiles.push({
        file: file,
        progress: 0,
        element: null,
      });
    });
    renderFiles();
  }

  // Отрисовка всех файлов
  function renderFiles() {
    filePreview.innerHTML = "";

    uploadedFiles.forEach((fileData, index) => {
      const fileItem = document.createElement("div");
      fileItem.className = "file-preview-item";

      let displayName = fileData.file.name;
      if (fileData.file.name.length > 30) {
        displayName =
          fileData.file.name.substring(0, 25) +
          "..." +
          fileData.file.name.substring(fileData.file.name.length - 5);
      }

      fileItem.innerHTML = `
        <div class="progress-bar" id="progress-${index}" style="width: ${
        fileData.progress
      }%"></div>
        <div class="file-info">
          <div class="file-option">
            <span class="file-name">${displayName}</span>
            <span class="file-size">${formatFileSize(fileData.file.size)}</span>
          </div>
          <div class="file-delete">
            <span class="file-percent" id="percent-${index}">${
        fileData.progress
      }%</span>
            <span class="file-remove" data-file-index="${index}">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M10.98 0L10.98 1.15L10.99 1.15C10.99 1.83 11.41 2.38 11.94 2.38L16 2.38L16 4.66L0 4.66L0 2.38L4.05 2.38C4.58 2.38 5 1.83 5 1.15L5 0L10.98 0ZM3.16 18L1.48 5.96L14.51 5.96L12.84 18L3.16 18ZM5.91 14.82C6.65 14.82 7.24 14.26 7.24 13.58L7.24 9.85C7.24 9.17 6.65 8.62 5.91 8.62C5.17 8.62 4.58 9.17 4.58 9.85L4.58 13.58C4.58 14.26 5.17 14.82 5.91 14.82ZM10.08 14.82C10.82 14.82 11.41 14.26 11.41 13.58L11.41 9.85C11.41 9.17 10.82 8.62 10.08 8.62C9.34 8.62 8.75 9.17 8.75 9.85L8.75 13.58C8.75 14.26 9.34 14.82 10.08 14.82Z" fill="#262626"/>
              </svg>
            </span>
          </div>
        </div>
      `;

      filePreview.appendChild(fileItem);
      uploadedFiles[index].element = fileItem;

      // Запускаем "загрузку" файла
      simulateUploadProgress(index);
    });

    // Обработчик удаления файлов
    document.querySelectorAll(".file-remove").forEach((item) => {
      item.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-file-index"));
        uploadedFiles.splice(index, 1);
        renderFiles();
      });
    });
  }

  // Симуляция загрузки
  function simulateUploadProgress(index) {
    let progress = uploadedFiles[index].progress;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }

      uploadedFiles[index].progress = progress;

      const percentElement = document.querySelector(`#percent-${index}`);
      const progressBar = document.querySelector(`#progress-${index}`);

      if (percentElement)
        percentElement.textContent = Math.round(progress) + "%";
      if (progressBar) progressBar.style.width = progress + "%";
    }, 300);
  }

  // Форматирование размера файла
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
});

const ipcRenderer = require('electron').ipcRenderer
const remote = require('electron').remote
const fs = require('fs');

const image = document.getElementById('currentImage')
const debugElement = document.querySelector('.debug')

const filePrefix = 'file://'
let currentDirectory = ''
let currentFileName = ''
let currentIndex = 0

let currentFile = ipcRenderer.sendSync('get-file-data')
showDebug('openFile', currentFile)

if (!currentFile || currentFile === '.') {
  currentDirectory = 'C:\\'
} else {
  const fileNameIndex = currentFile.lastIndexOf('\\') + 1

  currentDirectory = currentFile.slice(0, fileNameIndex)
  currentFileName = currentFile.slice(fileNameIndex);
}

showDebug('openPath', currentDirectory)
showDebug('openFileName', currentFileName)

const allowedFileTypes = ['jpg', 'jpeg', 'png']

let images = []

fs.readdirSync(currentDirectory).forEach(file => {
  if (file.includes('.')) {
    const fileParts = file.split('.')

    if (allowedFileTypes.includes(fileParts[fileParts.length-1])) {
      images.push(file)
    }
  }
})

if (images.includes(currentFileName)) {
  currentIndex = images.indexOf(currentFileName)
}

setImage(currentIndex)

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      previousImage()
      break;
    case 'ArrowRight':
      nextImage()
      break;
    case 'd':
      toggleDebug()
  }
});

document.body.addEventListener('click', (event) => {
  if (event.target.dataset['close'] !== undefined) {
    remote.getCurrentWindow().close()
  }
})

function previousImage() {
  if (currentIndex > 0) {
    currentIndex--
  } else {
    currentIndex = images.length - 1
  }

  setImage(currentIndex)
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length

  setImage(currentIndex)
}

function setImage (index) {
  const imageSrc = filePrefix + currentDirectory + images[index]

  image.src = imageSrc

  showDebug('imageSrc', imageSrc)
}

function toggleDebug() {
  debugElement.classList.toggle('hidden')
}

function showDebug (target, content) {
  document.querySelector(`[data-debug=${target}]`).innerHTML = content
}
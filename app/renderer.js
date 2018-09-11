const ipcRenderer = require('electron').ipcRenderer

const image = document.getElementById('currentImage')

let directory = 'file://D:'
let currentIndex = 0
const imageFileNames = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
]

const data = ipcRenderer.sendSync('get-file-data')

showDebug('openFile', data)

if (data && data !== '.') {
  console.log(data)
  // const parts = data.split('\\')
  // directory = parts[0]
  // image.src = data
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      previousImage()
      break;
    case 'ArrowRight':
      nextImage()
      break;
  }
});

function previousImage() {
  if (currentIndex > 0) {
    currentIndex--
  }

  setImage(currentIndex)
}

function nextImage() {
  if (currentIndex < imageFileNames.length - 1) {
    currentIndex++
  }

  setImage(currentIndex)
}

function setImage (index) {
  const imageSrc = `${directory}\\${imageFileNames[index]}`

  image.src = imageSrc

  showDebug('imageSrc', imageSrc)
}

function showDebug (target, content) {
  document.querySelector(`[data-debug=${target}]`).innerHTML = content
}
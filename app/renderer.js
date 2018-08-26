const ipcRenderer = require('electron').ipcRenderer

const data = ipcRenderer.sendSync('get-file-data')

window.test = data

if (data && data !== '.') {
  console.log(data)
  document.getElementById('currentImage').src = data
}

const {app, BrowserWindow} = require('electron')

// Global reference of window object to prevent closing from garbage collection
let mainWindow

function createWindow () {
  // Create browser window
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadFile('index.html')

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object
    mainWindow = null
  })
}

app.on('ready', createWindow)

const { join } = require('path')
const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 400,
    minWidth: 400,
    height: 300,
    minHeight: 300,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false
    }
  })
  const url = 'file://' + join(__dirname, 'index.html')
  win.loadURL(url)
})

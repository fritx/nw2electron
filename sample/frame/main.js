const { join } = require('path')
const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 600,
    minWidth: 600,
    height: 400,
    minHeight: 400,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false
    }
  })
  const url = 'file://' + join(__dirname, 'index.html')
  win.loadURL(url)
})

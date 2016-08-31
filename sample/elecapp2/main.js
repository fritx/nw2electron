const { join } = require('path')
const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  const url = 'file://' + join(__dirname, 'login.html')
  const win = new BrowserWindow({
    width: 300,
    height: 200,
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false
    }
  })
  win.loadURL(url)
  win.on('ready-to-show', () => {
    win.show()
  })
})

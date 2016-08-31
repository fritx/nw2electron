const { BrowserWindow } = require('electron')
const { join } = require('path')

const wins = {}
function openWin (key) {
  const url = 'file://' +  join(__dirname, `${key}.html`)
  const win = new BrowserWindow({
    minWidth: 260,
    width: 260,
    maxWidth: 400,
    height: 470,
    minHeight: 440,
    maximizable: false,
    fullscreenable: false,
    title: 'Cryptocat',
    // show: false,
    webPreferences: {
      // preload: join(__dirname, 'renderer.js'),
      nodeIntegration: false
    }
  })
  win.loadURL(url)
  wins[key] = win
  // win.on('ready-to-show', () => { // >=1.2.3
  //   win.show()
  // })
  win.on('closed', () => {
    delete wins[key]
  })
  return win
}
exports.wins = wins
exports.openWin = openWin

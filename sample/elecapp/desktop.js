const { BrowserWindow } = require('electron')
const { join } = require('path')

const wins = {}
function openWin (key) {
  const url = join(__dirname, `${key}.html`)
  const win = new BrowserWindow({
    show: false
  })
  wins[key] = win
  win.loadURL(url)
  win.on('ready-to-show', () => { // >=1.2.3
    win.show()
  })
  win.on('closed', () => {
    delete wins[key]
  })
  return win
}
exports.wins = wins
exports.openWin = openWin

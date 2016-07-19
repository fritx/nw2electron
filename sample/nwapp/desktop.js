;(function () {

const gui = require('nw.gui')
const win = gui.Window.get()

function openWindow (url, opts) {
  gui.Window.open('login.html', opts)
}

function createTray (opts) {
  const tray = new gui.Tray(opts)
  return tray
}

window.gui = gui
window.win = win
window.openWindow = openWindow
window.createTray = createTray

})()

;(function () {
'use strict'

// remote
const { remote } = require('electron')
window.getGlobal = remote.getGlobal

// window
const win = remote.getCurrentWindow()
win.openDevTools() // debug
window.win = win

// ipc
window.ipc = remote.getGlobal('ipc')

})()

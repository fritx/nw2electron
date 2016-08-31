'use strict'
const join = require('path').join

// window
const { BrowserWindow } = require('electron')
const wins = {}
function getWins () {
  return wins
}
function openWin (key, opts) {
  opts = Object.assign({}, opts, {
    show: false
  })
  const url = 'file://' + join(__dirname, `${key}.html`)
  const win = new BrowserWindow(opts)
  win.loadURL(url)
  wins[key] = win
  win.on('ready-to-show', function () {
    win.show()
    win.focus()
  })
  win.on('closed', function () {
    delete wins[key]
  })
  return win
}
exports.openWin = openWin
exports.getWins = getWins

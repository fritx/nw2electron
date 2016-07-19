;(function () {
'use strict'
const gui = require('nw.gui')

// window
const wins = {}
function getWins () {
  return wins
}
function openWin (key, opts) {
  opts = opts || {}
  if (!('focus' in opts)) opts.focus = true
  const url = key + '.html'
  const win = gui.Window.open(url, opts)
  wins[key] = win
  win.on('close', function () {
    delete wins[key]
    setTimeout(function () {
      win.close(true)
    }, 0)
  })
  return win
}
global.getWins = getWins
global.openWin = openWin

// tray
let tray
function getTray () {
  return tray
}
function createTray (opts) {
  tray = new gui.Tray(opts)
  return tray
}
function updateTray (opts) {
  for (let key in opts) {
    tray[key] = opts[key]
  }
}
global.getTray = getTray
global.createTray = createTray
global.updateTray = updateTray

// user
let user = null
function getUser (value) {
  return user
}
function setUser (value) {
  user = value
}
global.getUser = getUser
global.setUser = setUser

})()

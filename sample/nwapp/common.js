;(function () {
'use strict'
const gui = require('nw.gui')

// window
const _win = gui.Window.get()
function getWin () {
  return _win
}
window.getWin = getWin

// global
for (let key in global) {
  if (!window[key]) window[key] = global[key]
}

})()

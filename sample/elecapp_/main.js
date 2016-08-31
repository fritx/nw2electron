'use strict'
const { app } = require('electron')
const { openWin, getWins } = require('./desktop')

// app
// app.on('window-all-closed', () => {
//   app.quit()
// })
app.on('ready', () => {
  openWin('login')
})

// ipc
const { EventEmitter } = require('events')
const ipc = new EventEmitter()
global.ipc = ipc
ipc.on('user-change', value => {
  if (value) {
    ipc.emit('user-login', value)
  }
  else {
    ipc.emit('user-logout')
  }
})

// user
const wins = getWins()
let user = null
ipc.on('user-login', value => {
  if (wins.login) wins.login.close()
  openWin('home')
})
ipc.on('user-logout', () => {
  if (wins.home) wins.home.close()
  openWin('login')
})
function setUser (value) {
  const prev = user
  user = value
  if (user !== prev) { // user change
    ipc.emit('user-change', user)
  }
}
global.getUser = getUser
function getUser () {
  return user
}
global.getUser = getUser

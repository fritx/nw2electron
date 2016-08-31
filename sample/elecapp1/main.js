const { app, ipcMain } = require('electron')
const { wins, openWin } = require('./desktop')
const { EventEmitter } = require('events')
const ipc = new EventEmitter()

let user = null
ipc.on('user-change', value => {
  if (value) {
    ipc.emit('user-login', value)
  }
  else {
    ipc.emit('user-logout')
  }
})
ipc.on('user-login', () => {
  if (wins.login) wins.login.close()
  openWin('home')
})
ipc.on('user-logout', () => {
  if (wins.home) wins.home.close()
  openWin('login')
})

ipcMain.on('set-user', (event, value) => {
  const prev = user
  user = value
  if (user !== prev) {
    ipc.emit('user-change', user)
  }
})

const noop = () => {}
app.on('will-quit', noop)
app.on('window-all-closed', noop)
app.on('ready', () => {
  openWin('login')
})

;(function () {
'use strict'
const gui = require('nw.gui')

// misc
global.App = gui.App

// ipc
const EventEmitter = require('events').EventEmitter
const ipc = new EventEmitter()
ipc.on('user-change', function (value) {
  if (value) {
    ipc.emit('user-login', value)
  }
  else {
    ipc.emit('user-logout')
  }
})
function getIPC () {
  return ipc
}
global.getIPC = getIPC

// window
const wins = {}
function getWins () {
  return wins
}
function openWin (key, opts) {
  opts = defaults(opts, {
    toolbar: false,
    show: false
  })
  const url = key + '.html'
  const win = gui.Window.open(url, opts)
  wins[key] = win
  win.on('loaded', function () {
    win.show()
    win.focus()
  })
  win.on('close', function () {
    delete wins[key]
    setTimeout(function () {
      win.close(true)
    }, 0)
  })
  return win
}
function showWin () {
  if (wins.home) {
    wins.home.focus()
  }
  else if (wins.login) {
    wins.login.focus()
  }
  else if (getUser()) {
    openWin('home')
  }
  else {
    openWin('login')
  }
}
global.getWins = getWins
global.openWin = openWin

// menu
const showItem = {
  label: 'Show',
  click: function () {
    showWin()
  }
}
const logoutItem = {
  label: 'Logout',
  click: function () {
    setUser(null)
  }
}
const quitItem = {
  label: 'Quit',
  click: function () {
    App.quit()
  }
}
const offlineMenu = [showItem, quitItem]
const onlineMenu = [showItem, logoutItem, quitItem]
function createMenu (items) {
  const menu = new gui.Menu()
  items.forEach(function (item) {
    menu.append(new gui.MenuItem(item))
  })
  return menu
}

// tray
const offlineTray = {
  menu: createMenu(offlineMenu),
  tooltip: 'nwapp',
  icon: 'offline.png'
}
const tray = createTray()
ipc.on('user-login', function (value) {
  updateTray({
    menu: createMenu(onlineMenu),
    tooltip: `nwapp: ${value}`,
    icon: 'online.png'
  })
  if (wins.login) wins.login.close()
  openWin('home')
})
ipc.on('user-logout', function () {
  updateTray(offlineTray)
  if (wins.home) wins.home.close()
  openWin('login')
})
function getTray () {
  return tray
}
function createTray (opts) {
  opts = defaults(opts, offlineTray)
  const tray = new gui.Tray(opts)
  tray.on('click', showWin)
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
function getUser () {
  return user
}
function setUser (value) {
  const prev = user
  user = value
  if (user !== prev) { // user change
    ipc.emit('user-change', user)
  }
}
global.getUser = getUser
global.setUser = setUser

// utils
function defaults (opts1, opts2) {
  opts1 = opts1 || {}
  for (let key in opts2) {
    if (typeof opts1[key] === 'undefined') {
      opts1[key] = opts2[key]
    }
  }
  return opts1
}

})()

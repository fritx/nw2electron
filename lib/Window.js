// https://github.com/nwjs/nw.js/wiki/Window
// http://electron.atom.io/docs/api/browser-window/
import {
  remote, nativeImage, webFrame, BrowserWindow
} from 'electron'
import { EventEmitter } from 'events'
import { resolve } from 'path'
import { parse } from 'url'

export default {
  get () {
    // assume in renderer process
    return remote.getCurrentWindow()
  },
  open (url, opts) {
    const _opts = convertOpts(opts)
    const _url = convertURL(url)
    const win = new BrowserWindow(_opts)
    win.loadURL(_url)
    return new ProxyWin(win)
  }
}

class ProxyWin extends EventEmitter {
  constructor (win) {
    this._win = win

    // proxy events
    const _emit = win.emit.bind(win)
    win.emit = (key, ...args) => {
      _emit(key, ...args)
      this.remit(...args)
    }
    const _cemit = win.webContents.emit
      .bind(win.webContents)
    win.webContents.emit = (key, ...args) => {
      _cemit(key, ...args)
      this.remit(...args)
    }

    // methods
    ;[
    'focus', 'blur', 'hide', 'reload',
    'setMaximumSize', 'setMinimumSize', 'setResizable',
    'maximize', 'unmaximize', 'minimize', 'restore',
    'setProgressBar',
  ].forEach(k => {
      this[k] = win[k].bind(win)
    })
  }

  remit (key, ...args) {
    // convert key only
    let k = {
      'enter-full-screen': 'enter-fullscreen',
      'leave-full-screen': 'leave-fullscreen',
      'did-finish-load': 'loaded',
    }[key] || key
    let v = args

    // convert both key/value
    switch (key) {
      case 'resize':
        v = this._win.getSize() // [w, h]
      case 'move':
      case 'moved':
        v = this._win.getPosition() // [x, y]
    }

    if (typeof v !== 'undefined') {
      this.emit(k, ...v)
    }
  }

  get x () {
    return this._win.getPosition()[0]
  }
  get y () {
    return this._win.getPosition()[1]
  }
  get width () {
    return this._win.getSize()[0]
  }
  get height () {
    return this._win.getSize()[1]
  }
  set x (v) {
    const [x, y] = this._win.getPosition()
    this._win.setPosition(v, y)
  }
  set y (v) {
    const [x, y] = this._win.getPosition()
    this._win.setPosition(x, v)
  }
  set width (v) {
    const [w, h] = this._win.getSize()
    this._win.setSize(v, h)
  }
  set height (v) {
    const [w, h] = this._win.getSize()
    this._win.setSize(w, v)
  }
  moveTo (x, y) {
    this._win.setPosition(x, y)
  }
  resizeTo (w, h) {
    this._win.setSize(w, h)
  }

  get isFullscreen () {
    return this._win.isFullscreen()
  }
  get isKioskMode () {
    return this._win.isKiosk()
  }
  get zoomLevel () {
    return webFrame.getZoomLevel()
  }
  set title () {
    this._win.getTitle()
  }
  set isFullscreen (v) {
    this._win.setFullscreen(v)
  }
  set isKioskMode (v) {
    this._win.setKiosk(v)
  }
  set zoomLevel (v) {
    webFrame.setZoomLevel(v)
  }
  set title (v) {
    this._win.setTitle(v)
  }
  set menu () {
    // todo
  }

  enterKioskMode () {
    this._win.setKiosk(true)
  }
  leaveKioskMode () {
    this._win.setKiosk(false)
  }
  toggleKioskMode () {
    const v = this._win.isKiosk()
    this._win.setKiosk(!v)
  }
  enterFullscreen () {
    this._win.setFullscreen(true)
  }
  leaveFullscreen () {
    this._win.setFullscreen(false)
  }
  toggleFullscreen () {
    const v = this._win.isFullscreen()
    this._win.setFullscreen(!v)
  }

  show () {
    this._win.showInactive()
  }
  close (force) {
    // todo
  }
  requestAttention (v) {
    this._win.flashFrame(!!v)
  }
  setShowInTaskbar (v) {
    this._win.setSkipTaskbar(!v)
  }
  setPosition (v) {
    if (v === 'center') {
      this._win.center()
    }
  }
}

function convertURL (url) {
  if (parse(url).protocol) return url
  return `file://${resolve(url)}`
}

function convertOpts (opts = {}) {
  const _opts = {}
  for (const key in opts) {
    // convert key only
    let k = {
      min_width: 'minWidth',
      min_height: 'minHeight',
      max_width: 'maxWidth',
      max_height: 'maxHeight',
      'always-on-top': 'alwaysOnTop',
    }[key] || key
    let v = opts[key]

    // convert both key/value
    switch (key) {
      case 'show_in_taskbar':
        k = 'skipTaskbar'
        v = !v
      case 'icon':
        v = nativeImage.createFromPath(resolve(v))
    }

    if (typeof v !== 'undefined') {
      _opts[k] = v
    }
  }
  return _opts
}

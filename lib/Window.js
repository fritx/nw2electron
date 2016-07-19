// Window

// https://github.com/nwjs/nw.js/wiki/Window
// Window
// - get([window_object])
// - open(url[, options])
// - proto
//   - window
//   - x / y / width / height
//   - moveTo(x, y) / moveBy(x, y)
//   - resizeTo(width, height) / resizeBy(width, height)
//   - focus() / blur()
//   - show() / hide()
//   - close([force])
//   - setBadgeLabel(label) WINDOWS/MACOS
//   - setShowInTaskbar(show)
//   - setResizable(resizable)
//   - requestAttention(bool/count)

// http://electron.atom.io/docs/api/browser-window/
// BrowserWindow
// - proto
//   - loadURL(url[, options])
//   - flashFrame(flag)
//   - setAlwaysOnTop(flag)
//   - setSkipTaskbar(skip)
//   - setResizable(resizable)
// app
// - setBadgeCount(count) LINUX/MACOS

import { BrowserWindow } from 'electron'

const win

const _win = {
  moveTo (x, y) {
    win.moveTo(x, y)
  },
  moveBy (x, y) {
    win.moveBy(x, y)
  },
  resizeTo (width, height) {
    win.resizeTo(width, height)
  },
  resizeBy (width, height) {
    win.resizeBy(width, height)
  },

  focus () {
    win.focus()
  },
  blur () {
    win.blur()
  },
  show () {
    win.show()
  },
  hide () {
    win.hide()
  },
  close (force) {
    win.close()
  },

  requestAttention (count) {
    win.flashFrame(!!count)
  },
  setBadgeLabel (label) {
    app.setBadgeCount(label)
  },
  setAlwaysOnTop (flag) {
    win.setAlwaysOnTop(flag)
  },
  setShowInTaskbar (show) {
    win.setSkipTaskbar(!show)
  },
  setResizable (resizable) {
    win.setResizable(resizable)
  }
}

export default  {
  get () {
    return _win
  }
}

// Screen
// https://github.com/nwjs/nw.js/wiki/Screen
// http://electron.atom.io/docs/api/screen/

import { screen } from 'electron'
import { EventEmitter } from 'events'

// http://stackoverflow.com/questions/10837203/how-to-extend-object-literal-objects-for-events-in-nodejs
const Screen = new EventEmitter()

Object.assign(Screen, {
  Init () {
    // noop
  },

  get screens () {
    return screen.getAllDisplays().map(d => {
      d.work_area = d.workArea
      return d
    })
  },

  remit (key, ...args) {
    let k = key
    let v = args
    // convert both key/value
    switch (key) {
      case 'display-added':
        k = 'displayAdded'
        v = args.slice(1, 1)
      case 'display-removed':
        k = 'displayRemoved'
        v = args.slice(1, 1)
      case 'display-metrics-changed':
        k = 'displayBoundsChanged'
        v = args.slice(1, 1)
    }
    this.emit(k, ...v)
  }
})

// proxy events
const _emit = ::screen.emit
screen.emit = function emit(key, ...args) {
  _emit(key, ...args)
  Screen.remit(key, ...args)
}

export default Screen

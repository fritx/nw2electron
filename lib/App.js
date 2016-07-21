// App
// https://github.com/nwjs/nw.js/wiki/App
// https://github.com/nwjs/nw.js/wiki/Shortcut
// http://electron.atom.io/docs/api/app/
// http://electron.atom.io/docs/api/global-shortcut/

import { app, globalShortcut } from 'electron'
import { EventEmitter } from 'events'

const App = new EventEmitter()
const noop = () => {}

// same methods
;['quit'].forEach(k => {
  App[k] = ::app[k]
})

Object.assign(App, {
  get argv () {
    return process.argv
  },
  get fullArgv () {
    return process.argv
  },
  get filteredArgv () {
    return []
  },
  get dataPath () {
    return app.getPath('userData')
  },

  registerGlobalHotKey (shortcut) {
    let { key, active, failed } = shortcut
    active = active || noop
    failed = failed || noop

    const ret = globalShortcut.register(key, () => {
      active()
      shortcut.emit('active')
    })
    if (!ret) {
      const msg = `Shortcut ${key} registration failed.`
      failed(msg)
      shortcut.emit('failed', msg)
    }
  },
  unregisterGlobalHotKey (shortcut) {
    globalShortcut.unregister(shortcut.key)
  },

  remit (key, ...args) {
    let k = key
    let v = args

    // convert key only
    let k = {
      'activate': 'reopen',
    }[key] || key
    let v = args

    // convert both key/value
    switch (key) {
      case 'open-file':
      case 'open-url':
        k = 'open'
        v = args[1] // todo: full cmd
    }
    this.emit(k, ...v)
  }
})

// proxy events
const _emit = ::app.emit
app.emit = function emit(key, ...args) {
  _emit(key, ...args)
  App.remit(key, ...args)
}

export default App

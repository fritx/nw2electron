// Shortcut
// https://github.com/nwjs/nw.js/wiki/Shortcut
// http://electron.atom.io/docs/api/global-shortcut/

import { EventEmitter } from 'events'

// todo: Ctrl vs Command on MacOS
// https://github.com/nwjs/nw.js/wiki/Shortcut#shortcutkey
class Shortcut extends EventEmitter {

  // todo: shortcut.id
  constructor ({ key, active, failed }) {
    super()
    Object.assign(this, { key, active, failed })
  }
}

export default Shortcut

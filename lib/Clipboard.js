// Clipboard

// https://github.com/nwjs/nw.js/wiki/Clipboard
// Clipboard
// - get()
// - proto
//   - set(data, [type])
//   - get([type])
//   - clear()

// http://electron.atom.io/docs/api/clipboard/
// clipboard
// - read([type])
// - write(text[, type])
// - clear([type])

import { clipboard } from 'electron'

const cp = {
  set (data, type) {
    clipboard.write(data, type)
  },
  get (type) {
    clipboard.read(data, type)
  },
  clear (type) {
    // clipboard.clear()
    clipboard.write('', type)
  }
}

export default  {
  get () {
    return cp
  }
}

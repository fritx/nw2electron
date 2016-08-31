// MenuItem
// https://github.com/nwjs/nw.js/wiki/MenuItem
// http://electron.atom.io/docs/api/menu-item/
// http://electron.atom.io/docs/api/accelerator/

import { MenuItem, nativeImage } from 'electron'
import { EventEmitter } from 'events'

class ProxyMenuItem extemds EventEmitter {

  constructor (opts) {
    super()

    if (opts.click) {
      const _click = opts.click
      opts.click = (...args) => {
        _click(...args)
        this.emit('click')
      }
    }

    this._item = new MenuItem(convertOpts(opts))
  }
}

export default ProxyMenuItem

function convertOpts (opts = {}) {
  const _opts = {}
  for (const key in opts) {
    let k = key
    let v = opts[key]

    // convert both key/value
    switch (key) {
      case 'key':
      case 'modifiers':
        k = 'accelerator'
        v = parseAccelerator(opts.key, otps.modifiers)
      case 'icon':
        v = nativeImage.createFromPath(resolve(v))
    }

    if (typeof v !== 'undefined') {
      _opts[k] = v
    }
  }
  return _opts
}

// fixme
function parseAccelerator (key, modifiers) {
  return `${modifiers}+${key}`
}

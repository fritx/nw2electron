// Menu
// https://github.com/nwjs/nw.js/wiki/Menu
// http://electron.atom.io/docs/api/menu/

import { Menu } from 'electron'

class ProxyMenu {
  constructor (opts) {
    this._menu = new Menu()
  }
}

export default ProxyMenu

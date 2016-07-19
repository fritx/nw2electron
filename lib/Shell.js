// Shell

// https://github.com/nwjs/nw.js/wiki/Shell
// - openExternal(URI)
// - openItem(file_path)
// - showItemInFolder(file_path)

// http://electron.atom.io/docs/api/shell/
// - showItemInFolder(fullPath)
// - openItem(fullPath)
// - openExternal(url[, options])
// - moveItemToTrash(fullPath)
// - beep()

import { shell } from 'electron'

export default {
  openExternal (URI) {
    shell.openExternal(URI)
  },
  openItem (file_path) {
    shell.openItem(file_path)
  },
  showItemInFolder (file_path) {
    shell.showItemInFolder(file_path)
  }
}

// App

// https://github.com/nwjs/nw.js/wiki/App
// - argv
// - fullArgv
// - dataPath
// - manifest
// - quit()
// - closeAllWindows()
// - registerGlobalHotKey(shortcut)
// - unregisterGlobalHotKey(shortcut)
// - events
//   - open
//   - reopen

// http://electron.atom.io/docs/api/app/
// - quit()
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

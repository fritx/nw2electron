nw.gui

- [x] App
  - quit()
  - registerGlobalHotKey(shortcut)
  - unregisterGlobalHotKey(shortcut)
- [x] Clipboard
  - get()
  - proto
    - set(data, [type])
    - get([type])
    - clear()
- [ ] Menu
- [x] MenuItem
- [x] Screen
  - Init()
  - screens
- [x] Shell
  - openExternal(URI)
  - openItem(file_path)
  - showItemInFolder(file_path)
- [x] Shortcut
- [ ] Tray
- [x] Window
  - get()
  - open()

- Mac Menu http://electron.atom.io/docs/api/menu/

- Detect support for transparent in Electron https://github.com/electron/electron/issues/381#issuecomment-233291779

- win.on/removeListener => ipc.on/send

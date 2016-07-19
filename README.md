nw.gui

- [ ] App
  - quit()
  - on()
- [x] Clipboard
  - get()
  - proto
    - set(data, [type])
    - get([type])
    - clear()
- [ ] Menu
- [ ] MenuItem
- [ ] Screen
  - Init()
  - screens
- [x] Shell
  - openExternal(URI)
  - openItem(file_path)
  - showItemInFolder(file_path)
- [ ] Shortcut
- [ ] Tray
- [ ] Window
  - get()
  - open()
  - proto

- Detect support for transparent in Electron https://github.com/electron/electron/issues/381#issuecomment-233291779

- win.on/removeListener => ipc.on/send

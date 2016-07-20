const { remote } = require('electron')
const win = remote.getCurrentWindow()

global.win = win
global.Constant = {
  IS_WIN: process.platform === 'win32',
  IS_MAC: process.platform === 'darwin',
  TRANSPARENT: true,
}

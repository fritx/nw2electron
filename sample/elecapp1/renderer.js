;((exports) => {

const { ipcRenderer } = require('electron')

function setUser (value) {
  ipcRenderer.send('set-user', value)
}
exports.setUser = setUser

})(window._renderer = {})

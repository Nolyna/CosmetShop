 const { Menu, MenuItem } = require('electron').remote

 const menu1 = new Menu()
 menu1.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
 menu1.append(new MenuItem({ type: 'separator' }))
 menu1.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

 window.addEventListener('contextmenu', (e) => {
     e.preventDefault()
     menu1.popup(remote.getCurrentWindow())
 }, false)
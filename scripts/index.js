var ipc = require('electron').ipcRenderer;
//Menu de ma page
var remote = require('electron').remote;
const { Menu, MenuItem } = remote.require('menu', 'menuItem');
//var Menu1 = remote.require('Menu');

const menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false)

/*var menu = Menu1.buildFromTemplate([{
    label: 'Cosmet',
    submenu: [{
        label: 'test',
        click: function() { ipc.send('show-addf') }
    }]
}])

Menu1.setApplicationMenu(menu);*/

$(document).ready(function() {
    //# for id
    $('#bonjour').html('Bienvenue dans Cosmet Shop');

    $("#target").click(function() {
        //window.onload('.. / doc / store.html');
    });


});
const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {
    //Queries
    $("body").fadeIn(2000); // Fade In Effect when Page Load..
    $('#bonjour').html('Gestion des produits');
    UpdateTable();

    $("select").change(function(event) {
        UpdateTable();
    });
    // Ipc 

    ipcRenderer.on('produits-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 0;
            arg.forEach(function(sproduits) {
                ipcRenderer.send('SelectProduit2', sproduits.idp);
                ipcRenderer.on('produits-reply2', function(Object, arg) {
                    VueProduitTable(x, sproduits, arg);
                    x++;
                });
            });
        } else {
            $('.listeProduits tbody').append("<tr><td colspan='10'>" + arg + "</td></tr>");
        }
    })

    // Functions
    function EmptyTable() {
        $('.listeProduits tbody').html('');
    }

    ipcRenderer.on('updatePage', function() {
        EmptyTable();
        ipcRenderer.send('all-storeProduit');
    })

    function RefreshTable() {
        EmptyTable();
        $(".listeProduits").load("../doc/store.html .listeProduits");
        ipcRenderer.send('all-storeProduit');
    }

    function UpdateTable() {
        EmptyTable();
        if ($('#filter').val() == "nom") {
            ipcRenderer.send('ProduitByNom');
        } else if ($('#filter').val() == "dateexp") {
            ipcRenderer.send('ProduitByDate');
        } else if ($('#filter').val() == "qte") {
            ipcRenderer.send('ProduitByQteH');
        } else if ($('#filter').val() == "price") {
            ipcRenderer.send('ProduitByPrice');
        } else {
            ipcRenderer.send('all-storeProduit');
        }
    }

    function VueProduitTable(x, y, z) {
        $('.listeProduits tbody').append("<tr><td>" + x + "</td><td>" + z.nom + "</td><td>" + z.forme + "</td><td>" + z.type + "</td><td>" + y.qte_store + "</td><td>" + y.date + "</td><td>" + z.PV + "</td><td><button class='transfer' onClick='transfer(" + y.qte_home + ",\"" + z.nom + "\"," + y.id + ")'> Transfer </button></td><td><button class='vendre' onClick='vendre(" + y.qte_store + ",\"" + z.nom + "\"," + y.id + ")'> vendre </button></td></tr>");
    }

});
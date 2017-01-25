const ipcRenderer = require('electron').ipcRenderer;


$(document).ready(function() {

    // $('#bonjour').html('Gestion des fournisseurs');

    function UpdateTable() {
        EmptyTable();
        if ($('#filter').val() == "tpe") {
            ipcRenderer.send('ProduitByType');
        } else if ($('#filter').val() == "nom") {
            ipcRenderer.send('ProduitByNom');
        } else if ($('#filter').val() == "dateexp") {
            ipcRenderer.send('ProduitByDate');
        } else if ($('#filter').val() == "qte") {
            ipcRenderer.send('ProduitByQteH');
        } else if ($('#filter').val() == "price") {
            ipcRenderer.send('ProduitByPrice');
        } else if ($('#filter').val() == "formeP") {
            ipcRenderer.send('ProduitByForme');
        } else {
            ipcRenderer.send('all-homeProduits');
        }
    }

    function VueProduitTable(x, y, z) {
        $('.listeProduits tbody').append("<tr><td>" + x + "</td><td>" + z.nom + "</td><td>" + z.forme + "</td><td>" + z.type + "</td><td>" + y.qte_home + "</td><td>" + y.date + "</td><td>" + z.PV + "</td><td><button class='transfer' onClick='transfer(" + y.qte_home + ",\"" + z.nom + "\"," + y.id + ")'> Transfer </button></td><td><button class='vendre' onClick='vendre(" + y.qte_store + ",\"" + z.nom + "\"," + y.id + ")'> vendre </button></td></tr>");
    }

    function EmptyTable() {
        $('.listeProduits tbody').html('');
    }

    // affiche tous les fournisseur enregistrer dans la table
    UpdateTable();
    ipcRenderer.on('produits-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 0;
            arg.forEach(function(sproduits) {
                ipcRenderer.send('SelectProduit2', sproduits.idp);
                ipcRenderer.on('produits-reply2', function(Object, res) {
                    VueProduitTable(x, sproduits, res);
                    x++;
                });
            });
        } else {
            $('.listeProduits tbody').append("<tr><td colspan='10'>" + arg + "</td></tr>");
        }
    })

    ipcRenderer.on('updatePage', function() {
        UpdateTable();
    })

    $("select").change(function(event) {
        UpdateTable();
    });

    $('#add').click(
        function(event) {
            ipcRenderer.send('display-addProduit');
        }
    );

    $("#search").keyup(function() {
        $("#search").submit()
    });

    $("#search").submit(function() {
        valeur = $('#searchvalue').val();
        ipcRenderer.send('SearchHomeProduit', valeur);
    });

    /*$('.transfer').on("click",
        function(event) {
            var qteH = $(this).attr('id');
            var nom = $(this).attr('name');
            var dialog = confirm("\312tes vous s\373re de vouloir transf\351rer " + nom + "  au magasin");
            if (dialog == true) {
                var dialog2 = prompt("Entrer la quantit\351 de " + nom + " a transf\351rer");
                if (dialog2 != null) {
                    if ($.isNumeric(dialog2)) {
                        if (dialog2 <= qteH) {
                            var transfer = { id: $(this).attr('value'), qte: dialog2 }
                            ipcRenderer.send('transfer-Produit', transfer);
                            UpdateTable();
                            alert('Transfer Effectu\351 ');
                        } else {
                            alert('Impossible de transf\351rer, seulement ' + qteH + ' produits sont disponible');
                            event.preventDefault();
                        }
                    } else {
                        alert('Entrer un nombre');
                        event.preventDefault();
                    }
                }
            }
        }
    )

    $('.addQte').on("click",
        function(event) {
            var id = $(this).attr('value');
            ipcRenderer.send('display-transferProd');
            ipcRenderer.send('SelectProduitQte', id);
        }
    )

    $('.vendre').on("click",
        function(event) {
            var qteS = $(this).attr('id');
            var nom = $(this).attr('name');
            var dialog = prompt("Entrer la quantit\351 de " + nom + " vendu");
            if (dialog != null) {
                if ($.isNumeric(dialog)) {
                    if (dialog <= qteS) {
                        var vente = { id: $(this).attr('value'), qte: dialog }
                        ipcRenderer.send('addvente', vente);
                        UpdateTable();
                        alert('Vente enregistr\351e ');
                    } else {
                        alert('Impossible, seulement ' + qteS + ' produits sont disponible');
                        event.preventDefault();
                    }
                } else {
                    alert('Entrer un nombre');
                    event.preventDefault();
                }
            }
        }
    )*/


});
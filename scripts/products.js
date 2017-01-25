const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {
    //Queries
    $("body").fadeIn(2000); // Fade In Effect when Page Load..
    $('#bonjour').html('Gestion des produits');
    RefreshTable();

    $('#add').click(
        function(event) {
            ipcRenderer.send('display-addProduit');
            ipcRenderer.send('update-prodselect');
        }
    )

    /* $('.delete').on("click",
         function(event) {
             var id = $(this).attr('value');
             var nom = $(this).attr('name');
             var dialog = confirm("\312tes vous s\373re de vouloir supprimer " + nom + " ? \/br **Cela supprimera toute les donn\351es y compris ceux en stock \/br **Attention la suppresion est definitive");
             if (dialog == true) {
                 ipcRenderer.send('delete-Produit', id);
                 UpdateTable();
                 alert('Suppression effectu\351e ');
             }
         }
     )

     $('.modif').on("click",
         function(event) {
             var id = $(this).attr('value');
             ipcRenderer.send('display-modifProduit');
             ipcRenderer.send('SelectProduit', id);
         }
     )

     $('.detail').on("click",
         function(event) {
             var id = $(this).attr('value');
             ipcRenderer.send('display-detailProduit');
             ipcRenderer.send('SelectProduit1', id);
         }
     )*/

    $("select").change(function(event) {
        UpdateTable();
    });

    $('#search').submit(
            function(event) {
                var search = $('#textsearch').val();
                if (search == '') {
                    $("#error").text('Remplir le champ').show().fadeOut(3000);
                    event.preventDefault();
                } else {
                    EmptyTable();
                    ipcRenderer.send('search-produit', search);
                    event.preventDefault();

                }
            }
        )
        // Ipc 

    ipcRenderer.on('produits-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 0;
            arg.forEach(function(produits) {
                VueProduitTable(x, produits);
                x++;
            });
        } else {
            $('.listeProduits tbody').append("<tr><td colspan='9'>" + arg + "</td></tr>");
        }
    })

    // Functions
    function EmptyTable() {
        $('.listeProduits tbody').html('');
    }

    ipcRenderer.on('updatePage', function() {
        EmptyTable();
        ipcRenderer.send('all-produit');
    })

    function RefreshTable() {
        EmptyTable();
        $(".listeProduits").load("../doc/products.html .listeProduits");
        ipcRenderer.send('all-produit');
    }

    function UpdateTable() {
        EmptyTable();
        if ($('#filter').val() == "type") {
            ipcRenderer.send('ProduitByType');
        } else if ($('#filter').val() == "nom") {
            ipcRenderer.send('ProduitByNom');
        } else if ($('#filter').val() == "qte") {
            ipcRenderer.send('ProduitByQte');
        } else if ($('#filter').val() == "price1") {
            ipcRenderer.send('ProduitByPriceA');
        } else if ($('#filter').val() == "price2") {
            ipcRenderer.send('ProduitByPriceV');
        } else if ($('#filter').val() == "formeP") {
            ipcRenderer.send('ProduitByForme');
        } else {
            ipcRenderer.send('all-produit');
        }
    }

    function VueProduitTable(x, f) {
        $('.listeProduits tbody').append("<tr><td>" + x + "</td><td>" + f.nom + "</td><td> " + f.descr + "</td><td>" + f.forme + "</td><td>" + f.type + "</td><td>" + f.qte + "</td><td>" + f.prixA + "</td><td>" + f.prixV + "</td><td><button class='detail' onClick='detail(" + f.id + ")'> Details </button></td><td><button class='modif' onClick='modify(" + f.id + ")'> Modifier </button></td><td><button class='delete' onClick='suppresion(" + f.id + ",\"" + f.nom + "\")'> Supprimer</button></td></tr>");
    }

});
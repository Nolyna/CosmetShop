const ipcRenderer = require('electron').ipcRenderer;


$(document).ready(function() {
    //# for id
    $('#bonjour').html('Gestion des fournisseurs');

    function RefreshTable() {
        $(".listeFournisseur").load("../doc/fournisseur.html .listeFournisseur");
        ipcRenderer.send('all-fournisseur');
    }

    function UpdateTable() {
        EmptyTable();
        if ($('#filter').val() == "tpe") {
            ipcRenderer.send('fournisseurByType');
        } else if ($('#filter').val() == "nom") {
            ipcRenderer.send('fournisseurByNom');
        } else {
            ipcRenderer.send('all-fournisseur');
        }
    }

    function VueFournisseurTable(x, f) {
        $('.listeFournisseur tbody').append("<tr><td>" + x + "</td><td>" + f.nom + " " + f.prenom + "</td><td>" + f.email + "</td><td>" + f.phone + "</td><td>" + f.typeF + "</td><td><button class='modif' onClick='modify(" + f.id + ")'> Modifier </button></td><td><button class='delete' onClick='suppression(" + f.id + ",\"" + f.nom + "\",\"" + f.prenom + "\") '> Supprimer</button></td></tr>");
    }

    function EmptyTable() {
        $('.listeFournisseur tbody').html('');
    }

    // affiche tous les fournisseur enregistrer dans la table
    UpdateTable();
    ipcRenderer.on('fournisseurs-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 0;
            arg.forEach(function(fournisseurs) {
                VueFournisseurTable(x, fournisseurs);
                x++;
            });
        } else {
            $('.listeFournisseur').append("<tr><th>" + arg + "</tr></th>");
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
            ipcRenderer.send('display-addFournisseur');
        }
    );

    $('#search').submit(
        function(event) {
            var search = $('#textsearch').val();
            if (search == '') {
                $("#error").text('Remplir le champ').show().fadeOut(3000);
                event.preventDefault();
            } else {
                EmptyTable();
                ipcRenderer.send('search-fournisseur', search);
                event.preventDefault();

            }
        }
    )


});
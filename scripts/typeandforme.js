const ipcRenderer = require('electron').ipcRenderer;


$(document).ready(function() {
    //# for id
    $('#btype').html('Gestion des types');
    $('#bforme').html('Gestion des formes');

    function RefreshTable() {
        $(".listeForme").load("../doc/typeandforme.html .listeForme");
        $(".listeType").load("../doc/typeandforme.html .listeType");
        ipcRenderer.send('all-typeProduit');
        ipcRenderer.send('all-formeProduit');
    }

    function UpdateTable() {
        EmptyTable();
        ipcRenderer.send('all-typeProduit');
        ipcRenderer.send('all-formeProduit');
    }

    function VueTypeTable(x, f) {
        $('.listeType tbody').append("<tr><td>" + x + "</td><td>" + f.nom + "</td><td><button class='modiftype' onClick='modify(" + f.id + ",\"T\")'> Modifier </button></td><td><button class='deletetype' onClick='deletes(" + f.id + ",\"" + f.nom + "\",\"T\")'> Supprimer</button></td></tr>");
    }

    function VueFormeTable(x, f) {
        $('.listeForme tbody').append("<tr><td>" + x + "</td><td>" + f.nom + "</td><td><button class='modiforme' onClick='modify(" + f.id + ",\"F\")'> Modifier </button></td><td><button class='deleteforme' onClick='deletes(" + f.id + ",\"" + f.nom + "\",\"F\")'> Supprimer</button></td></tr>");
    }

    function EmptyTable() {
        $('.listeForme tbody').html('');
        $('.listeType tbody').html('');
    }


    // affiche tous les fournisseur enregistrer dans la table
    UpdateTable();
    ipcRenderer.on('type-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 0;
            arg.forEach(function(types) {
                VueTypeTable(x, types);
                x++;
            });
        } else {
            $('.listeType').append("<tr><td colspan='3'>" + arg + "</tr></td>");
        }
    })

    ipcRenderer.on('forme-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 0;
            arg.forEach(function(types) {
                VueFormeTable(x, types);
                x++;
            });
        } else {
            $('.listeForme').append("<tr><td colspan='3'>" + arg + "</tr></td>");
        }
    })

    ipcRenderer.on('updatePage', function() {
        UpdateTable();
    })


    $('#addType').click(
        function(event) {
            ipcRenderer.send('display-addtype', 'TF');
        }
    )

    $('#addForme').click(
        function(event) {
            ipcRenderer.send('display-addforme', 'TF');
        }
    )

    /*$('.deletetype').on("click",
        function(event) {
            var id = $(this).attr('value');
            var nom = $(this).attr('name');
            var dialog = confirm("\312tes vous s\373re de vouloir supprimer " + nom + " ?");
            if (dialog == true) {
                ipcRenderer.send('delete-Type', id);
                UpdateTable();
                alert('Suppression effectu\351e ');
            }
        }
    )

    $('.deleteforme').click(
        function(event) {
            var id = $(this).attr('value');
            var nom = $(this).attr('name');
            var dialog = confirm("\312tes vous s\373re de vouloir supprimer " + nom + " ?");
            if (dialog == true) {
                ipcRenderer.send('delete-forme', id);
                UpdateTable();
                alert('Suppression effectu\351e ');
            }
        }
    )

    $('.modiftype').on("click",
        function(event) {
            var id = $(this).attr('value');
            ipcRenderer.send('selectType', id);
            ipcRenderer.send('display-changeTyFo', 'T');
        }
    )

    $('.modiforme').on("click",
        function(event) {
            var id = $(this).attr('value');
            ipcRenderer.send('display-changeTyFo', 'F');
            ipcRenderer.send('selectForme', id);
        }
    )*/


});
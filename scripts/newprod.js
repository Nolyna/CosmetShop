const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {

    $('#bonjour').html('Ajouter un nouveau produit');

    $("#close").click(
        function(event) {
            ipcRenderer.send('display-addProduit');
        }
    );

    $("#Atype").click(
        function(event) {
            ipcRenderer.send('display-addtype', 'P');
        }
    );

    $("#Aforme").click(
        function(event) {
            ipcRenderer.send('display-addforme', 'P');
        }
    );

    updateSelect();
    ipcRenderer.on('formes-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 'forme';
            arg.forEach(function(y) {
                VueSelect(x, y);
            });
        }
    });

    ipcRenderer.on('types-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 'type';
            arg.forEach(function(y) {
                VueSelect(x, y);
            });
        }
    });

    ipcRenderer.on('fournisseurs-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 'fourni';
            arg.forEach(function(y) {
                VueSelect(x, y);
            });
        }
    });

    ipcRenderer.on('update-select', function() {
        updateSelect();
    });


    //form validation et submission
    $("#ajoutprod").submit(
        function(event) {
            var produits = {
                nom: $("#nom").val(),
                descr: $("#descr").val(),
                quant: parseInt($("#qte").val()),
                pachat: parseFloat($("#achat").val()),
                pvente: parseFloat($("#vente").val()),
                dexp: $("#dexp").val(),
                fournisseur: $("#fournisseur").val(),
                forme: parseInt($("#forme").val()),
                typeP: parseInt($("#type").val()),
            }
            if (produits.nom == "") {
                $("#error").text('Remplir le champ').show().fadeOut(3000);
                event.preventDefault();
            } else {
                ipcRenderer.send('addProduit', produits);
                ipcRenderer.send('update-Prodpage');
                ipcRenderer.send('save-data');
                event.preventDefault();
                alert('Ajout effectuer');
                $(":reset").click();
            }
        });

    function VueSelect(x, f) {
        if (x === 'forme') {
            $('#forme').append("<option value='" + f.id + "'> " + f.nom + "</option>");
        } else if (x === 'type') {
            $('#type').append("<option value='" + f.id + "'> " + f.nom + "</option>");
        } else {
            $('#fournisseur').append("<option value='" + f.id + "'> " + f.nom + " " + f.prenom + "</option>");
        }
    };

    function EmptySelect() {
        $('#ajoutprod select').html('<option value="0"> Choisir</option>');
    }

    function updateSelect() {
        EmptySelect();
        ipcRenderer.send('Tselect');
        ipcRenderer.send('Fselect');
        ipcRenderer.send('all-fournisseur');
    };
});
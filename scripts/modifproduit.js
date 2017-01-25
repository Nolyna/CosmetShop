const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {

    $('#bonjour').html('Modifier Produit');
    EmptySelect();

    ipcRenderer.on('modiProd-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            $('#id').val(arg.idprod);
            $('#nom').val(arg.nom);
            $('#descr').val(arg.descr);
            $('#qte').val(arg.qteTot);
            $('#achat').val(arg.PA);
            $('#vente').val(arg.PV);
            $('#forme').append("<option value='" + arg.idF + "'> " + arg.forme + "</option>");
            $('#type').append("<option value='" + arg.idT + "'> " + arg.type + "</option>");
        } else {
            alert("Une erreur s'est produite, Veuillez cliquez sur le bouton annuler et reessayer");
        }
    })

    updateSelect();
    ipcRenderer.on('formes-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 'forme';
            arg.forEach(function(y) {
                VueSelect(x, y);
            });
        }
        $('#forme').append('<option value="0"> Aucune forme </option>');
    });

    ipcRenderer.on('types-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            var x = 'type';
            arg.forEach(function(y) {
                VueSelect(x, y);
            });
        }
        $('#type').append('<option value="0"> Aucun type </option>');
    });

    ipcRenderer.on('mprod-Eselect', function() {
        EmptySelect();
    });

    $(":reset").click(
        function(event) {
            ipcRenderer.send('display-modifProduit');
        }
    );

    //form validation et submission
    $("#modifprod").submit(
        function(event) {
            var produits = {
                id: $('#id').val(),
                nom: $("#nom").val(),
                descr: $("#descr").val(),
                quant: parseInt($("#qte").val()),
                pachat: parseFloat($("#achat").val()),
                pvente: parseFloat($("#vente").val()),
                forme: parseInt($("#forme").val()),
                typeP: parseInt($("#type").val()),
            }
            if (produits.nom == "") {
                $("#error").text('Remplir le champ').show().fadeOut(3000);
                event.preventDefault();
            } else {
                ipcRenderer.send('updateProduit', produits);
                ipcRenderer.send('update-Prodpage');
                event.preventDefault();
                alert('Modification effectu\351e');
                $(":reset").click();
            }
        });

    function VueSelect(x, f) {
        if (x === 'forme') {
            $('#forme').append("<option value='" + f.id + "'> " + f.nom + "</option>");
        } else {
            $('#type').append("<option value='" + f.id + "'> " + f.nom + "</option>");
        }
    };

    function updateSelect() {
        ipcRenderer.send('Tselect');
        ipcRenderer.send('Fselect');
    };

    function EmptySelect() {
        $('#modifprod select').html('');
    }
});
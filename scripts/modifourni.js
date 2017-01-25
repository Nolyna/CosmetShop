const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {

    $('#bonjour').html('Modifier fournisseur');

    ipcRenderer.on('modiFournisseurs-reply', function(Object, arg) {
        if (typeof arg === 'object') {
            $('#id').val(arg.id);
            $('#nom').val(arg.nom);
            $('#pnom').val(arg.prenom);
            $('#email').val(arg.email);
            $('#phone').val(arg.phone);
            if (arg.typeF == "local") {
                $("input[value='local']").prop("checked", true);
            } else {
                $("input[value='international']").prop("checked", true);
            }
        } else {
            alert("Une erreur s'est produite, Veuillez cliquez sur le bouton annuler et reessayer");
        }
    })

    $(":reset").click(
        function(event) {
            ipcRenderer.send('display-changeFournisseur');
        }
    );

    //form validation et submission
    $("#modif-Fournisseur").submit(
        function(event) {
            var erreur = 0;
            var fournisseurs = {
                id: $("#id").val(),
                nom: $("#nom").val(),
                prenom: $("#pnom").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                typeF: $("input[name=type]:checked").val(),
            }
            if (fournisseurs.nom == "") {
                $("#error1").text('Remplir le champ').show().fadeOut(3000);
                erreur += 1;
            }
            if (fournisseurs.prenom == "") {
                $("#error4").text('Remplir le champ').show().fadeOut(3000);
                erreur += 1;
            }
            if (fournisseurs.email != "") {
                //verify format
                erreur += 1;
            }
            if (fournisseurs.phone != "") {
                //verify format
                erreur += 1;
            }

            if (erreur != 0) {
                event.preventDefault();
            } else {
                ipcRenderer.send('updateFourni', fournisseurs);
                ipcRenderer.send('update-fpage');
                ipcRenderer.send('save-date');
                alert('Modification effectu\351e');
                $(":reset").click();
            }
        });
});
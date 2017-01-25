const ipcRenderer = require('electron').ipcRenderer;

$(document).ready(function() {

    $('#bonjour').html('Ajouter fournisseurs');

    $("#close").click(
        function(event) {
            //ipcRenderer.send('update-fpage');
            ipcRenderer.send('display-addFournisseur');
        }
    );

    String.prototype.capitalize = function() { return this.charAt(0).toUpperCase() + this.slice(1); }

    //form validation et submission
    $("#ajoutfournisseur").submit(
        function(event) {
            var erreur = 0;
            var fournisseurs = {
                nom: $("#nom").val().capitalize(),
                prenom: $("#pnom").val().capitalize(),
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
                ipcRenderer.send('addFourni', fournisseurs);
                ipcRenderer.send('update-fpage');
                ipcRenderer.send('save-date');
                event.preventDefault();
                alert('Ajout effectu\351');
                $(":reset").click();
            }
        });
});
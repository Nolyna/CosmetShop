var fs = require('fs');

function listeProduit() {
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM Produit;', [],
            function(tx, results) {
                var len = results.rows.length,
                    i;
                for (i = 0; i < len; i++) {
                    alert(results.rows.item(i).text);
                }
            });
    });
}

function listeAllFournisseur(selecteur) {
    db.each("SELECT * FROM fournisseur", function(row) {
        alert('in');
        console.log(row.nom_fournisseur);
        var resid = row.id_fournisseur;
        var resnom = row.nom_fournisseur;
        var resprenom = row.prenom_fournisseur;
        var resemail = row.email;
        var resphone = row.phone;
        var restype = row.typeFourn;
        $(selecteur).append('<tr><td id="id">' + resid + '</td><td>' + resnom + '</td><td>' + resprenom + '</td><td>' + resemail + '</td><td>' + resphone + '</td><td>' + restype + '</td></tr>');
    });
}

function searchProduit(item) {
    db.each('SELECT * FROM Produit WHERE nom_prod = item;');
}


function listeTypeFournisseur(selecteur) {
    var results = [];
    db.each("SELECT * FROM typeFourn", function(row) {
        console.log(row.nom_typeFourn);
        results.push(row.nom_typeFourn);
        var res = row.nom_typeFourn;
        $(selecteur).append(res + '</br>');
    });
}

// affiche la liste des produits apres search ou filter
function afficheSelectionProduit(results) {
    $(selecteur).append(results.nom);
}

// validation des formulaire
function mailFormat(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

function phoneFormat() {
    var r = new RegExp("[0-9+]");
    return (v.match(r) == null) ? false : true;
}

function nomFormat() {
    var r = new RegExp("[a-z]");
    return (v.match(r) == null) ? false : true;
}
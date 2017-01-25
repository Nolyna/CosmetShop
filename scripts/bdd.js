//const db = openDatabase("cosmetbd","1.0","",50000);
const ipcRender = require('electron').ipcRenderer;


function addProduit(pnom, pdescription, pexp, pachat, pvente, ptypeProd, pforme, pqte) {
    db.each("INSERT INTO Produit (nom_prod,description,date_exp,prix_achat,prix_vente,id_typeProd,id_forme,quant) VALUES ($p,$d,$e,$a,$v,$t,$f,$q)", { $q: pqte, $d: pdescription, $p: pnom, $e: pexp, $a: pachat, $v: pvente, $t: ptypeProd, $f: pforme });
}

function addType(nom) {
    db.each('INSERT INTO typeProd (nom_typeProd ) VALUES ($nom)', { $nom: nom });
}

function addForme(nom) {
    db.each('INSERT INTO forme (nom_forme) VALUES ($nom)', { $nom: nom });
}

function name(parameter1, parameter2, parameter3) {
    db.transaction(function(tx) {
        tx.executeSql('DELETE FROM Produit WHERE id_prod = idparam ', [id], showRecords, onError);
        alert("Delete Sucessfully");
    });
}

function deleteProduit(idparam) {
    db.transaction(function(tx) {
        tx.executeSql('DELETE FROM Produit WHERE id_prod = idparam ;');
        alert("Delete Sucessfully");
    });
}

function deleteFournisseur(idparam) {
    db.run('DELETE FROM fournisseur WHERE id_fournisseur = $id ', {$id:idparam});
}

function transferer(parameter1, parameter2, parameter3) {
    //code to be executed
}

function modifyProduit(parameter1, parameter2, parameter3) {
    //code to be executed
}

function modifyFournisseur(parameter1, parameter2, parameter3) {
    //code to be executed
}

function nettoyer(parameter1, parameter2, parameter3) {
    //code to be executed
}
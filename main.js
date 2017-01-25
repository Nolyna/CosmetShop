const electron = require('electron');
// Module to control application life.
const { app } = electron;
const ipc = electron.ipcMain;
// Module to create native browser window.
const { BrowserWindow } = electron;
const path = require('path');
// Module to open the database.
const db = openDatabase("cosmetbd.db");
createDatabase("cosmetbd.db", db);
saveDatabase("cosmetbd.db", db);
// jQuery
const query = require('jQuery');
// add devtron in DevTools
require('electron-debug')({ showDevTools: true });
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


function createWindow() {
    // Create the main window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        'accept-first-mouse': true,
        'title-bar-style': 'hidden',
        webPreferences: {
            nodeIntegration: true,
            // preload: path.join(__dirname, 'preload.js')
        }
    });

    // create others windows
    addf = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        show: false
    });

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);
    addf.loadURL(`file://${__dirname}/doc/newfourni.html`);

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });

    //ipc calls
    ipc.on('display-addFournisseur', function() {
        addf.show()
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
//app.on('ready', createWindow);

app.on('ready', function() {

    // Create the main window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        'accept-first-mouse': true,
        'title-bar-style': 'hidden',
        webPreferences: {
            nodeIntegration: true,
            // preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();

    // create others windows
    newFournisseur = new BrowserWindow({
        width: 800,
        height: 500,
        frame: false,
        show: false,
        parent: win
    });
    newFournisseur.loadURL(`file://${__dirname}/doc/newfourni.html`);
    ipc.on('display-addFournisseur', function() {
        if (newFournisseur.isVisible()) {
            newFournisseur.hide();
        } else {
            newFournisseur.show();
        }

    })

    changeFournisseur = new BrowserWindow({
        width: 800,
        height: 500,
        frame: false,
        show: false,
        parent: win
    });
    changeFournisseur.loadURL(`file://${__dirname}/doc/modifourni.html`);
    ipc.on('display-changeFournisseur', function() {
        if (changeFournisseur.isVisible()) {
            changeFournisseur.hide();
        } else {
            changeFournisseur.show();
        }

    })

    newProduit = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        show: false,
        parent: win
    });
    newProduit.loadURL(`file://${__dirname}/doc/newprod.html`);
    ipc.on('display-addProduit', function() {
        if (newProduit.isVisible()) {
            newProduit.hide();
        } else {
            newProduit.show();
        }

    })

    changeProduit = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        show: false,
        parent: win
    });
    changeProduit.loadURL(`file://${__dirname}/doc/modifproduit.html`);
    ipc.on('display-modifProduit', function() {
        if (changeProduit.isVisible()) {
            changeProduit.hide();
        } else {
            changeProduit.show();
        }

    })

    detailsProduit = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        show: false,
        parent: win
    });
    detailsProduit.loadURL(`file://${__dirname}/doc/detailproduit.html`);
    ipc.on('display-detailProduit', function() {
        if (detailsProduit.isVisible()) {
            detailsProduit.hide();
        } else {
            detailsProduit.show();
        }

    })

    transferProduit = new BrowserWindow({
        width: 500,
        height: 400,
        frame: false,
        show: false,
        parent: win
    });
    transferProduit.loadURL(`file://${__dirname}/doc/transferprompt.html`);
    ipc.on('display-transferProduit', function() {
        if (transferProduit.isVisible()) {
            transferProduit.hide();
        } else {
            transferProduit.show();
        }

    })

    venteProduit = new BrowserWindow({
        width: 500,
        height: 400,
        frame: false,
        show: false,
        parent: win
    });
    venteProduit.loadURL(`file://${__dirname}/doc/vente.html`);
    ipc.on('display-venteProduit', function() {
        if (venteProduit.isVisible()) {
            venteProduit.hide();
        } else {
            venteProduit.show();
        }

    })



    newType = new BrowserWindow({
        width: 500,
        height: 300,
        frame: false,
        show: false
    });
    newType.loadURL(`file://${__dirname}/doc/newtype.html`);
    ipc.on('display-addtype', function(Object, data) {
        newType.webContents.send('genretypeAdd', data)
        if (newType.isVisible()) {
            newType.hide();
        } else {
            newType.show();
        }
    })
    ipc.on('display-addtype1', function() {
        if (newType.isVisible()) {
            newType.hide();
        } else {
            newType.show();
        }
    })

    newForme = new BrowserWindow({
        width: 500,
        height: 250,
        frame: false,
        show: false
    });
    newForme.loadURL(`file://${__dirname}/doc/newforme.html`);
    ipc.on('display-addforme', function(Object, data) {
        newForme.webContents.send('genretypeAdd', data);
        if (newForme.isVisible()) {
            newForme.hide();
        } else {
            newForme.show();
        }
    })
    ipc.on('display-addforme1', function() {
        if (newForme.isVisible()) {
            newForme.hide();
        } else {
            newForme.show();
        }
    })

    changeTF = new BrowserWindow({
        width: 500,
        height: 500,
        frame: false,
        show: false,
        parent: win
    });
    changeTF.loadURL(`file://${__dirname}/doc/modiftypeforme.html`);
    ipc.on('display-changeTyFo', function(Object, data) {
        changeTF.webContents.send('changeTyFo-reply', data)
        if (changeTF.isVisible()) {
            changeTF.hide();
        } else {
            changeTF.show();
        }

    })
    ipc.on('display-changeTyFo1', function() {
        if (changeTF.isVisible()) {
            changeTF.hide();
        } else {
            changeTF.show();
        }

    })

    ipc.on('update-fpage', function() {
        //win.loadURL(`file://${__dirname}/doc/fournisseur.html`);
        win.reload();
    })

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });


    //Database transaction
    ipc.on('save-data', function() {
        saveDatabase("cosmetbd.db", db);
    })

    ipc.on('addFourni', function(Object, data) {
        addFournisseur(data.nom, data.prenom, data.email, data.phone, data.typeF);
    })

    ipc.on('addtype', function(Object, data) {
        addType(data);
    })

    ipc.on('addforme', function(Object, data) {
        addForme(data);
    })

    //ajout produit from newprod
    ipc.on('addProduit', function(Object, data) {
        addProduit(data.nom, data.typeP, data.forme, data.descr, data.quant, data.pachat, data.pvente, data.dexp, data.fournisseur);
    })

    ipc.on('addvente', function(Object, data) {
        addVente(data.id, data.qte);
    })

    ipc.on('addvente1', function(Object, data) {
        venteProduit.webContents.send('vente1-reply', data)
    })

    ipc.on('delete-Fournisseur', function(Object, data) {
        deleteFournisseur(data);
    })

    ipc.on('delete-Produit', function(Object, data) {
        deleteProduit(data);
    })

    ipc.on('delete-Type', function(Object, data) {
        deleteType(data);
    })
    ipc.on('delete-forme', function(Object, data) {
        deleteForme(data);
    })

    ipc.on('updateFourni', function(Object, data) {
        updateFournisseur(data.id, data.nom, data.prenom, data.email, data.phone, data.typeF);
    })

    ipc.on('updateType', function(Object, data) {
        updateType(data.id, data.nom);
    })

    ipc.on('updateForme', function(Object, data) {
        updateForme(data.id, data.nom);
    })

    ipc.on('updateProduit', function(Object, data) {
        updateProduit(data);
    })

    ipc.on('update-fpage', function() {
        win.webContents.send('updatePage');
    })

    ipc.on('update-Prodpage', function() {
        win.webContents.send('updatePage');
    })

    ipc.on('update-prodselect', function() {
        newProduit.webContents.send('update-select');
    })

    ipc.on('update-typeforme', function() {
        win.webContents.send('updatePage');
    })

    ipc.on('SelectFournisseur', function(Object, data) {
        var all = selectFournisseur(data);
        changeFournisseur.webContents.send('modiFournisseurs-reply', all)
    })
    ipc.on('SelectProduit', function(Object, data) {
        var all = selectProduit(data);
        changeProduit.webContents.send('modiProd-reply', all)
    })
    ipc.on('SelectProduit1', function(Object, data) { //detailProduit
        var all1 = selectProduit(data);
        var all2 = selectSousProduit(data);
        detailsProduit.webContents.send('detailProd-reply', all1, all2)
    })
    ipc.on('SelectProduit2', function(Object, data) { //all prod from home
        var all = selectProduit(data);
        win.webContents.send('produits-reply2', all)
    })
    ipc.on('selectType', function(Object, data) {
        var all = selectType(data);
        changeTF.webContents.send('modiTyFo-reply', all)
    })
    ipc.on('selectForme', function(Object, data) {
        var all = selectForme(data);
        changeTF.webContents.send('modiTyFo-reply', all)
    })

    ipc.on('Fselect', function(event) {
        var all = listeAllFormeProduits();
        event.sender.send('formes-reply', all)
    })
    ipc.on('Tselect', function(event) {
        var all = listeAllTypeProduits();
        event.sender.send('types-reply', all)
    })

    ipc.on('all-fournisseur', function(event) {
        var all = listeAllFournisseur();
        event.sender.send('fournisseurs-reply', all)
    })

    ipc.on('all-produit', function(event) {
        var all = listeAllProduits();
        event.sender.send('produits-reply', all)
    })

    ipc.on('all-homeProduits', function(event) { //get all the produit home
        var all = listeAllHomeProduits();
        event.sender.send('produits-reply', all)
    })
    ipc.on('all-storeProduit', function(event) {
        var all = listeAllStoreProduits();
        event.sender.send('produits-reply', all)
    })
    ipc.on('all-typeProduit', function(event) {
        var all = listeAllTypeProduits();
        event.sender.send('type-reply', all)
    })
    ipc.on('all-formeProduit', function(event) {
        var all = listeAllFormeProduits();
        event.sender.send('forme-reply', all)
    })

    ipc.on('fournisseurByType', function(event) {
        var all = listeTypeFournisseur();
        event.sender.send('fournisseurs-reply', all)
    })

    ipc.on('fournisseurByNom', function(event) {
            var all = listeNomFournisseur();
            event.sender.send('fournisseurs-reply', all)
        })
        //
    ipc.on('ProduitByType', function(event) { //tout produit par type
        var all = listeProduitByType();
        event.sender.send('produits-reply', all)
    })
    ipc.on('ProduitByNom', function(event) { // tout produit par nom
        var all = listeNomProduit();
        event.sender.send('produits-reply', all)
    })
    ipc.on('ProduitByDate', function(event) { //tout produit par exp date
        var all = listeDateProduit();
        event.sender.send('produits-reply', all)
    })
    ipc.on('ProduitByQte', function(event) { // tout produit par qte total
        var all = listeProduitByQte();
        event.sender.send('produits-reply', all)
    })
    ipc.on('ProduitByQteH', function(event) {
        var all = listeQteHomeProduit();
        event.sender.send('produits-reply', all)
    })
    ipc.on('ProduitByQteM', function(event) {
        var all = listeQteMagProduit();
        event.sender.send('produits-reply', all)
    })
    ipc.on('ProduitByPriceA', function(event) { // tout produit pas prix_achat
        var all = listePriceAchatProduit();
        event.sender.send('produits-reply', all)
    })
    ipc.on('ProduitByPriceV', function(event) { // tout produit pas prix_vente
        var all = listePriceVenteProduit();
        event.sender.send('produits-reply', all)
    })
    ipc.on('ProduitByForme', function(event) { //tout produit par forme
        var all = listeFormeProduit();
        event.sender.send('produits-reply', all)
    })

    ipc.on('search-fournisseur', function(object, data) {
        var all = searchFournisseur(data);
        win.webContents.send('fournisseurs-reply', all)
    })

    ipc.on('search-produit', function(object, data) {
        var all = searchProduit(data);
        win.webContents.send('produits-reply', all)
    })

    ipc.on('SearchHomeProduit', function(Object, data) {
        var all = searchHomeProd(data);
        win.webContents.send('produits-reply', all)
    })

    ipc.on('transfer-Produit', function(Object, data) {
        TransferProduit(data.id, data.qte);
    })

    ipc.on('transfer1', function(Object, data) {
        transferProduit.webContents.send('transfer1-reply', data)
    })
    ipc.on('emptyselect-modifProduit', function(event) {
        changeProduit.webContents.send('mprod-Eselect', data)
    })


});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

app.on('before-quit', () => {
    saveDatabase("cosmetbd.db", db);
});


// Database function
function openDatabase(fileName) {
    var fs = require('fs');
    var SQL = require('sql.js');
    try {
        var filebuffer = fs.readFilesSync(fileName);
        return new SQL.Database(filebuffer);
    } catch (error) {
        return new SQL.Database(filebuffer);
    }
}

function saveDatabase(fileName, db) {
    var fs = require('fs');
    var buffer = new Buffer(db.export());
    fs.writeFileSync(fileName, buffer)
}

function createDatabase(fileName, db) {
    db.run("CREATE TABLE IF NOT EXISTS vente (id_vente	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,qte_vendu	INTEGER,date_vente	TEXT,id_produit	INTEGER,FOREIGN KEY(id_produit) REFERENCES produit)");
    db.run("CREATE TABLE IF NOT EXISTS typeProd (id_typeProd INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,nom_typeProd	TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS sousProduit(idSous INTEGER, id_produit INTEGER,id_fournisseur INTEGER, qte_total INTEGER,qte_home INTEGER,qte_store INTEGER, date_exp TEXT, PRIMARY KEY(idSous), FOREIGN KEY(id_produit) REFERENCES produit, FOREIGN KEY(id_fournisseur) REFERENCES fournisseur)");
    db.run("CREATE TABLE IF NOT EXISTS produit (id_produit INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,nom_prod TEXT, description TEXT, prix_achat INTEGER, prix_vente INTEGER, qte_total INTEGER,id_typeProd	INTEGER,id_forme INTEGER,FOREIGN KEY(id_typeProd) REFERENCES typeProd,FOREIGN KEY(id_forme)   REFERENCES forme)");
    //db.run("CREATE TABLE IF NOT EXISTS maison (id_maison INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,qtedispo INTEGER,id_produit INTEGER,FOREIGN KEY(id_produit) REFERENCES produit)");
    //db.run("CREATE TABLE IF NOT EXISTS magasin (id_magasin INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, qtedispo INTEGER, id_produit INTEGER, FOREIGN KEY(id_produit) REFERENCES produit)");
    db.run("CREATE TABLE IF NOT EXISTS fournisseur (id_fournisseur	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, nom_fournisseur TEXT NOT NULL, prenom_fournisseur TEXT NOT NULL, email TEXT, phone TEXT,typeFourn TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS forme (id_forme INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,nom_forme TEXT)");
}

function addFournisseur(fnom, fpnom, femail, fphone, fid) {
    db.each('INSERT INTO fournisseur (nom_fournisseur,prenom_fournisseur, email, phone,typeFourn) VALUES ($n,$p,$e,$t,$f)', { $n: fnom, $p: fpnom, $e: femail, $t: fphone, $f: fid });
    saveDatabase("cosmetbd.db", db);
}

function addType(nom) {
    db.each('INSERT INTO typeProd (nom_typeProd ) VALUES ($nom)', { $nom: nom });
    saveDatabase("cosmetbd.db", db);
}

//ajout forme produit
function addForme(nom) {
    db.each('INSERT INTO forme (nom_forme) VALUES ($nom)', { $nom: nom });
    saveDatabase("cosmetbd.db", db);
}

//ajout produit et sous produit si produit deja enregistrer
function addProduit(Pnom, Ptype, Pforme, Pdesc, Pqte, PA, PV, Pexp, Pfourni) {
    var found = false;
    // verifie si il n'existe pas encore
    db.each('SELECT * FROM produit WHERE nom_prod = $id ', { $id: Pnom }, function(row) {
        //si existe add sousProduit
        if (row.id_typeProd == Ptype && row.id_forme == Pforme) {
            found = true;
            var qteTot = row.qte_total + Pqte;
            db.each('INSERT INTO sousProduit (id_produit, id_fournisseur,qte_total,qte_home,date_exp) VALUES ($p,$f,$t,$t,$d)', { $p: row.id_produit, $f: Pfourni, $t: Pqte, $d: Pexp });
            db.each('UPDATE produit SET qte_total=$t WHERE id_produit = $id ', { $id: row.id_produit, $t: qteTot });
        }
    });
    // if not exist
    if (!found) {
        var ide;
        db.each('INSERT INTO produit (nom_prod, description,prix_achat,prix_vente,qte_total,id_typeProd,id_forme) VALUES ($n,$d,$a,$v,$t,$p,$f)', { $n: Pnom, $d: Pdesc, $a: PA, $v: PV, $t: Pqte, $p: Ptype, $f: Pforme });
        db.each('SELECT id_produit FROM produit ORDER BY id_produit DESC LIMIT 1', function(row) {
            ide = row.id_produit;
        });
        db.each('INSERT INTO sousProduit (id_produit, id_fournisseur,qte_total,qte_home,date_exp) VALUES ($p,$f,$t,$t,$d)', { $p: ide, $f: Pfourni, $t: Pqte, $d: Pexp });
    }
    saveDatabase("cosmetbd.db", db);
}

function listeTypeFournisseur(selecteur) {
    db.each("SELECT * FROM typeFourn", function(row) {
        console.log(row.nom_typeFourn);
    });
}

function listeAllFournisseur() {
    var result = [];
    db.each("SELECT * FROM fournisseur", function(row) {
        var fournisseurs = {
            id: row.id_fournisseur,
            nom: row.nom_fournisseur,
            prenom: row.prenom_fournisseur,
            email: row.email,
            phone: row.phone,
            typeF: row.typeFourn,
        }
        result.push(fournisseurs);
    });
    if (result.length == 0) {
        return "il n'y a aucun fournisseur enregistrer";
    } else {
        return result;
    }
}

function listeNomFournisseur() {
    var result = [];
    db.each("SELECT * FROM fournisseur ORDER BY nom_fournisseur,prenom_fournisseur ASC", function(row) {
        result.push(getfournisseur(row));
    });
    if (result.length == 0) {
        return "il n'y a aucun fournisseur enregistrer";
    } else {
        return result;
    }
}

function listeTypeFournisseur() {
    var result = [];
    db.each("SELECT * FROM fournisseur ORDER BY typeFourn,nom_fournisseur ASC", function(row) {
        result.push(getfournisseur(row));
    });
    if (result.length == 0) {
        return "il n'y a aucun fournisseur enregistrer";
    } else {
        return result;
    }
}

//trier tout  par type Produit
function listeProduitByType() {
    var result = [];
    db.each("SELECT * FROM produit ORDER BY id_typeProd,nom_prod ASC", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}
//trier tout les produits par nom alph
function listeNomProduit() {
    var result = [];
    db.each("SELECT * FROM produit ORDER BY nom_prod ASC", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}
// trier sousProduit par Date d'expiration'
function listeDateProduit() {
    var result = [];
    db.each("SELECT * FROM produit ORDER BY date_exp ASC", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}

//trie tout les produits par qte total
function listeProduitByQte() {
    var result = [];
    db.each("SELECT * FROM produit ORDER BY qte_total ASC", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}

//trie qte dispo home
function listeQteHomeProduit() {
    var result = [];
    db.each("SELECT * FROM produit", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}
//trie qte dispo magasin
function listeQteMagProduit() {
    var result = [];
    db.each("SELECT * FROM produit", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}
//trie prix achat et vente
function listePriceAchatProduit() {
    var result = [];
    db.each("SELECT * FROM produit ORDER BY prix_achat", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}

function listePriceVenteProduit() {
    var result = [];
    db.each("SELECT * FROM produit ORDER BY prix_vente", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}
// trie tout les produits par forme
function listeFormeProduit() {
    var result = [];
    db.each("SELECT * FROM produit ORDER BY id_forme", function(row) {
        result.push(getProduit(row));
    });
    return resultat(result);
}

//liste tout les produits
function listeAllProduits() {
    var types, formes;
    var result = [];
    db.each("SELECT * FROM produit", function(row) {
        if (row.id_typeProd == 0) {
            types = { id: 0, nom: '' }
        } else { types = selectType(row.id_typeProd) }
        if (row.id_forme == 0) {
            formes = { id: 0, nom: '' }
        } else { formes = selectForme(row.id_forme) }
        var produit = {
            id: row.id_produit,
            nom: row.nom_prod,
            descr: row.description,
            qte: row.qte_total,
            prixA: row.prix_achat,
            prixV: row.prix_vente,
            type: types.nom,
            forme: formes.nom
        }
        result.push(produit);
    });
    if (result.length == 0) {
        return "il n'y a aucun produits enregistrer";
    } else {
        return result;
    }
}

function listeAllHomeProduits() {
    var result = [];
    db.each("SELECT * FROM sousProduit WHERE qte_home <> 0 ORDER BY id_produit", function(row) {
        result.push(getSousProduit(row));
    });
    if (result.length == 0) {
        return "il n'y a aucun produits en stock";
    } else {
        return result;
    }
}

function listeAllStoreProduits() {
    var result = [];
    db.each("SELECT * FROM sousProduit WHERE qte_store <> 0 ORDER BY id_produit", function(row) {
        result.push(getSousProduit(row));
    });
    if (result.length == 0) {
        return "il n'y a aucun produits dans le magasin";
    } else {
        return result;
    }
}

function listeAllTypeProduits() { // liste les types de Produit
    var result = [];
    db.each("SELECT * FROM typeProd", function(row) {
        var Tproduit = {
            id: row.id_typeProd,
            nom: row.nom_typeProd
        }
        result.push(Tproduit);
    });
    if (result.length == 0) {
        return "il n'y a aucun type de produit enregistrer";
    } else {
        return result;
    }
}

function listeAllFormeProduits() { // liste les formes de produit
    var result = [];
    db.each('SELECT * FROM forme', function(row) {
        var formes = {
            id: row.id_forme,
            nom: row.nom_forme,
        }
        result.push(formes);
    });
    if (result.length == 0) {
        return "il n'y a aucune forme enregistrer";
    } else {
        return result;
    }
}
//

function deleteFournisseur(idparam) {
    db.run('DELETE FROM fournisseur WHERE id_fournisseur = $id ', { $id: idparam });
}

function deleteProduit(idparam) {
    db.run('DELETE FROM produit WHERE id_produit = $id ', { $id: idparam });
}

function deleteType(idparam) {
    db.run('DELETE FROM typeProd WHERE id_typeProd = $id ', { $id: idparam });
}

function deleteForme(idparam) {
    db.run('DELETE FROM forme WHERE id_forme = $id ', { $id: idparam });
}

function selectFournisseur(idparam) {
    var result;
    db.each('SELECT * FROM fournisseur WHERE id_fournisseur = $id ', { $id: idparam }, function(row) {
        var fournisseurs = {
            id: row.id_fournisseur,
            nom: row.nom_fournisseur,
            prenom: row.prenom_fournisseur,
            email: row.email,
            phone: row.phone,
            typeF: row.typeFourn,
        }
        result = fournisseurs;
    });
    return result;
}

// select Produit with id
function selectProduit(idparam) {
    var result, fo, ty, tyfo;
    db.each('SELECT * FROM produit WHERE id_produit = $id ', { $id: idparam }, function(row) {
        if (row.id_forme == 0 || row.id_forme == "") {
            fo = "Aucune forme defini";
        } else {
            tyfo = selectForme(row.id_forme);
            fo = tyfo.nom;
        }
        if (row.id_typeProd == 0 || row.id_typeProd == "") {
            ty = "Aucun type defini";
        } else {
            tyfo = selectType(row.id_typeProd);
            ty = tyfo.nom;
        }
        var produits = {
            idprod: row.id_produit,
            idF: row.id_forme,
            idT: row.id_typeProd,
            nom: row.nom_prod,
            descr: row.description,
            PA: row.prix_achat,
            PV: row.prix_vente,
            qteTot: row.qte_total,
            type: ty,
            forme: fo
        }
        result = produits;
    });
    return result;
}

function selectSousProduit(idparam) {
    var result, fourniss;
    db.each('SELECT * FROM sousProduit WHERE id_produit = $id ', { $id: idparam }, function(row) {
        if (row.id_fournisseur == 0) {
            fourniss = "Aucun fournisseur defini";
        } else {
            var fourni = selectFournisseur(row.id_fournisseur);
            fourniss = fourni.nom_fournisseur + ' ' + fourni.prenom_fournisseur;
        }
        var sousproduits = {
            qte_home: row.qte_home,
            qte_store: row.qte_store,
            qte_total: row.qte_total,
            date: row.date_exp,
            fournisseur: fourniss,
        }
        result = sousproduits;
    });
    return result;
}

function selectForme(idparam) {
    var result;
    if (idparam == 0) {
        result = 'Aucune forme definie'
    } else {
        db.each('SELECT * FROM forme WHERE id_forme = $id ', { $id: idparam }, function(row) {
            var formes = {
                id: row.id_forme,
                nom: row.nom_forme,
            }
            result = formes;
        });
    }
    return result;
}

function selectType(idparam) {
    var result;
    if (idparam == 0) {
        result = 'Aucune forme definie'
    } else {
        db.each('SELECT * FROM typeProd WHERE id_typeProd = $id ', { $id: idparam }, function(row) {
            var types = {
                id: row.id_typeProd,
                nom: row.nom_typeProd,
            }
            result = types;
        });
    }
    return result;
}

function searchHomeProd(searchvalue) {
    var searchvalue2 = "%" + searchvalue + "%"
    var result = [];

    db.each("SELECT id_produit FROM produit WHERE nom_prod LIKE $s", { $s: searchvalue2 }, function(row) {
        db.each("SELECT * FROM sousProduit WHERE id_produit like $id and qte_home <> 0 ORDER BY id_produit", { $id: row.id_produit }, function(row) {
            result.push(getSousProduit(row));
        });
    });
    if (result.length == 0) {
        return "il n'y a aucun '" + searchvalue + "' en stock";
    } else {
        return result;
    }
}


function searchFournisseur(searchvalue) {
    var searchvalue2 = "%" + searchvalue + "%"
    var result = [];

    db.each("SELECT * FROM fournisseur WHERE nom_fournisseur LIKE $s OR prenom_fournisseur like $s", { $s: searchvalue2 }, function(row) {
        result.push(getfournisseur(row));
    });
    if (result.length == 0) {
        return "il n'y a aucun fournisseur nomme '" + searchvalue + "' enregistrer";
    } else {
        return result;
    }
}

function searchProduit(searchvalue) {
    var searchvalue2 = "%" + searchvalue + "%"
    var result = [];

    db.each("SELECT * FROM produit WHERE nom_prod LIKE $s OR description like $s", { $s: searchvalue2 }, function(row) {
        result.push(getProduit(row));
    });
    if (result.length == 0) {
        return "il n'y a aucun produit correspondant a la recherche '" + searchvalue + "'";
    } else {
        return result;
    }
}

function updateFournisseur(fid, fnom, fpnom, femail, fphone, ftype) {
    db.run('UPDATE fournisseur SET nom_fournisseur=$n, prenom_fournisseur = $p, email = $e, phone = $f,typeFourn=$t WHERE id_fournisseur = $id ', { $id: fid, $n: fnom, $p: fpnom, $e: femail, $f: fphone, $t: ftype });
}

function updateType(fid, fnom) {
    db.run('UPDATE typeProd SET nom_typeProd=$n WHERE id_typeProd = $id ', { $id: fid, $n: fnom });
}

function updateForme(fid, fnom) {
    db.run('UPDATE forme SET nom_forme=$n WHERE id_forme = $id ', { $id: fid, $n: fnom });
}

function updateProduit(prod) {
    db.run('UPDATE produit SET nom_prod = $n,description=$d,id_forme=$f,id_fournisseur=$e,prix_achat=$a,prix_vente=$v,qte_total=$q,id_typeProd=$t WHERE id_produit = $id ', { $id: prod.id, $n: prod.nom, $d: prod.descr, $f: prod.forme, $e: prod.fournisseur, $a: prod.pachat, $v: prod.pvente, $q: prod.quant, $t: prod.typeP });
}

function TransferProduit(idparam, qteparam) {
    var trans = qteparam;
    db.each('SELECT * FROM sousProduit WHERE idSous = $id ', { $id: idparam }, function(row) {
        var qte_home = row.qte_home - trans;
        var qte_store = row.qte_store + trans;
        db.run('UPDATE sousProduit SET qte_home=$h, qte_store=$s WHERE idSous = $id ', { $id: idparam, $h: qte_home, $s: qte_store });

    });
}

function addVente(idparam, qteparam) {
    var trans = qteparam;
    var idproduit;
    db.each('SELECT * FROM sousProduit WHERE idSous = $id ', { $id: idparam }, function(row) {
        var qte_total = row.qte_total - trans;
        var qte_store = row.qte_store - trans;
        idproduit = row.id_produit;
        db.run('UPDATE sousProduit SET qte_total=$h, qte_store=$s WHERE idSous = $id ', { $id: idparam, $h: qte_total, $s: qte_store });

    });
    db.each('SELECT qte_total FROM produit WHERE id_produit = $id ', { $id: idproduit }, function(row) {
        var qte_total = row.qte_total - trans;
        db.run('UPDATE produit SET qte_total=$h WHERE id_produit = $id ', { $id: idproduit, $h: qte_total });
    });

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;

    db.each('INSERT INTO vente (qte_vendu,date_vente,id_produit) VALUES ($n,$d,$a,)', { $n: trans, $d: today, $a: idproduit });

}

function getProduit(row) {
    var types, formes;
    if (row.id_typeProd == 0) {
        types = { id: 0, nom: '' }
    } else { types = selectType(row.id_typeProd) }
    if (row.id_forme == 0) {
        formes = { id: 0, nom: '' }
    } else { formes = selectForme(row.id_forme) }
    var produit = {
        id: row.id_produit,
        nom: row.nom_prod,
        descr: row.description,
        qte: row.qte_total,
        prixA: row.prix_achat,
        prixV: row.prix_vente,
        type: types.nom,
        forme: formes.nom
    }
    return produit;
}

function getType(row) {
    var Tproduit = {
        id: row.id_typeProd,
        nom: row.nom_typeProd
    }
    return Tproduit;
}

function getSousProduit(row) {
    var sousproduits = {
        idp: row.id_produit,
        id: row.idSous,
        qte_home: row.qte_home,
        qte_store: row.qte_store,
        qte_total: row.qte_total,
        date: row.date_exp,
    }
    return sousproduits;
}

function getfournisseur(row) {
    var fournisseurs = {
        id: row.id_fournisseur,
        nom: row.nom_fournisseur,
        prenom: row.prenom_fournisseur,
        email: row.email,
        phone: row.phone,
        typeF: row.typeFourn,
    }
    return fournisseurs;
}

function resultat(result) {
    if (result.length == 0) {
        return "il n'y a aucun produits enregistrer";
    } else {
        return result;
    }
}
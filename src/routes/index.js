const { Router } = require('express');
const router = Router();

const dbconfig = require('firebase-admin');
const { database } = require('firebase-admin');

//tecnica 2
var myserviceAccount = require("../../faztfirenode-e54dd-firebase-adminsdk-ljnen-5ec38f370c.json");

dbconfig.initializeApp({
    //credential: dbconfig.credential.applicationDefault(), //tecnica 1
    credential: dbconfig.credential.cert(myserviceAccount), //tecnica 2
    databaseURL: 'https://faztfirenode-e54dd.firebaseio.com/'
});

const banco = dbconfig.database();

router.get('/', (req, res) => {
    //console.log("Index works!");
    //res.send('received!');

    banco.ref('contatos').once('value', (snapshot) => {
        const dbresult = snapshot.val();
        res.render('index', {listacontatos: dbresult });
    });

});

router.post('/new-contact', (req, res) => {
    //console.log(req.body);
    
    const novoContato = {
        phone: req.body.phone,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email
    }

    console.log(novoContato);

    banco.ref('contatos').push(novoContato);

    res.send('received, ok!');

    //res.send(req.body);
});

router.get('/teste', (req, res) => {
    console.log('ola, isso é um teste no log shell');
    res.send('ola, isso é um teste na tela');
});

module.exports = router;
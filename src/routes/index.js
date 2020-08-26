const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    //console.log("Index works!");
    //res.send('received!');
    res.render('index');
});

router.post('/new-contact', (req, res) => {
    console.log(req.body);
    res.send('received!');
});

module.exports = router;
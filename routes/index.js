var express = require('express');
var router = express.Router();
var list = [];


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/board/', function (req, res, next) {
    res.send(list);
})

function isEmpty(obj) {
    return Object.keys(obj).length <= 0;
}

router.post('/board/', function (req, res, next) {
    if (!isEmpty(req.body)) {
        if (!list) {
            list = [];
        }
        list.push(req.body);
        res.sendStatus(201);
        return;
    }

    res.sendStatus(400);
});

router.put('/board', function (req, res, next) {
    if (!isEmpty(req.body)) {
        var value = findValueInList(req.body.key);
        if (value) {
            value.title = req.body.title;
            value.content = req.body.content;
            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(400);
});

function findIndexInList(key) {
    for (var index in list) {
        var value = list[index];
        if (value && value.key === key) {
            return list.indexOf(value);
        }
    }

    return undefined;
}

router.delete('/board', function (req, res, next) {
    var body = req.body;

    if (!isEmpty(body)) {
        var index = findIndexInList(body.key);
        delete list[index];
        res.sendStatus(200);
        return;
    }

    list=[];
    res.sendStatus(200);

    return
});


module.exports = router;

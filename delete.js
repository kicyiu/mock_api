/**
 * Created by AlbertoTsang on 10/3/17.
 */
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('./dbconfig.json');

router.post('/', function(req, res, next) {
    var userName = req.body.username;

    var con = mysql.createConnection(dbconfig);

    con.connect(function(err) {
        if (err) throw err;
        var sql = "DELETE FROM MOCK_DATA WHERE Username = "+"'"+userName+"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            res.render('create', {output: "Number of records deleted: " + result.affectedRows});
            con.end();
        });
    });
});

//export this router to use in our index.js
module.exports = router;
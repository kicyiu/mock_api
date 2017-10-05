/**
 * Created by AlbertoTsang on 10/3/17.
 */
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('./dbconfig.json');

router.post('/', function(req, res, next) {

    var con = mysql.createConnection(dbconfig);

    var userId;
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var password = req.body.pass;
    var userName = req.body.username;

    con.connect(function(err) {
        if (err) throw err;
        //Find the highest id value from MOCK_DATA Table
        var sql1 = "SELECT MAX(id) AS maxId FROM MOCK_DATA";
        con.query(sql1, function (err, result, fields) {
            if (err) throw err;

            userId = result[0].maxId+1;
            console.log("THE HIGHEST ID is: " + userId);
            var sql2 = "INSERT INTO MOCK_DATA (id, first_name, last_name, email, password, Username) VALUES "+
                "("+userId+",'"+firstName+"','"+lastName+"','"+email+"','"+password+"','"+userName+"')";
            con.query(sql2, function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
                res.render('create', {output: "Number of records inserted: " + result.affectedRows});
                con.end();
            });
        });

    });
});

//export this router to use in our index.js
module.exports = router;
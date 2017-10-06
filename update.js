/**
 * Created by AlbertoTsang on 10/3/17.
 */
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('./dbconfig.json');

router.post('/', function(req, res, next) {
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var password = req.body.pass;
    var userName = req.body.username;

    var con = mysql.createConnection(dbconfig);

    var messageJson;

    con.connect(function(err) {
        if (err) throw err;
        var sql = "UPDATE MOCK_DATA SET " +
            "first_name='"+firstName+"', " +
            "last_name='"+lastName+"', " +
            "email='"+email+"', " +
            "password='"+password+"' " +
            "WHERE Username = "+"'"+userName+"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if(result.affectedRows != 0) {
                messageJson = '[{' + '"message"' + ':"' + result.affectedRows + ' record(s) updated"}]';
                console.log(result.affectedRows + " record(s) updated");
                res.render('update', {output: messageJson});
            }
            else {
                console.log("Failed to update, user name does not exist");
                messageJson ='[{"message":"Failed to update, user name does not exist"}]';
                res.render('update', {output: messageJson});
            }
            con.end();
        });

    });
});

//export this router to use in our index.js
module.exports = router;
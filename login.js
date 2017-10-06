/**
 * Created by AlbertoTsang on 10/4/17.
 */
var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('./dbconfig.json');


router.post('/', function(req, res, next) {

    var con = mysql.createConnection(dbconfig);

    var userName = req.body.username;
    var password = req.body.pass;

    var messageJson;

    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT * FROM MOCK_DATA WHERE Username = "+"'"+userName+"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if(result.length != 0) {
                if(password != result[0]["password"]) {
                    console.log("Your password is incorrect");
                    messageJson ='[{"message":"Your password is incorrect"}]';
                    res.render('login', {output: messageJson});
                }
                else {
                    console.log("SUCCESS!\n" +
                        "First Name: " + result[0].first_name + "\n" +
                        "Last Name: " + result[0].last_name + "\n" +
                        "Email: " + result[0].email);
                    messageJson ='[{"message":"SUCCESS",' +
                                    '"first name":'+'"'+result[0].first_name+'",'+
                                    '"last name":'+'"'+result[0].last_name+'",'+
                                    '"email":'+'"'+result[0].email+'"}]';
                    res.render('login', {output: messageJson});
                }
            }
            else {
                console.log("Failed to Login, user name does not exist");
                messageJson ='[{"message":"Failed to Login, user name does not exist"}]';
                res.render('login', {output: messageJson});
            }
            con.end();
        });
    });
});

//export this router to use in our index.js
module.exports = router;
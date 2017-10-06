/**
 * Created by AlbertoTsang on 10/3/17.
 */

var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('./dbconfig.json');




router.get('/', function(req, res, next) {

    var con = mysql.createConnection(dbconfig);
    var usersString = "";

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM MOCK_DATA", function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            //this for save result in a string
            for(i = 0; i < result.length; i++) {
                usersString = usersString + "id: " + result[i].id + "\n"
                    + "fist name: " + result[i].first_name + "\n"
                    + "last name: " + result[i].last_name + "\n"
                    + "email: " + result[i].email + "\n"
                    + "password: " + result[i]["password"] + "\n"
                    + "User name: " + result[i].Username + "\n\n";

            }
            res.render('read', {content: usersString });
            con.end();

        });
    });
});

router.post('/', function(req, res, next) {

    var con = mysql.createConnection(dbconfig);
    var usersJson = "[";

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM MOCK_DATA", function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            //this for save result in a string
            for(i = 0; i < result.length; i++) {
                usersJson = usersJson + '{'+'"id":' + '"'+result[i].id+'",'
                    + '"fist name":' + '"'+result[i].first_name+'",'
                    + '"last name":' + '"'+result[i].last_name+'",'
                    + '"email":' + '"'+result[i].email+'",'
                    + '"password":' + '"'+result[i]["password"]+'",'
                    + '"User name":' + '"'+result[i].Username+'"}';

                if(i != (result.length - 1)) {
                    usersJson = usersJson+',';
                }

            }
            usersJson = usersJson+']';
            res.render('read', {output: usersJson });
            con.end();

        });
    });


});


//export this router to use in our index.js
module.exports = router;
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
    var messageJson;

    con.connect(function(err) {
        if (err) throw err;
        var sql = "DELETE FROM MOCK_DATA WHERE Username = "+"'"+userName+"'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            //Check if username exist
            if(result.affectedRows != 0) {
                console.log("Number of records deleted: " + result.affectedRows);
                messageJson ='[{"message":"Number or records deleted: '+result.affectedRows+'"}]';
                res.render('delete', {output: messageJson});
            }
            else {
                console.log("Failed to delete, user name does not exist");
                messageJson ='[{"message":"Failed to delete, user name does not exist"}]';
                res.render('delete', {output: messageJson});
            }

            con.end();
        });
    });
});

//export this router to use in our index.js
module.exports = router;
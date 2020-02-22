const express   =   require('express');
const path      =   require('path');
const bodyParser =  require('body-parser');
const ejs       =   require('ejs');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended:   true
}));
app.use(bodyParser.json());

const mains = require('./main');
let session = mains.sess;
let connection = mains.conn;


var ex = module.exports;
ex.forgot_password = app.get('/forgotPass', function(req, res) {
    res.render('forgot_pass.ejs', {
        datas:      '',
        requests:   'block',
        sents:      'none'
    });
});

ex.request = app.post('/requestPass', function(req, res) {
    let username = req.body.id;
    connection.query(
        "SELECT * FROM member WHERE mem_id = ? OR mem_username = ?",
        [username, username],
        function(err, result) {
            if (err) { console.error(); }
            if (result.length > 0) {
                // Are Member
                console.log(result[0].mem_email);

                /* today date and time */
                let today = new Date();
                let toyear = today.getFullYear();
                let tomonth = today.getMonth();
                let todate = today.getDate();
                let tohour = today.getHours();
                let tominute = today.getMinutes();
                let tosecond = today.getSeconds();
                let date_now = toyear + "-" + (tomonth+1) + "-" + todate;
                let time_now = tohour + ":" + tominute + ":" + tosecond;

                const setDatas = {
                    dates:      date_now,
                    times:      time_now,
                    username:   username
                }

                connection.query(
                    "INSERT INTO forgot_password SET ?", setDatas,
                    function(err1, rows) {
                        if (err1) { console.error(); }
                        else {
                            console.log('Data Inserted!!!');
                            /* Create random password */
                            let random5 = Math.random().toString(36).substring(2, 7);
                            console.log(random5);

                            connection.query(
                                "UPDATE member SET mem_password = ? WHERE mem_id = ? OR mem_username = ?",
                                [random5, username, username],
                                function (err2, rowss) {
                                    if (err2) { console.error(); }
                                    else {
                                        console.log('Change Password!!!');

                                        res.render('forgot_pass.ejs', {
                                            datas:      'We will send you the password via email "' + result[0].mem_email + '" within 3 business days.',
                                            requests:   'none',
                                            sents:      'block'
                                        });
                                    }
                                }
                            );

                        }
                    }
                );

            }
            else {
                // Not Member
                res.render('forgot_pass.ejs', {
                    datas:      'Username not found; You are not a member!',
                    requests:   'block',
                    sents:      'none'
                });
            }
        }
    );
});


/*
// ADMIN: send password to member
ex.send_password = app.get('/sendPass', function(req, res) {
    connection.query(
        "SELECT * FROM forgot_password, member WHERE username = mem_id",
        function(err, results) {
            if (err) { console.error(); }
            res.render('admin_sendPass.ejs', {
                datas:      results
            });
        }
    );
});

ex.delete_password = app.get('/deletePass/:date&:time', function(req, res) {
    let date = req.params.date;
    let time = req.params.time;
    connection.query(
        "DELETE FROM forgot_password WHERE dates = ? AND times = ?", [date, time],
        function(err, results) {
            if (err) { console.error(); }
            res.redirect('/sendPass');
        }
    );
});

ex.edit_password = app.get('/editPass/:date&:time', function(req, res) {
    let date = req.params.date;
    let time = req.params.time;

    connection.query(
        "UPDATE forgot_password SET status = 'S' WHERE dates = ? AND times = ?", [date, time],
        function(err, results) {
            if (err) { console.error(); }
            console.log('Edit Success!!');

            res.redirect('/sendPass');
        }
    );
});
*/

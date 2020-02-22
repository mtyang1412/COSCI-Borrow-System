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

/* ========== Export to main.js ========== */
var ex = module.exports;
/* -- Show Login Page -- */
ex.student_first = app.get('/user_student/:id', function(req, res) {
    console.log('----- First Page Student -----');
    if (req.session.loggedin) {
        /* User is currently logged in */
        let username = req.params.id;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, student \
             WHERE mem_id = stu_id AND (mem_id = ? OR mem_username = ?)",
            [username, username],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    console.log(result[0].mem_id);
                    // Selet all equipment from mySQL
                    connection.query(
                        "SELECT * FROM equipment_set",
                        function(err2, result2) {
                            if (err2) { console.error(); }
                            else {
                                res.render('user_student.ejs', {
                                    datas:      result[0],
                                    todays:     date_now,
                                    sets:       result2
                                });
                            }
                        }
                    );
                }
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.student_profile = app.get('/user_student/:id/profile', function(req, res) {
    if (req.session.loggedin) {
        /* User is currently logged in */
        let username = req.params.id;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, student, major\
             WHERE mem_id = stu_id AND stu_major = maj_id AND (mem_id = ? OR mem_username = ?)",
            [username, username],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    // Selet all equipment from mySQL
                    connection.query(
                        "SELECT * FROM equipment_set",
                        function(err2, result2) {
                            if (err2) { console.error(); }
                            else {
                                res.render('user_student_profile.ejs', {
                                    datas:      result[0],
                                    todays:     date_now,
                                    sets:       result2
                                });
                            }
                        }
                    );
                }
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.student_profile_edit_info = app.get('/user_student/:id/profile/edit-info', function(req, res) {
    if (req.session.loggedin) {
        /* User is currently logged in */
        let username = req.params.id;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, student, major\
             WHERE mem_id = stu_id AND stu_major = maj_id AND (mem_id = ? OR mem_username = ?)",
            [username, username],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    // Selet all equipment from mySQL
                    connection.query(
                        "SELECT * FROM equipment_set",
                        function(err2, result2) {
                            if (err2) { console.error(); }
                            else {
                                res.render('user_student_profile_edit_info.ejs', {
                                    datas:      result[0],
                                    todays:     date_now,
                                    sets:       result2
                                });
                            }
                        }
                    );
                }
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.student_edit_info = app.post('/user_student/:id/profile/edit-info', function(req, res) {
    console.log('----- Edit Profile -----');
    if (req.session.loggedin) {
        let username = req.params.id;
        let email = req.body.email;
        let phone = req.body.phone;
        console.log(username);
        console.log(req.files != null);

        /* image */
        if (req.files && req.files.image) {
            let uploadedFile = req.files.image;
            let image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = username + '.' + fileExtension;

            console.log('Prepare data:',username,phone[0],email[0],image_name)
            if (uploadedFile.mimetype === 'image/png' || 
                uploadedFile.mimetype === 'image/jpeg' || 
                uploadedFile.mimetype === 'image/gif') {
                    
                uploadedFile.mv(`img/user/${image_name}`, (err) => {
                    if (err) {
                        res.send('error try again');
                    }
                    connection.query(
                        "UPDATE member\
                        SET mem_phone = '"+ phone[0] +"',\
                        mem_email = '"+ email[0] +"',\
                        mem_pic = '"+ image_name +"'\
                        WHERE mem_id = '"+ username +"' ",
                        function(err) {
                            if (err) { console.error(); }
                            else {
                                console.log('Profile & Image UPDATE!!');
                            }
                        }
                    );
                });
            }
        }
        else {
            connection.query(
                "UPDATE member\
                SET mem_phone = '"+ phone[0] +"',\
                mem_email = '"+ email[0] +"'\
                WHERE mem_id = '"+ username +"' ",
                function(err) {
                    if (err) { console.error(); }
                    else {
                        console.log('Profile UPDATE!!');
                    }
                }
            );
        }
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.student_profile_edit_pass = app.get('/user_student/:id/profile/edit-pass', function(req, res) {
    if (req.session.loggedin) {
        /* User is currently logged in */
        let username = req.params.id;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, student, major\
             WHERE mem_id = stu_id AND stu_major = maj_id AND (mem_id = ? OR mem_username = ?)",
            [username, username],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    // Selet all equipment from mySQL
                    connection.query(
                        "SELECT * FROM equipment_set",
                        function(err2, result2) {
                            if (err2) { console.error(); }
                            else {
                                res.render('user_student_profile_edit_pass.ejs', {
                                    datas:      result[0],
                                    todays:     date_now,
                                    sets:       result2
                                });
                            }
                        }
                    );
                }
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.student_profile_edit_pass = app.post('/user_student/:id/profile/edit-pass', function(req, res) {
    console.log('----- Reset Password -----');
    if (req.session.loggedin) {
        let username = req.params.id;
        let password = req.body.password; 
        let newpass = req.body.newpass;
        let confirm = req.body.confirm;

        console.log('รหัส',password,newpass,confirm)

        console.log(password)

        if (mem_password = password) {
            connection.query(
                "UPDATE `member` SET `mem_password` = '" + newpass + "' WHERE `member`.`mem_username` = '" + username + "';",
                [username, username],
                function(err) {
                    if (err) { console.error(); }
        })
    }
        console.log('update แล้ว')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.student_logout = app.get('/user_student/:id/logout', function(req, res) {
    console.log('----- Logout -----');
    console.log("user.signout()");
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});
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
/* -- Show Staff First Page -- */
ex.staff_first = app.get('/user_staff/:id', function(req, res) {
    console.log('----- First Page Staff -----');
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    console.log('Login: ', isLogin);
    if (isLogin) {
        /* User is currently logged in */
        let username = req.params.id;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, staff \
             WHERE mem_id = staff_id AND (mem_id = ? OR mem_username = ?)",
            [username, username],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    // Select all equipment from mySQL
                    connection.query(
                        "SELECT * FROM equipment_set",
                        function(err2, result2) {
                            if (err2) { console.error(); }
                            else {
                                res.render('user_staff.ejs', {
                                    datas:      result[0],
                                    todays:     date_now,
                                    sets:       result2,
                                    usn:        usn
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

ex.staff_profile = app.get('/user_staff/:id/profile', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        /* User is currently logged in */
        let username = req.params.id;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, staff\
             WHERE mem_id = staff_id AND\
             (mem_id = ? OR mem_username = ?)", [username, username],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    // Select Staff borrow list
                    connection.query(
                        "SELECT *\
                        FROM member m, borrow b, borrow_data bd,\
                             borrow_data_detail bdd\
                        WHERE (b.mem_id = m.mem_id) AND\
                              (bd.bor_id = b.bor_id AND bdd.bor_data_id = bd.bor_data_id) AND\
                              (b.bor_book_date < CURDATE()) AND\
                              (m.mem_id = ? OR mem_username = ?)\
                        GROUP BY b.bor_id", [username, username]
                    );
                    res.render('user_staff_profile.ejs', {
                        datas:      result[0],
                        todays:     date_now,
                        usn:        usn
                    });
                }
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.staff_show_edit_info = app.get('/user_staff/:id/profile/edit-info', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        /* User is currently logged in */
        let username = req.params.id;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, staff\
             WHERE mem_id = staff_id AND\
             (mem_id = ? OR mem_username = ?)", [username, username],
            function(err, result) {
                if (err) { console.error(); }

                res.render('user_staff_edit_info.ejs', {
                    datas:      result[0],
                    todays:     date_now,
                    usn:        usn
                });
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.staff_edit_info = app.post('/user_staff/:id/profile/edit-info', function(req, res) {
    console.log('----- Edit Staff Profile -----');
    
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
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
                        SET mem_phone = ?,\
                        mem_email = ?,\
                        mem_pic = '?\
                        WHERE (mem_id = ? OR mem_username = ?) ",
                        [phone[0], email[0], image_name, username, username],
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
                SET mem_phone = ?,\
                mem_email = ?\
                WHERE (mem_id = ? OR mem_username = ?) ",
                [phone[0], email[0], username, username],
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

ex.staff_show_edit_pass = app.get('/user_staff/:id/profile/edit-pass', function(req, res) {
    console.log("====== Edit Staff Password Page ======");

    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        /* User is currently logged in */
        let username = req.params.id;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, staff\
             WHERE mem_id = staff_id AND\
             (mem_id = ? OR mem_username = ?)",
            [username, username],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    res.render('user_staff_edit_pass.ejs', {
                        datas:      result[0],
                        todays:     date_now,
                        usn:        usn
                    });
                }
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.staff_edit_pass = app.post('/user_staff/:id/profile/edit-pass', function(req, res) {
    console.log('----- Reset Password -----');
    
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let username = req.params.id;
        let password = req.body.password;
        let newpass = req.body.newpass;

        console.log('mem ID: ', username);
        console.log('Change ', password, ' --> ', newpass);

        connection.query(
            "UPDATE member SET mem_password = ?\
            WHERE (mem_id = ? OR mem_username = ?)",
            [newpass, username, username],
            function (err) {
                if (err) { console.error(); }
                console.log('Password UPDATE!!')
            }
        ); 
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});


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
/* -------- Show Login Page -------- */
ex.show_login = app.get('/login', function(req, res) {
    connection.query(
        "DELETE FROM `borrow_temp`",
        function(err1) {
            if (err1) { console.error(); }
        }
    );
    
    res.render('login.ejs', {
        datas:  '',
        showL:  'block',
        showR:  'none',
        datas2: '',
        regist: '',
        member: [],
        usernames:  []
    });
});

/* -------- Login to Student, Staff, or Admin -------- */
ex.login = app.post('/login', function(req, res) {
    /* ===== Check Login ===== */
    var username = req.body.username;
    var password = req.body.password;
    
    connection.query(
        "SELECT * FROM member \
         WHERE (mem_id = ? AND mem_password = ?) OR \
         (mem_username = ? AND mem_password = ?)",
        [username, password, username, password],
        function(err, results) {
            if (err) { console.error(); }
            console.log(results)
            if (results.length > 0) {
                //console.log(results);
                if (results[0].mem_type == 'student') {
                    req.session.loggedin = true;
                    req.session.username = username;

                    /* ===== Student ===== */
                    res.redirect('/student/' + username);
                }
                else if (results[0].mem_type == 'staff') {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.redirect('/user_staff/' + username);
                }
                else if (results[0].mem_type == 'admin') {
                    req.session.loggedin = true;
                    req.session.username = username;

                    /* ===== Admin ===== */
                    res.redirect('/admin/' + username);
                }
                else if (results[0].mem_type == 'superadmin') {
                    req.session.loggedin = true;
                    req.session.username = username;

                    /* ===== Super Admin ===== */
                    res.redirect('/super/admin/' + username);
                }
            }
            else {
                // Incorrect Username and/or Password!
                res.render('login.ejs', {
                    datas:  'ชื่อผู้ใช้ และ/หรือ รหัสผ่านไม่ถูกต้อง!',
                    showL:  'block',
                    showR:  'none',
                    datas2: '',
                    regist: '',
                    member: [],
                    usernames:  []
                });
            }
        }
    );
});



ex.check = app.post('/check_id', function(req, res) {
    var username = req.body.stuid;
    connection.query(
        "SELECT * FROM member WHERE mem_id = ?", [username],
        function(err, results) {
            if (err) { console.error(); }
            console.log(results.length);
            console.log(username);
            if (results.length > 0) {
                // You are already member
                res.render('login.ejs', {
                    datas:  '',
                    datas2: 'คุณเป็นสมาชิกแล้ว!!',
                    showL:  'none',
                    showR:  'block',
                    regist: '',
                    member: [],
                    usernames:  []
                });
            }
            else {
                connection.query(
                    "SELECT * FROM student, major \
                     WHERE maj_id = stu_major AND stu_id =  ?", 
                    [username],
                    function (err, row) {
                        if (err) { console.error(); }
                        if (row.length > 0) {
                            connection.query(
                                "SELECT mem_username FROM member",
                                function (err, rows) {
                                    if (err) { console.error(); }
                                    else {
                                        var allRows = new Array;
                                        for (i=0;i<rows.length;i++) {
                                            allRows.push(rows[i].mem_username)
                                        }
                                        console.log(allRows);
                                        // You can Register!
                                        res.render('login.ejs', {
                                            datas:      '',
                                            datas2:     '',
                                            showL:      'none',
                                            showR:      'block',
                                            regist:     'stu',
                                            member:     row[0],
                                            usernames:  allRows
                                        });
                                    }
                                }
                            );
                        }
                        else {
                            // May be staff
                            // You are not student in COSCI
                            res.render('login.ejs', {
                                datas:  '',
                                datas2: 'ขออภัย..ไม่สามารถสมัครสมาชิกได้ คุณไม่ใช่นิสิตใน COSCI',
                                showL:  'none',
                                showR:  'block',
                                regist: '',
                                member: [],
                                usernames:  []
                            });
                        }
                    }
                );
            }
        }
    );
});

ex.register = app.post('/register', function(req, res) {
    let student_id      = req.body.stuid;
    let username        = req.body.username;
    let password        = req.body.password;
    let phone           = req.body.phone;
    let email           = req.body.email;
    let type          = req.body.status;

    const members = {
        mem_id:         student_id,
        mem_username:   username,
        mem_password:   password,
        mem_phone:      phone,
        mem_email:      email,
        mem_status:     null,
        mem_type:       type
    }
    console.log(members);

    connection.query(
        "INSERT INTO member SET ?", members,
        function(err, results) {
            if (err) { console.error(); }
            
            if (type == 'student') {
                console.log('Data Inserted!!!');
                
                req.session.loggedin = true;
                req.session.username = username;
                console.log(req.session.loggedin);
                res.redirect('/student/' + username);
            }
        }
    );
});

ex.logout = app.get('/user/logout', function(req, res) {
    console.log('----- Logout -----');
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});


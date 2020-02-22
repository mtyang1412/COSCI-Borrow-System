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
/* -- Show Login Page -- */
ex.show_login = app.get('/login', function(req, res) {
    res.render('login.ejs', {
        datas:  '',
        showL:  'block',
        showR:  'none',
        datas2: '',
        regist: false,
        member: [],
        usernames:  []
    });
});

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
            if (results.length > 0) {
                //console.log(results);
                if (results[0].mem_type == 'student') {
                    req.session.loggedin = true;
                    req.session.username = username;
                    console.log(req.session.loggedin);
                    res.redirect('/user_student/' + username);
                }
                else if (results[0].mem_type == 'staff') {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.render('login.ejs', {
                        datas:  'สวัสดี STAFF!',
                        showL:  'block',
                        showR:  'none',
                        datas2: '',
                        regist: false,
                        member: [],
                        usernames:  []
                    });
                }
                else if (results[0].mem_type == 'admin') {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.render('login.ejs', {
                        datas:  'สวัสดี ADMIN ',
                        showL:  'block',
                        showR:  'none',
                        datas2: '',
                        regist: false,
                        member: [],
                        usernames:  []
                    });
                }
            }
            else {
                res.render('login.ejs', {
                    datas:  'โปรดตรวจสอบ บัญชีผู้ใช้หรือรหัสผ่านใหม่อีกครั้ง',
                    showL:  'block',
                    showR:  'none',
                    datas2: '',
                    regist: false,
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
                res.render('login.ejs', {
                    datas:  '',
                    datas2: 'รหัสนิสิตนี้เคยสมัครสมาชิกแล้ว',
                    showL:  'none',
                    showR:  'block',
                    regist: false,
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
                                        res.render('login.ejs', {
                                            datas:      '',
                                            datas2:     'สามารถสมัครสมาชิกได้',
                                            showL:      'none',
                                            showR:      'block',
                                            regist:     true,
                                            member:     row[0],
                                            usernames:  allRows
                                        });
                                    }
                                }
                            );
                        }
                        else {
                            res.render('login.ejs', {
                                datas:  '',
                                datas2: 'รหัสนิสิตไม่ถูกต้อง ไม่สามารถทำการสมัครสมาชิกได้ เนื่องจากไม่ใช่นิสิต COSCI',
                                showL:  'none',
                                showR:  'block',
                                regist: false,
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

    const members = {
        mem_id:         student_id,
        mem_username:   username,
        mem_password:   password,
        mem_phone:      phone,
        mem_email:      email,
        mem_status:     null,
        mem_type:       'student',
        mem_pic:        'default.png'
    }
    console.log(members);

    connection.query(
        "INSERT INTO member SET ?", members,
        function(err) {
            if (err) { console.error(); }
            else {
                console.log('Data Inserted!!!');
                req.session.loggedin = true;
                req.session.username = username;
                res.render('login.ejs', {
                    datas:  '',
                    showL:  'block',
                    showR:  'none',
                    datas2: '',
                    regist: false,
                    member: [],
                    usernames:  []
                });
            }
        }
    );
});


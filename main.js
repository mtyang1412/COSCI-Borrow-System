const express   =   require('express');
const path      =   require('path');
const bodyParser =  require('body-parser');
const session   =   require('express-session');
const fileUpload = require('express-fileupload');
const mysql     =   require('mysql');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended:   true
}));
app.use(bodyParser.json());

var ex_sess = module.exports;
ex_sess.sess = app.use(
    session({
        secret:             "secret",
        resave:             true,
        saveUninitialized:  true
    })
);

var connection = mysql.createConnection({
    host:           "localhost",
    user:           "root",
    password:       "",
    database:       "borrow_system",
    dateStrings:    true
});
var ex_mysql = module.exports;
ex_mysql.conn = connection;


/* First Page -> index.ejs */
app.get('/', function(req, res) {
    // Selet all equipment from mySQL
    connection.query(
        "SELECT * FROM equipment_set",
        function(err, result) {
            if (err) { console.error(); }
            else {
                res.render('index.ejs', {
                    sets:   result
                });
            }
        }
    );
});


app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/font'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/img'));
app.use(fileUpload()); // configure fileupload

/* Login & Register -> login.js */
const logins = require('./login');
app.get('/login', logins.show_login);
app.post('/login', logins.login);
app.post('/check_id', logins.login);
app.post('/register', logins.register);

/* Forgot Password -> forgot.js */
const forget = require('./forgot');
app.get('/forgotPass', forget.forgot_password);
app.post('/requestPass', forget.request);
// app.get('/sendPass', forget.send_password);
// app.get('/deletePass/:date&:time', forget.delete_password);
// app.get('/editPass/:date&:time', forget.edit_password);

/* Member Student -> user_stu.js */
const student = require('./user_stu');
app.get('/user_student/:id', student.student_first);
app.get('/user_student/:id/profile', student.student_profile);
/* edit-info */
app.get('/user_student/:id/profile/edit-info', student.student_profile_edit_info);
app.post('/user_student/:id/profile/edit-info', student.student_profile_edit_info);
/* reset-pass */
app.get('/user_student/:id/profile/edit-pass', student.student_profile_edit_pass);
app.post('/user_student/:id/profile/edit-pass', student.student_profile_edit_pass);
/* logout */
app.get('/user_student/:id/logout', student.student_logout);

/* Equipment -> equipment.js */
const equipment = require('./equipment.js');
app.get('/equip/:set_id', equipment.equipment_data);
app.get('/equip_borrow/:mem_id&:set_id', equipment.equipment_borrow);


app.listen(3000);
console.log('running on port 3000......')

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
/* -- Super Admin login -- */
var adminLogin = "";
ex.superadmin_login = app.get('/super/admin/:id', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    console.log('Admin Login: ', isLogin);
    if (isLogin) {
        adminLogin = usn;
        res.redirect('/super/admin')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

/* -- Super Admin First Page -- */
ex.superadmin_first = app.get('/super/admin', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- First Page Super Admin -----');
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, staff \
             WHERE mem_id = staff_id AND (mem_id = ? OR mem_username = ?)",
            [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                
                res.render('super_admin_first.ejs', {
                    datas:     result[0],
                    todays:    date_now,
                    usn:       usn
                });
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});
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
        "DELETE FROM `borrow_temp`",
        function(err1) {
            if (err1) { console.error(); }
        }
    );
    
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
app.get('/user/logout', logins.logout);


/* Forgot Password -> forgot.js */
const forget = require('./forgot');
app.get('/forgotPass', forget.forgot_password);
app.post('/requestPass', forget.request);
// app.get('/sendPass', forget.send_password);
// app.get('/deletePass/:date&:time', forget.delete_password);
// app.get('/editPass/:date&:time', forget.edit_password);


/* Member Student -> user_stu.js */
const student = require('./user_stu');
app.get('/student/:id', student.student_login);
app.get('/user_student', student.student_first);
app.get('/user_student/:id/select/equipment', student.open_stu_equip);
app.get('/user_student/select/equipment', student.student_equipment);
app.get('/user_student/:id/profile', student.open_profile);
app.get('/user_student/profile', student.student_profile);
app.get('/user_student/:id/profile/edit-info', student.open_edit_info);
app.get('/user_student/profile/edit-info', student.student_show_edit_info);
app.post('/user_student/profile/edit-info', student.student_edit_info);
app.get('/user_student/:id/profile/edit-pass', student.open_edit_pass);
app.get('/user_student/profile/edit-pass', student.student_show_edit_pass);
app.post('/user_student/:id/profile/edit-pass', student.student_edit_pass);
app.get('/equipGR/:bor_id/:id/:status', student.stu_get_return_device);


/* Member Staff -> user_staff.js */
const staff = require('./user_staff');
app.get('/user_staff/:id', staff.staff_first);
app.get('/user_staff/:id/profile', staff.staff_profile);
app.get('/user_staff/:id/profile/edit-info', staff.staff_show_edit_info);
app.post('/user_staff/:id/profile/edit-info', staff.staff_edit_info);
app.get('/user_staff/:id/profile/edit-pass', staff.staff_show_edit_pass);
app.post('/user_staff/:id/profile/edit-pass', staff.staff_edit_pass);


/* Equipment -> equipment.js */
const equipment = require('./equipment.js');
app.get('/equip/:set_id', equipment.equipment_data);
app.get('/equip_borrow/:mem_id&:set_id', equipment.open_borrow1);
app.post('/equip_borrow/:set_id', equipment.borrow0);
app.get('/equip_borrow/:set_id', equipment.borrow1);
app.post('/student_borrow/2', equipment.borrow2);
app.post('/add/borrow', equipment.add_stu_borrow);
app.get('/cancel/:bor_id/:id', equipment.cancel_borrow);


/* Admin -> admin.js */
const admin = require('./admin');
app.get('/admin/:id', admin.admin_login);
app.get('/admin', admin.admin_first);
app.get('/admin/:id/profile', admin.open_profile);
app.get('/profile/admin', admin.admin_profile);
app.post('/admin/:id/profile/my', admin.open_profile_my);
app.get('/profile/my/:m/:y/admin', admin.admin_profile_my);
app.get('/admin/:id/profile/edit-info', admin.open_edit_info);
app.get('/admin/profile/edit-info', admin.admin_show_edit_info);
app.post('/admin/profile/edit-info', admin.admin_edit_info);
app.get('/admin/:id/profile/edit-pass', admin.open_edit_pass);
app.get('/admin/profile/edit-pass', admin.admin_show_edit_pass);
app.post('/admin/:id/profile/edit-pass', admin.admin_edit_pass);

// Admin -> Manage Equipment
app.get('/admin/:id/manage/equipment', admin.open_eqipment);
app.get('/admin/manage/equipment', admin.admin_show_equipment);
app.get('/admin/:id&:borID/borrow-detail', admin.open_borrow_datail);
app.get('/admin/borrow-detail/:borID', admin.admin_borrow_detail);
app.post('/admin/:id/approve', admin.admin_axrd);
app.get('/admin/:id/add/equipment', admin.open_add_eqipment);
app.get('/admin/add/equipment', admin.admin_add_equipment);
app.get('/admin/:id/add/equipment2', admin.open_add_eqipment2);
app.get('/admin/add/equipment2', admin.admin_add_equipment2);
app.post('/admin/add/equipment2/:id', admin.admin_add_equip2);
app.get('/admin/:id/delete/:setid', admin.admin_delete_equip);
app.get('/admin/:id/edit/:setid', admin.open_editEquipment);
app.get('/admin/edit/equip/:setid', admin.admin_editEquipment);
app.post('/admin/:id/edit/set', admin.admin_edit_set);
app.post('/admin/:id/edit/add/type', admin.admin_edit_add_type);
app.post('/admin/:id/edit/type', admin.admin_edit_type);
app.post('/admin/:id/edit/add/equip', admin.admin_edit_add_equip);
app.post('/admin/:id/edit/delete/type', admin.admin_edit_delete_type);
app.post('/admin/:id/edit/equip', admin.admin_edit_equip);
app.post('/admin/:id/edit/delete/equip', admin.admin_edit_delete_equip);
app.get('/admin/:id/equip/setting/:search', admin.open_equip_setting);
app.get('/admin/equip/setting/:search', admin.admin_equip_setting);
app.post('/admin/:id/setting/one', admin.admin_setting_one);
app.post('/admin/:id/setting/many', admin.admin_setting_many);
// กำลังทำอยู่
app.get('/admin/:id/history/:search', admin.open_history);
app.get('/admin/history/borrow/:se', admin.admin_history);
app.post('/admin/history/advanced/:id', admin.admin_advanced_search);


/* Super Admin -> superadmin.js */
const supadmin = require('./superadmin');
app.get('/super/admin/:id', supadmin.superadmin_login);
app.get('/super/admin', supadmin.superadmin_first);


app.listen(3000);
console.log('running on port 3000......')

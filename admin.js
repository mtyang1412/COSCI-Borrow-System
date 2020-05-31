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
/* -- Admin login -- */
var adminLogin = "";
ex.admin_login = app.get('/admin/:id', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    console.log('Admin Login: ', isLogin);
    if (isLogin) {
        adminLogin = usn;
        res.redirect('/admin')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

/* -- Show Admin First Page -- */
ex.admin_first = app.get('/admin', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- First Page Admin -----');
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
                
                // Select all equipment borrow from mySQL
                connection.query(
                    "SELECT * FROM borrow\
                    WHERE (bor_status = 'p' OR \
                           bor_status = 'a' OR \
                           bor_status = 'r')",
                    function(err2, result2) {
                        if (err2) { console.error(); }
                        
                        res.render('admin_first.ejs', {
                            datas:     result[0],
                            todays:    date_now,
                            calData:   result2,
                            usn:       usn
                        });
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});


/* ===== Admin Profile ===== */
ex.open_profile = app.get('/admin/:id/profile', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/profile/admin');
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_profile = app.get('/profile/admin', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('------- Admin Profile -------')
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, staff\
             WHERE mem_id = staff_id AND\
             (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                
                let dateForComment = {
                    maxyear:       (toyear + 543),
                    minyear:       ((toyear - 15) + 543),
                    monthselect:   (tomonth + 1),
                    yearselect:    (toyear + 543)
                }
                console.log(dateForComment)

                connection.query(
                    "SELECT *\
                    FROM satisfaction_assessment_form, member\
                    WHERE (YEAR(saf_date) = YEAR(CURDATE()) ) AND\
                          (MONTH(saf_date) = MONTH(CURDATE())) AND\
                          (mem_id = saf_staff) AND\
                          (mem_id = ? OR mem_username = ?)\
                    ORDER BY saf_date", [usn, usn],
                    function(err2, row) {
                        if (err2) { console.error(); }

                        res.render('admin_profile.ejs', {
                            datas:          result[0],
                            todays:         date_now,
                            usn:            usn,
                            dateComment:    dateForComment,
                            satisfaction:   row
                        });
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.open_profile_my = app.post('/admin/:id/profile/my', function(req, res) {
    const usn = req.params.id;
    const m = req.body.ssafmonth;
    const y = req.body.ssafyear;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        console.log(usn, m, y)
        res.redirect('/profile/my/' + m + '/' + y + '/admin');
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_profile_my = app.get('/profile/my/:m/:y/admin', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('------- Admin Profile Search month & year -------')
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        let searchmonth = req.params.m;
        let searchyear = req.params.y;
        console.log('DATA:', searchmonth, searchyear)
        searchmonth = parseInt(searchmonth);
        searchyear = parseInt(searchyear)
        
        connection.query(
            "SELECT * FROM member, staff\
             WHERE mem_id = staff_id AND\
             (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                
                let dateForComment = {
                    maxyear:       (toyear + 543),
                    minyear:       ((toyear - 15) + 543),
                    monthselect:   searchmonth,
                    yearselect:    (searchyear + 543)
                }
                console.log(dateForComment)

                connection.query(
                    "SELECT *\
                    FROM satisfaction_assessment_form, member\
                    WHERE (YEAR(saf_date) = ?) AND\
                          (MONTH(saf_date) = ?) AND\
                          (mem_id = saf_staff) AND\
                          (mem_id = ? OR mem_username = ?)\
                    ORDER BY saf_date", [searchyear, searchmonth, usn, usn],
                    function(err2, row) {
                        if (err2) { console.error(); }

                        res.render('admin_profile.ejs', {
                            datas:          result[0],
                            todays:         date_now,
                            usn:            usn,
                            dateComment:    dateForComment,
                            satisfaction:   row
                        });
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});
// กำลังทำอยู่


/* ----- Admin Edit Profile ----- */
ex.open_edit_info = app.get('/admin/:id/profile/edit-info', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/profile/edit-info')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
})

ex.admin_show_edit_info = app.get('/admin/profile/edit-info', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('------- Admin Edit Profile -------')
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, staff\
             WHERE mem_id = staff_id AND\
             (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err, result) {
                if (err) { console.error(); }

                res.render('admin_edit_info.ejs', {
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

ex.admin_edit_info = app.post('/admin/profile/edit-info', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let username = req.body.username;
        let email = req.body.email;
        let phone = req.body.phone;
        console.log(username);
        console.log('Image File: ', req.files != null);

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
                            mem_pic = ?\
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


/* ----- Edit Password ----- */
ex.open_edit_pass = app.get('/admin/:id/profile/edit-pass', function(req,res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/profile/edit-pass')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_show_edit_pass = app.get('/admin/profile/edit-pass', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Edit Password -----')
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
            [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    res.render('admin_edit_pass.ejs', {
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

ex.admin_edit_pass = app.post('/admin/:id/profile/edit-pass', function(req, res) {
    console.log("====== Edit Admin Password ======");
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let username = usn;
        let password = req.body.password;
        let newpass = req.body.newpass;

        console.log('username: ', username);
        console.log('Change ', password, ' --> ', newpass);

        connection.query(
            "UPDATE member SET mem_password = ?\
            WHERE mem_id = ? OR mem_username = ?",
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



/* ------- Admin Equipment Page ------- */
ex.open_eqipment = app.get('/admin/:id/manage/equipment', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/manage/equipment')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

var arrAllSet = [];
ex.admin_show_equipment = app.get('/admin/manage/equipment', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        getAllSet();

        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, staff\
            WHERE mem_id = staff_id AND\
            (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err1, result1) {
                if (err1) { console.error(); }

                /* Select Borrow: 
                    รออนุมัติ-Pending (p), 
                    อนุมัติ-Approve (a),
                    รับอุปกรณ์แล้ว-Device received (r)
                    คืนอุปกรณ์แล้ว-Device return (d)  แต่ยังไม่ประเมิน
                */
               connection.query(
                   "SELECT *\
                   FROM borrow b, borrow_data bd,\
                        equipment e, equipment_type et, equipment_set es\
                   WHERE (e.type_id = et.type_id AND et.set_id = es.set_id) AND\
                         (b.bor_id = bd.bor_id) AND\
                         (bd.bor_equip_id = e.equip_id OR \
                         bd.bor_equip_id = et.type_id OR \
                         bd.bor_equip_id = es.set_id) AND\
                         (b.bor_status = 'p' OR b.bor_status = 'a' OR b.bor_status = 'r')\
                   GROUP BY b.bor_id",
                   function(err2, result2) {
                       if (err2) { console.error(); }

                       res.render('admin_equipment.ejs', {
                        datas:      result1[0],
                        todays:     date_now,
                        usn:        usn,
                        setData:    arrAllSet,
                        calData:    result2
                      })
                   }
               );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

// Get All Set
function getAllSet() {
    connection.query(
        "SELECT * FROM equipment_set",
        function(e,r) {
            if (e) { console.error(); }

            arrAllSet = r
        }
    );
}


/* ----- Admin Show Borrow Detail ----- */
ex.open_borrow_datail = app.get('/admin/:id&:borID/borrow-detail', function(req, res) {
    const usn = req.params.id;
    const borID = req.params.borID;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/borrow-detail/' + borID)
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_borrow_detail = app.get('/admin/borrow-detail/:borID', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        const borrowID = req.params.borID;
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        connection.query(
            "SELECT * FROM member, staff\
            WHERE mem_id = staff_id AND\
            (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err1, result) {
                if (err1) { console.error(); }

                connection.query(
                    "SELECT *\
                    FROM borrow b, borrow_data bd, borrow_data_detail bdd,\
                         equipment_set es, equipment_type et, equipment e,\
                         member m,\
                         subjects sub\
                    WHERE (es.set_id = et.set_id AND et.type_id = e.type_id) AND\
                          (b.bor_id = bd.bor_id AND bd.bor_data_id = bdd.bor_data_id) AND\
                          (e.equip_id = bdd.equip_id) AND\
                          (b.bor_subject = sub.sub_id) AND\
                          (b.mem_id = m.mem_id) AND\
                          (bd.bor_equip_id = es.set_id OR bd.bor_equip_id = et.type_id OR bd.bor_equip_id = e.equip_id) AND\
                          (b.bor_id = ?)", borrowID,
                   function(err2, row1) {
                       if (err2) { console.error(); }
                    
                       if (row1[0].mem_type = "student") {
                        connection.query(
                            "SELECT *\
                            FROM student, major\
                            WHERE (stu_major = maj_id) AND\
                                  stu_id = ?", row1[0].mem_id,
                            function(err3, row2) {
                                if (err3) { console.error(); }

                                console.log('Student Borrow')

                                res.render('admin_show_data.ejs', {
                                    datas:      result[0],
                                    todays:     date_now,
                                    usn:        usn,
                                    emData:     row1,
                                    memData:    row2
                                })
                            }
                        );
                       }
                       else if (row1[0].mem_type = "staff") {
                        connection.query(
                            "SELECT * FROM staff\
                            WHERE stu_id = ?", row1[0].mem_id,
                            function(err3, row3) {
                                if (err3) { console.error(); }

                                console.log('Staff Borrow')
                                res.render('admin_show_data.ejs', {
                                    datas:      result[0],
                                    todays:     date_now,
                                    usn:        usn,
                                    emData:     row1,
                                    memData:    row3
                                })
                            }
                        );
                       }
                   }
                );
            }
        );
    }
    else {
        res.redirect('/login');
    }
});

/* Approve or NotApprove Borrow */
ex.admin_axrd = app.post('/admin/:id/approve', function(req, res) {
    let usn =       req.params.id;
    let amounts =   req.body.amounte;     // Array
    let equips =    req.body.eqID;        // Array
    let approves =  req.body.approve;
    let notes =     req.body.note;
    let borrowID =  req.body.borID;
    
    if (approves == 'a') {
        /* ===== อนุมัติ/approve ===== */
        connection.query(
            "UPDATE borrow SET bor_note = ?,\
            bor_status = 'a'\
            WHERE bor_id = ?", [notes, borrowID],
            function(err1) {
                if (err1) { console.error(); }

                console.log('----- Update BORROW -----')
                connection.query(
                    "SELECT * FROM borrow_data\
                    WHERE bor_id = ?", borrowID,
                    function(err2, row1) {
                        if (err2) { console.error(); }

                        for (r=0; r<row1.length ;r++) {
                            for (i=0; i<amounts.length ;i++) {
                                connection.query(
                                    "UPDATE borrow_data_detail\
                                    SET bor_equip_amount = ?\
                                    WHERE bor_data_id = ? AND equip_id = ?",
                                    [amounts[i], row1[r].bor_data_id, equips[i]],
                                    function(err3) {
                                        if (err3) { console.error(); }

                                        console.log('----- Update BORROW AMOUNT -----')
                                    }
                                );
                            }
                        }
                        res.redirect('/admin/' + usn)
                    }
                );
            }
        );
    }
    else if (approves == 'x') {
        /* ===== ไม่อนุมัติ/not approve ===== */
        connection.query(
            "UPDATE borrow SET bor_note = ?,\
            bor_status = 'x'\
            WHERE bor_id = ?", [notes, borrowID],
            function(err1) {
                if (err1) { console.error(); }

                console.log('----- Update BORROW -----')
                res.redirect('/admin/' + usn)
            }
        );
    }
    else if (approves == 'r') {
        /* ===== รับอุปกรณ์แล้ว/device received ===== */
        connection.query(
            "UPDATE borrow SET bor_status = 'r'\
            WHERE bor_id = ?", borrowID,
            function(err1) {
                if (err1) { console.error(); }

                console.log('----- Update BORROW -----')
                res.redirect('/admin/' + usn)
            }
        );
    }
    else if (approves == 'd') {
        /* ===== คืนอุปกรณ์แล้ว/device returned ===== */
        connection.query(
            "UPDATE borrow SET bor_status = 'd'\
            WHERE bor_id = ?", borrowID,
            function(err1) {
                if (err1) { console.error(); }

                console.log('----- Update BORROW -----')
                res.redirect('/admin/' + usn)
            }
        );
    }
});


/* ------- หน้าเพิ่มอุปกรณ์ - Add Equipment ------- */
ex.open_add_eqipment = app.get('/admin/:id/add/equipment', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/add/equipment')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_add_equipment = app.get('/admin/add/equipment', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Admin Add Equipment -----')

        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        connection.query(
            "SELECT * FROM member, staff\
            WHERE mem_id = staff_id AND\
            (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err1, result) {
                if (err1) { console.error(); }

                connection.query(
                    "SELECT *\
                    FROM equipment_set es, staff s\
                    WHERE (es.staff_id = s.staff_id)",
                    function(err2, row1) {
                        if (err2) { console.error(); }
                        
                        res.render('admin_add_equip.ejs', {
                            datas:      result[0],
                            todays:     date_now,
                            usn:        usn,
                            setsData:   row1
                        })
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});


/* ------- Add Equipment 2 ------- */
ex.open_add_eqipment2 = app.get('/admin/:id/add/equipment2', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/add/equipment2')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_add_equipment2 = app.get('/admin/add/equipment2', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Admin Add Equipment2 -----')

        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        connection.query(
            "SELECT * FROM member, staff\
            WHERE mem_id = staff_id AND\
            (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err, result) {
                if (err) { console.error(); }

                connection.query(
                    "SELECT *\
                    FROM equipment_set s, equipment_type t\
                    WHERE s.set_id = t.set_id",
                    function(err1, row1) {
                        if (err1) {console.error();}

                        let idset = ''
                        let uniqeid = ''
                        let count = 0
                        for (i=0; i<(row1.length) ;i++) {
                            if (uniqeid != row1[i].set_id) {
                                uniqeid = row1[i].set_id
                                let numID = parseInt(uniqeid)
                                if ((numID - count) != 1) {
                                    idset = (numID < 10) ? ('00' + (numID-1)) : ( (numID < 100) ? ('0' + (numID-1)) : (numID-1) )
                                    break
                                }
                                else {
                                    idset = (numID < 9) ? ('00' + (numID+1)) : ( (numID < 99) ? ('0' + (numID+1)) : (numID+1) )
                                }
                                count++
                            }
                        }
                        
                        let nametype = new Set()
                        for (n=0; n<(row1.length) ;n++) {
                            let name = row1[n].type_name
                            nametype.add(name)
                        }

                        connection.query(
                            "SELECT * FROM member, staff\
                            WHERE mem_id = staff_id AND mem_type = 'admin' ",
                            function(err2, row2) {
                                if (err2) {console.error();}

                                res.render('admin_add_equip2.ejs', {
                                    datas:      result[0],
                                    todays:     date_now,
                                    usn:        usn,
                                    ides:       idset,
                                    nameet:     nametype,
                                    admindata:  row2
                                })
                            }
                        );
                    }
                );
            }
        );
    }
    else {
        res.redirect('/login');
    }
});

ex.admin_add_equip2 = app.post('/admin/add/equipment2/:id', function(req, res) {
    const usn = req.params.id;
    let typeData = req.body.etall;      // => ข้อมูลที่ได้เป็น String
    let typeDic = JSON.parse(typeData)  // แปลงเป็น Object หรือ Dictionary
    let equipData = req.body.eeall;
    let equipDic = JSON.parse(equipData);
    let setID = req.body.esid
    let setNAME = req.body.esname
    let setCATEGORY = req.body.escategory
    let setBORROW = req.body.escanb
    let setSTOCK = req.body.esstock
    let setADMIN = req.body.esadmin
    console.log(typeData)
    console.log(equipData)

    /* == image == */
    //console.log('Have File', req.files != null)
    if (req.files && req.files.esimage) {
        let uploadedFile = req.files.esimage;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = setID + '.' + fileExtension;
        //console.log(image_name)

        if (uploadedFile.mimetype === 'image/png' || 
            uploadedFile.mimetype === 'image/jpeg' || 
            uploadedFile.mimetype === 'image/gif') {
                
            uploadedFile.mv(`img/portfolio/${image_name}`, (err) => {
                if (err) {
                    res.send('error try again');
                }

                /* == เพิ่ม Set == */
                console.log(usn, setID)
                connection.query(
                    "INSERT INTO equipment_set\
                    SET set_id = ?,\
                        set_name = ?,\
                        set_category = ?,\
                        set_can_borrow = ?,\
                        set_stock = ?,\
                        set_pic = ?,\
                        staff_id = ?",
                    [setID, setNAME, setCATEGORY, setBORROW, setSTOCK, image_name, setADMIN],
                    function(err1) {
                        if (err1) { console.error(); }

                        console.log('--- Insert set OK! ---')

                        let cntLoop = 0;
                        let countT = 0
                        let countE = 0
                        let ttt = ''
                        let eee = ''

                        if (setBORROW == 'o') {
                            // ให้ยืมทั้งเซต
                            for (key in typeDic) {
                                let copykey = key
                                cntLoop += 1
                                countT += 1
                                if (countT < 10) { ttt = '0' + countT }
                                else { ttt = countT }
                                let typeID = setID + '-T' + ttt

                                connection.query(
                                    "INSERT INTO equipment_type\
                                    SET type_id = ?,\
                                        type_name = ?,\
                                        type_can_borrow = 'x',\
                                        type_stock = ?,\
                                        set_id = ?",
                                    [typeID, typeDic[key][0], typeDic[key][2], setID],
                                    function(err2) {
                                        if (err2) { console.error(); }

                                        console.log('--- Insert type OK! ---')
                                        for (k in equipDic) {
                                            let copyk = k
                                            let tid = equipDic[k][0]
                                            if (tid == copykey) {
                                                countE += 1
                                                if (countE < 10) { eee = '00' + countE }
                                                else if (countE < 100) { eee = '0' + countE }
                                                else { eee = countE }
                                                let equipID = setID + '-E' + eee

                                                connection.query(
                                                    "INSERT INTO equipment\
                                                    SET equip_id = ?,\
                                                        equip_serial_number = ?,\
                                                        equip_name = ?,\
                                                        equip_brand = ?,\
                                                        equip_model = ?,\
                                                        equip_stock = ?,\
                                                        equip_can_borrow = 'x',\
                                                        type_id = ?",
                                                    [equipID, equipDic[k][1], equipDic[k][2], equipDic[k][3], equipDic[k][4], equipDic[k][5], typeID],
                                                    function(err3) {
                                                        if (err3) { console.error(); }

                                                        console.log('--- Insert equipment OK! ---')
                                                        connection.query(
                                                            "INSERT INTO equipment_borrow\
                                                            SET equip_id = ?,\
                                                                equip_amount = ?",
                                                            [equipID, equipDic[copyk][6]],
                                                            function(err4) {
                                                                if (err4) { console.error(); }
                                                                console.log('--- Insert equipment_borrow OK! ---')
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        }
                                    }
                                );
                            }

                            if (cntLoop == Object.keys(typeDic).length) {
                                res.redirect('/admin/' + usn + '/add/equipment');
                            }
                        }
                        else {
                            // ไม่ให้ยืมทั้งเซต
                            for (key in typeDic) {
                                let copykey = key
                                cntLoop += 1
                                countT += 1
                                if (countT < 10) { ttt = '0' + countT }
                                else { ttt = countT }
                                let typeID = setID + '-T' + ttt

                                connection.query(
                                    "INSERT INTO equipment_type\
                                    SET type_id = ?,\
                                        type_name = ?,\
                                        type_can_borrow = ?,\
                                        type_stock = ?,\
                                        set_id = ?",
                                    [typeID, typeDic[copykey][0], typeDic[copykey][1], typeDic[copykey][2], setID],
                                    function(err2) {
                                        if (err2) { console.error(); }

                                        console.log('--- Insert type OK! ---')
                                        if (typeDic[copykey][1] == 'o') {
                                            // ให้ยืมทั้งชุด/ประเภท
                                            for (k in equipDic) {
                                                let copyk = k
                                                let tid = equipDic[k][0]
                                                if (tid == copykey) {
                                                    countE += 1
                                                    if (countE < 10) { eee = '00' + countE }
                                                    else if (countE < 100) { eee = '0' + countE }
                                                    else { eee = countE }
                                                    let equipID = setID + '-E' + eee

                                                    connection.query(
                                                        "INSERT INTO equipment\
                                                        SET equip_id = ?,\
                                                            equip_serial_number = ?,\
                                                            equip_name = ?,\
                                                            equip_brand = ?,\
                                                            equip_model = ?,\
                                                            equip_stock = ?,\
                                                            equip_can_borrow = 'x',\
                                                            type_id = ?",
                                                        [equipID, equipDic[copyk][1], equipDic[copyk][2], equipDic[copyk][3], equipDic[copyk][4], equipDic[copyk][5], typeID],
                                                        function(err3) {
                                                            if (err3) { console.error(); }

                                                            console.log('--- Insert equipment OK! ---')
                                                            connection.query(
                                                                "INSERT INTO equipment_borrow\
                                                                SET equip_id = ?,\
                                                                    equip_amount = ?",
                                                                [equipID, equipDic[copyk][6]],
                                                                function(err4) {
                                                                    if (err4) { console.error(); }
                                                                    console.log('--- Insert equip borrow OK! ---')
                                                                }
                                                            )
                                                        }
                                                    );
                                                }
                                            }
                                        }
                                        else {
                                            // ไม่ให้ยืมทั้งชุด/ประเภท
                                            for (k in equipDic) {
                                                let copyk = k
                                                let tid = equipDic[k][0]
                                                if (tid == copykey) {
                                                    countE += 1
                                                    if (countE < 10) { eee = '00' + countE }
                                                    else if (countE < 100) { eee = '0' + countE }
                                                    else { eee = countE }
                                                    let equipID = setID + '-E' + eee

                                                    connection.query(
                                                        "INSERT INTO equipment\
                                                        SET equip_id = ?,\
                                                            equip_serial_number = ?,\
                                                            equip_name = ?,\
                                                            equip_brand = ?,\
                                                            equip_model = ?,\
                                                            equip_stock = ?,\
                                                            equip_can_borrow = 'o',\
                                                            type_id = ?",
                                                        [equipID, equipDic[copyk][1], equipDic[copyk][2], equipDic[copyk][3], equipDic[copyk][4], equipDic[copyk][5], typeID],
                                                        function(err3) {
                                                            if (err3) { console.error(); }

                                                            console.log('--- Insert equipment OK! ---')
                                                            connection.query(
                                                                "INSERT INTO equipment_borrow\
                                                                SET equip_id = ?,\
                                                                    equip_amount = ?",
                                                                [equipID, equipDic[copyk][6]],
                                                                function(err4) {
                                                                    if (err4) { console.error(); }
                                                                    console.log('--- Insert equip borrow OK! ---')
                                                                }
                                                            )
                                                        }
                                                    );
                                                }
                                            }
                                        }
                                    }
                                );
                            }

                            if (cntLoop == Object.keys(typeDic).length) {
                                res.redirect('/admin/' + usn + '/add/equipment');
                            }
                        }
                    }
                );
            });
        }
    } else {
        res.send('Error! please try again')
    }
});

/* -- Admin - Delete Equipment -- */
ex.admin_delete_equip = app.get('/admin/:id/delete/:setid', function(req, res) {
    const usn = req.params.id;
    const setID = req.params.setid;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        connection.query(
            "DELETE FROM equipment_set\
            WHERE set_id = ?", setID,
            function(err1) {
                if (err1) { console.error(); }

                console.log('--- Delete set, ID', setID)
                connection.query(
                    "DELETE FROM equipment_type\
                    WHERE set_id = ?", setID,
                    function(err2) {
                        if (err2) { console.error(); }

                        console.log('--- Delete type, SET ID', setID)
                        let likeSetID = setID + '-%';
                        connection.query(
                            "DELETE FROM equipment\
                            WHERE equip_id LIKE ?", likeSetID,
                            function(err3) {
                                if (err3) { console.error(); }

                                console.log('--- Delete equipment, SET ID', setID)
                                connection.query(
                                    "DELETE FROM equipment_borrow\
                                    WHERE equip_id LIKE ?", likeSetID,
                                    function(err4) {
                                        if (err4) { console.error(); }

                                        console.log('--- Delete equip borrow, SET ID', setID)
                                        res.redirect('/admin/' + usn + '/add/equipment')
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

/* -- Admin - Edit Equipment -- */
ex.open_editEquipment = app.get('/admin/:id/edit/:setid', function(req, res) {
    const usn = req.params.id;
    const setID = req.params.setid;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/edit/equip/' + setID)
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_editEquipment = app.get('/admin/edit/equip/:setid', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Admin Edit Equipment -----')

        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        let setID = req.params.setid;
        connection.query(
            "SELECT * FROM member, staff\
            WHERE mem_id = staff_id AND\
            (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err1, result) {
                if (err1) { console.error(); }

                connection.query(
                    "SELECT es.*, et.*, s.*,\
                            e.equip_id, e.equip_serial_number, e.equip_name, e.equip_brand, e.equip_model, e.equip_stock, e.equip_can_borrow,\
                            eb.*\
                    FROM staff s, equipment_set es, equipment_type et\
                    LEFT JOIN equipment e ON (et.type_id = e.type_id)\
                    LEFT JOIN equipment_borrow eb ON (e.equip_id = eb.equip_id)\
                    WHERE (es.set_id = et.set_id) AND\
                        (es.staff_id = s.staff_id) AND\
                        (es.set_id = ?)\
                    ORDER BY et.type_id", setID,
                    function(err2, row1) {
                        if (err2) { console.error(); }
                        
                        connection.query(
                            "SELECT * FROM member, staff\
                            WHERE mem_id = staff_id AND mem_type = 'admin' ",
                            function(err3, row2) {
                                if (err3) { console.error(); }
                        
                                res.render('admin_edit_equip.ejs', {
                                    datas:          result[0],
                                    todays:         date_now,
                                    usn:            usn,
                                    setsData:       row1,
                                    admindata:      row2
                                })
                            }
                        );
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_edit_set = app.post('/admin/:id/edit/set', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let setID       = req.body.esid;
        let setNAME     = req.body.esname;
        let setCATEGORY = req.body.escategory;
        let setBORROW   = req.body.escanb;
        let setSTOCK    = req.body.esstock;
        let setADMIN    = req.body.esadmin;
        
        /* == image == */
        if (req.files && req.files.esimage) {
            //เปลี่ยนรูปภาพใหม่
            let uploadedFile = req.files.esimage;
            let image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = setID + '.' + fileExtension;

            if (uploadedFile.mimetype === 'image/png' || 
                uploadedFile.mimetype === 'image/jpeg' || 
                uploadedFile.mimetype === 'image/gif') {

                uploadedFile.mv(`img/portfolio/${image_name}`, (err) => {
                    if (err) {
                        res.send('error try again');
                    }

                    console.log('-- UPDATE SET: บันทึกไฟล์รูปภาพ --')
                    connection.query(
                        "UPDATE equipment_set\
                        SET set_name = ?,\
                            set_category = ?,\
                            set_can_borrow = ?,\
                            set_stock = ?,\
                            set_pic = ?,\
                            staff_id = ?\
                        WHERE set_id = ?",
                        [setNAME, setCATEGORY, setBORROW, setSTOCK, image_name, setADMIN, setID],
                        function(err1) {
                            if (err1) { console.error(); }

                            console.log('-- UPDATE set OK! --')
                            if (setBORROW == 'o') {
                                // ให้ยืมทั้งเซต
                                const likeSetID = setID + '-%';
                                connection.query(
                                    "UPDATE equipment_type\
                                    SET type_can_borrow = 'x'\
                                    WHERE set_id = ?", setID,
                                    function(err2) {
                                        if (err2) { console.error(); }
        
                                        console.log('-- UPDATE type_can_borrow = x --')
                                        connection.query(
                                            "UPDATE equipment\
                                            SET equip_can_borrow = 'x'\
                                            WHERE equip_id LIKE ?", likeSetID,
                                            function(err3) {
                                                if (err3) { console.error(); }
        
                                                console.log('-- UPDATE equip_can_borrow = x --')
                                                res.redirect('/admin/' + usn + '/edit/' + setID)
                                            }
                                        );
                                    }
                                );
                            }
                            else {
                                // ไม่ให้ยืมทั้งเซต
                                connection.query(
                                    "UPDATE equipment_type\
                                    SET type_can_borrow = 'o'\
                                    WHERE set_id = ?", setID,
                                    function(err2) {
                                        if (err2) { console.error(); }
        
                                        let likeSetID = setID + '%';
                                        connection.query(
                                            "UPDATE equipment\
                                            SET type_can_borrow = 'x'\
                                            WHERE type_id LIKE ?", likeSetID,
                                            function(err3) {
                                                if (err3) { console.error(); }
        
                                                console.log('-- UPDATE equipment OK! --')
                                                res.redirect('/admin/' + usn + '/edit/' + setID)
                                            }
                                        );
                                    }
                                );
                            }
                        }
                    );
                });
            }
        }
        else {
            //ไม่เปลี่ยนรูปภาพใหม่
            connection.query(
                "UPDATE equipment_set\
                SET set_name = ?,\
                    set_category = ?,\
                    set_can_borrow = ?,\
                    set_stock = ?,\
                    staff_id = ?\
                WHERE set_id = ?",
                [setNAME, setCATEGORY, setBORROW, setSTOCK, setADMIN, setID],
                function(err1) {
                    if (err1) { console.error(); }

                    console.log('-- UPDATE set OK! --')
                    if (setBORROW == 'o') {
                        //ให้ยืมทั้งเซต
                        const likeSetID = setID + '-%';
                        connection.query(
                            "UPDATE equipment_type\
                            SET type_can_borrow = 'x'\
                            WHERE set_id = ?", setID,
                            function(err2) {
                                if (err2) { console.error(); }

                                console.log('-- UPDATE SET: เปลี่ยนสถานะการยืม type --')
                                connection.query(
                                    "UPDATE equipment\
                                    SET equip_can_borrow = 'x'\
                                    WHERE equip_id LIKE ?", likeSetID,
                                    function(err3) {
                                        if (err3) { console.error(); }

                                        console.log('-- UPDATE SET: เปลี่ยนสถานะการยืม equipment --')
                                        res.redirect('/admin/' + usn + '/edit/' + setID)
                                    }
                                );
                            }
                        );
                    }
                    else {
                        //ไม่ให้ยืมทั้งเซต
                        connection.query(
                            "UPDATE equipment_type\
                            SET type_can_borrow = 'o'\
                            WHERE set_id = ?", setID,
                            function(err2) {
                                if (err2) { console.error(); }

                                let likeSetID = setID + '%';
                                connection.query(
                                    "UPDATE equipment\
                                    SET type_can_borrow = 'x'\
                                    WHERE type_id LIKE ?", likeSetID,
                                    function(err3) {
                                        if (err3) { console.error(); }

                                        console.log('-- UPDATE equipment OK! --')
                                        res.redirect('/admin/' + usn + '/edit/' + setID)
                                    }
                                );
                            }
                        );
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

ex.admin_edit_add_type = app.post('/admin/:id/edit/add/type', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let setID       = req.body.etsid;
        let typeID      = ''
        let typeNAME    = req.body.etname;
        let typeBORROW   = req.body.etcanb;
        let typeSTOCK    = req.body.etstock;
       
        connection.query(
            "SELECT *\
            FROM equipment_type\
            WHERE set_id = ?", setID,
            function(err1, row1) {
                if (err1) { console.error(); }

                console.log('-- Set ID:', setID, 'มี', row1.length, 'types --')
                let count = 0
                for (i=0; i<(row1.length) ;i++) {
                    const type_id = row1[i].type_id;
                    const onlynum = type_id.substr(5, 2);
                    
                    let numID = parseInt(onlynum)
                    if ((numID - count) != 1) {
                        typeID = (numID < 10) ? (setID + '-T0' + (numID-1)) : (setID + '-T' + (numID-1))
                        break
                    }
                    else {
                        typeID = (numID < 9) ? (setID + '-T0' + (numID+1)) : (setID + '-T' + (numID+1))
                    }
                    count++
                }

                connection.query(
                    "INSERT INTO equipment_type\
                    SET type_id = ?,\
                        type_name = ?,\
                        type_can_borrow = ?,\
                        type_stock = ?,\
                        set_id = ?",
                    [typeID, typeNAME, typeBORROW, typeSTOCK, setID],
                    function(err2) {
                        if (err2) { console.error(); }

                        console.log('-- UPDATE TYPE OK! --')
                        console.log('Type Borrow:', typeBORROW)
                        res.redirect('/admin/' + usn + '/edit/' + setID)
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

// function แบบส่งค่า query กลับ
/*
function colorEquipment(text, callback) {
    var colorcode = 0
    connection.query(
        "SELECT * FROM equipment_color\
        WHERE id_equip LIKE ?\
        ORDER BY color_id", text,
        function(e, r) {
            if (e) { 
                callback(e, null)
            }
            else {
                console.log('sum color:', r.length)
                if (r.length > 0) {
                    //ยังมีข้อมูลอยู่
                    for (c=0; c<r.length ;c++) {
                        let id = r[c].color_id
                        if (id - c != 1) {
                            colorcode = id - 1
                            break
                        } else {
                            colorcode = id + 1
                        }
                    }
                }
                else {
                    //ไม่มีข้อมูลแล้ว
                    colorcode = 1
                }

                console.log('in function', colorcode)
                callback(null, colorcode)
            }
        }
    );
}

// ตัวอย่าง
    // เรียกใช้ function
    colorEquipment(likeSetID, function(err, data) {
        if (err) { console.log("ERROR : ",err); }

        let colorcode = data;
        console.log('#COLOR', colorcode, typeID)
        connection.query(
            "INSERT INTO equipment_color\
            SET id_equip = ?, color_id = ?",
            [typeID, colorcode],
            function(err5) {
                if (err5) { console.error(); }

                console.log('-- INSERT NEW COLOR of TYPE OK! --')
                res.redirect('/admin/' + usn + '/edit/' + setID)
            }
        );
    })

    // ไม่ได้เรียกใช้ฟังก์ชัน
    // connection.query(
    //     "SELECT * FROM equipment_color\
    //     WHERE id_equip LIKE ?\
    //     ORDER BY color_id", likeSetID,
    //     function(err4, row1) {
    //         if (err4) { console.error(); }

    //         console.log('sum color:', row1.length)
    //         if (row1.length > 0) {
    //             //ยังมีข้อมูลอยู่
    //             let colorcode = 0
    //             for (c=0; c<row1.length ;c++) {
    //                 let id = row1[c].color_id
    //                 if (id - c != 1) {
    //                     colorcode = id - 1
    //                     break
    //                 } else {
    //                     colorcode = id + 1
    //                 }
    //             }

    //             console.log(colorcode, typeID)
    //             connection.query(
    //                 "INSERT INTO equipment_color\
    //                 SET id_equip = ?, color_id = ?",
    //                 [typeID, colorcode],
    //                 function(err5) {
    //                     if (err5) { console.error(); }

    //                     console.log('-- INSERT NEW COLOR of TYPE OK! --')
    //                     res.redirect('/admin/' + usn + '/edit/' + setID)
    //                 }
    //             );
    //         }
    //         else {
    //             //ไม่มีข้อมูลแล้ว
    //             connection.query(
    //                 "INSERT INTO equipment_color\
    //                 SET id_equip = ?, color_id = 1 ", typeID,
    //                 function(err5) {
    //                     if (err5) { console.error(); }

    //                     console.log('-- INSERT NEW COLOR of TYPE OK! --')
    //                     res.redirect('/admin/' + usn + '/edit/' + setID)
    //                 }
    //             );
    //         }
    //     }
    // );
*/

ex.admin_edit_type = app.post('/admin/:id/edit/type', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let setID       = req.body.newetsid;
        let typeID      = req.body.newetid;
        let typeNAME    = req.body.newetname;
        let typeBORROW   = req.body.newetcanb;
        let typeSTOCK    = req.body.newetstock;

        connection.query(
            "UPDATE equipment_type\
            SET type_name = ?,\
                type_can_borrow = ?,\
                type_stock = ?\
            WHERE type_id = ?",
            [typeNAME, typeBORROW, typeSTOCK, typeID],
            function(err1) {
                if (err1) { console.error(); }

                console.log('-- UPDATE TYPE OK! --')
                if (typeBORROW == 'o') {
                    //ให้ยืมทั้งชุด/ประเภท
                    connection.query(
                        "UPDATE equipment\
                        SET equip_can_borrow = 'x'\
                        WHERE type_id = ?", typeID,
                        function(err2) {
                            if (err2) { console.error(); }

                            console.log('-- UPDATE EQUIP OK! --')
                            res.redirect('/admin/' + usn + '/edit/' + setID)
                        }
                    );
                }
                else {
                    //ไม่ให้ยืมทั้งชุด/ประเภท (x)
                    connection.query(
                        "SELECT * FROM equipment_set\
                        WHERE set_id = ?", setID,
                        function(err2, row1) {
                            if (err2) { console.error(); }

                            let setBORROW = row1[0].set_can_borrow
                            if (setBORROW == 'o') {
                                //ให้ยืมทั้งเซต ==> type_can_borrow = 'x'
                                connection.query(
                                    "UPDATE equipment\
                                    SET equip_can_borrow = 'x'\
                                    WHERE type_id = ?", typeID,
                                    function(err3) {
                                        if (err3) { console.error(); }

                                        console.log('-- UPDATE EQUIP OK! --')
                                        res.redirect('/admin/' + usn + '/edit/' + setID)
                                    }
                                );
                            }
                            else {
                                //ไม่ได้ให้ยืมทั้งเซต
                                connection.query(
                                    "UPDATE equipment\
                                    SET equip_can_borrow = 'o'\
                                    WHERE type_id = ?", typeID,
                                    function(err3) {
                                        if (err3) { console.error(); }

                                        console.log('-- UPDATE EQUIP OK! --')
                                        res.redirect('/admin/' + usn + '/edit/' + setID)
                                    }
                                );
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

ex.admin_edit_add_equip = app.post('/admin/:id/edit/add/equip', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let setID           = req.body.eesid;
        let typeID          = req.body.eetid;
        let equipID         = ''
        let equipSERIAL     = req.body.eeserial;
        let equipNAME       = req.body.eename;
        let equipBRAND      = req.body.eebrand;
        let equipMODEL      = req.body.eemodel;
        let equipSTOCK      = req.body.eestock;
        let equipAMOUNT     = req.body.eeamount;
       
        let likeSetID = setID + '-%';
        connection.query(
            "SELECT *\
            FROM equipment\
            WHERE equip_id LIKE ?", likeSetID,
            function(err1, row1) {
                if (err1) { console.error(); }

                console.log('-- Set ID:', setID, 'มี', row1.length, 'equips --')
                let count = 0
                for (i=0; i<(row1.length) ;i++) {
                    const equip_id = row1[i].equip_id;
                    const onlynum = equip_id.substr(5, 3);
                    
                    let numID = parseInt(onlynum)
                    if ((numID - count) != 1) {
                        equipID = (numID < 10) ? (setID + '-E00' + (numID-1)) : ((numID < 100) ? (setID + '-E0' + (numID-1)) : (setID + '-E' + (numID-1)))
                        break
                    }
                    else {
                        equipID = (numID < 9) ? (setID + '-E00' + (numID+1)) : ((numID < 99) ? (setID + '-E0' + (numID+1)) : (setID + '-E' + (numID+1)))
                    }
                    count++
                }

                connection.query(
                    "INSERT INTO equipment_borrow\
                    SET equip_id = ?,\
                        equip_amount = ?",
                    [equipID, equipAMOUNT],
                    function(err4) {
                        if (err4) { console.error(); }

                        console.log('-- UPDATE EQUIP BORROW OK! --')
                        connection.query(
                            "SELECT *\
                            FROM equipment_set s, equipment_type t\
                            WHERE (s.set_id = t.set_id) AND\
                                  (t.type_id = ?)", typeID,
                            function(err2, row2) {
                                if (err2) { console.error(); }
        
                                const typeBORROW = row2[0].type_can_borrow
                                const setBORROW = row2[0].set_can_borrow
                                let equipBORROW = '';
                                if (setBORROW == 'o') { // ให้ยืมทั้งเซต
                                    equipBORROW = 'x'
                                } else {
                                    if (typeBORROW == 'o') { // ให้ยืมทั้งชุด
                                        equipBORROW = 'x'
                                    }
                                    else { //ไม่ให้ยืมทั้งชุด
                                        equipBORROW = 'o'
                                    }
                                }

                                console.log('EQUIP ID:', equipID, equipBORROW)
                                connection.query(
                                    "INSERT INTO equipment\
                                    SET equip_id = ?,\
                                        equip_serial_number = ?,\
                                        equip_name = ?,\
                                        equip_brand = ?,\
                                        equip_model = ?,\
                                        equip_stock = ?,\
                                        equip_can_borrow = ?,\
                                        type_id = ?",
                                    [equipID, equipSERIAL, equipNAME, equipBRAND, equipMODEL, equipSTOCK, equipBORROW, typeID],
                                    function(err3) {
                                        if (err3) { console.error(); }
                
                                        console.log('-- UPDATE EQUIP OK! --')
                                        res.redirect('/admin/' + usn + '/edit/' + setID)
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_edit_delete_type = app.post('/admin/:id/edit/delete/type', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let setID       = req.body.eesid;
        let typeID      = req.body.eetid;

        connection.query(
            "SELECT * FROM equipment\
            WHERE type_id = ?", typeID,
            function(err1, row1) {
                if (err1) { console.error(); }

                console.log('TYPE ID:', typeID, 'มี', row1.length, 'equips');
                if ((row1.length) > 0) {
                    for (i=0; i<(row1.length) ;i++) {
                        let equipID = row1[i].equip_id
                        connection.query(
                            "DELETE FROM equipment_borrow\
                            WHERE equip_id = ?", equipID,
                            function(err2) {
                                if (err2) { console.error(); }
                                console.log('-- DELETE Equip', equipID, 'OK! --')
                            }
                        );
    
                        if (i == (row1.length - 1)) {
                            //End Loop
                            connection.query(
                                "DELETE FROM equipment_type\
                                WHERE type_id = ?", typeID,
                                function(err3) {
                                    if (err3) { console.error(); }
                    
                                    console.log('-- DELETE TYPE OK! --')
                                    connection.query(
                                        "DELETE FROM equipment\
                                        WHERE type_id = ?", typeID,
                                        function(err4) {
                                            if (err4) { console.error(); }
                    
                                            console.log('-- DELETE all EQUIP of TYPE', typeID, 'OK! --')
                                            res.redirect('/admin/' + usn + '/edit/' + setID)
                                        }
                                    );
                                }
                            );
                        }
                    }
                }
                else {
                    connection.query(
                        "DELETE FROM equipment_type\
                        WHERE type_id = ?", typeID,
                        function(err3) {
                            if (err3) { console.error(); }
            
                            console.log('-- DELETE TYPE OK! --')
                            connection.query(
                                "DELETE FROM equipment\
                                WHERE type_id = ?", typeID,
                                function(err4) {
                                    if (err4) { console.error(); }
            
                                    console.log('-- DELETE all EQUIP of TYPE', typeID, 'OK! --')
                                    res.redirect('/admin/' + usn + '/edit/' + setID)
                                }
                            );
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

ex.admin_edit_equip = app.post('/admin/:id/edit/equip', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let setID           = req.body.edsid;
        let equipID         = req.body.edeid;
        let equipSERIAL     = req.body.edserial;
        let equipNAME       = req.body.edname;
        let equipBRAND      = req.body.edbrand;
        let equipMODEL      = req.body.edmodel;
        let equipSTOCK      = req.body.edstock;
        let equipAMOUNT     = req.body.edamount;

        connection.query(
            "UPDATE equipment\
            SET equip_serial_number = ?,\
                equip_name = ?,\
                equip_brand = ?,\
                equip_model = ?,\
                equip_stock = ?\
            WHERE equip_id = ?",
            [equipSERIAL, equipNAME, equipBRAND, equipMODEL, equipSTOCK, equipID],
            function(err1) {
                if (err1) { console.error(); }

                console.log('-- UPDATE EQUIP', equipID, 'OK! --')
                connection.query(
                    "UPDATE equipment_borrow\
                    SET equip_amount = ?\
                    WHERE equip_id = ?", [equipAMOUNT, equipID],
                    function(err2) {
                        if (err2) { console.error(); }

                        console.log('-- UPDATE EQUIP BORROW:', equipID, 'OK! --')
                        res.redirect('/admin/' + usn + '/edit/' + setID)
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_edit_delete_equip = app.post('/admin/:id/edit/delete/equip', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let setID       = req.body.desid;
        let equipID      = req.body.deeid;

        connection.query(
            "DELETE FROM equipment_borrow\
            WHERE equip_id = ?", equipID,
            function(err1, row1) {
                if (err1) { console.error(); }

                console.log('-- DELETE EQUIP BORROW ID:', equipID, 'OK! --');
                connection.query(
                    "DELETE FROM equipment\
                    WHERE equip_id = ?", equipID,
                    function(err2) {
                        if (err2) { console.error(); }

                        console.log('-- DELETE EQUIP ID:', equipID, 'OK! --');
                        res.redirect('/admin/' + usn + '/edit/' + setID)
                    }
                );
            }
        );
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});


/* -- Admin - Setting Equipment */
ex.open_equip_setting = app.get('/admin/:id/equip/setting/:search', function(req, res) {
    const usn = req.params.id;
    const searchs = req.params.search;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/equip/setting/' + searchs)
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_equip_setting = app.get('/admin/equip/setting/:search', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Admin Setting Equipment -----')

        const searchs = req.params.search;
        console.log(searchs)

        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        connection.query(
            "SELECT *\
            FROM member m, staff s\
            WHERE (m.mem_id = s.staff_id) AND\
                  (m.mem_id = ? OR m.mem_username = ?)",
            [usn, usn],
            function(e, result) {
                if (e) {console.error();}

                if (searchs == 'all') {
                    //ยังไม่มีการค้นหา
                    connection.query(
                        "SELECT *\
                        FROM member m, staff s, equipment_set e\
                        WHERE (m.mem_id = s.staff_id) AND\
                              (e.staff_id = s.staff_id) AND\
                              (m.mem_id = ? OR m.mem_username = ?)",
                        [usn, usn],
                        function(e, r) {
                            if (e) {console.error();}
            
                            res.render('admin_equip_setting.ejs', {
                                datas:      result[0],
                                todays:     date_now,
                                usn:        usn,
                                setData:    r,
                                inputval:   ''
                            })
                        }
                    );
                }
                else {
                    let likeSearch = '%' + searchs + '%';
                    connection.query(
                        "SELECT *\
                        FROM member m, staff s, equipment_set e\
                        WHERE (m.mem_id = s.staff_id) AND\
                              (e.staff_id = s.staff_id) AND\
                              (m.mem_id = ? OR m.mem_username = ?) AND\
                              (e.set_name LIKE ? OR e.set_category LIKE ?)",
                        [usn, usn, likeSearch, likeSearch],
                        function(e, r) {
                            if (e) {console.error();}
        
                            console.log('length set data:', r.length)
                            res.render('admin_equip_setting.ejs', {
                                datas:      result[0],
                                todays:     date_now,
                                usn:        usn,
                                setData:    r,
                                inputval:   searchs
                            })
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

ex.admin_setting_one = app.post('/admin/:id/setting/one', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Admin Setting One Equipment -----')

        let setID           = req.body.esid;
        let setBORROWER     = req.body.esborrower;
        let setSTATUS       = req.body.esonoff;

        console.log(setID, setBORROWER, setSTATUS)
        if ((setSTATUS == undefined) || (setSTATUS == null)) {
            connection.query(
                "UPDATE equipment_set\
                SET set_borrower = ?,\
                    set_status = 'off'\
                WHERE set_id = ?",
                [setBORROWER, setID],
                function(e, result) {
                    if (e) {console.error();}
    
                    console.log('-- UPDATE SET', setID, 'OK! --')
                    res.redirect('/admin/' + usn + '/equip/setting/all')
                }
            );
        }
        else {
            connection.query(
                "UPDATE equipment_set\
                SET set_borrower = ?,\
                    set_status = 'on'\
                WHERE set_id = ?",
                [setBORROWER, setID],
                function(e, result) {
                    if (e) {console.error();}
    
                    console.log('-- UPDATE SET', setID, 'OK! --')
                    res.redirect('/admin/' + usn + '/equip/setting/all')
                }
            );
        }
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_setting_many = app.post('/admin/:id/setting/many', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Admin Setting Many Equipment -----')

        let setIDData       = req.body.essumsid
        let setIDDic        = JSON.parse(setIDData)
        let setBORROWER     = req.body.esallborrow
        let setSTATUS       = req.body.esallonoff

        console.log(setIDDic, setBORROWER, setSTATUS)
        var cntLoop = 0;
        if ((setSTATUS == undefined) || (setSTATUS == null)) {
            for (key in setIDDic) {
                cntLoop += 1
                
                connection.query(
                    "UPDATE equipment_set\
                    SET set_borrower = ?,\
                        set_status = 'off'\
                    WHERE set_id = ?",
                    [setBORROWER, setIDDic[key]],
                    function(e, result) {
                        if (e) {console.error();}
        
                        console.log('-- UPDATE SET', setIDDic[key], 'OK! --')
                    }
                );
            }

            if (cntLoop == Object.keys(setIDDic).length) {
                res.redirect('/admin/' + usn + '/equip/setting/all')
            }
        }
        else {
            // เปิดบริการ
            for (key in setIDDic) {
                cntLoop += 1
                
                connection.query(
                    "UPDATE equipment_set\
                    SET set_borrower = ?,\
                        set_status = 'on'\
                    WHERE set_id = ?",
                    [setBORROWER, setIDDic[key]],
                    function(e, result) {
                        if (e) {console.error();}
        
                        console.log('-- UPDATE SET', setIDDic[key], 'OK! --')
                    }
                );
            }

            if (cntLoop == Object.keys(setIDDic).length) {
                res.redirect('/admin/' + usn + '/equip/setting/all')
            }
        }
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});



/* -- Admin - History & Search Page -- */
ex.open_history = app.get('/admin/:id/history/:search', function(req, res) {
    const usn = req.params.id;
    const history = req.params.search;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        res.redirect('/admin/history/borrow/' + history)
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.admin_history = app.get('/admin/history/borrow/:se', function(req, res) {
    const usn = adminLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Admin History & Search -----')

        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        let search = req.params.se;
        connection.query(
            "SELECT *\
            FROM equipment_set e, staff s\
            WHERE e.staff_id = s.staff_id",
            function(e, r) {
                if (e) {console.error();}

                if (search == 'all') {
                    connection.query(
                        "SELECT * FROM member, staff\
                        WHERE mem_id = staff_id AND\
                        (mem_id = ? OR mem_username = ?)", [usn, usn],
                        function(err1, result) {
                            if (err1) { console.error(); }
            
                            connection.query(
                                "SELECT b.*, bd.bor_equip_id, es.set_id, es.set_name, es.set_can_borrow,\
                                        memName.stu_name, memName.staff_name AS staff_bor_name, sf.staff_name\
                                FROM borrow b, borrow_data bd,\
                                    equipment e, equipment_type et, equipment_set es, staff sf,\
                                    (SELECT * FROM borrow\
                                    LEFT JOIN student stu ON mem_id = stu.stu_id\
                                    LEFT JOIN staff stf ON mem_id = stf.staff_id) AS memName\
                                WHERE (b.bor_id = bd.bor_id) AND\
                                    (e.type_id = et.type_id AND et.set_id = es.set_id) AND\
                                    (b.mem_id = memName.mem_id) AND\
                                    (bd.bor_equip_id = e.equip_id OR bd.bor_equip_id = et.type_id OR bd.bor_equip_id = es.set_id) AND\
                                    (es.staff_id = sf.staff_id) AND\
                                    (YEAR(b.bor_book_date) = YEAR(CURDATE()))\
                                GROUP BY b.bor_id",
                                function(err2, row1) {
                                    if (err2) { console.error(); }
                                    
                                    /* SELECT รายชื่ออุปกรณ์ที่ยืม */
                                    connection.query(
                                        "SELECT *\
                                        FROM borrow_data bd, equipment e, equipment_type et, equipment_set es\
                                        WHERE (e.type_id = et.type_id AND et.set_id = es.set_id) AND\
                                              (bor_equip_id = e.equip_id OR bor_equip_id = et.type_id OR bor_equip_id = es.set_id) AND\
                                              (SUBSTRING(bor_data_id, 1, 4) = YEAR(CURDATE()))\
                                        GROUP BY bor_data_id",
                                        function(er, ro) {
                                            if (er) {console.error()}

                                            res.render('admin_history.ejs', {
                                                datas:          result[0],
                                                todays:         date_now,
                                                usn:            usn,
                                                setsData:       row1,
                                                subSets:        ro,
                                                inputval:       '',
                                                advancedData:   r
                                            })
                                        }
                                    )
                                }
                            );
                        }
                    );
                }
                else {
                    connection.query(
                        "SELECT * FROM member, staff\
                        WHERE mem_id = staff_id AND\
                        (mem_id = ? OR mem_username = ?)", [usn, usn],
                        function(err1, result) {
                            if (err1) { console.error(); }
                            
                            let searchval = '%' + search + '%';
                            connection.query(
                                "SELECT b.*, bd.bor_equip_id, es.set_id, es.set_name, es.set_can_borrow,\
                                        memName.stu_name, memName.staff_name AS staff_bor_name, sf.staff_name\
                                FROM borrow b, borrow_data bd,\
                                    equipment e, equipment_type et, equipment_set es, staff sf,\
                                    (SELECT * FROM borrow\
                                    LEFT JOIN student stu ON mem_id = stu.stu_id\
                                    LEFT JOIN staff stf ON mem_id = stf.staff_id) AS memName\
                                WHERE (b.bor_id = bd.bor_id) AND\
                                    (e.type_id = et.type_id AND et.set_id = es.set_id) AND\
                                    (b.mem_id = memName.mem_id) AND\
                                    (bd.bor_equip_id = e.equip_id OR bd.bor_equip_id = et.type_id OR bd.bor_equip_id = es.set_id) AND\
                                    (es.staff_id = sf.staff_id) AND\
                                    (YEAR(b.bor_book_date) = YEAR(CURDATE())) AND\
                                    (stu_id LIKE ? OR stu_name LIKE ? OR\
                                    memName.staff_id LIKE ? OR memName.staff_name LIKE ? OR\
                                    es.set_name LIKE ? OR et.type_name LIKE ? OR e.equip_name LIKE ?)\
                                GROUP BY b.bor_id", 
                                [searchval, searchval, searchval, searchval, searchval, searchval, searchval],
                                function(err2, row1) {
                                    if (err2) { console.error(); }
                                    
                                    /* SELECT รายชื่ออุปกรณ์ที่ยืม */
                                    connection.query(
                                        "SELECT *\
                                        FROM borrow_data bd, equipment e, equipment_type et, equipment_set es\
                                        WHERE (e.type_id = et.type_id AND et.set_id = es.set_id) AND\
                                              (bor_equip_id = e.equip_id OR bor_equip_id = et.type_id OR bor_equip_id = es.set_id) AND\
                                              (SUBSTRING(bor_data_id, 1, 4) = YEAR(CURDATE()))\
                                        GROUP BY bor_data_id",
                                        function(er, ro) {
                                            if (er) {console.error()}

                                            res.render('admin_history.ejs', {
                                                datas:          result[0],
                                                todays:         date_now,
                                                usn:            usn,
                                                setsData:       row1,
                                                subSets:        ro,
                                                inputval:       search,
                                                advancedData:   r
                                            })
                                        }
                                    )
                                }
                            );
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

ex.admin_advanced_search = app.post('/admin/history/advanced/:id', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (adminLogin == usn);
    if (isLogin) {
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        let year    = req.body.hisyear
        let month   = req.body.hismonth
        let sets    = '%' + req.body.hisset + '%'
        let memtype = '%' + req.body.hismemtype + '%'
        let memid   = '%' + req.body.hisid + '%'
        let memname = '%' + req.body.hisborrower + '%'
        let admins  = '%' + req.body.hisadmin + '%'
        let statuss = '%' + req.body.hisstatus + '%'

        connection.query(
            "SELECT * FROM member, staff\
            WHERE mem_id = staff_id AND\
            (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err, result) {
                if (err) { console.error(); }

                connection.query(
                    "SELECT *\
                    FROM equipment_set e, staff s\
                    WHERE e.staff_id = s.staff_id",
                    function(e, r) {
                        if (e) {console.error();}

                        if (month == 0) {
                            /* === All Month === */
                            connection.query(
                                "SELECT b.*, bd.bor_equip_id, es.set_id, es.set_name, es.set_can_borrow,\
                                        memName.stu_name, memName.staff_name AS staff_bor_name, sf.staff_name, m.mem_type\
                                FROM borrow b, borrow_data bd,\
                                    equipment_set es, equipment_type et, equipment e, staff sf, member m,\
                                    (SELECT * FROM borrow\
                                    LEFT JOIN student stu ON mem_id = stu.stu_id\
                                    LEFT JOIN staff stf ON mem_id = stf.staff_id) AS memName\
                                WHERE (b.bor_id = bd.bor_id) AND\
                                    (es.set_id = et.set_id AND et.type_id = e.type_id) AND\
                                    (es.staff_id = sf.staff_id) AND\
                                    (b.mem_id = memName.mem_id) AND\
                                    (bd.bor_equip_id = e.equip_id OR bd.bor_equip_id = et.type_id OR bd.bor_equip_id = es.set_id) AND\
                                    (m.mem_id = memName.mem_id) AND\
                                    (YEAR(b.bor_book_date) = ?) AND\
                                    (es.set_id LIKE ?) AND\
                                    (m.mem_type LIKE ?) AND\
                                    (m.mem_id LIKE ?) AND\
                                    (memName.stu_name LIKE ? OR memName.staff_name LIKE ?) AND\
                                    (sf.staff_name LIKE ?) AND\
                                    (b.bor_status LIKE ?)\
                                GROUP BY b.bor_id", 
                                [year, sets, memtype, memid, memname, memname, admins, statuss],
                                function(err1, row1) {
                                    if (err1) {console.error();}

                                    console.log(row1.length)
                                    /* SELECT รายชื่ออุปกรณ์ที่ยืม */
                                    connection.query(
                                        "SELECT *\
                                        FROM borrow_data bd, equipment e, equipment_type et, equipment_set es\
                                        WHERE (e.type_id = et.type_id AND et.set_id = es.set_id) AND\
                                              (bor_equip_id = e.equip_id OR bor_equip_id = et.type_id OR bor_equip_id = es.set_id) AND\
                                              (SUBSTRING(bor_data_id, 1, 4) = ?)\
                                        GROUP BY bor_data_id", year,
                                        function(er, ro) {
                                            if (er) {console.error()}

                                            console.log('Subset', ro.length)
                                            res.render('admin_history.ejs', {
                                                datas:          result[0],
                                                todays:         date_now,
                                                usn:            usn,
                                                setsData:       row1,
                                                subSets:        ro,
                                                inputval:       '',
                                                advancedData:   r
                                            })
                                        }
                                    );
                                }
                            );
                        }
                        else {
                            /* === All Month === */
                            connection.query(
                                "SELECT b.*, bd.bor_equip_id, es.set_id, es.set_name, es.set_can_borrow,\
                                        memName.stu_name, memName.staff_name AS staff_bor_name, sf.staff_name, m.mem_type\
                                FROM borrow b, borrow_data bd,\
                                    equipment_set es, equipment_type et, equipment e, staff sf, member m,\
                                    (SELECT * FROM borrow\
                                    LEFT JOIN student stu ON mem_id = stu.stu_id\
                                    LEFT JOIN staff stf ON mem_id = stf.staff_id) AS memName\
                                WHERE (b.bor_id = bd.bor_id) AND\
                                    (es.set_id = et.set_id AND et.type_id = e.type_id) AND\
                                    (es.staff_id = sf.staff_id) AND\
                                    (b.mem_id = memName.mem_id) AND\
                                    (bd.bor_equip_id = e.equip_id OR bd.bor_equip_id = et.type_id OR bd.bor_equip_id = es.set_id) AND\
                                    (m.mem_id = memName.mem_id) AND\
                                    (YEAR(b.bor_book_date) = ?) AND\
                                    (MONTH(b.bor_book_date) = ?) AND\
                                    (es.set_id LIKE ?) AND\
                                    (m.mem_type LIKE ?) AND\
                                    (m.mem_id LIKE ?) AND\
                                    (memName.stu_name LIKE ? OR memName.staff_name LIKE ?) AND\
                                    (sf.staff_name LIKE ?) AND\
                                    (b.bor_status LIKE ?)\
                                GROUP BY b.bor_id", 
                                [year, month, sets, memtype, memid, memname, memname, admins, statuss],
                                function(err1, row1) {
                                    if (err1) {console.error();}

                                    console.log(row1.length)
                                    /* SELECT รายชื่ออุปกรณ์ที่ยืม */
                                    connection.query(
                                        "SELECT *\
                                        FROM borrow_data bd, equipment e, equipment_type et, equipment_set es\
                                        WHERE (e.type_id = et.type_id AND et.set_id = es.set_id) AND\
                                              (bor_equip_id = e.equip_id OR bor_equip_id = et.type_id OR bor_equip_id = es.set_id) AND\
                                              (SUBSTRING(bor_data_id, 1, 4) = ?)\
                                        GROUP BY bor_data_id", year,
                                        function(er, ro) {
                                            if (er) {console.error()}

                                            console.log('Subset', ro.length)
                                            res.render('admin_history.ejs', {
                                                datas:          result[0],
                                                todays:         date_now,
                                                usn:            usn,
                                                setsData:       row1,
                                                subSets:        ro,
                                                inputval:       '',
                                                advancedData:   r
                                            })
                                        }
                                    );
                                }
                            );
                        }
                    }
                );
            }
        );
    }
    else {
        res.redirect('/login');
    }
})





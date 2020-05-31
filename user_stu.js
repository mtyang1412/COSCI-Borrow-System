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
/* ----- Login to Student ----- */
var studentLogin = "";
ex.student_login = app.get('/student/:id', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    console.log('Student Login: ', isLogin);
    if (isLogin) {
        studentLogin = usn;
        res.redirect('/user_student')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});


/* -- Show Student First Page -- */
ex.student_first = app.get('/user_student', function(req, res) {
    console.log('----- First Page Student -----');
    const usn = studentLogin;

    connection.query(
        "DELETE FROM `borrow_temp`",
        function(err1) {
            if (err1) { console.error(); }
        }
    );

    connection.query(
        "DELETE FROM `temp` WHERE mem_username = '" + usn + "'",
        function(err1) {
            if (err1) { console.error(); }
        }
    );

    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, student \
             WHERE mem_id = stu_id AND (mem_id = ? OR mem_username = ?)",
            [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    let memID = result[0].mem_id
                    console.log('Mem ID: ', memID);

                    // Select all equipment from mySQL
                    connection.query(
                        "SELECT *\
                        FROM borrow b, borrow_data bd,\
                             equipment e, equipment_type t, equipment_set s\
                        WHERE (b.bor_id = bd.bor_id) AND\
                              (e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                              (bd.bor_equip_id = e.equip_id OR bd.bor_equip_id = t.type_id OR bd.bor_equip_id = s.set_id) AND\
                              ((bor_status = 'x' AND bor_date >= CURDATE()) OR\
                              (bor_status = 'a' AND bor_date = CURDATE()) OR\
                              (bor_status = 'r' AND bor_return_date = CURDATE()) OR\
                              (bor_status = 'p')) AND\
                              (b.mem_id = ?)\
                        GROUP BY b.bor_id", memID,
                        function(err2, result2) {
                            if (err2) { console.error(); }
                            
                            connection.query(
                                "SELECT *\
                                FROM borrow b, borrow_data bd,\
                                     equipment e, equipment_type t, equipment_set s\
                                WHERE (b.bor_id = bd.bor_id) AND\
                                      (e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                                      (bd.bor_equip_id = e.equip_id OR bd.bor_equip_id = t.type_id OR bd.bor_equip_id = s.set_id) AND\
                                      ((bor_status = 'x' AND bor_return_date = CURDATE()) OR\
                                      (bor_status = 'a' AND bor_date = CURDATE()) OR\
                                      (bor_status = 'r' AND bor_return_date = CURDATE()) OR\
                                      (bor_status = 'p')) AND\
                                      (b.mem_id = ?)\
                                GROUP BY bor_data_id", memID,
                                function(err3, result3) {
                                    if (err3) { console.error() }

                                    res.render('user_student.ejs', {
                                        datas:      result[0],
                                        todays:     date_now,
                                        borrowss:   result2,
                                        borrowdata: result3,
                                        usn:        usn
                                    });
                                }
                            )
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


/* --- Student Select Equipment --- */
ex.open_stu_equip = app.get('/user_student/:id/select/equipment', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (studentLogin == usn);
    if (isLogin) {
        res.redirect('/user_student/select/equipment')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
})

ex.student_equipment = app.get('/user_student/select/equipment', function(req, res) {
    console.log('----- Equipment Page Student -----');
    const usn = studentLogin;

    connection.query(
        "DELETE FROM `borrow_temp`",
        function(err1) {
            if (err1) { console.error(); }
        }
    );

    connection.query(
        "DELETE FROM `temp` WHERE mem_username = '" + usn + "'",
        function(err1) {
            if (err1) { console.error(); }
        }
    );

    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, student \
             WHERE mem_id = stu_id AND (mem_id = ? OR mem_username = ?)",
            [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    // Select all equipment from mySQL
                    connection.query(
                        "SELECT * FROM equipment_set",
                        function(err2, result2) {
                            if (err2) { console.error(); }
                            else {
                                res.render('user_student_equipment.ejs', {
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


/* -- Student Profile -- */
ex.open_profile = app.get('/user_student/:id/profile', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (studentLogin == usn);
    if (isLogin) {
        res.redirect('/user_student/profile')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.student_profile = app.get('/user_student/profile', function(req, res) {
    const usn = studentLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Profile Page -----')
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

        connection.query(
            "DELETE FROM `borrow_temp`",
            function(err1) {
                if (err1) { console.error(); }
            }
        );

        connection.query(
            "DELETE FROM `temp` WHERE mem_username = '" + usn + "'",
            function(err1) {
                if (err1) { console.error(); }
            }
        );

        
        /* Select Data of Member Student */
        connection.query(
            "SELECT * FROM member, student, major\
             WHERE mem_id = stu_id AND stu_major = maj_id AND\
             (mem_id = ? OR mem_username = ?)", [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                
                let stu_id = result[0].mem_id;
                /* Select Student not returned device */
                connection.query(
                    "SELECT *\
                    FROM borrow\
                    WHERE (bor_return_date < CURDATE() AND bor_status = 'r') AND\
                          (mem_id = ?)", stu_id,
                    function(err0, row0) {
                        if (err0) { console.error(); }

                        if (row0.length > 0) {
                            for (i=0; i<row0.length ;i++) {
                                connection.query(
                                    "UPDATE borrow SET bor_status = 'n'\
                                    WHERE bor_id = ?", row0[i].bor_id,
                                    function(err01) {
                                        if (err01) { console.error(); }

                                        console.log('----- UPDATE Not Returned -----')
                                    }
                                );
                            }
                        }
                    }
                );
                
                /* Select Student borrow history */
                connection.query(
                    "SELECT *, (CURDATE() - b.bor_return_date) AS overdue\
                    FROM borrow b, borrow_data bd, borrow_data_detail bdd,\
                         equipment e, equipment_type t, equipment_set s\
                    WHERE (bd.bor_id = b.bor_id AND bdd.bor_data_id = bd.bor_data_id) AND\
                          (e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                          (bd.bor_equip_id = s.set_id OR bd.bor_equip_id = t.type_id OR bd.bor_equip_id = e.equip_id) AND\
                          (b.bor_return_date < CURDATE() OR b.bor_status = 'd') AND\
                          (b.mem_id = ?)\
                    GROUP BY b.bor_id", stu_id,
                    function(err2, result2) {
                        if (err2) { console.error(); }

                        /* Select borrow current */
                        connection.query(
                            "SELECT *\
                            FROM borrow b, borrow_data bd, borrow_data_detail bdd,\
                                 equipment e, equipment_type t, equipment_set s,\
                                 staff\
                            WHERE (staff.staff_id = s.staff_id) AND\
                                  (bd.bor_id = b.bor_id AND bdd.bor_data_id = bd.bor_data_id) AND\
                                  (e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                                  (bd.bor_equip_id = s.set_id OR bd.bor_equip_id = t.type_id OR bd.bor_equip_id = e.equip_id) AND\
                                  (b.bor_return_date >= CURDATE() AND b.bor_status != 'd') AND\
                                  (b.mem_id = ?)\
                            GROUP BY b.bor_id", stu_id,
                            function(err3, result3) {
                                if (err3) { console.error(); }

                                var arrBorrows = [];
                                var arrs = [];
                                if (result3.length > 0) {
                                    for (r=0; r<(result3.length); r++) {
                                        let ids = result3[r].bor_id
                                        const x = r
                                        connection.query(
                                            "SELECT b.bor_id, bd.bor_data_id, bd.bor_equip_id, bdd.*,\
                                                    equip_name, t.type_id, type_name, type_can_borrow, set_can_borrow\
                                            FROM borrow b, borrow_data bd, borrow_data_detail bdd,\
                                                equipment e, equipment_type t, equipment_set s\
                                            WHERE (bd.bor_id = b.bor_id AND bdd.bor_data_id = bd.bor_data_id) AND\
                                                (e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                                                (bd.bor_equip_id = s.set_id OR bd.bor_equip_id = t.type_id OR bd.bor_equip_id = e.equip_id) AND\
                                                (bdd.equip_id = e.equip_id) AND\
                                                (b.bor_return_date >= CURDATE() OR b.bor_status != 'd') AND\
                                                (b.mem_id = ? AND b.bor_id = ?)", 
                                                [stu_id, ids],
                                            function(err4, row) {
                                                if (err4) { console.error(); }
                                                
                                                arrs = []
                                                let someArray = []
                                                let str = row[0].bor_equip_id
                                                for (a=0; a<row.length ;a++) {
                                                    if (str != row[a].bor_equip_id) {
                                                        str = row[a].bor_equip_id
                                                        arrs.push(someArray)
                                                        someArray = []
                                                    }
                                                    someArray.push(row[a])
                                                }
                                                arrs.push(someArray)
                                                arrBorrows.push(arrs)
                                                // arrBorows is 3D Array
                                                
                                                if (x == (result3.length - 1)) {
                                                    //console.log(arrBorrows)                                              
                                                    res.render('user_student_profile.ejs', {
                                                        datas:      result[0],
                                                        todays:     date_now,
                                                        borrowHis:  result2,
                                                        borrowNow:  result3,
                                                        allBorrows: arrBorrows,
                                                        usn:        usn
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                                else {
                                    res.render('user_student_profile.ejs', {
                                        datas:      result[0],
                                        todays:     date_now,
                                        borrowHis:  result2,
                                        borrowNow:  result3,
                                        allBorrows: arrBorrows,
                                        usn:        usn
                                    });
                                }
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


/*--- Edit Student Profile ----- */
ex.open_edit_info = app.get('/user_student/:id/profile/edit-info', function(req, res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (studentLogin == usn);
    if (isLogin) {
        res.redirect('/user_student/profile/edit-info')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
})

ex.student_show_edit_info = app.get('/user_student/profile/edit-info', function(req, res) {
    const usn = studentLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log('----- Edit Profile Page -----')
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, student, major\
             WHERE mem_id = stu_id AND stu_major = maj_id AND\
             (mem_id = ? OR mem_username = ?)", 
             [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                res.render('user_student_edit_info.ejs', {
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

ex.student_edit_info = app.post('/user_student/profile/edit-info', function(req, res) {
    console.log('----- POST: Edit Profile -----');
    const usn = studentLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        let username = req.body.username;
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
                        WHERE mem_id = '"+ username +"' OR\
                              mem_username = '"+ username +"' ",
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
                WHERE mem_id = '"+ username +"' OR\
                      mem_username = '"+ username +"' ",
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
ex.open_edit_pass = app.get('/user_student/:id/profile/edit-pass', function(req,res) {
    const usn = req.params.id;
    let isLogin = (req.session.loggedin) && (studentLogin == usn);
    if (isLogin) {
        res.redirect('/user_student/profile/edit-pass')
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.student_show_edit_pass = app.get('/user_student/profile/edit-pass', function(req, res) {
    const usn = studentLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        console.log("====== Edit Password Page ======");
        /* today date */
        let today = new Date();
        let toyear = today.getFullYear();
        let tomonth = today.getMonth();
        let todate = today.getDate();
        let date_now = todate + "/" + (tomonth+1) + "/" + toyear;
        
        connection.query(
            "SELECT * FROM member, student, major\
             WHERE mem_id = stu_id AND stu_major = maj_id AND\
             (mem_id = ? OR mem_username = ?)",
            [usn, usn],
            function(err, result) {
                if (err) { console.error(); }
                else {
                    res.render('user_student_edit_pass.ejs', {
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

ex.student_edit_pass = app.post('/user_student/:id/profile/edit-pass', function(req, res) {
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


/* ===== Student ยืนยันรับอุปกรณ์ ===== */
ex.stu_get_return_device = app.get('/equipGR/:bor_id/:id/:status', function(req, res) {
    let usn =       req.params.id;
    let borrowID =  req.params.bor_id;
    let status =    req.params.status;
    
    /* --- status ---
       r = กดรับอุปกรณ์ */
    if (status == 'r') {
        connection.query(
            "UPDATE borrow SET bor_status = 'r'\
            WHERE bor_id = ?", borrowID,
            function(err1) {
                if (err1) { console.error(); }

                console.log('----- Update BORROW by Member -----')
                res.redirect('/user_student/' + usn + '/profile');
            }
        );
    }
    else if (status == 'd') {
        connection.query(
            "UPDATE borrow SET bor_status = 'd'\
            WHERE bor_id = ?", borrowID,
            function(err1) {
                if (err1) { console.error(); }

                console.log('----- Update BORROW by Member -----')
                res.redirect('/user_student/' + usn + '/profile');
            }
        );
    }
});


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
/* -- Show Data of Equipment -- */
ex.equipment_data = app.get('/equip/:set_id', function(req, res) {
    let set_id = req.params.set_id;
    console.log("=========Show Data Equipment=========");
    //console.log('Set ID', set_id);

    /* ----- Select all equipment of set ----- */
    connection.query(
        "SELECT *\
        FROM equipment e, equipment_type t, equipment_set s, equipment_borrow eb\
        WHERE (s.set_id = t.set_id AND t.type_id = e.type_id) AND\
              (e.equip_id = eb.equip_id) AND\
              (s.set_id = ?)\
        ORDER BY e.equip_id", set_id,
        function(err1, result1) {
            if (err1) { console.error(); }
            else {

                var holidayDate = [];

                connection.query(
                    "SELECT * FROM calendar_holiday",
                    function(err0, result0) {

                        for (i=0 ; i<result0.length ; i++) {
                            holidayDate.push(result0[i].holiday_date)
                        }

                        if (err0) {console.error(); }

                        connection.query(
                            "SELECT bor_date,bor_return_date,bor_equip_id \
                            FROM borrow b, borrow_data bd, equipment e, equipment_type t, equipment_set s\
                            WHERE (bd.bor_id = b.bor_id) AND (e.type_id = t.type_id AND t.set_id = s.set_id)\
                            AND (bd.bor_equip_id = e.equip_id OR bd.bor_equip_id = t.type_id OR bd.bor_equip_id = s.set_id)\
                            AND (bor_status = 'p' OR bor_status = 'a' OR bor_status = 'r') AND (bor_date >= CURRENT_DATE())\
                            AND (bor_equip_id LIKE '%" + set_id + "%') GROUP BY bor_data_id",
                            function(err1, r1) {
                                console.log(r1.length)

                                var noequip = [];

                                for (r=0; r<(r1.length) ;r++) {
                                    console.log([r1[r].bor_date,r1[r].bor_return_date])
                                    noequip.push([r1[r].bor_date,r1[r].bor_return_date]);
                                }

                                if (err1) { console.error(); }
                                if (r1.length > 0 ) {
                                    res.render('equipment_data.ejs', {
                                        allequips:  result1,
                                        datasFC:    noequip,
                                        holidays:   holidayDate
                                    });
                                }
                                else {
                                    res.render('equipment_data.ejs', {
                                        allequips:  result1,
                                        datasFC:    [],
                                        holidays:   holidayDate
                                    });
                                }
                            }
                        );
                    }
                );
            }
        }
    );
});


/* ------------ Member Borrow ------------ */
/* today date */
var today = new Date();
var toyear = today.getFullYear();
var tomonth = today.getMonth();
var todate = today.getDate();
let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

/* ----- Student Borrow ----- */
var memberLogin = "";
ex.open_borrow1 = app.get('/equip_borrow/:mem_id&:set_id', function(req, res) {
    let username = memberLogin;
    
    connection.query(
        "DELETE FROM `borrow_temp`",
        function(err1) {
            if (err1) { console.error(); }
        }
    );

    connection.query(
        "DELETE FROM `temp` WHERE mem_username = '" + username + "'",
        function(err1) {
            if (err1) { console.error(); }
        }
    );

    const usn = req.params.mem_id;
    const set_id = req.params.set_id;
    let isLogin = (req.session.loggedin) && (req.session.username == usn);
    if (isLogin) {
        memberLogin = usn
        res.redirect('/equip_borrow/' + set_id)
    }
    else {
        // User is not logged in
        res.redirect('/login');
    }
});

ex.borrow0 = app.post('/equip_borrow/:set_id', function(req, res) {
    console.log("========== POST WHEN CHECKBOX ==========")
    let username = memberLogin;
    let checkID = req.body.checkID
    let checkOutID = req.body.checkOutID
    let borArr = req.body.borArr
    var set_id = checkID.substring(0,3);

    console.log("เข้า",checkID)
    console.log("ออก",checkOutID)

    connection.query(
        "SELECT * FROM `temp` WHERE mem_username = '"+ username +"';",
        function(err0, r0) {
            if (err0) { console.error(); }
            else if (r0.length > 0) {
                connection.query(
                    "UPDATE `temp` SET `borArr` = '" + borArr + "' WHERE `temp`.`mem_username` = '" + username + "';",
                    function(err0) {
                        if (err0) { console.error(); }
                    }
                );
            }
            else if (r0.length == 0) {
                connection.query(
                    "INSERT INTO `temp` (`mem_username`, `borArr`) VALUES ('" + username + "', '" + borArr + "');",
                    function(err0) {
                        if (err0) { console.error(); }
                    }
                );
            }
        }
    );

    connection.query(
        "SELECT bor_date,bor_return_date,bor_equip_id,set_stock,type_stock,equip_stock,set_can_borrow,type_can_borrow,equip_can_borrow \
        FROM borrow b, borrow_data bd, equipment e, equipment_type t, equipment_set s\
        WHERE (bd.bor_id = b.bor_id) AND (e.type_id = t.type_id AND t.set_id = s.set_id)\
        AND (bd.bor_equip_id = e.equip_id OR bd.bor_equip_id = t.type_id OR bd.bor_equip_id = s.set_id)\
        AND (bor_status = 'p' OR bor_status = 'a' OR bor_status = 'r') AND (bor_date >= CURRENT_DATE())\
        AND (bor_equip_id = '" + checkID + "') GROUP BY bor_data_id",
        function(err1, result1) {
            if (err1) { console.error(); }

            if (result1.length > 0) {
                let aaa = 0
                var borrowArr = []
                for (a=0; a<(result1.length) ;a++) {
                    let boreid = result1[a].bor_equip_id
                    let bordate = result1[a].bor_date
                    let stock = 0

                    if (result1[a].set_can_borrow == 'o') {
                        stock = result1[a].set_stock
                    }
                    else if (result1[a].type_can_borrow == 'o') {
                        stock = result1[a].type_stock
                    }
                    else {
                        stock = result1[a].equip_stock
                    }
                    connection.query(
                        "SELECT *,\
                                MAX(bor_date) AS min_date,\
                                MIN(bor_return_date) AS max_date\
                        FROM borrow b, borrow_data bd,\
                            equipment e, equipment_type t, equipment_set s,\
                            equipment_color, color_code\
                        WHERE (b.bor_id = bd.bor_id) AND\
                            (color_id = id) AND\
                            (id_equip = e.equip_id OR id_equip = t.type_id OR id_equip = s.set_id) AND\
                            (e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                            (bor_equip_id = e.equip_id OR bor_equip_id = t.type_id OR bor_equip_id = s.set_id) AND\
                            (? BETWEEN bor_date AND bor_return_date) AND\
                            (bor_equip_id = ?)\
                        GROUP BY bor_data_id", [bordate, boreid],
                        function(e2, r2) {
                            if (e2) { console.error(); }
                            aaa++
                            if (r2.length >= stock) {
                                let equipname = ''
                                let equipid = ''
                                let borstart = ''
                                let borend = ''

                                let min = r2[0].min_date;
                                min = new Date(min);
                                let max = r2[0].max_date
                                max = new Date(max);

                                for (r=0; r<(r2.length) ;r++) {
                                    if (r2[r].set_can_borrow == 'o') {
                                        equipname = r2[r].set_name
                                        equipid = r2[r].set_id
                                    }
                                    else if (r2[r].type_can_borrow == 'o') {
                                        equipname = r2[r].type_name
                                        equipid = r2[r].type_id
                                    }
                                    else {
                                        equipname = r2[r].equip_name
                                        equipid = r2[r].equip_id
                                    }

                                    borstart = r2[r].min_date
                                    borstart = new Date(borstart);
                                    borend = r2[r].max_date
                                    borend = new Date(borend);

                                    if (borstart > min) {
                                        min = borstart
                                    }
                                    if (borend < max) {
                                        max = borend
                                    }
                                }

                                borrowArr.push({
                                  equips_id:      equipid,
                                  equip_name:     equipname,
                                  start_date:     min,
                                  end_date:       max,
                                })
                            }

                            if (aaa==(result1.length)) {
                                /* ---- เอาค่าที่ซ้ำออกจาก borrowArr */
                                borrowArr = Array.from(new Set(borrowArr.map(JSON.stringify))).map(JSON.parse);
                                
                                for (i=0; i<(borrowArr.length) ;i++) {
                                    var start = String(borrowArr[i].start_date)
                                    var end = String(borrowArr[i].end_date)

                                    connection.query(
                                        "INSERT INTO `borrow_temp` (`bor_date`, `bor_return_date`, `bor_equip_id`) \
                                        VALUES ('" + start + "', '" + end + "', '" + checkID + "-" + i + "');",
                                        function(err2, result2) {
                                            if (err2) { console.error(); }
                                            if (result2 == undefined) {
                                                if (checkOutID != undefined) {
                                                    connection.query(
                                                        "DELETE FROM `borrow_temp` WHERE `borrow_temp`.`bor_equip_id` LIKE '%" + checkID + "%';",
                                                        function(err2) {
                                                            if (err2) { console.error(); }
                                                            else {
                                                                console.log('----- Borrow Data Temp Delete!! -----')
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                            else {
                                                console.log('----- Borrow Data Insert!! -----')
                                            }
                                        }
                                    );
                                }               
                            }
                        }
                    );
                }
            }
            else {
                res.redirect('/equip_borrow/' + set_id);
            }
        }
    )
});

ex.borrow1 = app.get('/equip_borrow/:set_id', function(req, res) {
    let username = memberLogin;
    let isLogin = (req.session.loggedin) && (req.session.username == username);

    if (isLogin) {
        let set_id = req.params.set_id;
        console.log('========== Show First Borrow ==========')
        console.log(username, set_id);

        connection.query(
            "SELECT * FROM member\
             WHERE mem_id = ? OR mem_username = ?", [username, username],
            function(err, result1) {
                if (err) { console.error(); }

                // SELECT holiday date
                var holidayDate = [];

                connection.query(
                    "SELECT * FROM calendar_holiday",
                    function(err0, result0) {
                        if (err0) {console.error(); }
                        for (i=0 ; i<result0.length ; i++) {
                            holidayDate.push(result0[i].holiday_date)
                        }
                    }
                );

                // SELECT every equipment of SET
                connection.query(
                    "SELECT *\
                    FROM equipment e, equipment_type t, equipment_set s, equipment_borrow eb\
                    WHERE (s.set_id = t.set_id AND t.type_id = e.type_id) AND\
                            (e.equip_id = eb.equip_id) AND\
                            (s.set_id = ?)\
                    ORDER BY e.equip_id", set_id,
                    function(err2, result2) {
                        if (err2) { console.error(); }
                        /* ----- Select borrow for calendar ----- */
                        connection.query(
                            "SELECT * FROM `borrow_temp`",
                            function(e1, r1) {
                                if (e1) { console.error(); }
                                if (r1.length > 0) {

                                    connection.query(
                                        "SELECT borArr FROM `temp` WHERE mem_username = '" + username + "'",
                                        function(e2, r2) {

                                            var noequip = [];

                                            for (r=0; r<(r1.length) ;r++) {
                                                noequip.push([r1[r].bor_date,r1[r].bor_return_date]);
                                            }

                                            if (e2) { console.error(); }
                                            if (r2.length > 0 ){
                                                res.render('user_student_borrow1.ejs', {
                                                    datas:      result1[0],
                                                    todays:     date_now,
                                                    usn:        username,
                                                    allequips:  result2,
                                                    borArr:     r2[0].borArr,
                                                    datasCal:   noequip,
                                                    holidays:   holidayDate
                                                });
                                            }
                                            else {
                                                res.render('user_student_borrow1.ejs', {
                                                    datas:      result1[0],
                                                    todays:     date_now,
                                                    usn:        username,
                                                    allequips:  result2,
                                                    borArr:     "",
                                                    datasCal:   noequip,
                                                    holidays:   holidayDate
                                                });
                                            }
                                        }
                                    );
                                }
                                else {
                                    connection.query(
                                        "SELECT borArr FROM `temp` WHERE mem_username = '" + username + "'",
                                        function(e2, r2) {
                                            var noequip = [];

                                            if (e2) { console.error(); }
                                            if (r2.length > 0 ){
                                                res.render('user_student_borrow1.ejs', {
                                                    datas:      result1[0],
                                                    todays:     date_now,
                                                    usn:        username,
                                                    allequips:  result2,
                                                    borArr:     r2[0].borArr,
                                                    datasCal:   [],
                                                    holidays:   holidayDate
                                                });
                                            }
                                            else {
                                                res.render('user_student_borrow1.ejs', {
                                                    datas:      result1[0],
                                                    todays:     date_now,
                                                    usn:        username,
                                                    allequips:  result2,
                                                    borArr:     "",
                                                    datasCal:   [],
                                                    holidays:   holidayDate
                                                });
                                            }
                                        }
                                    );
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

/* ---------- Student Borrow => Add Phone, Subject,... ---------- */
ex.borrow2 = app.post('/student_borrow/2', function(req, res) {
    let username = memberLogin;
    let allChecks = req.body.allchecks;
    console.log('EquipID: ', allChecks)
    let borDate = req.body.bor_d;
    let borTime = req.body.bor_t;
    let retDate = req.body.ret_d;
    let retTime = req.body.ret_t;

    var checkArr = [];
    var cutID = "";
    while (allChecks.length != 0) {
        cutID = allChecks.split(',')[0];
        checkArr.push(cutID);
        allChecks = allChecks.substring(cutID.length + 1);
    }

    connection.query(
        "DELETE FROM `borrow_temp`",
        function(err1) {
            if (err1) { console.error(); }
        }
    );

    connection.query(
        "DELETE FROM `temp` WHERE mem_username = '" + username + "'",
        function(err1) {
            if (err1) { console.error(); }
        }
    );

    // If user loged in
    let isLogin = (req.session.loggedin) && (req.session.username == username);
    if (isLogin) {
        console.log('======= Get Select Borrow & Date =======');
        getCheckEquip(checkArr);

        //Send Data to next borrow page
        connection.query(
            "SELECT *, (YEAR(CURDATE()) - (stu_year_admission - 543)) AS stu_year\
            FROM member, student\
            WHERE (mem_id = stu_id) AND\
                  (mem_id = ? OR mem_username = ?)", 
                  [username, username],
            function(err1, result1) {
              if (err1) { console.error(); }
              else {
                let stu_id = result1[0].mem_id;

                today = new Date();
                tomonth = today.getMonth() + 1
                let m = (tomonth < 10) ? ('0' + tomonth) : tomonth;
                let d = (todate < 10) ? ('0' + todate) : todate;
                var todayDate = toyear + '-' + m + '-' + d;
                
                let hr = (today.getHours() < 10) ? ('0' + today.getHours()) : (today.getHours());
                let mn = (today.getMinutes() < 10) ? ('0' + today.getMinutes()) : (today.getMinutes());
                let sc = (today.getSeconds() < 10) ? ('0' + today.getSeconds()) : (today.getSeconds());
                var toTime = hr + ':' + mn + ':' + sc;

                connection.query(
                    "SELECT *\
                    FROM subjects s, subject_term st, student\
                    WHERE (s.sub_id = st.sub_id) AND\
                          (sub_group LIKE CONCAT('%', stu_group, '%')) AND\
                          (stu_id = ?)", stu_id,
                    function(err2, result2) {
                        if (err2) { console.error(); }

                        console.log('====================')
                        console.log('all sets', setsArr.length)
                        console.log(setsArr)
                        res.render('user_student_borrow2.ejs', {
                            datas:      result1[0],
                            todays:     date_now,
                            usn:        username,
                            borToday:   todayDate,
                            borTime:    toTime,
                            allSet:     setsArr,
                            allCheck:   checkArr,
                            borrowD:    borDate,
                            borrowT:    borTime,
                            returnD:    retDate,
                            returnT:    retTime,
                            subjects:   result2
                        });
                    }
                );
              }  
            }
        );
    } else {
        // User is not logged in
        res.redirect('/login');
    }
});

// Function: Select Check Equipment
var setsArr = [];
function getCheckEquip(array) {
    setsArr = []
    for (i=0 ; i<array.length ; i++) {
        console.log('Func(array) ==>', array[i])

        connection.query(
            "SELECT *, equip_amount\
            FROM equipment e, equipment_borrow eb,\
                 equipment_type t, equipment_set s, staff sta\
            WHERE (e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                  (e.equip_id = eb.equip_id) AND\
                  (sta.staff_id = s.staff_id) AND\
                (e.equip_id = ? OR t.type_id = ? OR s.set_id = ?)",
            [array[i], array[i], array[i]],
            function(e, r) {
                if (e) { console.error(); }
                else {
                    setsArr.push(r);
                }
            }
        );
    }
}


/* ======== Insert Borrow ======== */
var borrowID = '';
var borrowDataID = '';
ex.add_stu_borrow = app.post('/add/borrow', function(req, res) {
    console.log('========== Insert Borrow ==========')

    // Add equip id to array
    let strEquips       = req.body.all_equip;
    var cutID = "";
    var arrEquips = [];
    while (strEquips.length != 0) {
        cutID = strEquips.split(',')[0];
        arrEquips.push(cutID);
        strEquips = strEquips.substring(cutID.length + 1);
    }

    let username        = req.body.mem_id;
    let todayD          = req.body.d_today;
    let todayT          = req.body.t_today;
    let borrowD         = req.body.d_borrow;
    let borrowT         = req.body.t_borrow;
    let returnD         = req.body.d_return;
    let returnT         = req.body.t_return;
    let add_phone1      = req.body.phone1;
    let add_phone2      = req.body.phone2;
    let subject         = req.body.sub;
    let object          = req.body.object;
    let professor       = req.body.subpro;

    const aUsername = username.substring(0, 2);
    const zUsername = username.substring(username.length - 3, username.length);
    borrowID = todayD + todayT + '-' + aUsername + zUsername;
    /* borrowID -> เช่น 2020-12-3016:50:55-60123 */

    const borrows = {
        bor_id:             borrowID,
        bor_book_date:      todayD,
        bor_book_time:      todayT,
        bor_date:           borrowD,
        bor_time:           borrowT,
        bor_return_date:    returnD,
        bor_return_time:    returnT,
        bor_subject:        subject,
        bor_sub_prof:       professor,
        bor_object:         object,
        bor_phone1:         add_phone1,
        bor_phone2:         add_phone2,
        mem_id:             username,
        bor_note:           null,
        bor_status:         'p'
    }

    console.log('BorrowID -> ', borrowID);
    connection.query(
        "INSERT INTO borrow SET ?", borrows,
        function (err1) {
            if (err1) { console.error(); }

            console.log('----- borrow INSERT!! -----')
            let num = 0; 
            for (i=0 ; i<arrEquips.length ; i++) {
                borrowDataID = borrowID + '-' + num
                num = num + 1

                connection.query(
                    "INSERT INTO borrow_data \
                    SET bor_data_id = ?, bor_equip_id = ?, bor_id = ?",
                    [borrowDataID, arrEquips[i], borrowID],
                    function(err2) {
                        if (err2) { console.error(); }

                        console.log('----- Borrow Data Insert!! -----')
                    }
                );
                
                connection.query(
                    "SELECT *\
                    FROM borrow_data, equipment_set s, equipment_type t, equipment e, equipment_borrow eb\
                    WHERE (s.set_id = t.set_id AND e.type_id = t.type_id AND e.equip_id = eb.equip_id) AND\
                            (bor_equip_id = s.set_id OR bor_equip_id = t.type_id OR bor_equip_id = eb.equip_id) AND\
                            (bor_data_id = ?)", borrowDataID,
                    function(err3, r3) {
                        if (err3) { console.error(); }

                        let row = r3
                        for (j=0 ; j<r3.length ; j++) {
                            connection.query(
                                "INSERT INTO borrow_data_detail\
                                SET equip_id = ?, bor_equip_amount = ?, bor_data_id = ?",
                                [r3[j].equip_id, r3[j].equip_amount, r3[j].bor_data_id],
                                function(err6) {
                                    if (err6) { console.log(err6); }

                                    let x = i;
                                    if (x === (arrEquips.length)) {
                                        console.log('======= Complete Insert =======')
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});

/* ========== Delete/Cancel Borrow ========== */
ex.cancel_borrow = app.get('/cancel/:bor_id/:id', function(req, res) {
    console.log('========== Delete Borrow ==========')
    // If user loged in
    let username = req.params.id;
    let isLogin = (req.session.loggedin) && (req.session.username == username);
    if (isLogin) {
        memberLogin = username
        let borrow_id = req.params.bor_id;

        connection.query(
            "SELECT * FROM borrow_data WHERE bor_id = ?",
            borrow_id,
            function(err1, result1) {
                if (err1) { console.error(); }

                for (r=0; r<result1.length ;r++) {
                    /* ===== Delete borrow_data_detail ===== */
                    let bd = result1[r].bor_data_id;
                    connection.query(
                        "DELETE FROM borrow_data_detail\
                        WHERE bor_data_id = ?", bd,
                        function(err2) {
                            if (err2) { console.error(); }

                            console.log('----- Delete borrow_data_detail -----')
                        }
                    );
                }

                connection.query(
                    "DELETE FROM borrow_data \
                    WHERE bor_id = ?", borrow_id,
                    function(err3) {
                        if (err3) { console.error(); }

                        console.log('----- Delete borrow_data -----')
                        connection.query(
                            "DELETE FROM borrow WHERE bor_id = ?",
                            borrow_id,
                            function(err4) {
                                if (err4) { console.error(); }

                                console.log('----- Delete All Borrow!! -----')
                                res.redirect('/user_student/' + username + '/profile');
                            }
                        );
                    }
                );
            }
        );
    } else {
        res.redirect('/login');
    }
});



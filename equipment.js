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
    console.log('Set ID', set_id);

    connection.query(
        "SELECT * FROM equipment_set s \
        JOIN equipment_type t \
        ON s.set_id = t.set_id WHERE s.set_id = ?", set_id,
        function(err, result1) {
            if (err) { console.error(); }

            connection.query(
                "SELECT * FROM equipment_type t JOIN equipment e \
                ON t.type_id = e.type_id JOIN equipment_borrow eb \
                ON e.equip_id = eb.equip_id WHERE set_id = ?",
                set_id,
                function(err2, result2) {
                    if (err2) { console.error(); }

                    /* Select every day that is borrowed  */
                    connection.query(
                        "SELECT *\
                        FROM borrow b, borrow_data bd, equipment e, equipment_borrow eb, equipment_type t, equipment_set s, color_calendar\
                        WHERE (e.equip_id = eb.equip_id AND e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                              (b.bor_id = bd.bor_id) AND\
                              (bor_equip_id = e.equip_id OR bor_equip_id = t.type_id OR bor_equip_id = s.set_id) AND\
                              (id = e.equip_id OR id = t.type_id OR id = s.set_id) AND\
                              (s.set_id = ?)\
                        GROUP BY bor_data_id",
                        set_id,
                        function(err3, result3) {
                            if (err3) { console.error(); }

                            console.log(result3.length);
                            connection.query(
                                "SELECT *\
                                FROM equipment e, equipment_type t, equipment_set s, color_calendar\
                                WHERE (e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                                      (id = e.equip_id OR id = t.type_id OR id = s.set_id) AND\
                                      (s.set_id = ?)\
                                GROUP BY id",
                                set_id,
                                function(err4, result4) {
                                    if (err4) { console.error(); }

                                    console.log('===== Color Box =====')
                                    res.render('equipment_data.ejs', {
                                        types:      result1,
                                        setEquip:   result2,
                                        datasFC:    result3,
                                        colors:     result4
                                    });
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});

/* ------------ Borrow 1 ------------ */
ex.equipment_borrow = app.get('/equip_borrow/:mem_id&:set_id', function(req, res) {
    let username = req.params.mem_id;
    let set_id = req.params.set_id;
    console.log(username, set_id);
    /* today date */
    let today = new Date();
    let toyear = today.getFullYear();
    let tomonth = today.getMonth();
    let todate = today.getDate();
    let date_now = todate + "/" + (tomonth+1) + "/" + toyear;

    if (req.session.loggedin) {
        connection.query(
            "SELECT * FROM member WHERE mem_id = ?", [username],
            function(err, result1) {
                if (err) { console.error(); }
                connection.query(
                    "SELECT * FROM equipment_set s \
                    JOIN equipment_type t \
                    ON s.set_id = t.set_id WHERE s.set_id = ?", set_id,
                    function(err2, result2) {
                        if (err2) { console.error(); }
            
                        connection.query(
                            "SELECT * FROM equipment_type t JOIN equipment e \
                            ON t.type_id = e.type_id JOIN equipment_borrow eb \
                            ON e.equip_id = eb.equip_id WHERE set_id = ?",
                            [set_id],
                            function(err3, result3) {
                                if (err3) { console.error(); }
                                
                                // Secect every day that is borrowed.
                                connection.query(
                                    "SELECT *\
                                    FROM borrow b, borrow_data bd, equipment e, equipment_borrow eb, equipment_type t, equipment_set s, color_calendar\
                                    WHERE (e.equip_id = eb.equip_id AND e.type_id = t.type_id AND t.set_id = s.set_id) AND\
                                          (b.bor_id = bd.bor_id) AND\
                                          (bor_equip_id = e.equip_id OR bor_equip_id = t.type_id OR bor_equip_id = s.set_id) AND\
                                          (id = e.equip_id OR id = t.type_id OR id = s.set_id) AND\
                                          (s.set_id = ?)\
                                    GROUP BY bor_data_id", set_id,
                                    function(err4, result4) {
                                        if (err4) { console.error(); }

                                      connection.query(
                                          "SELECT * FROM calendar_holiday",
                                          function(err5, result5) {
                                            if (err5) { console.error(); }

                                            var holidayDate = [];
                                            for (i=0 ; i<result5.length ; i++) {
                                                holidayDate.push(result5[i].holiday_date);
                                            }
                                            res.render('equipment_borrow1.ejs', {
                                                datas:      result1[0],
                                                todays:     date_now,
                                                types:      result2,
                                                setEquip:   result3,
                                                datasFC:    result4,
                                                holidays:   holidayDate,
                                                showNotBorrow: 'none'     //block
                                            });
                                          }
                                      );
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

ex.member_borrow1 = app.post('/mem_borrow1/:mem_id', function(req, res) {
    console.log('======= Insert Borrow =======');
    let username = req.params.mem_id;
    let check = req.body.allchecks;
    let borDate = req.body.bor_d;
    let borTime = req.body.bor_t;
    console.log(username, check, borDate, borTime);
});



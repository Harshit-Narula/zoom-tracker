const express = require('express');
const fileUpload = require('express-fileupload');
var fs = require('fs');
var parse = require('csv-parse');
var mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
uuidv4();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csv_data"
});

var cors = require('cors');
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const app = express();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// make public folder 
app.use(express.static('public'));

app.use(express.json())
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }))

// Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) return res.status(200).json({ success: 0, msg: 'No file uploaded' });
    let file = req.files.file;
    var csvData = [];
    let fileName = `${__dirname}/client/public/uploads/${file.name}`
    file.mv(fileName, err => {
        if (err) {
            console.log(err);
            return res.status(200).json({
                success: 0,
                msg: 'Error uploading file'
            });
        } else {
            fs.createReadStream(fileName)
                .pipe(parse({ delimiter: ',' }))
                .on('data', function (csvrow) {
                    // console.log(csvrow);
                    //do something with csvrow
                    var sql = `INSERT INTO csv_data(uuid ,name, email, count, date, date_of_webinar, image_url, batch_details, zoom_link) VALUES ('${uuidv4()}','${csvrow[0]}', '${csvrow[1]}','${csvrow[2]}', now(),'${csvrow[4]}', '${csvrow[5]}', '${csvrow[6]}', '${csvrow[7]}')`;
                    console.log(sql);
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(" record inserted");
                    });
                    // console.log(csvrow);
                })
                .on('end', function () {
                    console.log('done');
                    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
                })
                .on('error', function (err) {
                    console.log(err.message);
                    res.status(500).json({ success: 0, error: err.message });
                });
        }
    });
});

app.get("/count", (req, res) => {
    var sql = `SELECT count(*) as total FROM csv_data`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(" record inserted");
        res.json(result);
    });
})

app.post("/update", (req, res) => {
    var sql = `update csv_data set page_open_count=page_open_count+1 where uuid='${req.body.uuid}'`;
    con.query(sql, function (err, result) {
        if (err) {
            res.status(200).json({
                success: 0,
                error: err.message
            });
        } else {
            res.json({
                success: 1,
                result: result
            });
        }
    });
})

app.post("/updateCount", (req, res) => {
    var sql = `update csv_data set count=count+1 where uuid='${req.body.uuid}'`;
    con.query(sql, function (err, result) {
        if (err) {
            res.status(200).json({
                success: 0,
                error: err.message
            });
            console.log(error);
        } else {
            console.log(result);
            res.json({
                success: 1,
                result: result
            });
        }
    });
})



app.post('/getAll', (req, res) => {
    const date = req.body.date;
    var sql = `SELECT * FROM csv_data where date='${date}'`
    con.query(sql, (err, result) => {
        if (err) res.json({
            error: err.message
        })
        res.send({
            result
        })
    })
});


// app.get("/getWebinarDetails", (req, res) => {
//     var sql = `SELECT DISTINCT date ,image_url, date_of_webinar, batch_details where date = ${req.body.date}`;
//     con.query(sql, (err, result) => {
//         if (err) {
//             res.json({
//                 success: false,
//                 error: err.message
//             })
//         } else {
//             res.json({
//                 success: true,
//                 result
//             })
//         }
//     })
// })
app.post("/enterZoomLink", (req, res) => {
    var sql = `update csv_data set zoom_link = '${req.body.link}' where date = current_date()`;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                success: false,
                error: err.message
            })
            console.log(err);
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

app.get("/getWebinarDetails", (req, res) => {
    var sql = `SELECT zoom_link,date_of_webinar, time_of_webinar, details from csv_data where date = current_date() limit 1`;
    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                success: false,
                error: err.message
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

app.get("/getZoomLink/:email", (req, res) => {
    let email = req.params.email;
    var sql = `SELECT uuid from csv_data where email = '${email}'`;
    con.query(sql, (err, result) => {
        if (err) {
            res.json({
                success: false,
                error: err.message
            })
        } else {
            res.send(
                "www.pepcoding.com/webinar/" + result[0].uuid
            )
        }
    })
})

app.get("/", (req, res) => {
    res.json({ msg: "backend is running on port 5000" })
})
app.listen(5000, () => console.log('Server Started...'));
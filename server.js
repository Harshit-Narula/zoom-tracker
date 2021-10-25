const express = require('express');
const fileUpload = require('express-fileupload');
var fs = require('fs');
var parse = require('csv-parse');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "csv_data"
});


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
const app = express();

app.use(express.json())
app.use(fileUpload());
app.use(express.urlencoded({extended:true}))

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    var csvData = [];
    fs.createReadStream(`${__dirname}/client/public/uploads/${file.name}`)
      .pipe(parse({ delimiter: ',' }))
      .on('data', function (csvrow) {
        console.log(csvrow);
        //do something with csvrow
        var sql = `INSERT INTO csv_data (name, phone) VALUES ( '${csvrow[0]}', '${csvrow[1]}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(" record inserted");
        });
        // console.log(csvrow);
      })
      .on('end', function () {
        console.log('done');
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
  });
});

app.post('/getAll', (req, res) => {
  // if (req.files === null) {
  //   return res.status(400).json({ msg: 'No file uploaded' });
  // }

  const date = req.body.date;

  var sql = `SELECT * FROM csv_data where date='${date}'`
  con.query(sql,(err,result)=>{
    if(err) res.json({
      error:err.message
    })
    res.send({
      result
    })
  })
});

app.listen(5000, () => console.log('Server Started...'));

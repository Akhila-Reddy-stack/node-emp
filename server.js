var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var app = express();
var mysql = require('mysql');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const port = 3001;

app.post("/empregistration", async (req, res) => {
  try {

    console.log("try")
    var connection  = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'empdatabase',
      port: 3306
    });
 
    connection.getConnection(function(err, db) {
  console.log(db)
      if (err) throw err; // not connected!
      console.log(req.body,"req")
      // Use the connection
      db.query(`INSERT INTO Employee (EmpName,Age,Gender,MobileNumber) VALUES
      ("${req.body.EmpName}", ${req.body.Age},"${req.body.Gender}", ${req.body.MobileNumber})`, function (error, results, fields) {
        if(err){
          res.json({ status: false, message: error });
        }
        else{
          res.json({ status: true, message: "Success!" });
        }
        // When done with the connection, release it.
        db.release();
      });
    });
  
} 
catch (error) {
  res.json({ status: false, message: error });
}
});



app.get("/empList", async (req, res) => {
  try {

    console.log("try")
    var connection  = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'empdatabase',
      port: 3306
    });
 
    connection.getConnection(function(err, db) {
  console.log(db)
      if (err) throw err; // not connected!
      console.log(req.body,"req")
      // Use the connection
      db.query(`SELECT * FROM  Employee`, function (error, results, fields) {
        if(err){
          res.json({ status: false, message: error });
        }
        else{
          res.json({ status: true, data:results  });
        }
        // When done with the connection, release it.
        db.release();
      });
    });
} 
catch (error) {
  res.json({ status: false, message: error });

}
});


var server = app.listen(port, function (err) {
  if (err) {
    console.log("Server creation error..");
  } else {
    console.log("Server is running on.." + port);
  }
});


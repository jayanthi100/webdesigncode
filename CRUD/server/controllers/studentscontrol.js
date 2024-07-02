const mysql=require("mysql");

const con=mysql.createPool({
    connectionLimit:10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
  });
  

exports.view=(req,res)=>{

    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("SELECT * FROM data d",(err,rows)=>{
           connection.release();
           if(!err){
            res.render("home",{rows});
           }
           else{
            console.log("Error in Listing Data"+err);
           }
        });
      });

};

exports.adduser=(req,res)=>{
  res.render("adduser");
}

exports.save=(req,res)=>{
  con.getConnection((err,connection)=>{
    if(err) throw err

const {name,id,gender,department,nationality}=req.body;

    connection.query("insert into data (NAME,ID,GENDER,DEPARTMENT,NATIONALITY) values(?,?,?,?,?)",[name,id,gender,department,nationality],(err,rows)=>{
       connection.release();
       if(!err){
        res.render("adduser",{msg:"User Details Added Success"});
       }
       else{
        console.log("Error in Listing Data"+err);
       }
    });
  });
}

exports.edituser=(req,res)=>{
  con.getConnection((err,connection)=>{
    if(err) throw err

    let id=req.params.id;
    connection.query("SELECT * FROM data where id=?",[id],(err,rows)=>{
       connection.release();
       if(!err){
        res.render("edituser",{rows});
       }
       else{
        console.log("Error in Listing Data"+err);
       }
    });
  });

}

exports.edit = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err

    const { name, id, gender, department, nationality } = req.body;
    let ID = req.params.id;

    connection.query("update data set NAME=?,ID=?,GENDER=?,DEPARTMENT=?,NATIONALITY=? where ID=?", [name, id, gender, department, nationality, ID], (err, rows) => {
      connection.release();
      if (!err) {
        con.getConnection((err, connection) => {
          if (err) throw err

          let id = req.params.id;
          connection.query("SELECT * FROM data where id=?", [id], (err, rows) => {
            connection.release();
            if (!err) {
              res.render("edituser", { rows, msg: "User Details updated Success" });
            } else {
              console.log("Error in Listing Data" + err);
            }
          });
        });
      }
    });
  });
}


exports.delete=(req,res)=>{
  con.getConnection((err,connection)=>{
    if(err) throw err
    let id=req.params.id;
    connection.query("delete from data where id=?",[id],(err,rows)=>{
      connection.release();
      if(!err) {
        res.redirect("/");
      }else{
        console.log(err);
      }
 
    });
 
  });
};





/*exports.viewuser = (req, res) => {
  let id = req.params.id; // or req.query.id, depending on your route setup
  con.getConnection((err, connection) => {
    if (err) {
      console.error(err); 
      res.status(500).send('Error connecting to database');
      return;
    }
    connection.query("SELECT * FROM data WHERE id = ?", [id], (err, rows) => {
      try {
        if (err) {
          console.error(err);
          res.status(500).send('Error retrieving data');
          return;
        }
        res.render("viewuser", { rows });
      } finally {
        connection.release();
      }
    });
  });
};*/




// studentscontrol.js
/*exports.view = (req, res) => {
  let id = req.params.id;
  con.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      res.status(500).send("Error connecting to database");
      return;
    }
    connection.query("SELECT * FROM data WHERE id =?", [id], (err, rows) => {
      connection.release();
      if (err) {
        console.error("Error listing data:", err);
        res.status(500).send("Error listing data");
        return;
      }
      res.render("viewuser", { rows });
    });
  });
};*/
exports.viewuser = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err

    let id = req.params.id;
    connection.query("SELECT * FROM data where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("viewuser", { rows}); // Pass the first row as an object
      } else {
        console.log("Error in Listing Data" + err);
      }
    });
  });
};


/*export function myFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}*/




/*export function myFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Define the departments to filter by
  const departments = ["ECE", "EEE", "MDE", "BME", "CSE", "IT"];

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]; // assuming DEPARTMENT is the 2nd column (index 1)
    if (td) {
      txtValue = td.textContent || td.innerText;
      txtValue = txtValue.toUpperCase();
      if (departments.includes(txtValue)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
module.exports = { myFunction };*/


















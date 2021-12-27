var express = require('express');
var ejs = require('ejs');
var path = require('path');
var path1 = require('path');
var path0 = require('path');
var port = 8080;

const fileUpload = require('express-fileupload');
var app = express();
app.use(fileUpload());

var mysql = require("mysql");//  accessing mysql modules

//creating mysql connection
var con = mysql.createConnection
    ({
        host : "localhost",
          user : "root",
            password : "vishu@1234",//password given for root user in MySql database
       database : "iclone" 
});

//Checking the connection
con.connect(function(err){
      if (err) 
        throw err;            
      console.log("Connected to MySql database"); 
    console.log("Started accessing the requirements");
  console.log("Fetched All the Results");
console.log("Try http://localhost:8080/ for Login")
});

var bodyParser = require("body-parser");    //html body access by body-parser
app.use(bodyParser.json());         //stored in json format
app.use(bodyParser.urlencoded({
         extended: true 
}));

//setting html view as E-JS
app.set('view engine','ejs');

//Selecting public folder as the default one
app.use(express.static('public'));

//accessing the User selection Page
app.get('/',(req,res,next)=>{
        res.sendFile('User_Login.html',{
          root:__dirname
      });
});

// User Login routes
app.get('/login1',(req,res,next)=>{
      res.sendFile('Login1.html',{
          root:__dirname
      });
});

app.get('/login2',(req,res,next)=>{
        res.sendFile('Login2.html',{
          root:__dirname
      });
});

app.get('/login3',(req,res,next)=>{
        res.sendFile('Login3.html',{
          root:__dirname
      });
});


app.get('/login4',(req,res,next)=>{
        res.sendFile('Login4.html',{
          root:__dirname
      });
});

//News Feed route 
app.get('/feed1',(req,res)=>{ 
      // var sql = 'select User_Details.U_Name,User_details.P_Pic,User_details.Bio,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.Time,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and photos.photo_id= Comment.photo_id and photos.photo_id = Photo_cre_Date.photo_id order by photos.photo_id desc;';
          var sql = 'select * from Feed_Page';
            con.query(sql,(err,results,fields)=>{
              if (err)   
                throw err;
                  var sqly = 'select U_Name,P_Pic from User_Details;'
                    con.query(sqly,(err,result,field)=>{
                      if (err)
                    throw err;
                  console.log(fields);
                res.render('Feed1',{
              path:results,
            path1:result                     
        });
      });
    }); 
});
    
app.get('/feed2',(req,res)=>{ 
  // var sql = 'select User_Details.U_Name,User_details.P_Pic,User_details.Bio,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.Time,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and photos.photo_id= Comment.photo_id and photos.photo_id = Photo_cre_Date.photo_id order by photos.photo_id desc';
    var sql = 'select * from Feed_Page'; 
      con.query(sql,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqly = 'select U_Name,P_Pic from User_Details;'
              con.query(sqly,(err,result,fields)=>{
                if (err)
                  throw err;
              console.log(results);
            res.render('Feed2',{
          path:results,
        path1:result                     
      });
    });
  });
});

app.get('/feed3',(req,res)=>{ 
  // var sql = 'select User_Details.U_Name,User_details.P_Pic,User_details.Bio,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.Time,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and photos.photo_id= Comment.photo_id and photos.photo_id = Photo_cre_Date.photo_id order by photos.photo_id desc;';
    var sql = 'select * from Feed_Page';  
      con.query(sql,(err,results,fields)=>{
        if (err)   
          throw err;
            var sqly = 'select U_Name,P_Pic from User_Details;'
              con.query(sqly,(err,result,fields)=>{
                if (err)
                  throw err;
                console.log(results);
              res.render('Feed3',{
            path:results,
          path1:result                     
        });
      });
    });
});

app.get('/feed4',(req,res)=>{ 
  // var sql = 'select User_Details.U_Name,User_details.P_Pic,User_details.Bio,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.Time,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and photos.photo_id= Comment.photo_id and photos.photo_id = Photo_cre_Date.photo_id order by photos.photo_id desc;';
    var sql = 'select * from Feed_Page';  
      con.query(sql,(err,results,fields)=>{
        if (err)   
          throw err;
            var sqly = 'select U_Name,P_Pic from User_Details;'
              con.query(sqly,(err,result,fields)=>{
                if (err)
                  throw err;
                console.log(results);
              res.render('Feed4',{
            path:results,
          path1:result                     
        });
      });
  });
});

//User's Uploading Photos routes
app.get('/upl1',(req,res)=>{
          res.sendFile('upload1.html',{
                  root:__dirname
       });
});

//Uploading The photos Query Report
app.post('/upload1',(req,res)=>{
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');};
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;
          console.log(sampleFile);
            // Use the mv() method to place the file somewhere on your server
              sampleFile.mv(`/Users/vishugowda/Desktop/ICLONE/public/${req.body.photo_name}.JPG`, 
                function(err) {
                  if (err)
                    return res.status(500).send(err);
                      var date = new Date();
                        var path1 = require('path');
                          {
                            var sql1 = `INSERT INTO PHOTOS(U_Id,caption,Location,Photo_Name) VALUES(1001,'${req.body.caption}','${req.body.location}','${req.body.photo_name}.JPG')`;
                              con.query(sql1,(err,results,fields)=>{
                                if (err) 
                                  console.log( err);
                                    console.log(results);
                                      });}
                                      var sql3 = `insert into likes(U_Id,photo_id,Likes) values(1001, (select photo_id from  photos where Photo_Name='${req.body.photo_name}.JPG') ,3)`;
                                    con.query(sql3, function (err, results,fields) 
                                  {
                                if (err) 
                              console.log(err); //throws an error 
                            console.log( "File Uploaded"); //print if details are stored
                          });
                        var sql4= `insert into comment values(1002,(select photo_id from  photos where Photo_Name='${req.body.photo_name}.JPG'),'Nyc One','12:38:45','mini_me_011');`;
                      con.query(sql4, 
                    function (err, results,fields) 
                  {
                if (err) 
              console.log(err); //throws an error 
            console.log( "File Uploaded"); //print if details are stored
          });
        });
    res.send('Photo uploaded!');
});
    
app.get('/upl2',(req,res)=>{
        res.sendFile('upload2.html',{root:__dirname}
    );
});

app.post('/upload2',(req,res)=>{
            if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).send('No files were uploaded.');
              };
      let sampleFile = req.files.sampleFile;
        sampleFile.mv(`/Users/vishugowda/Desktop/ICLONE/public/${req.body.photo_name}.JPG`, 
          function(err) {
                if (err)
                    return res.status(500).send(err);
                      var date = new Date();
                        var path1 = require('path');
                                  {
                                    var sql1 = `INSERT INTO PHOTOS(U_Id,caption,Location,Photo_Name) VALUES(1002,'${req.body.caption}','${req.body.location}','${req.body.photo_name}.JPG')`;
                                      con.query(sql1,(err,results,fields)=>{
                                            if (err) 
                                                 console.log( err);
                                        console.log(results);
                                      });
                                  } 
                                  var sql3 = `insert into likes(U_Id,photo_id,Likes) values(1002, (select photo_id from  photos where Photo_Name='${req.body.photo_name}.JPG') ,1)`;
                                   con.query(sql3,function (err, results,fields) {
                                        if (err) 
                                          console.log(err); //throws an error 
                                        console.log( "File Uploaded"); //print if details are stored
                                    });
                                  var sql4= `insert into comment values(1001,(select photo_id from  photos where Photo_Name='${req.body.photo_name}.JPG'),'Gud Picture','12:38:45','scorpion_018');`;
                                    con.query(sql4,function (err, results,fields) {
                                  if (err) 
                                console.log(err); //throws an error 
                              console.log( "File Uploaded"); //print if details are stored
                            });
                          });
                      res.send('Photo uploaded!');
        });

app.get('/upl3',(req,res)=>{
          res.sendFile('upload3.html',{root:__dirname}
      );
});


app.post('/upload3',(req,res)=>{
            if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).send('No files were uploaded.');
            };
            let sampleFile = req.files.sampleFile;
              sampleFile.mv(`/Users/vishugowda/Desktop/ICLONE/public/${req.body.photo_name}.JPG`, 
                function(err) {
                  if (err)
                    return res.status(500).send(err);     
                      var date = new Date();
                        var path1 = require('path');
                                 {
                                  var sql1 = `INSERT INTO PHOTOS(U_Id,caption,Location,Photo_Name) VALUES(1003,'${req.body.caption}','${req.body.location}','${req.body.photo_name}.JPG')`;
                                    con.query(sql1,(err,results,fields)=>{
                                            if (err) 
                                              console.log( err);
                                            console.log(results);
                                      });
                                  }
                                    var sql3 = `insert into likes(U_Id,photo_id,Likes) values(1003, (select photo_id from  photos where Photo_Name='${req.body.photo_name}.JPG') ,1)`;
                                      con.query(sql3,function (err, results,fields) {
                                        if (err) 
                                          console.log(err); //throws an error 
                                            console.log( "File Uploaded"); //print if details are stored
                                  });
                                  var sql4= `insert into comment values(1001,(select photo_id from  photos where Photo_Name='${req.body.photo_name}.JPG'),'Fantastic','12:38:45','ranjith_gowda');`;
                                con.query(sql4,function (err, results,fields) { 
                              if (err) 
                            console.log(err); //throws an error 
                          console.log( "File Uploaded"); //print if details are stored
                        });
                    });
              res.send('Photo uploaded!');
});

app.get('/upl4',(req,res)=>{
          res.sendFile('upload4.html',{root:__dirname}
        );
});

app.post('/upload4',(req,res)=>{
            if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).send('No files were uploaded.');
            };
          let sampleFile = req.files.sampleFile;
          sampleFile.mv(`/Users/vishugowda/Desktop/ICLONE/public/${req.body.photo_name}.JPG`, 
          function(err) {
                if (err)
                    return res.status(500).send(err);
                          var date = new Date();
                          var path1 = require('path');
                          var curdate = date.getFullYear()+'-';
                          curdate = date.getMonth()<10 ? curdate+'0'+date.getMonth()+'-':curdate+date.getMonth()+'-';
                          curdate = date.getDate()<10 ? curdate+'0'+date.getDate():curdate+date.getDate();
                          console.log(curdate);{
                          var sql1 = `INSERT INTO PHOTOS(U_Id,caption,Location,Photo_Name) VALUES(1004,'${req.body.caption}','${req.body.location}','${req.body.photo_name}.JPG')`;
                                con.query(sql1,(err,results,fields)=>{
                                            if (err) 
                                                 console.log( err);
                                        console.log(results);
                                      }
                                  );
                                }
                                 var sql3 = `insert into likes(U_Id,photo_id,Likes) values(1004, (select photo_id from  photos where Photo_Name='${req.body.photo_name}.JPG') ,2)`;
                                con.query(sql3, 
                                function (err, results,fields) 
                                {
                                  if (err) 
                                  console.log(err); //throws an error 
                                  console.log( "File Uploaded"); //print if details are stored
                                });

                                var sql4= `insert into comment values(1001,(select photo_id from  photos where Photo_Name='${req.body.photo_name}.JPG'),'Lookin Cool','12:38:45','likithshankar');`;
                                con.query(sql4, 
                                function (err, results,fields) 
                                {
                                  if (err) 
                                  console.log(err); //throws an error 
                                  console.log( "File Uploaded"); //print if details are stored
                                });
                              });
        
      res.send('Photo uploaded!');
  });

app.get('/account1',(req,res)=>{ 
          var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1001 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
            con.query(sql1,(err,results,fields)=>{
              if (err) 
                throw err;
                  var sqls = 'select * from user_details where U_Id=1001';
                    con.query(sqls,(err,result,fields)=>{
                      if (err)
                        throw err;
                      res.render('Account1',{
                    path1:results,
                  path:result
                });
          });
      });
});

app.get('/account2',(req,res)=>{ 
      var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id = likes.photo_id and user_details.U_Id= 1002 and photos.photo_id=comment.photo_id order by photo_id desc`;
        con.query(sql1,(err,results,fields)=>{
          if (err) 
            throw err;
              var sqld = 'select * from user_details where U_Id = 1002';
                con.query(sqld,(err,result,fields)=>{
                  if (err)
                    throw err;
                    res.render('Account2',{
                path1:results,
              path:result
            });
        });
    });
});

app.get('/account3',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and Photo_cre_date.photo_id=photos.photo_id and user_details.U_Id= 1003 and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1003';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Account3',{
              path1:results,
            path:result
          });
        });
    });
});

app.get('/account4',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and Photo_cre_date.photo_id=photos.photo_id and user_details.U_Id= 1004 and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1004';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Account4',{
              path1:results,
            path:result
          });
      });
    });
});

app.get('/search1',(req,res)=>{
  var sqlf = 'select friends.U_Id, Friends.Friends_Name, User_details.P_pic from friends,User_details where friends.U_ID=1001 and Friends.Friends_Name=User_details.U_Name';
    con.query(sqlf,(err,results,fields)=>{
      if (err)
        throw err;
          res.render('Search1.ejs',{
        path:results
      });
    });
});

app.get('/search2',(req,res)=>{
  var sqlf = 'select friends.U_Id, Friends.Friends_Name, User_details.P_pic from friends,User_details where friends.U_ID=1002 and Friends.Friends_Name=User_details.U_Name';
    con.query(sqlf,(err,results,fields)=>{
      if (err)
        throw err;
          res.render('Search2.ejs',{
        path:results
      });
    });
  });

app.get('/search3',(req,res)=>{
  var sqlf = 'select friends.U_Id, Friends.Friends_Name, User_details.P_pic from friends,User_details where friends.U_ID=1003 and Friends.Friends_Name=User_details.U_Name';
    con.query(sqlf,(err,results,fields)=>{
      if (err)
        throw err;
          res.render('Search3.ejs',{
        path:results
      });
    });
  });

app.get('/search4',(req,res)=>{
  var sqlf = 'select friends.U_Id, Friends.Friends_Name, User_details.P_pic from friends,User_details where friends.U_ID=1004 and Friends.Friends_Name=User_details.U_Name';
    con.query(sqlf,(err,results,fields)=>{
      if (err)
          throw err;
            res.render('Search4.ejs',{
          path:results
        })
        })
    });

app.get('/scorpion_018',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1001 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqls = 'select * from user_details where U_Id=1001';
            con.query(sqls,(err,result,fields)=>{
              if (err)
                throw err;
              res.render('Following1.ejs',{
            path1:results,
          path:result
        });
      });
    });
});

app.get('/scorpion_0182',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1001  and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqls = 'select * from user_details where U_Id=1001';
            con.query(sqls,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following2.ejs',{
              path1:results,
            path:result
          });
        });
     });
});

app.get('/scorpion_0183',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1001 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqls = 'select * from user_details where U_Id=1001';
            con.query(sqls,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following3.ejs',{
              path1:results,
            path:result
          });
        });
    });
});

app.get('/scorpion_0184',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1001 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqls = 'select * from user_details where U_Id=1001';
            con.query(sqls,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following4.ejs',{
              path1:results,
            path:result
          });
        });
    });
});

app.get('/mini_me_011',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1002 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1002';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following1.ejs',{
              path1:results,
            path:result
          });
      });
    })
});

app.get('/mini_me_0112',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1002 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1002';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following2.ejs',{
              path1:results,
            path:result
          });
        });
    });
});

app.get('/mini_me_0113',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1002 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1, (err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from user_details where U_Id = 1002';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                  res.render('Following3.ejs',{
                path1:results,
              path:result
            });
          });
      })
});

app.get('/mini_me_0114',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1002 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1002';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following4.ejs',{
              path1:results,
            path:result
          });
      });
    })
});

app.get('/likithshankar',(req,res)=>{ 
    var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1003 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from user_details where U_Id = 1003';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                  res.render('Following1.ejs',{
                path1:results,
              path:result
            });
        });
    });
});

app.get('/likithshankar2',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1003 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1003';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following2.ejs',{
              path1:results,
            path:result
          });
      });
  });
});

app.get('/likithshankar3',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1003 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1003';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following3.ejs',{
              path1:results,
            path:result
          });
        });
    })
});

app.get('/likithshankar4',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1003 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1003';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following4.ejs',{
              path1:results,
            path:result
          });
      });
    })
});

app.get('/ranjith_gowda',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1004 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1004';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following1.ejs',{
              path1:results,
            path:result
          });
      });
    })
});

app.get('/ranjith_gowda2',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1004 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1004';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following2.ejs',{
              path1:results,
            path:result
          });
      });
    })
});

app.get('/ranjith_gowda3',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1004 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1004';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following3.ejs',{
              path1:results,
            path:result
            });
        });
    });
});

app.get('/ranjith_gowda4',(req,res)=>{ 
  var sql1 = `select User_Details.U_Name,User_details.P_Pic,photos.photo_id,photos.caption,photos.location,photos.photo_Name,photo_Cre_Date.date_Of_Cre,likes.likes,comment.comment,comment.C_Name from User_Details,photos,photo_Cre_date,likes,comment where user_details.U_Id = photos.U_Id and photos.photo_id = likes.photo_id and user_details.U_Id= 1004 and Photo_cre_date.photo_id=photos.photo_id and photos.photo_id=comment.photo_id order by photo_id desc`;
    con.query(sql1,(err,results,fields)=>{
      if (err) 
        throw err;
          var sqld = 'select * from user_details where U_Id = 1004';
            con.query(sqld,(err,result,fields)=>{
              if (err)
                throw err;
                res.render('Following4.ejs',{
              path1:results,
            path:result
          });
      });
    })
});

app.get('/message1',(req,res)=>{
  var sqlf = 'select friends.U_Id, Friends.Friends_Name, User_details.P_pic from friends,User_details where friends.U_ID=1001 and Friends.Friends_Name=User_details.U_Name';
    con.query(sqlf,(err,results,fields)=>{
      if (err)
        throw err;
        res.render('Message1.ejs',{
      path:results
    });
  });
});

app.get('/message2',(req,res)=>{
  var sqlf = 'select friends.U_Id, Friends.Friends_Name, User_details.P_pic from friends,User_details where friends.U_ID=1002 and Friends.Friends_Name=User_details.U_Name';
    con.query(sqlf,(err,results,fields)=>{
      if (err)
        throw err;
        res.render('Message2.ejs',{
      path:results
    });
  });
});

app.get('/message3',(req,res)=>{
  var sqlf = 'select friends.U_Id, Friends.Friends_Name, User_details.P_pic from friends,User_details where friends.U_ID=1003 and Friends.Friends_Name=User_details.U_Name';
    con.query(sqlf,(err,results,fields)=>{
      if (err)
        throw err;
        res.render('Message3.ejs',{
      path:results
    });
  });
});

app.get('/message4',(req,res)=>{
  var sqlf = 'select friends.U_Id, Friends.Friends_Name, User_details.P_pic from friends,User_details where friends.U_ID=1004 and Friends.Friends_Name=User_details.U_Name';
    con.query(sqlf,(err,results,fields)=>{
      if (err)
        throw err;
        res.render('Message4.ejs',{
      path:results
    });
  });
});

app.get('/scorpion_018chat2',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 1';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1001';
            con.query(sql2,(err,results,fields)=>{
              if (err)
                throw err;
                res.render('Chat2.ejs',{
              path:result,
            path1:results
          });
      });
  });
});
  
app.post('/scorpion_018message2',(req,res)=>{ 
  var sql1 = `insert into Messages values(1002,'mini_me_011','${req.body.message}',1)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 1';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1001';
                      con.query(sql,(err,result1,fields)=>{
                    if (err)
                  throw err;
                res.render('Chat2.ejs',{
              path:result,
            path1:result1
          });
        });
      });
    });
});

app.get('/scorpion_018chat3',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 2';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1001';
            con.query(sql2,(err,results,fields)=>{
              if (err)
                throw err;
              res.render('Chat3.ejs',{
            path:result,
          path1:results
        });
      });
    });
  });
  
app.post('/scorpion_018message3',(req,res)=>{ 
  var sql1 = `insert into Messages values(1003,'likithshankar','${req.body.message}',2)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 2';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1001';
                      con.query(sql,(err,result1,fields)=>{
                    if (err)
                  throw err;
                res.render('Chat3.ejs',{
              path:result,
            path1:result1
          });
        });
      });
    });
  });

app.get('/scorpion_018chat4',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 3';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1001';
            con.query(sql2,(err,results,fields)=>{
              if (err)
                throw err;
              res.render('Chat4.ejs',{
            path:result,
          path1:results
        });
      });
    });
  });
  
app.post('/scorpion_018message4',(req,res)=>{ 
  var sql1 = `insert into Messages values(1004,'ranjith_gowda','${req.body.message}',3)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 3';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1001';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat4.ejs',{
          path:result,
        path1:result1
      });
    });
   });
  });
});

app.get('/mini_me_011chat1',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 1';
  con.query(sql1,(err,result,fields)=>{
    if (err)
      throw err;
    var sql2 = 'select U_Name from User_Details where U_Id=1002';
    con.query(sql2,(err,results,fields)=>{
      if (err)
        throw err;
      res.render('Chat1.ejs',{
        path:result,
        path1:results
      })
    })
  })
})

app.post('/mini_me_011message1',(req,res)=>{ 
  var sql1 = `insert into Messages values(1001,'scorpion_018','${req.body.message}',1)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 1';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1002';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat1.ejs',{
          path:result,
         path1:result1
       });
     });
   });
  })
});

app.get('/mini_me_011chat3',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 4';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1002';
            con.query(sql2,(err,results,fields)=>{
              if (err)
                throw err;
              res.render('Chat3.ejs',{
            path:result,
          path1:results
        });
      });
   });
});

app.post('/mini_me_011message3',(req,res)=>{ 
  var sql1 = `insert into Messages values(1003,'likithshankar','${req.body.message}',4)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 4';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1002';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat3.ejs',{
          path:result,
        path1:result1
       });
      });
    });
  });
});

app.get('/mini_me_011chat4',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 5';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1002';
            con.query(sql2,(err,results,fields)=>{
              if (err)
                throw err;
              res.render('Chat4.ejs',{
            path:result,
          path1:results
        });
      });
   });
});

app.post('/mini_me_011message4',(req,res)=>{ 
  var sql1 = `insert into Messages values(1004,'ranjith_gowda','${req.body.message}',5)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 5';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1002';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat4.ejs',{
          path:result,
        path1:result1
        });
      });
    });
  })
});

app.get('/likithshankarchat1',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 2';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1003';
            con.query(sql2,(err,results,fields)=>{
              if (err)
                throw err;
              res.render('Chat1.ejs',{
            path:result,
          path1:results
       });
     });
  });
});

app.post('/likithshankarmessage1',(req,res)=>{ 
  var sql1 = `insert into Messages values(1001,'scorpion_018','${req.body.message}',2)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 2';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1003';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat1.ejs',{
          path:result,
        path1:result1
       });
      });
    });
  });
});

app.get('/likithshankarchat2',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 4';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1003';
            con.query(sql2,(err,results,fields)=>{
              if (err)
                throw err;
              res.render('Chat2.ejs',{
            path:result,
          path1:results
        });
     });
  });
})

app.post('/likithshankarmessage2',(req,res)=>{ 
  var sql1 = `insert into Messages values(1002,'mini_me_011','${req.body.message}',4)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 4';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1003';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat2.ejs',{
          path:result,
        path1:result1
        });
      });
    });
  });
});

app.get('/likithshankarchat4',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 6';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1003';
            con.query(sql2,(err,results,fields)=>{
              if (err)
            throw err;
          res.render('Chat4.ejs',{
        path:result,
      path1:results
      });
    });
  });
});

app.post('/likithshankarmessage4',(req,res)=>{ 
  var sql1 = `insert into Messages values(1004,'ranjith_gowda','${req.body.message}',6)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 6';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1003';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat4.ejs',{
          path:result,
        path1:result1
        });
      });
    });
  });
});

app.get('/ranjith_gowdachat1',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 3';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1004';
            con.query(sql2,(err,results,fields)=>{
              if (err)
            throw err;
          res.render('Chat1.ejs',{
        path:result,
      path1:results
      });
    });
  });
});

app.post('/ranjith_gowdamessage1',(req,res)=>{ 
  var sql1 = `insert into Messages values(1001,'scorpion_018','${req.body.message}',3)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 3';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1004';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat1.ejs',{
          path:result,
        path1:result1
        });
      });
    });
  })
});

app.get('/ranjith_gowdachat2',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 5';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var  sql2 = 'select U_Name from User_Details where U_Id=1004';
            con.query(sql2,(err,results,fields)=>{
              if (err)
            throw err;
          res.render('Chat2.ejs',{
        path:result,
      path1:results
      });
    });
  });
});

app.post('/ranjith_gowdamessage2',(req,res)=>{ 
  var sql1 = `insert into Messages values(1002,'mini_me_011','${req.body.message}',5)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 5';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1004';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat2.ejs',{
          path:result,
        path1:result1
        });
      });
    });
  });
});

app.get('/ranjith_gowdachat3',(req,res)=>{
  var sql1 = 'select * from Messages where M_Id = 6';
    con.query(sql1,(err,result,fields)=>{
      if (err)
        throw err;
          var sql2 = 'select U_Name from User_Details where U_Id=1004';
            con.query(sql2,(err,results,fields)=>{
              if (err)
            throw err;
          res.render('Chat3.ejs',{
        path:result,
      path1:results
      });
    });
  });
});

app.post('/ranjith_gowdamessage3',(req,res)=>{ 
  var sql1 = `insert into Messages values(1003,'likithshankar','${req.body.message}',6)`;
    console.log(req.body.message)
      con.query(sql1,(err,results,fields)=>{
        if (err) 
          throw err;
            var sqld = 'select * from Messages where M_Id = 6';
              con.query(sqld,(err,result,fields)=>{
                if (err)
                  throw err;
                    var sql = 'select U_Name from User_Details where U_Id=1004';
                  con.query(sql,(err,result1,fields)=>{
                if (err)
              throw err;
            res.render('Chat3.ejs',{
          path:result,
        path1:result1
        });
      });
    });
  });
});

app.listen(port,()=>{
    console.log("Listeining to port 8080");
});
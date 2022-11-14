const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const message = null;
  res.render('show', {mes:message});
});

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select id, 都道府県, 人口 from example;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})
app.get("/top", (req, res) => {
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:data});
        })
    })
})

app.get("/maker", (req, res) => {
    db.serialize( () => {
        db.all("select id, name from maker;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('maker', {data:row});
        })
    })
})

app.get("/board/:id", (req, res) => {
    db.serialize( () => {
        db.all("select id, name from board where maker_id ="+ req.params.id + ";", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('board', {data:row});
        })
    })
})
app.post("/insertmk", (req, res) => {
    let sql = 'insert into maker (name) values("' + req.body.name + '");'
    console.log(sql);
    db.serialize( () => {
      db.run( sql, (error, row) => {
        console.log(error);
        if(error) {
          res.render('show', {mes:"エラーです"});
        }
        res.render('show', {mes:"成功です"});
      });
    });
    console.log(req.body);
});

app.post("/insertb", (req, res) => {
    let sql = 'insert into board (name,maker_id) values("' + req.body.name + '",' + req.body.maker_id + ');'
    console.log(sql);
    db.serialize( () => {
      db.run( sql, (error, row) => {
        console.log(error);
        if(error) {
          res.render('show', {mes:"エラーです"});
        }
        res.render('show', {mes:"成功です"});
      });
    });
    console.log(req.body);
});

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

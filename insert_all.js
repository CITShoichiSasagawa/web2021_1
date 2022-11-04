const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into board ("name","maker_id") values ("KING", 4);`,
  `insert into board ("name","maker_id") values ("TOTO", 4);`,
  `insert into board ("name","maker_id") values ("TWISTER", 4);`,
  `insert into board ("name","maker_id") values ("TWFD", 4);`,
  `insert into board ("name","maker_id") values ("REVOLVER", 4);`,
 `insert into board ("name","maker_id") values ("RR", 4);`,
 `insert into board ("name","maker_id") values ("RRR", 4);`,
]

for( let sql of sqls ){
  db.serialize( ()=> {
    db.run( sql, (error, row) => {
		  if(error) {
			  console.log('Error: ', error );
			  return;
		  }
		  console.log( "データを追加しました" );
	  });
  });
}

  
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sqls = [
  `insert into board ("name","maker_id") values ("FC", 1);`,
  `insert into board ("name","maker_id") values ("XC", 1);`,
  `insert into board ("name","maker_id") values ("ORCA", 1);`,
  `insert into board ("name","maker_id") values ("SPROUT", 1);`,
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

  
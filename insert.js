const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = [
  `insert into board ("name","maker_id") values ("S", 2);`,
  `insert into board ("name","maker_id") values ("R-2", 2);`,
  `insert into board ("name","maker_id") values ("VL", 2);`,
  `insert into board ("name","maker_id") values ("RS", 2);`,
  `insert into board ("name","maker_id") values ("DR", 2);`,
  `insert into board ("name","maker_id") values ("GR", 2);`,
  `insert into board ("name","maker_id") values ("H", 2);`,
]

db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを追加しました" );
	});
});

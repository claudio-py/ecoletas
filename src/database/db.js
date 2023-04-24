// === IMPORTAR A DEPENDÊNCIA DO SQLITE3 ===
const sqlite3 = require('sqlite3').verbose()
// ===CRIAR O OBJETO QUE IRÁ FAZER AS OPERAÇÕES NO DATABASE===
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db
// === UTILIZAR O OBJETO DE BANCO DE DADOS ===
db.serialize(() => {
	// 	// comandos sql:
	// // ===CRIAR TABELA===
	// 	db.run(`
	//  CREATE TABLE IF NOT EXISTS places(
	//   id INTEGER PRIMARY KEY AUTOINCREMENT,
	//   image TEXT,
	//   name TEXT,
	//   address TEXT,
	//   address2 TEXT,
	//   state TEXT,
	//   city TEXT,
	//   items TEXT
	//  );
	//  `)
	// //  === === INSERIR DADOS NA TABELA === ===
	// 	const query = `
	// INSERT INTO places (
	//   image,
	//   name,
	//   address,
	//   address2,
	//   state,
	//   city,
	//   items
	// )VALUES(
	//   ?,?,?,?,?,?,?
	// );
	// `
	// 	const values = [
	// 		'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
	// 		'Papersidera',
	// 		'Guilherme gembala, Jardim America',
	// 		'N. 260',
	// 		'Santa Catarina',
	// 		'Rio do Sul',
	// 		'Papéis e papelão'
	// 	]
	// 	function afterInsertData(err) {
	// 		if (err) {
	// 			return console.log(err)
	// 		}
	// 		console.log('cadastrado com sucesso')
	// 		console.log(this)
	// 	}
	// 	db.run(query, values, afterInsertData)
	// 	// ===CONSULTAR A LOS DADOS DE LA TABELA===
	// db.all(`SELECT * FROM places`, function (err, rows) {
	// 	if (err) {
	// 		return console.log(err)
	// 	}
	// 	console.log('Aqui estão seus registros: ')
	// 	console.log(rows)
	// })
	// ===DELETAR UM DADO DA TABELA===
	// db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
	//   if(err){
	//     return console.log(err)
	//   }
	//   console.log("Registro deletado com sucesso")
	// })
})

const express = require('express')
const server = express()
// ===PEGAR BANCO DE DADOS===
const db = require('./database/db.js')
// ===configure. PASTA PUBLICA===
server.use(express.static('public'))
// ===HABILITAR O USE DO req.body  NA APLICAÇÃO===
server.use(express.urlencoded({extended: true}))


const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
	express: server,
	noCache: true
})

server.get('/', (req, res) => {
	return res.render('index.html')
})

server.get('/create-point', (req, res) => {
	// ===a req.query é a query string da aplicação===
	// console.log(req.query)

	return res.render('create-point.html' )
})
server.post('/savepoint', (req, res) => {
	// console.log(req.query)

		const query = `
	INSERT INTO places (
	  image,
	  name,
	  address,
	  address2,
	  state,
	  city,
	  items
	)VALUES(
	  ?,?,?,?,?,?,?
	);
	`
		const values = [
			req.body.image,
			req.body.name,
			req.body.address,
			req.body.address2,
			req.body.state,
			req.body.city,
			req.body.items
		]

		function afterInsertData(err) {
			if (err) {
				console.log(err)
				return res.send("erro no cadastro")
			}
			console.log('cadastrado com sucesso')
			console.log(this)
			return res.render('create-point.html',{saved: true} )
		}

		db.run(query, values, afterInsertData)
})

server.get('/search', (req, res) => {
const search = req.query.search
if(search == ""){
	// pesquisas vazias
	return res.render('search-results.html', { total: 0 })

}



	// ===CONSULTAR A LOS DADOS DE LA TABELA===
	db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
		if (err) {
			return console.log(err)
		}
		const total = rows.length
		// === MOSTRAR A PAGINA HTML COM O BANCO DE DADOS===
		return res.render('search-results.html', { places: rows, total })
		
	})
})
server.listen(3000)

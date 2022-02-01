const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })

    if (req.url === '/produto') {
        res.end(JSON.stringify({
            message: "Rota de produto"
        }))
    }

    if (req.url === '/usuario') {
        res.end(JSON.stringify({
            message: "Rota de usuario"
        }))
    }

    res.end(JSON.stringify({
        message: "Qualquer outra rota"
    }))

}).listen(3333, () => console.log('Rodando...'))


//Status 200 = sucesso
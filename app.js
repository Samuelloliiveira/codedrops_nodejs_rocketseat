const express = require('express') //Express.js é um framework
const { randomUUID } = require('crypto')//gera número randômico
const fs = require('fs')//File system


const app = express()

app.use(express.json())

let products = []

fs.readFile('products.json', 'utf-8', (err, data) => {
    if(err) {
        console.log(err)
    }else {
        products = JSON.parse(data)
    }
})

app.post('/products', (req, res) => {

    const { name, price } = req.body

    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product)

    productFile()

    return res.json(product)
})

app.get('/products', (req, res) => {
    return res.json(products)
})


app.get('/products/:id', (req, res) => {
    const { id } = req.params
    const product = products.find((product) => product.id === id)
    return res.json(product)
})


app.put('/products/:id', (req, res) => {
    const { id } = req.params
    const {name, price } = req.body

    const productIndex = products.findIndex((product) => product.id === id)
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    }

    productFile()

    return res.json({ message: 'Produto alterado com sucesso' })
})

app.delete('/products/:id', (req, res) => {
    const { id } = req.params
    const productIndex = products.findIndex((product) => product.id === id)

    products.splice(productIndex, 1)

    productFile()

    return res.json({ message: 'Produto excluido com sucesso' })
})

function productFile() {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Produto inserido')
        }
    })
}

app.listen(3000, () => console.log('Rodando...'))

/**
 * Body ->  Sempre que eu quiser enviar dados para minha aplicação.
 * recebe dados do corpo da requisição (form por exemplo)
 * 
 * Params -> Parametros de rota, todo conteúdo que vem pela rota URL
 * Query -> Paramentros que fazem parte da rota, mas não são obrigatorios
 */
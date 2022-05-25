const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const ejs = require("ejs")
const path = require("path")

const PORT = process.env.PORT || 8080
const products=[]
const mensajes=[]

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.render("index")
})

const server = httpServer.listen(PORT, () => {
    console.log(`Server on port: ${server.address().port}`)
})

server.on("error", (err) => {
    console.error(err)
})

io.on("connection", socket => {
    console.log("NuevoCliente concectado", socket.id)
    socket.emit("bienvenida", mensajes)
    socket.emit("bdProductos", products)

    socket.on("newProduct", data=>{
        products.push(data)
        io.sockets.emit("bdProductos", products)
    })
    
    socket.on("mensajeCliente", data => {
        mensajes.push({...data, id:socket.id})
        io.sockets.emit("mensajeProvedor", data)
    })
}) 
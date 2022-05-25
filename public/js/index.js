const socket=io()

const usuario=document.getElementById("nombreUsuario")
const btnMessage= document.getElementById("btnMessage")
const message=document.getElementById("message")
const chatContainer=document.getElementById("chatContainer")

const registroTabla=document.getElementById("registroTabla")
const formProductos=document.getElementById("datosProductos")


socket.on("bienvenida", data=>{
    console.log(data)
})

btnMessage.addEventListener("click", (e)=>{
    console.log(message.value)
    socket.emit("mensajeCliente",{usuario:usuario.value, mensaje:message.value, date:(new Date).toLocaleString()} )
})

formProductos.addEventListener("submit", (e)=>{
    e.preventDefault()
    let name= document.getElementById("nombreProducto").value
    let price=document.getElementById("precioProducto").value
    let img=document.getElementById("imgProducto").value
    socket.emit("newProduct", {name, price, img})
})

socket.on("mensajeProvedor", data=>{
    chatContainer.innerHTML+=`
        <div>
            <strong class="text-primary">${data.usuario}</strong><span class="text-danger">[${data.date}]</span>:
                <em class="text-success" >${data.mensaje}</em>
        </div>                
    `
})

socket.on("bdProductos", data=>{
    registroTabla.innerHTML=""
    data.map(product=>{
        registroTabla.innerHTML+=`
        <tr>
            <td class="my-auto">${product.name}</td>
            <td class="my-auto">${product.price}</td>
            <td><img src="${product.img}" width="60px" height="40px"></td>
        </tr>
        `
    })    
})
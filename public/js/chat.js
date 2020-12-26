//Usamos el objeto io, que nos viene dado del socket.io.js que lo general automaticamente el Socket.IO
const socket = io(); // Hará que salte el listen de 'connection' en la parte Back
//Elementos del DOM 
const mensaje = document.getElementById('mensaje');
const usuario = document.getElementById('usuario');
const enviar = document.getElementById('enviar');
const mensajes = document.getElementById('mensajes');
const estado = document.getElementById('estado');

enviar.addEventListener('click', function (evt) {
    //emitimos el evento para que lo capture el servidor, luego el servidor emitirá otro evento de nuevomensaje
    // que lo escucharán todos los clientes, para actualizar el chat de cada uno.
    socket.emit(
        'chat:mensaje',
        { usuario: usuario.value, mensaje: mensaje.value },
        function(infoPasadaPorServidor){
            console.log('Respuesta Servidor: ',infoPasadaPorServidor);
        }
    );
});

//Escuchamos conexion, desconexión y otros eventos del socket del servidor
socket.on('connect', function(){
    console.log('[cliente conectado]');
});
socket.on('disconnect', function(){
    console.log('[cliente perdió conexión con servidor]');
});
socket.on('chat:informacionDesdeServidor', function(informacion){
    console.log(informacion);
});

// Escuchamos el evento emitido por el servidor, que lo emite cuando se le envia un mensaje nuevo
// desde algún cliente.
socket.on('chat:nuevomensaje', function(mensaje){
    console.log(mensaje);
    mensajes.innerHTML += `<li class="left clearfix">
        <div class="chat-body clearfix">
            <div class="header">
                <strong class="primary-font">${mensaje.usuario}</strong>
            </div>
            <p>${mensaje.mensaje}</p>
        </div>
    </li>`; 
});



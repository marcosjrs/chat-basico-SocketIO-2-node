//Usamos el objeto io, que nos viene dado del socket.io.js que lo general automaticamente el Socket.IO
const socket = io(); // Hará que salte el listen de 'connection' en la parte Back
//Elementos del DOM 
const mensaje = document.getElementById('mensaje');
const usuario = document.getElementById('usuario');
const enviar = document.getElementById('enviar');
const mensajes = document.getElementById('mensajes');
const estado = document.getElementById('estado');

enviar.addEventListener('click', function(evt){
    console.log(usuario.value, mensaje.value);
});



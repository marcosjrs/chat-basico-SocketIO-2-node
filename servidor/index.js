//Para manejar rutas
const path = require("path");

//Servidor Express
const express = require("express");
const app = express();
// Si la maquina tiene configurado PORT, cojerá ese, sino el 3000
app.set('port', process.env.PORT || 3000);
// con path.join nos abstraemos del sistema operativo, por aquello de las "/" o "\" en rutas
// los .. es porque estamos en servidor y tenemos que subir un nivel para llegar a public
app.use(express.static(path.join(__dirname, '..', 'public')));
// Lanzamos el servidor en el puerto configurado antes
const servidor = app.listen(app.get('port'), () => {
    console.log('Servidor Express en puerto', app.get('port'));
})

//Socket.io conexion al servidor express y listenings
const socketIo = require('socket.io');
io = socketIo(servidor);
io.on('connection', (conexionDeUnCliente) => {

    console.log('Nueva conexión', conexionDeUnCliente.id);
    //Enviando eventos al cliente
    conexionDeUnCliente.emit('chat:informacionDesdeServidor', {
        version: '0.0.1',
        texto: 'Bienvenido a esta aplicación'
    });

    conexionDeUnCliente.on('chat:mensaje', (mensaje, callbackDeCliente) => {
        //Enviamos el mensaje a todos los que están conectados a este servidor de socket
        io.sockets.emit('chat:nuevomensaje', mensaje);
        //LLamamos a la función que nos indica el cliente (se ejecutará en el cliente)
        let ok = false;
        if (mensaje.usuario && mensaje.mensaje) {
            ok = true;
        }
        callbackDeCliente({ ok });
    });

    conexionDeUnCliente.on('disconnect', (mensaje) => {
        console.log('[Cliente perdió o cerró la conexión con este servidor]');
    });
});









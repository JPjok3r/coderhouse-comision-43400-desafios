const socketClient = io();

const nombreh3 = document.getElementById('nombre');
const formulario = document.getElementById('formulario');
const inputMensaje = document.getElementById('mensaje');
const divChat = document.getElementById('chat');

let usuario

Swal.fire({
  title: 'HI!! Welcome',
  text: 'Ingresa tu nombre',
  input: 'text',
  inputValidator: (value) => {
    if (!value) {
      return 'Necesitas ingresar tu nombre'
    }
  },
}).then((nombre) => {
  usuario = nombre.value;
  nombreh3.innerText = `Hola ${usuario}`;
  socketClient.emit('usuarioNuevo',usuario);
});

formulario.onsubmit = (e) => {
  e.preventDefault();
  const infoMensaje = {
    user: usuario,
    message: inputMensaje.value,
  }
  socketClient.emit('mensaje', infoMensaje);
  inputMensaje.value = "";
}

socketClient.on('chat', (mensajes) => {
  const chat = mensajes
    .map((objMensaje) => {
      return `<p>${objMensaje.user}: ${objMensaje.message}</p>`
    })
    .join(' ')
  divChat.innerHTML = chat
})

socketClient.on('broadcast',usuario => {
    Toastify({
        text: `${usuario} se ha conectado`,
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
    }).showToast()
})
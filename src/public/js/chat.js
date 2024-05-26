const socket = io()
const contactForm = document.getElementById('message-form');
const userInput = document.getElementById('userInput')
const messageWindow = document.getElementById("messagesView")

//scroll always bottom init
messageWindow.scrollIntoView(false)

//SocketIO
socket.on("message sent", (message) => {
  const messageAdd = `<div class="flex mb-2">
    <div class="rounded py-2 px-3" style="background-color: #F2F2F2">
        <p class="text-sm text-purple-600">
            ${message.user}
        </p>
        <p class="text-sm mt-1">
            ${message.message}
        </p>
      </div>
    </div>`

    const messageAddUser = `<div class="flex justify-end mb-2">
      <div class="rounded py-2 px-3" style="background-color: #E2F7CB">
        <p class="text-sm mt-1">
          ${message.message}
        </p>
      </div>
    </div>`
  
    if(message.user === userInput.value){
      messageWindow.insertAdjacentHTML('beforeend', messageAddUser)
      messageWindow.scrollIntoView(false)
    } else{ 
      messageWindow.insertAdjacentHTML('beforeend', messageAdd)
      messageWindow.scrollIntoView(false)
    }
    
})

socket.on("user-enter", (user) => {
  const userEnterAdd = `<div class="flex justify-center mb-2">
      <div class="rounded py-2 px-4" style="background-color: #DDECF2">
          <p class="text-sm uppercase">
              ${user} entro al chat
          </p>
      </div>
  </div>`
  console.log(user)

  messageWindow.insertAdjacentHTML('beforeend', userEnterAdd)
  messageWindow.scrollIntoView(false)
})


//SweetAlert
Swal.fire({
    title: "Identificate para ingresar",
    input: "text",
    text: "¡Ingresa tu nombre para identificarte en el chat!",
    inputValidator: (value) => {
      return !value && "¡Necesitas escribir un nombre de usuario para continuar!";
    },
    allowOutsideClick: false
  }).then((result) => {
    userInput.value = result.value
    socket.emit("user-enter", result.value)
  })


//FORM
const apiPost = 'http://localhost:8080/api/messages';

contactForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const userInput = document.getElementById('userInput')
  const messageInput = document.getElementById('messageInput')
  console.log(messageInput.value)
  console.log(userInput.value)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageInput.value,
          user: userInput.value
        })
      }

      await fetch(apiPost, requestOptions)
      .then((res) => {
        messageInput.value = ""
      })
      .catch(error => {
        throw new Error(error)
      })
})
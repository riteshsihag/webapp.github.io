const socket = io('http://localhost:8000');

const form = document.getElementById('type-container');
const messageinput = document.getElementById('msginput');
const messageContainer = document.querySelector('.container');
var audio = new Audio('tune.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'receive'){
        audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`You : ${message}`,'send');
    socket.emit('send', message)
    messageinput.value = '';
})
const names = prompt('Enter your name to join the chat');
socket.emit('new-user-joined', names);

socket.on('user-joined', names =>{
    append(`${names} joined the chat`, 'receive')
})
socket.on('rec', data =>{
    append(`${data.names} : ${data.message}`, 'receive')
})
socket.on('left', names =>{
    append(`${names} left the chat`, 'receive')
})

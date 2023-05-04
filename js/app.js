// Variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Events Listeners 
eventListeners()
function eventListeners() {
    // When the user adds new tweet
    formulario.addEventListener('submit', agregarTweet);

    // When when the document is ready
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}

// Functions 
function agregarTweet(e) {
    e.preventDefault();
    
    // Textarea where the user writes
    const tweet =  document.querySelector('#tweet').value;

    // Validation 
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return; // Prevents more lines of code from being executed 
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }
    // Add to the tweets array
    tweets = [...tweets, tweetObj];
    
    // Once added we will create the HTML 
    crearHTML();

    // Reset the form 
    formulario.reset();
}

function mostrarError (error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insert it in  the content
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError); 

    // After 3 minutos remove the alert
    setTimeout(() => {
        mensajeError.remove();    
    }, 3000);
}

// Show a list of the tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            // Add remove button
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Add remove function 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Create HTML
            const li = document.createElement('li');

            // Add text 
            li.innerText = tweet.tweet;

            // Add button
            li.appendChild(btnEliminar);

            // Insert in the HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Add currents tweets to Local Storage 
function sincronizarStorage () {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Remove Tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// Clear HTML
function limpiarHTML (){
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
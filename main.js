"use strict"

let runner = new Runner();                                                   // Creo una instancia de la clase 'Runner'
let tiempoInicial = 0.5 * 60;                                                // Establezco el tiempo inicial de juego en 30 segundos
let contadorInterval;                                                        // Almaceno el identificador del intervalo
let puntajeElement = document.getElementById('puntaje');                     // Refiere al elemento del documento HTML con el id 'puntaje'.
let obstaculos = document.getElementsByClassName("obstaculo");               // Obtiene los obstaculos de las clases Tronco, Piedra y Energia  


// Cuando se presiona la tecla de espacio ('Space'), se llama al metodo saltar() en el objeto runner.
document.addEventListener('keydown', (event) => {
  if (event.code == 'Space') {
    runner.saltar();
  }
});


// Cuando se hace clic en este boton, se redirige al usuario a la pagina 'instrucciones.html'.
document.getElementById("botonInstrucciones").addEventListener("click", function() {
  window.location.href = "instrucciones.html";
});


// Cuando se carga la ventana, se muestra la pantalla de presentacion y se oculta el juego.
window.addEventListener("load", function() {
  let pantallaPresentacion = document.getElementById("pantalla-presentacion");
  let juego = document.getElementById("juego");
  pantallaPresentacion.style.display = "block";
  juego.style.display = "none";
});


// Cuando se hace clic en el botonJugar, se oculta la pantalla de presentacion y se muestra el juego.
document.addEventListener("DOMContentLoaded", function() {
  let botonJugar = document.getElementById("botonJugar");
  botonJugar.addEventListener("click", function() {
    let pantallaPresentacion = document.getElementById("pantalla-presentacion");
    let juego = document.getElementById("juego");
    pantallaPresentacion.style.display = "none";
    juego.style.display = "block";
  });
});


// Cuando se hace clic en este botonSalir, se redirige al usuario a la pagina 'gracias.html'.
document.addEventListener('DOMContentLoaded', function() {
  let botonSalir = document.getElementById('botonSalir');
  botonSalir.addEventListener('click', function() {
    window.location.href = 'gracias.html';
  });
});



// Establezco un intervalo que se ejecuta cada 2 segundos.
setInterval(() => {
  
  tiempoInicial--;  // Resto 1 segundo al tiempo inicial
  
  // Si el tiempo llega a cero o menos, se llama a la funcion finalizarJuego().
  if (tiempoInicial < 0) {
    tiempoInicial = 0; // Establecer el tiempo en 0
    finalizarJuego();
    return;
  }
  
  // Luego se actualiza el tiempo en el HTML y se llaman a las funciones gameLoop() y generarObstaculo().
  const tiempoElement = document.getElementById('tiempo');
  const minutos = Math.floor(tiempoInicial / 60);
  const segundos = tiempoInicial % 60;
  tiempoElement.textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  runner.gameLoop(); 
  generarObstaculo(); 

}, 2000);


// Genero un numero aleatorio y, dependiendo de su valor, creo una instancia de la clase Tronco o Piedra. 
function generarObstaculo() {
  let numeroAleatorio = Math.random();
  let obstaculo;       
  if (numeroAleatorio < 0.5) {
    obstaculo = new Tronco();
  } else {
    obstaculo = new Piedra();
  }
}


setInterval(generarEnergia, 5000);


// Genero un numero aleatorio y, dependiendo de su valor, creo una instancia de la clase Energia. 
function generarEnergia() {
  let randomNumber = Math.random();
  let obstaculo;   
  if (randomNumber < 0.5) {
    obstaculo = new Energia();
  }
}


function gameLoop() {}


// Recibo el id de un elemento de audio y reproduzco o pausa el sonido segun su estado actual.
function musicaDeFondo(musica) {
  let music = document.getElementById(musica);
  if (music.paused) {
    music.play(); // Reproducir el sonido
  } else {
    music.pause(); // Pausar el sonido
  }
}


// Detengo el intervalo de tiempo, muestro el cartel de finalizacion del juego, establezco la variable juegoFinalizado en true, 
// muestro el puntaje final en el cartel y agrego una clase al cartel para indicar que el puntaje final se ha agregado.
function finalizarJuego() {
  clearInterval(contadorInterval);
  const cartelElement = document.getElementById('cartel');
  cartelElement.classList.remove('oculto');
  const reiniciarBtn = document.getElementById('reiniciarBtn');
  reiniciarBtn.addEventListener('click', reiniciarJuego);
  runner.juegoFinalizado = true;
  cartel.classList.remove('oculto');
  if (!cartel.classList.contains('puntaje-agregado')) {
    const puntajeFinal = document.getElementById('puntaje').textContent;
    cartel.querySelector('p:nth-child(3)').textContent += ' ' + puntajeFinal + ' puntos.';
    cartel.classList.add('puntaje-agregado');
  }
}


// Recargo la pagina para reiniciar el juego desde el principio.
function reiniciarJuego() {
  location.reload();
}


// Recorro los obstaculos y elimino aquellos que se encuentran fuera de la pantalla a la izquierda.
function eliminarObstaculos() {
  for (let i = 0; i < obstaculos.length - 1; i++) {
    let elemento = obstaculos[i];
    let rect = elemento.getBoundingClientRect();
    let elementoLeft = rect.left;
    if (elementoLeft < 0) {
      elemento.parentNode.removeChild(elemento);
    }
  }
}

setInterval(eliminarObstaculos, 1);



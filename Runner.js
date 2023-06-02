// La clase "Runner" que extiende de "Personaje" tiene varios metodos y propiedades 
// relacionados con el control y la interaccion del personaje en un juego.

class Runner extends Personaje {
    constructor() {
        super();
        this.personaje = document.getElementById("personaje");
        this.puntaje = 0; // Inicializo el puntaje
        this.puntajeElement = document.getElementById("puntaje"); 
        this.juegoFinalizado = false; // Variable para controlar si el juego ha finalizado
    }


    // Obtengo la posicion y las dimensiones del elemento del personaje en la pagina.
    status() {
        this.personaje.getBoundingClientRect();
    }


    // Agrego una clase CSS al personaje para animarlo como correr.
    run() {
        this.clean();
        this.personaje.classList.add("run");
    }

    
    // Agrega una clase CSS al personaje para animarlo como saltar. 
    // Tambien comprueba si el personaje ha saltado exitosamente sobre obstaculos y suma puntos en caso afirmativo.
    saltar() {
      this.clean();
      this.personaje.classList.add("saltar");
      this.personaje.style.background = 'url("images/jump4.png")';
      this.personaje.style.backgroundRepeat = 'no-repeat';
      this.personaje.style.backgroundSize = '70% auto';
      this.personaje.style.backgroundPosition = 'center top';
    
      let puntajeSumado = false; // Bandera para controlar si ya se ha sumado el puntaje
    
      const handleAnimationEnd = () => {
        if (!puntajeSumado) {
          const obstaculos = document.querySelectorAll('.tronco, .piedra');
          let saltoExitoso = false;
    
          obstaculos.forEach((obstaculo) => {
            const obstaculoRect = obstaculo.getBoundingClientRect();
            const runnerRect = this.personaje.getBoundingClientRect();
    
            if (
              runnerRect.left < obstaculoRect.right &&
              runnerRect.right > obstaculoRect.left &&
              runnerRect.top < obstaculoRect.bottom &&
              runnerRect.bottom > obstaculoRect.top
            ) {
              saltoExitoso = true;
            }
          });
    
          if (saltoExitoso) {
            this.puntaje += 10; // Suma 10 puntos al saltar un obstaculo exitosamente
            this.updatePuntaje();
            puntajeSumado = true; // Actualiza la bandera
          }
        }
    
        this.personaje.removeEventListener("animationend", handleAnimationEnd);
        this.caer();
      };
    
      this.personaje.addEventListener("animationend", handleAnimationEnd);
    }
    
    
          
    // Agrega una clase CSS al personaje para animarlo como caer. 
    // Luego, espera a que termine la animacion y llama al metodo "run" para continuar la animacion de correr.
    caer() {
        this.clean();
        this.personaje.classList.add("caer");
        this.personaje.style.background = 'url("images/runner.png") repeat-x';
        this.personaje.style.backgroundSize = 'auto';
        this.personaje.style.backgroundPosition = '0';
        this.personaje.addEventListener("animationend", () => {
            this.run();
        });
    }

    // Elimina todas las clases CSS y los eventos relacionados con las animaciones del personaje.
    clean() {
        this.personaje.classList.remove("run");
        this.personaje.classList.remove("saltar");
        this.personaje.classList.remove("caer");
        this.personaje.removeEventListener("animationend", () => {});
    }

   

    // Verifica las colisiones del personaje con los obstaculos del juego y realiza acciones en consecuencia.
    // Muestra una imagen de choque, reproduze sonidos, resta puntos y actualiza el puntaje. 
    // Tambien actualiza la posicion del elemento de choque en la pantalla.
    gameLoop(gameLoopInterval) {
      const runnerRect = this.personaje.getBoundingClientRect();
      const obstaculos = document.querySelectorAll('.tronco, .piedra, .energia');

      obstaculos.forEach((obstaculo) => {
          const obstaculoRect = obstaculo.getBoundingClientRect();

          if (
              runnerRect.left < obstaculoRect.right &&
              runnerRect.right > obstaculoRect.left &&
              runnerRect.top < obstaculoRect.bottom &&
              runnerRect.bottom > obstaculoRect.top
          ) {
      
    
          // Mostrar la imagen de choque
          const imagenChoque = document.getElementById('imagenChoque');
          imagenChoque.style.left = (runnerRect.left + runnerRect.width / 2 - imagenChoque.width / 2) + 'px';
          imagenChoque.style.top = (runnerRect.top + runnerRect.height / 2 - imagenChoque.height / 2) + 'px';

          if (obstaculo.classList.contains('tronco') || obstaculo.classList.contains('piedra')) {
        
            // Reproducir el sonido de choque
            const sonidoChoque = document.getElementById('sonidoChoque');
            sonidoChoque.play();

            // Cambiar la imagen del runner a "runner_golpeado.png"
            this.personaje.style.background = 'url("images/runner_golpeado.png")';
            this.personaje.style.backgroundRepeat = 'no-repeat';
            this.personaje.style.backgroundSize = '70% auto';
            this.personaje.style.backgroundPosition = '0';

            // Ocultar la imagen del tronco o la piedra al chocar
            obstaculo.style.display = 'none';
        
            if (this.puntaje >= 10) {
              this.puntaje -= 10; // Restar 10 puntos al chocar un obstaculo
            }
            this.updatePuntaje(); 

          } else if (obstaculo.classList.contains('energia')) {

            tiempoInicial += 5; 
        
            // Reproducir el sonido de energia
            const sonidoEnergia = document.getElementById('sonidoEnergia');
            sonidoEnergia.play();
            // const sonidoAlegria = document.getElementById('sonidoAlegria');
            //  sonidoAlegria.play();

            // Cambiar la imagen del runner a "runner_energico.png"
            this.personaje.style.background = 'url("images/runner_energico.png")';
            this.personaje.style.backgroundRepeat = 'no-repeat';
            this.personaje.style.backgroundSize = '70% auto';
            this.personaje.style.backgroundPosition = '0';

            // Ocultar la imagen de la energia al chocar
            obstaculo.style.display = 'none';

            // Esperar 1 segundo antes de reanudar el juego
            setTimeout(() => {
              // Cambiar la imagen del runner a "runner.png" y reanudar el juego
              this.personaje.style.background = 'url("images/runner.png") repeat-x';
              this.personaje.style.backgroundSize = 'auto';
              this.personaje.style.backgroundPosition = '0';
              gameLoopInterval = setInterval(gameLoop.bind(this), 50);
            }, 1000);
          }

          this.updatePuntaje();

    }
  });
}


 // Restablece el puntaje a cero y llama al metodo "updatePuntaje" para reflejar el cambio en el DOM.
 reiniciarPuntaje() {
   this.puntaje = 0;
   this.updatePuntaje();
 }


 // El método "updatePuntaje" actualiza el elemento en el DOM que muestra el puntaje del juego. 
 // Si el juego no ha finalizado, se verifica que el puntaje no sea menor que cero y se muestra en el elemento correspondiente.
 updatePuntaje() {
   if (!this.juegoFinalizado) {
     if (this.puntaje < 0) {
       this.puntaje = 0; // Establecer el puntaje en 0 si es menor que 0
     }
     this.puntajeElement.textContent = this.puntaje;
   } 
 }


}










   

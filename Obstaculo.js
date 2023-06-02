//  Las clases Tronco, Piedra y Energia amplian una clase base llamada Personaje. 
//  Cada una de estas clases representa un tipo diferente de obstaculo en el juego.


//  La clase Tronco representa uno de los obstaculos que debera sortear el Personaje.
class Tronco extends Personaje {
    constructor() {
        super();
        this.obstaculo = document.createElement("div");
        // Agrega la clase "obstaculo"   
        this.obstaculo.classList.add("obstaculo"); 
        this.obstaculo.classList.add("tronco"); 
        // El obstaculo elemento se agrega a un elemento HTML existente con el id "contenedor".  
        document.getElementById("contenedor").appendChild(this.obstaculo);  
    }

    status() {
        super.status();
    }
}

// La clase Piedra representa uno de los obstaculos que debera sortear el Personaje.
class Piedra extends Personaje {
    constructor() {
        super();
        this.obstaculo = document.createElement("div");
        // Agrega la clase "obstaculo"  
        this.obstaculo.classList.add("obstaculo");  
        this.obstaculo.classList.add("piedra"); 
        // El obstaculo elemento se agrega a un elemento HTML existente con el id "contenedor".  
        document.getElementById("contenedor").appendChild(this.obstaculo);
    }

    status() {
        super.status();
    }
}

//  La clase Energia representa uno de los obstaculos que debera agarrar el Personaje para extender el tiempo de juego.
class Energia extends Personaje {
    constructor() {
        super();
        this.obstaculo = document.createElement("div");
        // Agrega la clase "obstaculo"  
        this.obstaculo.classList.add("obstaculo"); 
        this.obstaculo.classList.add("energia");
         // El obstaculo elemento se agrega a un elemento HTML existente con el id "contenedor". 
        document.getElementById("contenedor").appendChild(this.obstaculo);
    }
    
    status() {
        super.status();
    }
}









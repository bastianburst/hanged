
/* Variables */
let ctx;
let canvas;
let palabra;
let letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
let colorTecla = "rgba(0,0,0,0.54)";
let colorMargen = "white";
let inicioX = 210;
let inicioY = 300;
let lon = 40;
let margen = 20;
let pistaText = "";

/* Arreglos */
const teclas_array = new Array();
const letras_array = new Array();
const palabras_array = new Array();
const frases_array = new Array();

/* Variables de control */
let aciertos = 0;
let errores = 0;

/* Palabras */
palabras_array.push("LAMPARAAMISPIES");
palabras_array.push("LINAJEESCOGIDO");
palabras_array.push("PRINCIPEDEPAZ");
palabras_array.push("SALVOSPORGRACIA");
palabras_array.push("CUEVADEADULAM");
palabras_array.push("DOMARLALENGUA");
palabras_array.push("UNMUNDODEMALDAD");
palabras_array.push("NOSEINQUIETEN");
palabras_array.push("PEREZCOQUEPEREZCA");




/*Frases estas se mostrarán en el final del juego ya que viene con espacios*/
frases_array.push("LAMPARA A MIS PIES");
frases_array.push("LINAJE ESCOGIDO");
frases_array.push("PRINCIPE DE PAZ");
frases_array.push("SALVOS POR GRACIA");
frases_array.push("CUEVA DE ADULAM");
frases_array.push("DOMAR LA LENGUA");
frases_array.push("UN MUNDO DE MALDAD");
frases_array.push("NO SE INQUIETEN");
frases_array.push("PEREZCO QUE PEREZCA");




//llenar select de forma dinámica
let showOptionsinFront = document.getElementById("selectorgame");
for (i = 0; i <= palabras_array.length - 1; i++) {
    option = document.createElement("option");
    option.value = i;
    option.text = i + 1;
    showOptionsinFront.appendChild(option);
}
//console.log(showOptionsinFront);

//Sacar la opción elegida del local storage
let selectedgameOption = localStorage.getItem("codigojuego");
//console.log(selectedgameOption);

//Función para cambiar la opción del juego con el selector
function changeQuestion(value) {
    let code = document.getElementById("selectorgame").value;
    console.log(code);
    localStorage.setItem('codigojuego', code);
}

/*Mostrar opción seleccionada en pantalla*/
let showOptionSelected = function () {
    //console.log('activado');
    //lógica para mostrar en el front, si es null pone aleatorio, si es aleatorio pone lo que está en local storage
    //si no pone el número correspondiente
    let elementNumber = document.getElementById("shownumberselected");
    //console.log(selectedgameOption);
    if (selectedgameOption == "aleatorio") {
        elementNumber.innerHTML = (selectedgameOption);
    } else if (selectedgameOption == null) {
        elementNumber.innerHTML = "aleatorio";
    } else {
        elementNumber.innerHTML = (parseInt(selectedgameOption) + 1);
    }
    //console.log(elementNumber);
}
/* Objetos */
function Tecla(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaTecla;
}

function Letra(x, y, ancho, alto, letra) {

    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaCajaLetra;
    this.dibujaLetra = dibujaLetraLetra;
}

/* Funciones */

/* Dibujar Teclas*/
function dibujaTecla() {
    ctx.fillStyle = colorTecla;
    ctx.strokeStyle = colorMargen;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

    ctx.fillStyle = "white";
    ctx.font = "bold 28px Nunito";
    ctx.fillText(this.letra, this.x + this.ancho / 2.6 - 8, this.y + this.alto / 2.6 + 8);
}

/* Dibua la letra y su caja */
function dibujaLetraLetra() {
    //console.log('me activé');
    let w = this.ancho;
    let h = this.alto;
    ctx.fillStyle = "black";
    ctx.font = "bold 40px Nunito";
    ctx.fillText(this.letra, this.x + w / 2 - 12, this.y + h / 2 + 14);
}
function dibujaCajaLetra() {

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
}


/// Funcion para dar una pista la usuario ////
function pistaFunction(frase) {
    let pista = ""; // Se crea la variable local pista que contendra nuestra frase de pista
    switch (frase) {  // Se crea un switch para poder controlar las pistas segun la palabra 
        case 'LAMPARA A MIS PIES':   // Se debera hacer un case por cada palabra 
            pista = "Su palabra";
            break;     // Es importante el break en cada case 
        case 'LINAJE ESCOGIDO':
            pista = "Es una de las cosas que somos para Dios";
            break;
        case 'PRINCIPE DE PAZ':
            pista = "Es una de las cosas que Jesús es";
            break;
        case 'SALVOS POR GRACIA':
            pista = "Es una de las cosas que somos en Dios";
            break;
        case 'CUEVA DE ADULAM':
            pista = "Donde un personaje biblico se escondió";
            break;
        case 'DOMAR LA LENGUA':
            pista = "Lo que debemos hacer para tener una buena vida";
            break;
        case 'UN MUNDO DE MALDAD':
            pista = "Una de las cosas que santiago 3 dice que la lengua es";
            break;
        case 'NO SE INQUIETEN':
            pista = "Si oramos, Dios nos dice";
            break;
        case 'PEREZCO QUE PEREZCA':
            pista = "Lo dijo una mujer que fue reina, 'y si ...'";
            break;       
        default:  // El defaul se puede omitir // 
            pista = "No hay pistas";
    }
    // Pintamos la palabra en el canvas , en este ejemplo se pinta arriba a la izquierda //
    ctx.fillStyle = "white";  // Aqui ponemos el color de la letra
    ctx.font = "bold 45px Nunito";  // aqui ponemos el tipo y tamaño de la letra
    ctx.fillText("Pista: " + pista, 18, 500);  // aqui ponemos la frase en nuestro caso la variable pista , seguido de la posx y posy
}


/* Distribuir nuestro teclado con sus letras respectivas al acomodo de nuestro array */
function teclado() {
    var ren = 0;
    var col = 0;
    var letra = "";
    var miLetra;
    var x = inicioX;
    var y = inicioY;
    for (var i = 0; i < letras.length; i++) {
        letra = letras.substr(i, 1);
        miLetra = new Tecla(x, y, lon, lon, letra);
        miLetra.dibuja();
        teclas_array.push(miLetra);
        x += lon + margen;
        col++;
        if (col == 10) {
            col = 0;
            ren++;
            if (ren == 2) {
                x = 280;
            } else {
                x = inicioX;
            }
        }
        y = inicioY + ren * 50;
    }
}


/* aqui obtenemos nuestra palabra aleatoriamente y la dividimos en letras */
function pintaPalabra() {
    //console.log(selectedgameOption);
    if (selectedgameOption == null || selectedgameOption == "aleatorio") {
        //console.log("null");
        let p = Math.floor(Math.random() * palabras_array.length);
        //Asignamos del array de palabras
        palabra = palabras_array[p];
        //Asignamos del array de frases
        frase = frases_array[p];
        //console.log(palabra);
        //console.log(p);
        //console.log(frase);
        pistaFunction(frase);

        let w = canvas.width;
        let len = palabra.length;
        let ren = 0;
        let col = 0;
        let y = 230;
        let lon = 50;
        let x = (w - (lon + margen) * len) / 2;
        for (let i = 0; i < palabra.length; i++) {
            letra = palabra.substr(i, 1);
            miLetra = new Letra(x, y, lon, lon, letra);
            miLetra.dibuja();
            letras_array.push(miLetra);
            x += lon + margen;
        }

    } else {
        //console.log(selectedgameOption);
        let p = selectedgameOption;
        //Asignamos del array de palabras
        palabra = palabras_array[p];
        //Asignamos del array de frases
        frase = frases_array[p];
        //console.log(palabra);
        //console.log(p);
        //console.log(frase);
        pistaFunction(frase);

        let w = canvas.width;
        let len = palabra.length;
        let ren = 0;
        let col = 0;
        let y = 230;
        let lon = 50;
        let x = (w - (lon + margen) * len) / 2;
        for (let i = 0; i < palabra.length; i++) {
            letra = palabra.substr(i, 1);
            miLetra = new Letra(x, y, lon, lon, letra);
            miLetra.dibuja();
            letras_array.push(miLetra);
            x += lon + margen;
        }

    }
    //Llamar función para mostrar en pantalla la opción seleccionada
    showOptionSelected();
}

/* dibujar cadalzo y partes del pj segun sea el caso */
function horca(errores) {
    var imagen = new Image();
    imagen.src = "img/ahorcado" + errores + ".png";
    imagen.onload = function () {
        ctx.drawImage(imagen, 400, 0, 230, 230);
    }
    /*************************************************
    // Imagen 2 mas pequeña a un lado de la horca //       
    var imagen = new Image();
    imagen.src = "imagenes/ahorcado"+errores+".png";
    imagen.onload = function(){
        ctx.drawImage(imagen, 620, 0, 100, 100);
    }
    *************************************************/
}

/* ajustar coordenadas */
function ajusta(xx, yy) {
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx - posCanvas.left;
    var y = yy - posCanvas.top;
    return { x: x, y: y }
}

/* Detecta tecla clickeada y la compara con las de la palabra ya elegida al azar */
function selecciona(e) {
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;
    for (var i = 0; i < teclas_array.length; i++) {
        tecla = teclas_array[i];
        if (tecla.x > 0) {
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)) {
                break;
            }
        }
    }
    if (i < teclas_array.length) {
        for (var i = 0; i < palabra.length; i++) {
            letra = palabra.substr(i, 1);
            if (letra == tecla.letra) { /* comparamos y vemos si acerto la letra */
                caja = letras_array[i];
                caja.dibujaLetra();
                aciertos++;
                bandera = true;
            }
        }
        if (bandera == false) { /* Si falla aumenta los errores y checa si perdio para mandar a la funcion gameover */
            errores++;
            horca(errores);
            if (errores == 5) gameOver(errores);
        }
        /* Borra la tecla que se a presionado */
        ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
        tecla.x - 1;
        /* checa si se gano y manda a la funcion gameover */
        if (aciertos == palabra.length) gameOver(errores);
    }
}

/* Borramos las teclas y la palabra con sus cajas y mandamos msj segun el caso si se gano o se perdio */
function gameOver(errores) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    ctx.font = "bold 50px Nunito";
    if (errores < 5) {
        ctx.fillText("Muy bien, la frase es: ", 110, 280);
    } else {
        ctx.fillText("Lo sentimos, la frase era: ", 110, 280);
    }
    //Aqui pasamos la frase en vez de la palabra que es lo que imprimiremos
    ctx.font = "bold 85px Nunito";
    lon = (canvas.width - (frase.length * 48)) / 2;
    ctx.fillText(frase, lon, 380);
    horca(errores);
}
/* Detectar si se ha cargado nuestro contexto en el canvas, iniciamos las funciones necesarias para jugar o se le manda msj de error segun sea el caso */
window.onload = function () {
    canvas = document.getElementById("pantalla");
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
        if (ctx) {
            teclado();
            pintaPalabra();
            horca(errores);
            canvas.addEventListener("click", selecciona, false);
        } else {
            alert("Error al cargar el contexto!");
        }
    }
}


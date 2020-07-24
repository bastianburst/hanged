
/* Variables */
let ctx;
let canvas;
let palabra;
let letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
let colorTecla = "#49788e";
let colorMargen = "white";
let inicioX = 200;
let inicioY = 300;
let lon = 35;
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
/*Frases estas se mostrarán en el final del juuego ya que viene con espacios*/
frases_array.push("LAMPARA A MIS PIES");
frases_array.push("LINAJE ESCOGIDO");
frases_array.push("PRINCIPE DE PAZ");



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
    ctx.font = "bold 20px courier";
    ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto / 2 + 5);
}

/* Dibua la letra y su caja */
function dibujaLetraLetra() {
    //console.log('me activé');
    var w = this.ancho;
    var h = this.alto;
    ctx.fillStyle = "black";
    ctx.font = "bold 40px Courier";
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
        default:  // El defaul se puede omitir // 
            pista = "No hay pistas";
    }
    // Pintamos la palabra en el canvas , en este ejemplo se pinta arriba a la izquierda //
    ctx.fillStyle = "white";  // Aqui ponemos el color de la letra
    ctx.font = "bold 30px Nunito";  // aqui ponemos el tipo y tamaño de la letra
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
}

/* dibujar cadalzo y partes del pj segun sea el caso */
function horca(errores) {
    var imagen = new Image();
    imagen.src = "img/ahorcado" + errores + ".png";
    imagen.onload = function () {
        ctx.drawImage(imagen, 390, 0, 230, 230);
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
    ctx.font = "bold 80px Nunito";
    lon = (canvas.width - (frase.length * 48)) / 2;
    ctx.fillText(frase, lon, 380);
    horca(errores);
}

/* Detectar si se a cargado nuestro contexco en el canvas, iniciamos las funciones necesarias para jugar o se le manda msj de error segun sea el caso */
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
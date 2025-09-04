const numero = 10;

//El isNaN() determina si un valor es numerico o no 
if (isNaN(numero)) {
    console.log("El valor no es un número");
    return;
    // Con sabemos % calcula el resduo, si el resultado es 0 es par, si no es impar
} else if (numero % 2 === 0) {
    console.log("El número es par");
} else {
    console.log("El número es impar");
}

/* Comandos para ejecutar en la terminal:
node Ejercicios/par_impar.js
(Ubicar bien en la carpeta donde se encuentra el archivo con el comando cd) */


// Con esto podemos interactuar con el usuario en la terminal
const Terminal = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

Terminal.question("Ingrese un número: ", (n) => {
    const numero2 = Number(n);
    if (isNaN(numero2)) {
        console.log("El valor no es un número");
        // Con sabemos % calcula el resduo, si el resultado es 0 es par, si no es impar
    } else if (numero2 % 2 === 0) {
        console.log("El número es par");
    } else {
        console.log("El número es impar");
    }

    Terminal.close();
});

// Number() convierte un string a número
// parseInt() convierte un string a número entero
// parseFloat() convierte un string a número decimal
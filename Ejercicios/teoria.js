// If -  else (Si no)
console.log("Ejemplo de If - else");
const n = 15;

if (isNaN(n)){
    console.log("El valor no es un número");
} else if (n % 2 === 0) {
    console.log("El número es par");
} else {
    console.log("El número es impar");
}

// Switch - case (según - caso)
// Es como un if pero más ordenado cuando hay muchas condiciones
// Se usa para evaluar una variable y compararla con varios casos YA EXISTENTES

console.log("Ejemplo de Switch - case");
const dia = 3;

switch (dia){
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("Miércoles");
        break;
    case 4:
        console.log("Jueves");  
        break;
    case 5:
        console.log("Viernes"); 
        break;
    case 6:
        console.log("Sábado"); 
        break;
    case 7:
        console.log("Domingo"); 
        break;
    default:
        console.log("No existe ese dia");
        break;
}

// For (para) 
// Sirve para repetir un bloque de código un número determinado de veces que definimos aqui:  'i <= 5'
// i++ es el numero que se va a ir sumando (En este caso de 1 en 1) si queremos que sume de 2 en 2 seria i = i + 2 o i += 2

console.log("Ejemplo de For");
for (let i = 1; i <= 10; i++) {
    console.log(`Número ${i}`);
}

// While (mientras)
// Mientras se cumpla la condición se va a repetir el bloque de código

console.log("Ejemplo de While");
let contador = 1;

while (contador <= 5) {
    console.log(`Número ${contador}`);
    contador++;
}   

// Aqui lo que estamos haciendo es que mientras contador sea menor o igual a 5 se va a ir sumando 1 y mostrando el valor de contador


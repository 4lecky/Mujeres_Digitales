const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};


const menu = async () => {

    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Porcentaje");
    console.log("6. Potencia");
    console.log("7. Promedio")
    console.log("8. Salir");

    const selección = await preguntar("Seleccione una opción:");

    console.log('=== Bienvenido a la calculadora === \n Ingrese dos números:');
    let numUno;
    let numDos;

    // Verificamos que la selección esté dentro de las opciones que requieren números, osea que default y salir no lo requieran los numeros
    if (['1', '2', '3', '4', '5','6','7'].includes(selección)) {
        numUno = await preguntar("Ingrese el primer numero: ");
        numDos = await preguntar("Ingrese el segundo numero: ");
    }

    switch (selección) {

        case '1':
            console.clear();
            console.log("Ha seleccionado sumar");
            console.log(`El resultado es: ✅ ${Number(numUno) + Number(numDos)}`);
            break;

        case '2':
            console.clear();
            console.log("Ha seleccionado restar");
            console.log(`El resultado es: ✅ ${Number(numUno) - Number(numDos)}`);
            break;
        case '3':
            console.clear();
            console.log("Ha seleccionado multiplicar");
            console.log(`El resultado es: ✅ ${Number(numUno) * Number(numDos)}`);
            break;
        case '4':
            console.clear();
            console.log("Ha seleccionado dividir");
            // Verificamos que el divisor no sea cero, ya que no se puede dividir por cero
            if (Number(numDos) === 0) {
                console.log("No se puede dividir por cero");
            } else {
                console.log(`El resultado es: ✅ ${Number(numUno) / Number(numDos)}`);
            }
            break;
        case '5':
            console.clear();
            console.log("Ha seleccionado porcentaje");
            // Tomamos el primer numero como % y el segun al que sacarle el % 
            console.log(`${numUno}% de ${numDos} es: ✅ ${(Number(numUno) * Number(numDos)) / 100}`);
            break;
        case '6':
            console.clear();
            console.log("Ha seleccionado potencia");
            console.log(`El resultado es: ✅ ${(Number(numUno) ** Number(numDos))}`);
            break;
        case '7':
            console.clear();
            console.log("Ha seleccionado promedio");
            console.log(`El resultado es: ✅ ${(Number(numUno) + Number(numDos)) / 2}`);
            break;
        case '8':
            console.clear();
            console.log("Gracias por usar la calculadora");
            rl.close();
             return;
        default:
            console.clear();
            console.log("Opción inválida, por favor seleccione una opción del 1 al 5");
            break;
    }

    menu();

}

console.clear();
menu();
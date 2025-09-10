//  Cuenta

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});


let cuenta = {
    numero: '1234567890',
    titular: 'Juan Pérez',
    pin: '1234',
    saldo: 1000000,
} // Simulación de una cuenta bancaria, como una base de datos

/* Opciones: 1) Consultar, 2)Depositar dinero 3)Retirar dinero 4)Salir */

// Esta función nos permite interactuar al usurio interactuar con la termial, a su vez con la logica prupuesta
const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};

const inicio = async () => {
    console.log('Bienvenido al cajero automático');

    const numeroIngresado = await preguntar('Ingrese su número de cuenta:');
    const pinIngresado = await preguntar('Ingrese su PIN:');

    if (numeroIngresado === cuenta.numero && pinIngresado === cuenta.pin){
        console.log(`Bienvenido ${cuenta.titular}`);
        rl.close();
    } else {
        console.log('Número de cuenta o PIN incorrecto');
        rl.close();
    }

};

inicio(); 
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
}

// Esta función nos permite interactuar al usurio interactuar con la termial, a su vez con la logica prupuesta
const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};

const menu = async () => {
    console.log("1. Consultar saldo");
    console.log("2. Depositar dinero");
    console.log("3. Retirar dinero");
    console.log("4. Salir");

    const opcionSeleccionada = await preguntar("Seleccione una opción:");

    switch (opcionSeleccionada) {
        case '1':
            console.clear();
            console.log(`💰Su saldo es: $${cuenta.saldo}💰`);
            break;
        case '2':
            console.clear();
            console.log("Depositar dinero");
            //Parseamos a numero la respuesta del usuario
            const valorDeposito = Number(await preguntar("Ingrese el monto a depositar:"));
            if (valorDeposito > 0) {
                // De esta forma sumamos el dinero depositado al saldo actual
                cuenta.saldo += valorDeposito;
                console.log(`Depósito exitoso. Nuevo saldo: $${cuenta.saldo}`);
            }else{
                console.log("Monto invalido");
            }
            break;
        case '3':
            console.clear();
            console.log("Retirar dinero");
            const valorRetiro = Number(await preguntar("Ingrese el monto a retirar:"));
            if (valorRetiro > 0 && valorRetiro <= cuenta.saldo) {
                cuenta.saldo -= valorRetiro;
                console.log(`Retiro exitoso. Nuevo saldo: $${cuenta.saldo}`);
            } else {
                console.log("Monto invalido o saldo insuficiente");
            }
            break;
        case '4':
            // Console clear para limpiar la pantalla
            console.clear();
            console.log("Salir");
            rl.close();
            return;
        default:
            console.log("Opción no válida");
            break;
    }

    // Volver a mostrar el menú después de realizar una acción que no sea salir 
    menu();
}


const inicio = async () => {
    console.clear();
    console.log('Bienvenido al cajero automático');

    const numeroIngresado = await preguntar('Ingrese su número de cuenta:');
    const pinIngresado = await preguntar('Ingrese su PIN:');

    if (numeroIngresado === cuenta.numero && pinIngresado === cuenta.pin){
        // Aqui le estamos diciento que si no cuenta con el titular, le asigne 'Usuario'
        //Si la primer valor no esta disponible, usa el segundo (Para eso usamos el operador nullish coalescing '??')
        console.log(`Bienvenido ${cuenta.titular ?? 'Usuario'} \n`);
        menu(); // Llamamos al menu (Tecniamente esta es la llamada incial)
    } else {
        console.log('Número de cuenta o PIN incorrecto');
        rl.close();
    }

};
// Incializamos la funcion 
inicio(); 
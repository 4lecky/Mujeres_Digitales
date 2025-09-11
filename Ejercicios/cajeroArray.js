//  Si bien la logca es la misma que en cajero.js, en este caso usamos un array de objetos para simular varias cuentas
//  Esto nos permite usar metodos de array como 'find' para buscar una cuenta que coincida con el numero y pin ingresados
// Basicamente es un ejerccio practico para recorrecr arrays y usar metodos de array

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});


let cuentas = [
    {
        numero: '1234567890',
        titular: 'Juan Pérez',
        pin: '1234',
        saldo: 1000000, 
    },
    {
        numero: '0987654321',
        titular: 'María Gómez',
        pin: '4321',
        saldo: 500000, 
    },
    {
        numero: '1122334455',
        titular: 'Carlos López',
        pin: '2266',
        saldo: 750000,
    }
]

let cuentaActiva = null; // Aqui guardaremos la cuenta que inicie sesión

// Esta función nos permite interactuar al usurio interactuar con la termial, a su vez con la logica prupuesta
const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};

const menu = async () => {
    console.log("\n===== MENU ===== ");
    console.log(
        `Usuario: ${cuentaActiva.propietario} | Cuenta: ${cuentaActiva.numero}`
    ); // Con esto mostramos el usuario y numero de cuenta en el menu (Viene del objeto cuentaActiva que se le asigno su valor en 'inicio')
    console.log("1. Consultar saldo");
    console.log("2. Depositar dinero");
    console.log("3. Retirar dinero");
    console.log("4. Cerrar sesión");
    console.log("5. Salir");

    const opcionSeleccionada = await preguntar("Seleccione una opción:");

    switch (opcionSeleccionada) {
        case '1':
            console.clear();
            console.log(`💰Su saldo es: $${cuentaActiva.saldo}💰`);
            break;
        case '2':
            console.clear();
            console.log("Depositar dinero");
            //Parseamos a numero la respuesta del usuario
            const valorDeposito = Number(await preguntar("Ingrese el monto a depositar:"));
            if (valorDeposito > 0) {
                // De esta forma sumamos el dinero depositado al saldo actual
                cuentaActiva.saldo += valorDeposito;
                console.log(`Depósito exitoso. Nuevo saldo: $${cuentaActiva.saldo}`);
            }else{
                console.log("Monto invalido");
            }
            break;
        case '3':
            console.clear();
            console.log("Retirar dinero");
            const valorRetiro = Number(await preguntar("Ingrese el monto a retirar:"));
            if (valorRetiro > 0 && valorRetiro <= cuentaActiva.saldo) {
                cuentaActiva.saldo -= valorRetiro;
                console.log(`Retiro exitoso. Nuevo saldo: $${cuentaActiva.saldo}`);
            } else {
                console.log("Monto invalido o saldo insuficiente");
            }
            break;
        case '4':
            // Console clear para limpiar la pantalla
            console.clear();
            console.log("Cerrando sesión...");
            cuentaActiva = null;
            return inicio(); // Volvemos al inicio para que pueda iniciar sesión otra vez con otra cuenta
            return;
        case '5':
            console.log("Saliendo...");
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
    console.log('=== Bienvenido al cajero automático ===');

    const numeroIngresado = await preguntar('Ingrese su número de cuenta:');
    const pinIngresado = await preguntar('Ingrese su PIN:');

    // Con el find buscamos en el array de cuentas si existe una que coincida con el numero y pin ingresados
    const encontrarCuenta = cuentas.find(
        // 'cuenta' solo lo podemos usar aqui porque es el parametro de la funcion flecha
        (cuenta) => cuenta.numero === numeroIngresado && cuenta.pin === pinIngresado
    );

    if (encontrarCuenta){
        cuentaActiva = encontrarCuenta; // Si la encontramos la asignamos a cuentaActiva
        console.log(`Bienvenido ${cuentaActiva.titular ?? 'Usuario'} \n`);
        menu(); // Llamamos al menu (Tecniamente esta es la llamada incial)
    } else {
        console.log('Número de cuenta o PIN incorrecto');
        rl.close();
    }

};
// Incializamos la funcion 
inicio(); 
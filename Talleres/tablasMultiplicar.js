// Tabla multiplicar del 1 al 10
// const numero = 5;


 
for (let multiplicando = 1; multiplicando <= 10; multiplicando++) {
    console.log(`Tabla del ${multiplicando}`);  

    let multiplicador = 1;
    while ( multiplicador <= 10) {
        console.log(`${multiplicando} x ${multiplicador} = ${multiplicando * multiplicador}`);
        multiplicador++;
    }
}

//   
// console.log(`${numero} x ${i} = ${numero * i}`);
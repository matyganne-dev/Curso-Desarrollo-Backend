
//Parte 2 - Orden del event loop


//1. Un mensaje que indique el comienzo del programa.
console.log("Comienza el programa");
//2.Un setTimeout con tiempo 0 cuyo callback muestre el tercer mensaje.
setTimeout(() => { console.log("Se ejecuta la tarea programada") }, 0);
//3. Un mensaje, ubicado después del temporizador, que indique el final del código principal.
console.log("Termina el codigo principal");
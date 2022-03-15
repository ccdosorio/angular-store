const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

// Con la promesa una vez resuelto el valor, no tendríamos el valor 2 porque ya fue resuelta la promesa.
// Solo se ejecuta una vez, me entrega un favor único
// Una vez enviada, no la podemos cancelar
const doSomething = () => {
    return new Promise((resolve) => {
        //resolve('Valor 1');
        //resolve('Valor 2'); // no lo resolverá

        setTimeout(() => {
            resolve('Valor 3')
        }, 3000);
    })
}

// Podemos emitir varios valores, porque es un stream continuo de datos. El subscribe estará pendiente de ellos.
// Me entrega constante comunicación de datos
// Permite hacer transformación y cancelarlo en algún momento dado
const doSomething$ = () => {
    return new Observable(observer => {
        observer.next('Valor 1 $');
        observer.next('Valor 2 $');
        observer.next('Valor 3 $');
        observer.next(null);

        setTimeout(() => {
            observer.next('Valor 4 $');
        }, 5000);

        setTimeout(() => {
            observer.next(null);
        }, 8000);

        setTimeout(() => {
            observer.next('Valor 5 $');
        }, 10000);
    })
}

(async () => {
    const rta = await doSomething();
    console.log(rta);
})();

// Puedo aplicar pipes (transformaciones)
(() => {
    const obs$ = doSomething$();

    obs$
    .pipe(
        filter(value => value !== null)  // se transforman los datos mientras se reciben
      )
    .subscribe(rta => {
        console.log(rta);
    })
})();

/**
 * Resumen:
 * Promise -> emite solo un valor, es más simple. No se puede cancelar ni estar pendientes de múltiples datos
 * Observables -> Stream de datos (emitir múltiples valores), escuchar constantemente: eventos, responsive, fetch. Se puede cancelar
 */
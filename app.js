//Promises

//setTimeout
//asincronic model
console.log("Inicia proceso")
setTimeout(()=> {
 console.log("Mitad de proceso")
}, 2000)
console.log("Fin proceso")
// Inicia proceso
// Fin proceso
// Mitad de proceso - tras 2 segundos

//Ejemplo de aplicacion de setTimeout

const btn = document.querySelector ('#boton')
const popup = document.querySelector ('#popup-mensaje' )
btn.addEventListener ('click', () => {
 popup.classList.add('popup-active' )
 setTimeout(() => {
 popup.classList.remove('popup-active' )
 }, 2500)
})

//Ejemplo usando dos For, modo sincronico
for (let letra of "hola") {
    console.log(letra)
   }
   for (let letra of "mundo") {
    console.log(letra)
   }

//Ejemplo usando dos For, modo asincronico
for (let letra of "hola") {
    setTimeout(() => {
    console.log(letra)
    }, 1000)
   }
   for (let letra of "mundo") {
    setTimeout(() => {
    console.log(letra)
    }, 3000)
   }

//obtenemos en mismo resultado con 0 milisegundos
//la explicaion es por el callstack
console.log("Inicia proceso" )
setTimeout(()=> {
 console.log("Mitad de proceso" )
}, 0)
console.log("Fin proceso" )


//------------------------------------------------------------
//setInterval
setInterval(() => { 
    console.log("Tic") 
}, 1000) 

// clearInterval 
// el timeout generado se ejecuta hasta que se cumpla una condicion 
// y luego se interrumpe son clearInterval
let counter = 0 
const interval = setInterval(() => { 

    counter++ 
    console.log("Counter: ", counter) 
    if (counter >= 5) { 
        clearInterval(interval) 
        console.log("Se removió el intervalo") 
    } 
}, 1000) 


//clearTimeout
//En el siguiente caso, el timeout generado nunca llega a ejecutarse: 
console.log("Inicio")

const fin = setTimeout(() => {
    console.log("fin")
}, 2000)

clearTimeout(fin)



//Promises
//hacemos que devuelta una promesa en estado pendiente

const eventoFuturo = () => {
    return new Promise( (resolve, reject) => {
        //cuerpo de la promesa
    } )
}

console.log( eventoFuturo() ) // Promise { <pending> }


//Resolve , Reject
//casos en que se resuelve y en que se rechaza

const eventoFuturo2 = (res) => {
    return new Promise( (resolve, reject) => {
        if (res === true) {
            resolve('Promesa resuelta sos un capo')
        } else {
            reject('Promesa rechazada sos un boludo')
        }
    })
}

console.log( eventoFuturo2(true) ) // Promise { 'Promesa resuelta' }
console.log( eventoFuturo2(false) ) // Promise { <rejected> 'Promesa rechazada' }

// Otro ejemplo, con un setTimeout y un condicional
// En este caso, el console.log es sincrónico y vemos que la promesa está en pending
// en ambos llamados (su resolución se generará dentro de 2s). 
// Las promesas tienen un mecanismo para trabajar esta asincronía 
// y poder ejecutar funciones cuando cambie su estado.

const eventoFuturo3 = (res) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada')
        }, 2000)
    })
}

console.log( eventoFuturo3(true) ) // Promise { <pending> }
console.log( eventoFuturo3(false) ) // Promise { <pending> }


//Then , catch
//no me tira mas el error uncaught rejected

const eventoFuturo4 = (res) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            res ? resolve('Promesa resuelta') : reject('Promesa rechazada')
        }, 2000)
    })
}

eventoFuturo4(true)
    .then( (response) => {
        console.log(response) // Promesa resuelta
    })

eventoFuturo4(false)
    .catch( (error) => {
        console.log(error) // Promesa rechazada
    })

//Como una promesa puede tener varios estados posibles,
// se puede concatenar varios .then() o .catch() en un mismo llamado, 
// y caeremos en el caso que corresponda según cómo se haya resuelto la promesa 🤔



const eventoFuturo5 = (res) => {
    return new Promise( (resolve, reject) => {
        if (res === true) {
            resolve('Promesa resuelta sos un capo')
        } else {
            reject('Promesa rechazada sos un boludo')
        }
    })
}

eventoFuturo5(true)
    .then( (response) => {
        console.log(response) // Promesa resuelta sos un capo
    })
    .catch( (error) => {
        console.log(error)
    })

eventoFuturo5(false)
    .then( (response) => {
        console.log(response)
    })
    .catch( (error) => {
        console.log(error) // Promesa rechazada sos un boludo
    })



//mejor entendimiento en este ejemplo
const eventoFuturo6 = (res) => { 
    return new Promise( (resolve, reject) => { 
        setTimeout( () => { 
            res ? resolve('Promesa resuelta sos un capo') : reject('Promesa rechazada dale boludo') 
        }, 2000) 
    }) 
} 

eventoFuturo6(true) 
    .then( (response) => { 
        console.log(response)
    }) 

eventoFuturo6(false) 
    .catch( (error) => { 
        console.log(error) 
    }) 



//Ejemplo practico
//Tenemos un array de productos.
// Al cargar la aplicación queremos simular un delay en la actualizacion, 
// y lo haremos llamando una promesa. 
// en el .then() llamamos una función para generar la vista del resultado 



//paso 1 - definimos la BD, Y CREAMOS LA PROMESA

const BD = [
    {id: 1, nombre: 'Producto 1', precio: 1500},
    {id: 2, nombre: 'Producto 2', precio: 2500},
    {id: 3, nombre: 'Producto 3', precio: 3500},
    {id: 4, nombre: 'Producto 4', precio: 3500},
]

const pedirProductos = () => {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(BD)
        }, 3000)
    })
}

//paso 2- definimos un array vacio y una funcion render que muestra la informacion

let productos = []

const renderProductos = (arr) => {
    console.log(arr);
}

//ejecutamos la funcion de la promesa y definimos then y catch
pedirProductos()
    .then((res) => {
        productos = res
        renderProductos(productos)
    })  .catch( (error) => {
        console.log(error)
    })

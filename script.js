if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg=>console.log("Registro de SW exitoso!!", reg))
    .catch(err=>console.warn("Error al intentar registrar el ServiceWorker", err))
}
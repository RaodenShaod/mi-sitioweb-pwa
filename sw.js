;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_programador_fitness',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
    'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
    'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
    './style.css',
    './script.js',
    './images/ProgramadorFitness.png',
    './images/favicon.png'
  ]

  //Durante la fase de instalacion, generalmente se almacena en cache los activos estaticos
  self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlsToCache)
        .then(()=>self.skipWaiting())
        })
        .catch(err=>console.log("Fallo registro de cache",err))
    )
  })

  //Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexion
  self.addEventListener('activate', e=>{
      const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cachesNames=>{
            cachesNames.map(cacheName=>{
                //Eliminamos lo que ya no se necesita en cache
                if(cacheWhitelist.indexOf(cacheName)===-1){
                    return caches.delete(cacheName)
                }
            })
        })
        //Le indica al SW activar el cache actual
        .then(()=>self.clients.claim())
        
    )
  })

  //Cuando el navegador recupera una url
  self.addEventListener('fetch',e=>{
    //Responder ya sea con el objeto en cache o continuar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                //recuperar del cache
                return res
            }
            //En caso de que no se pueda recuperar del cache
            //recuperar de la peticion a la url
            return fetch(e.request)
        })
    )
  })
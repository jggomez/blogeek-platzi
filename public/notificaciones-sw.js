importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')

firebase.initializeApp({
  projectId: 'blogeekplatzi-4836b',
  messagingSenderId: '359502061382'
})

const messaging = firebase.messaging()

// Función que se ejecuta en background para recibir las notificaciones
messaging.setBackgroundMessageHandler(payload => {
  const tituloNotificacion = 'Ya tenemos un nuevo post'
  const opcionesNotificacion = {
    body: payload.data.titulo,
    icon: 'icons/icon_new_post.png',
    click_action: 'https://blogeekplatzi-4836b.firebaseapp.com/'
  }

  return self.registration.showNotification(
    tituloNotificacion,
    opcionesNotificacion
  )
})

import mitt from 'mitt'

interface User {
  name: string
}

type ApplicationEvents = {
  'user:registered': User
  'user:deleted': User
}

export default defineNuxtPlugin(() => {
  const emitter = mitt<ApplicationEvents>()

  return {
    provide: {
      emit: emitter.emit,
      listen: emitter.on,
    },
  }
})

import mitt from 'mitt'

type ApplicationEvents = {
  'notification:open': undefined
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

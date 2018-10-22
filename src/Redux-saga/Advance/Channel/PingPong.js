import { take, put, call, apply } from 'redux-saga/effects'
import { eventChannel, delay } from 'redux-saga'
import { createWebSocketConnection } from './socketConnection'

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const pingHandler = (event) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event.payload)
    }

    // setup the subscription
    socket.on('ping', pingHandler)

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('ping', pingHandler)
    }

    return unsubscribe
  })
}

// reply with a `pong` message by invoking `socket.emit('pong')`
function* pong(socket) {
  yield call(delay, 5000)
  yield apply(socket, socket.emit, ['pong']) // call `emit` as a method with `socket` as context
}

export function* watchOnPings() {
  const socket = yield call(createWebSocketConnection)
  const socketChannel = yield call(createSocketChannel, socket)

  while (true) {
    const payload = yield take(socketChannel)
    yield put({ type: INCOMING_PONG_PAYLOAD, payload })
    yield fork(pong, socket)
  }
}
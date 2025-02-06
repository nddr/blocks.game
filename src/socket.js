const socket = new WebSocket('ws://localhost:8080/ws')

const TICK_RATE = 5000

socket.onopen = () => {
  console.log('Connected to WebSocket server')
}

socket.onmessage = (event) => {
  console.log('Message from server:', event.data)

  if (event.data.type === 'player:connect') {
    //
  }

  if (event.data.type === 'player:disconnect') {
    //
  }

  if (event.data.type === 'player:update') {
    //
  }

  if (event.data.type === 'world:update') {
    //
  }
}

socket.onerror = (error) => {
  console.log('WebSocket Error:', error)
}

socket.onclose = () => {
  console.log('WebSocket connection closed')
}

setInterval(() => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send({
      type: 'player:update',
      data: {
        x: 0,
        y: 0,
        flipX: false,
        sprite: 'idle',
      },
    })
  }
}, TICK_RATE)

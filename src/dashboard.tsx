import React, { useState } from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed'

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Develop dashboard'
})

function App() {
  const [count, setCount] = useState(0)
  const dateTime = new Date().toLocaleString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <box
      top="center"
      left="center"
      width="50%"
      height="50%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'blue' } }}
      onKeypress={() => setCount(count + 1)}
      keyable
    >
      <text>Today is ${dateTime}</text>
      <text valign="middle">Count: ${count}</text>
    </box>
  )
}

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

render(<App/>, screen)


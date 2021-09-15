import React, { useEffect, useState } from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed'
import figlet, { Fonts } from 'figlet'

const FONTS = [
  'Straight',
  'ANSI Shadow',
  'Shimrod',
  'Doom',
  'Big',
  'Ogre',
  'Small',
  'Standard',
  'Bigfig',
  'Mini',
  'Small Script',
  'Small Shadow'
]

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Develop dashboard'
})

function App() {
  const [count, setCount] = useState(0)

  const now = new Date()
  const date = now.toLocaleString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const time = figlet.textSync(now.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }), { font: FONTS[count % FONTS.length] as Fonts })

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000)
    return () => clearTimeout(timer)
  }, [count])

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
      <text top="0">{date}</text>
      <text top="15%">{time}</text>
    </box>
  )
}

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

render(<App/>, screen)


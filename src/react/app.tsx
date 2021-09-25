import { hijackEffects } from 'stop-runaway-react-effects'

import React from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed'
import { Today } from './components/today'

hijackEffects()

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Develop dashboard'
})

function App() {
  return <Today updateInterval={1000} />
}

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

render(<App/>, screen)


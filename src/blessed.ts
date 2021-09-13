import blessed from 'blessed'

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Blessed test'
})

screen.key(['escape', 'q'], () => process.exit(0))

const box = blessed.box({
  content: 'Hello World',
  top: 'center',
  left: 'center',
  width: '10',
  height: '10',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white'
  }
})

screen.append(box)

screen.render()


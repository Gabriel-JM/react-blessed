import blessed from 'blessed'

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Blessed test'
})

screen.key(['escape', 'q'], () => process.exit(0))

const title = blessed.text({
  content: 'Title',
  top: '50%',
  left: '2%',
  style: {
    bg: '#454545'
  }
})

const helpText = blessed.text({
  content: 'Help',
  top: '50%',
  right: '0',
  style: {
    bg: '#454545'
  }
})

const box = blessed.box({
  top: 'top',
  left: 'center',
  width: '100%',
  height: '10%',
  style: {
    fg: 'white',
    bg: '#454567'
  },
  children: [title, helpText]
})

const hintMenu = blessed.box({
  content: '<q>: Quit  <f>: Focus input',
  left: 'center',
  bottom: '0',
  width: '100%',
  height: '10%',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
  }
})

const input = blessed.textbox({
  inputOnFocus: true,
  label: 'Name',
  top: '50%',
  left: 'center',
  width: '40%',
  height: '10%',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    focus: {
      border: {
        fg: 'blue'
      }
    }
  }
})

input.on('submit', (value) => {
  title.setContent(value)
  input.setValue('')
  screen.render()
})

screen.append(box)
screen.append(hintMenu)
screen.append(input)

screen.key(['f'], () => input.focus())

screen.render()


import blessed, { colors } from 'blessed'

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Blessed test'
})

screen.key(['escape', 'q'], () => process.exit(0))

const title = blessed.text({
  content: 'What\'s your name app',
  top: '50%',
  left: '0%',
  style: {
    bg: colors.match('#454545')
  }
})

const helpText = blessed.text({
  content: '{bold}h{/bold}:Help',
  tags: true,
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
  valign: 'middle',
  padding: {
    left: 1,
    right: 1
  },
  style: {
    fg: 'white',
    bg: '#454567'
  },
  children: [title, helpText]
})

const hintMenu = blessed.box({
  content: `
    {bold}q{/bold}:Quit
    {bold}f{/bold}:Focus input
    {bold}Esc{/bold}:Unfocus input
  `.trim().replace(/\n/g, ''),
  tags: true,
  label: 'Help Menu',
  left: 'center',
  bottom: '0',
  width: '100%',
  height: '10%',
  hidden: false,
  border: {
    type: 'line'
  },
  bg: 'black',
  style: {
    fg: 'white'
  }
})

const middleText = blessed.box({
  content: 'Type your name',
  top: '25%',
  left: 'center',
  width: '50%',
  height: '5%',
  align: 'center',
  fg: 'white'
})

const input = blessed.textbox({
  inputOnFocus: true,
  mouse: true,
  label: 'Name',
  top: '35%',
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
  middleText.setContent(`Your name is ${value}`)
  input.clearValue()
  input.focus()
  screen.render()
})

screen.append(box)
screen.append(middleText)
screen.append(hintMenu)
screen.append(input)

screen.key(['f'], () => input.focus())
screen.key(['h'], () => {
  hintMenu.hidden ? void (() => {
    hintMenu.show()
  })() : hintMenu.hide()
  screen.render()
})

screen.render()


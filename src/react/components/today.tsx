import React, { useEffect, useState } from 'react'
import useInterval from '@use-it/interval'
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

interface TodayProps {
  updateInterval: number
}

export function Today({ updateInterval }: TodayProps) {
  const [fontIndex, setFontIndex] = useState(0)

  const now = new Date()
  const date = now.toLocaleString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const time = figlet.textSync(now.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }), { font: FONTS[fontIndex % FONTS.length] as Fonts })

  useInterval(() => setFontIndex(fontIndex + 1), updateInterval) 

  return (
    <box
      top="center"
      left="center"
      width="50%"
      height="50%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'blue' } }}
    >
      <text top="0">{date}</text>
      <text top="15%">{time}</text>
    </box>
  )
}


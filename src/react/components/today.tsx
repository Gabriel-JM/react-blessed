import React, { useCallback, useEffect, useState } from 'react'
import useInterval from '@use-it/interval'
import figlet, { Fonts } from 'figlet'
import weather from 'weather-js'
import { promisify } from 'util'

const findWeather = promisify(weather.find)

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

function formatWeather([ results ]) {
  const { location, current, forecast } = results
  const degreeType = location.degreetype
  const temperature = `${current.temperature}°${degreeType}`
  const conditions = current.skytext
  const low = `${forecast[1].low}°${degreeType}`
  const high = `${forecast[1].high}°${degreeType}`

  return `${temperature} and ${conditions} (${low} -> ${high})`
}

interface TodayProps {
  updateInterval?: number
  search?: string
  degreeType?: string
}

export function Today({ updateInterval, search = 'Anapolis, BR', degreeType = 'F' }: TodayProps) {
  const [fontIndex, setFontIndex] = useState(0)
  const [now, setNow] = useState(new Date())
  const [weather, setWeather] = useState({
    status: 'loading',
    error: null,
    data: null
  })

  const date = now.toLocaleString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const time = figlet.textSync(now.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }), { font: FONTS[fontIndex % FONTS.length] as Fonts })

  const fetchWeather = useCallback(async () => {
    setWeather({ status: 'loading', error: null, data: null })
    let data

    try {
      data = await findWeather({ search, degreeType })
      setWeather({ status: 'complete', data, error: null })
    } catch(error) {
      setWeather({ status: 'error', data: null, error })
    }
  }, [search, degreeType])

  useEffect(() => {
    fetchWeather()
  }, [fetchWeather])

  useInterval(() => fetchWeather(), updateInterval)
  useInterval(() => setNow(new Date()), 60_000) 

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
      <text top="75%">
        {
          weather.status === 'loading'
            ? 'Loading...'
            : weather.error
              ? `Error: ${weather.error}`
              : formatWeather(weather.data)
        }
      </text>
    </box>
  )
}


import React, { useCallback, useState } from 'react'
import useInterval from '@use-it/interval'
import figlet, { Fonts } from 'figlet'
import weather from 'weather-js'
import { promisify } from 'util'
import useDeepCompareEffect from 'use-deep-compare-effect'
import chalk from 'chalk'
import gradient from 'gradient-string'

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

function useRequest(
  promise: (options: Record<string, unknown>) => Promise<unknown>,
  options: Record<string, unknown>,
  interval: number | null = null
) {
  const [state, setState] = useState({
    status: 'loading',
    error: null,
    data: null
  })
  const request = useCallback(async (options) => {
    setState({ status: 'loading', error: null, data: null })
    let data: Record<string, unknown>

    try {
      data = await promise(options) as Record<string, unknown>
      setState({ status: 'complete', data, error: null })
    } catch(error) {
      setState({ status: 'error', data: null, error })
    }
  }, [promise])

  useDeepCompareEffect(() => {
    request(options)
  }, [options, request])

  useInterval(() => request(options), interval)

  return state
}

function formatWeather([ results ]) {
  const { location, current, forecast } = results
  const degreeType = location.degreetype
  const temperature = chalk.yellow(`${current.temperature}°${degreeType}`)
  const conditions = chalk.green(current.skytext)
  const low = chalk.blue(`${forecast[1].low}°${degreeType}`)
  const high = chalk.red(`${forecast[1].high}°${degreeType}`)

  return `${temperature} and ${conditions} (${low} -> ${high})`
}

interface TodayProps {
  updateInterval?: number
  search?: string
  degreeType?: string
}

export function Today({ updateInterval, search = 'Anapolis, BR', degreeType = 'F' }: TodayProps) {
  const [fontIndex] = useState(0)
  const [now, setNow] = useState(new Date())
  const weather = useRequest(
    findWeather as () => Promise<unknown>,
    { search, degreeType },
    updateInterval
  )

  const date = now.toLocaleString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const time = figlet.textSync(now.toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }), { font: FONTS[fontIndex % FONTS.length] as Fonts })

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
      <text right={1}>{chalk.blue(date)}</text>
      <text top="center" left="center">{gradient.rainbow.multiline(time)}</text>
      <text bottom={0} left={1}>
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


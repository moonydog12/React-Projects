/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, useRef, ChangeEvent } from 'react'
import { getWeatherIcon, convertToFlag, formatDay } from './utils'

type Weather = {
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  time: Date[]
  weathercode: number[]
}

type DayProps = {
  date: Date
  max: number
  min: number
  code: number
  isToday: boolean
}

type InputProps = {
  location: string
  onChangeLocation: (event: ChangeEvent<HTMLInputElement>) => void
}

function App() {
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [displayLocation, setDisplayLocation] = useState('')
  const [weather, setWeather] = useState({})
  const prevLocationRef = useRef('')

  const onSetLocation = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement
    if (!inputElement) return
    setLocation(inputElement.value)
  }

  const fetchWeather = useCallback(async () => {
    if (location.length < 2) {
      return setWeather({})
    }
    try {
      setIsLoading(true)

      // 1) Getting location (geocoding)
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`)
      const geoData = await geoRes.json()
      if (!geoData.results) throw new Error('Location not found')
      const { latitude, longitude, timezone, name, country_code } = geoData.results[0]
      setDisplayLocation(`${name} ${convertToFlag(country_code)}`)

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      )
      const weatherData = await weatherRes.json()
      setWeather(weatherData.daily)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [location])

  /* Life cycle methods */
  useEffect(() => {
    setLocation(localStorage.getItem('location') || '')
  }, [])

  useEffect(() => {
    if (location !== prevLocationRef.current) {
      prevLocationRef.current = location
      fetchWeather()
      localStorage.setItem('location', location)
    }
  }, [fetchWeather, location])

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={location} onChangeLocation={onSetLocation} />
      {isLoading && <p className="loader">Loading</p>}
      {weather.weathercode && <Weather weather={weather} location={displayLocation} />}
    </div>
  )
}

export default App

function Input({ location, onChangeLocation }: InputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for location..."
        value={location}
        onChange={onChangeLocation}
      />
    </div>
  )
}

function Weather({ weather, location }: { weather: Weather; location: string }) {
  useEffect(() => {
    return () => console.log('Weather will unmount')
  }, [])

  const {
    temperature_2m_max: max,
    temperature_2m_max: min,
    time: dates,
    weathercode: codes,
  } = weather

  return (
    <div className="">
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, index) => (
          <Day
            date={date}
            max={max[index]}
            min={min[index]}
            code={codes[index]}
            isToday={index === 0}
            key={index}
          />
        ))}
      </ul>
    </div>
  )
}

function Day({ date, max, min, code, isToday }: DayProps) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? 'Today' : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash;<strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  )
}

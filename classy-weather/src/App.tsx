/* eslint-disable react/prop-types */
import React, { ChangeEvent } from 'react'
import { getWeatherIcon, convertToFlag, formatDay } from './utils'

type InputProps = {
  location: string
  onChangeLocation: (event: ChangeEvent<HTMLInputElement>) => void
}

type TWeather = {
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

class App extends React.Component {
  state = {
    location: '',
    isLoading: false,
    displayLocation: '',
    weather: {},
  }

  fetchWeather = async () => {
    if (this.state.location.length < 2) {
      return this.setState({ weather: {} })
    }
    try {
      this.setState({ isLoading: true })

      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      )
      const geoData = await geoRes.json()

      if (!geoData.results) throw new Error('Location not found')

      const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0)

      this.setState({ displayLocation: `${name} ${convertToFlag(country_code)}` })

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      )
      const weatherData = await weatherRes.json()
      this.setState({ weather: weatherData.daily })
    } catch (err) {
      console.error(err)
    } finally {
      this.setState({ isLoading: false })
    }
  }

  setLocation = (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement
    if (!inputElement) return
    this.setState({ location: inputElement.value })
  }

  /* Life cycle methods */
  // useEffect []
  componentDidMount() {
    this.setState({ location: localStorage.getItem('location') || '' })
  }

  // useEffect [location]
  componentDidUpdate(prevProps: any, prevState: { location: string }) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather()
    }
    localStorage.setItem('location', this.state.location)
  }

  // JSX part in function component
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input location={this.state.location} onChangeLocation={this.setLocation} />
        {this.state.isLoading && <p className="loader">Loading</p>}

        {this.state.weather.weathercode && (
          <Weather weather={this.state.weather} location={this.state.displayLocation} />
        )}
      </div>
    )
  }
}

export default App

class Input extends React.Component<InputProps> {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search for location..."
          value={this.props.location}
          // child to parent communication
          onChange={this.props.onChangeLocation}
        />
      </div>
    )
  }
}

class Weather extends React.Component<{ weather: TWeather; location: string }> {
  componentWillUnmount() {
    console.log('Weather will unmount')
  }

  render() {
    // destructure props property
    const {
      temperature_2m_max: max,
      temperature_2m_max: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather

    return (
      <div className="">
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, index) => (
            <Day
              date={date}
              max={max[index]}
              min={min[index]}
              code={codes[index]}
              key={index}
              isToday={index === 0}
            />
          ))}
        </ul>
      </div>
    )
  }
}

class Day extends React.Component<DayProps> {
  render() {
    const { date, max, min, code, isToday } = this.props
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
}

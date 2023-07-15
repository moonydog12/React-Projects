import { useEffect } from 'react'

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    // clean up in help - reset the timer each time restarting
    return () => clearInterval(id)
  }, [dispatch])
  return (
    <div className="timer">
      {minutes < 10 ? '0' : null}
      {minutes}:{seconds < 10 ? '0' : null}
      {seconds}
    </div>
  )
}

export default Timer

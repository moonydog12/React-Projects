import { useEffect, useRef } from 'react'

function useOutSideClick(handler, listenCapturing = true) {
  const ref = useRef()

  useEffect(() => {
    const handleClick = (event) => {
      // outside of window is clicked
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('click', handleClick, listenCapturing)

    return () => document.removeEventListener('click', handleClick, listenCapturing)
  }, [handler, listenCapturing])

  return ref
}

export default useOutSideClick

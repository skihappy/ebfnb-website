import { useState, useEffect } from 'react'

type Listener = (value: boolean) => void
type Unsubscriber = () => void
type Subscriber = (listener: Listener) => Unsubscriber

const addListener = setListeners => listener => {
  setListeners(listeners => [...listeners, listener])

  return () =>
    setListeners(listeners => listeners.filter(fn => fn !== listener))
}

const useBoolean = (
  initial: boolean
): {
  onBooleanChange: Subscriber
  onBooleanTrue: Subscriber
  onBooleanFalse: Subscriber
  getBoolean: () => boolean
  setBoolean: (value: boolean) => boolean
  toggleBoolean: () => boolean
} => {
  const [state, setState] = useState(initial)
  const [onChangeListeners, setOnChangeListeners] = useState([])
  const [onFalseListeners, setOnFalseListeners] = useState([])
  const [onTrueListeners, setOnTrueListeners] = useState([])

  const changeState = (value: boolean) => {
    if (state !== value) {
      setState(value)
      onChangeListeners.forEach(fn => fn(value))

      if (value === true) {
        onTrueListeners.forEach(fn => fn(value))
      } else {
        onFalseListeners.forEach(fn => fn(value))
      }
    }
    return value
  }

  return {
    onBooleanChange: addListener(setOnChangeListeners),
    onBooleanTrue: addListener(setOnTrueListeners),
    onBooleanFalse: addListener(setOnFalseListeners),
    getBoolean: () => state,
    setBoolean: changeState,
    toggleBoolean: () => changeState(!state),
  }
}

export default useBoolean

import { useState, useEffect } from 'react'

enum Event {
  onChange = 'onChange',
  onTrue = 'onTrue',
  onFalse = 'onFalse',
}
type EventListener = (boolean) => void
type EventListeners = EventListener[]
type RemoveEventListener = (Event, EventListener) => void
type AddEventListener = (Event, EventListener) => () => void

const useBoolean = (initBooleanValue: boolean) => {
  const [value, setValue] = useState(initBooleanValue)
  const [booleanListeners] = useState({
    onChange: [],
    onTrue: [],
    onFalse: [],
  })

  const callListeners = (event: Event, newValue) =>
    booleanListeners[event].forEach(listener => listener(newValue))

  const setBoolean = (newValue: boolean) => {
    if (value !== newValue) {
      setValue(newValue)
      callListeners('onChange', newValue)
      if (newValue === true) {
        callListeners('onTrue', newValue)
      } else {
        callListeners('onFalse', newValue)
      }
    }
  }
  const toggleBoolean = () => setBoolean(!value)
  const getBoolean = () => value
  const removeEventListener: RemoveEventListener = (event, listener) => {
    const index = booleanListeners[event].indexOf(listener)
    if (index > -1) {
      booleanListeners[event].splice(index)
    }
  }
  const addEventListener: AddEventListener = (event, listener) => {
    booleanListeners[event].push(listener)
    return () => removeEventListener(event, listener)
  }
  return {
    addEventListener,
    removeEventListener,
    getBoolean,
    setBoolean,
    toggleBoolean,
  }
}

export default useBoolean

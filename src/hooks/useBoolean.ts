import { useState, useEffect } from 'react'

enum Event {
  onChange = 'onChange',
  onTrue = 'onTrue',
  onFalse = 'onFalse',
}
type Listener = (boolean) => never
type Listeners = Listener[]
type Unlisten = (Event, Listener) => never
type Listen = (Event, Listener) => () => never

const useBoolean = (initValue: boolean) => {
  const [value, setValue] = useState(initValue)
  const [listeners] = useState({
    onChange: [],
    onTrue: [],
    onFalse: [],
  })

  const callListeners = (event: Event, newValue) =>
    listeners[event].forEach(listener => listener(newValue))

  const set = (newValue: boolean) => {
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
  const toggle = () => set(!value)
  const get = () => value
  const unlisten: Unlisten = (event, listener) => {
    const index = listeners[event].indexOf(listener)
    if (index > -1) {
      listeners[event].splice(index)
    }
  }
  const listen: Listen = (event, listener) => {
    listeners[event].push(listener)
    return () => unlisten(event, listener)
  }
  return {
    listen,
    unlisten,
    get,
    set,
    toggle,
  }
}

export default useBoolean

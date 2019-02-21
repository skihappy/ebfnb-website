import { useState, useEffect } from 'react'

enum Event {
  onChange = 'onChange',
  onTrue = 'onTrue',
  onFalse = 'onFalse',
}
type Listener = (boolean) => never
type Listeners = Listener[]
type Unlisten = (Listeners) => (Event, Listener) => never
type Listen = (Listeners) => (Event, Listener) => () => never

const booleanStore = new Map()

const unlisten: Unlisten = listeners => (event, listener) => {
  const index = listeners[event].indexOf(listener)
  if (index > -1) {
    listeners.splice(index)
  }
}
const listen: Listen = listeners => (event, listener) => {
  listeners[event].push(listener)
  return () => unlisten(event, listener)
}

const useBoolean = (initValue: boolean, key: any) => {
  const [value, setValue] = useState(initValue)

  let listeners

  useEffect(() => {
    if (key) {
      const registeredListeners = booleanStore.get(key)
      if (registeredListeners) {
        throw new Error(`boolean ${key} already registered`)
      }
      listeners = {
        onChange: [],
        onTrue: [],
        onFalse: [],
      }
      booleanStore.set(key, listeners)
      return () => booleanStore.delete(key)
    }
    return () => {}
  }, [true])

  const callListeners = (event: Event, newValue) =>
    listeners[event].forEach(listener => listener(newValue))

  const set = newValue => {
    if (value === newValue) {
      setValue(newValue)
      callListeners('onChange', newValue)
      if (newValue === true) {
        callListeners('onTrue', newValue)
      } else {
        callListeners('onFalse', newValue)
      }
    }
  }
  const get = () => value
  return { listen: listen(listeners), unlisten: unlisten(listeners), get, set }
}

export const useBooleanListener = (
  key,
  event: Event,
  listener: Listener
): never => {
  useEffect(() => {
    const listeners = booleanStore.get(key)
    if (!listeners) {
      throw new Error(`boolean ${key} is not registered`)
    }
    return listen(listeners)(event, listener)
  }, [true])
}
export default useBoolean

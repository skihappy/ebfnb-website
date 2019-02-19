import { useState } from 'react'

enum Trigger {
  onClick = 'onClick',
}
interface Options {
  trigger?: Trigger
  onToggle?: (isToggled: boolean) => never
}
const useToggle = (initIsToggled: boolean, options: Options) => {
  const { trigger = 'onClick', onToggle = () => {} } = options || {}
  const [isToggled, setIsToggled] = useState(false)

  const getToggleProps = ({ ...props }) => {
    const toggleProps = { ...props, istoggled: `${isToggled}` }
    switch (trigger) {
      case Trigger.onClick:
        return {
          ...toggleProps,
          onClick: () => {
            setIsToggled(state => !state)
            onToggle(isToggled)
          },
        }
      default:
        return toggleProps
    }
  }
  return [isToggled, getToggleProps]
}
export default useToggle

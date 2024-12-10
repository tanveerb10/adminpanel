import { useState } from 'react'

import { HexColorPicker, HexColorInput } from 'react-colorful'
import { useDebounce } from 'react-use'

// Style Imports
import styles from './styles.module.css'

const DebouncedColorPicker = ({ color, onChange }) => {
  const [debouncedColor, setDebouncedColor] = useState(color)

  useDebounce(() => onChange(debouncedColor), 200, [debouncedColor])

  return (
    <div>
      <HexColorPicker color={debouncedColor} onChange={setDebouncedColor} />
      <HexColorInput
        color={debouncedColor}
        onChange={setDebouncedColor}
        className={styles.hexColorInput}
        prefixed
        placeholder='Type a color'
      />
    </div>
  )
}

export default DebouncedColorPicker

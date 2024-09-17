import Button from '@mui/material/Button'
import debounce from 'lodash.debounce'

const DEBOUNCING_TIME: number = 500

export const DebouncedButton = ({ text, onClick, variant, sx }: any) => {
  const debouncedOnclick = debounce(() => {
    onClick()
  }, DEBOUNCING_TIME)

  return (
    <Button onClick={debouncedOnclick} variant={variant} sx={sx}>
      {text}
    </Button>
  )
}

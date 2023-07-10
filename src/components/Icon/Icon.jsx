import useState from 'react'
import { IconButton } from '@mui/material'
import { RadioFilledIcon } from '../../assets/icons'

export const Radio = ({ children, variant, ...props }) => {
   const [radio, setRadio] = useState(false)
   const clickRadioHandler = () => {
      setRadio(!radio)
   }
   return (
      <IconButton onClick={clickRadioHandler} variant={variant} props={props}>
         {radio ? <RadioFilledIcon /> : <div>{children}</div>}
      </IconButton>
   )
}

import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'
import { errorToastMessageState, isErrorToastOpenState, isMobileState, isSuccessToastOpenState, successToastMessageState } from '@store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function Toast() {
  const isMobile: boolean = useRecoilValue(isMobileState)

  const isErrorToastOpen: boolean = useRecoilValue(isErrorToastOpenState)
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const errorToastMessage: string = useRecoilValue(errorToastMessageState)

  const isSuccessToastOpen: boolean = useRecoilValue(isSuccessToastOpenState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)
  const successToastMessage: string = useRecoilValue(successToastMessageState)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setIsErrorToastOpen(false)
    setIsSuccessToastOpen(false)
  }

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={isErrorToastOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: isMobile ? '90%' : '100%', marginBottom: '30px', whiteSpace: 'pre-line' }}>
          {errorToastMessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={isSuccessToastOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: isMobile ? '90%' : '100%', marginBottom: '30px', whiteSpace: 'pre-line' }}>
          {successToastMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

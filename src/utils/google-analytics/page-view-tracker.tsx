import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

export const PageviewTracker = () => {
  const location = useLocation()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (process.env.REACT_APP_GA_MEASUREMENT_ID) {
      ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID)
      setInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname })
      ReactGA.send('pageview')
    }
  }, [initialized, location])
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Store, persistor } from './Redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

const rootElement = document.getElementById('root')

const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1046791269108-f2v696or6lumqgrbilntsmmol9jro5hq.apps.googleusercontent.com">
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
)

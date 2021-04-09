import { useEffect } from 'react'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '../styles/main.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useStore } from '../store'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import Layout from '../components/layout'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#15803D",
    }
  },
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const router = useRouter()
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          {
            !router.pathname.includes('checkout') ?
              <Layout >
                <Component {...pageProps} />
              </Layout>
            : <Component {...pageProps} />
          }
        </PersistGate>
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp

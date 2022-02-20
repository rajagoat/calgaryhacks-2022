import '../styles/globals.css'
import Layout from '../components/Layout'
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '../src/authConfig';

function MyApp({ Component, pageProps }) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <Layout>
      <MsalProvider instance={msalInstance}>
        <Component {...pageProps} />
      </MsalProvider>
    </Layout>
  )
}

export default MyApp

import '../styles/globals.css'
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '../src/authConfig';

function MyApp({ Component, pageProps }) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
      <MsalProvider instance={msalInstance}>
        <Component {...pageProps} />
      </MsalProvider>
  )
}

export default MyApp

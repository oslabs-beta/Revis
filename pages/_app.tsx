import HomePage from '.';
import { GlobalProvider } from '../context/Provider';
import '../styles/globals.scss';
// import '../styles/LeftSide.scss';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;

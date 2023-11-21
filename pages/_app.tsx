import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/global.css';

import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Provider } from 'react-redux';
import AppProvider from '@/context';
import store from '@/store';
import { SessionProvider } from 'next-auth/react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';

interface MyAppProps extends AppProps {}

registerLocale('es', es);
setDefaultLocale('es');

function MyApp({ Component, pageProps, ...contextProps }: MyAppProps) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <AppProvider {...contextProps}>
          <Component {...pageProps} />
        </AppProvider>
      </SessionProvider>
    </Provider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  return {
    ...appProps,
  };
};

export default MyApp;

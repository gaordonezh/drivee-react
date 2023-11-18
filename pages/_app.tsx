import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/global.css';

import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Provider } from 'react-redux';
import AppProvider from '@/context';
import LayoutSwitch from '@/components/templates';
import store from '@/store';
import { SessionProvider } from 'next-auth/react';

interface MyAppProps extends AppProps {}

function MyApp({ Component, ...rest }: MyAppProps) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <AppProvider>
          <LayoutSwitch>
            <Component />
          </LayoutSwitch>
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

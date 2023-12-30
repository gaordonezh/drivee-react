import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/global.css';

import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Provider } from 'react-redux';
import AppProvider, { ExtraAppProps } from '@/context';
import store from '@/store';
import { SessionProvider, getSession } from 'next-auth/react';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { setCookie } from '@/utils/storage';
import { USER_SESSION_KEY } from '@/utils/constants';
import { UserProps } from '@/store/user/user';
import { objectCleaner } from '@/utils/functions';
import es from 'date-fns/locale/es';
import moment from 'moment-timezone';
import 'moment/locale/es';

interface MyAppProps extends AppProps, ExtraAppProps {}

registerLocale('es', es);
setDefaultLocale('es');
moment.tz.setDefault('America/Lima');

function MyApp({ Component, pageProps, ...contextProps }: Readonly<MyAppProps>) {
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
  const session = await getSession({ req: context.ctx.req });
  // @ts-ignore
  if (session?.user.token) setCookie(USER_SESSION_KEY, session?.user.token, { req: context.ctx.req, res: context.ctx.res });

  let user: null | UserProps = null;

  if (session?.user) {
    user = objectCleaner({
      ...(session.user as any),
      token: undefined,
    });
  }

  return { ...appProps, user };
};

export default MyApp;

import React, { useEffect, useState } from 'react';
import DashboardLayout from './Dashboard';
import PublicLayout from './Public';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import LayoutEnum from '@/enums/layout.enum';
import AuthLayout from './Auth';
import { UserRolesEnum } from '@/store/user/user.enum';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context';
import Loader from '../atoms/Loader';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

interface LayoutProps {
  children: React.ReactNode;
  layout: LayoutEnum;
  title?: string;
  description?: string;
  image?: string;
  authRoles?: Array<UserRolesEnum>;
}

const Layout = ({ children, layout, ...rest }: LayoutProps) => {
  const router = useRouter();
  const { user } = useAppContext();
  const [loading, setLoading] = useState(Boolean(rest.authRoles));

  useEffect(() => {
    if (!rest.authRoles || !user) return;
    const hassAccess = user.roles.reduce((prev, next) => {
      prev = prev || Boolean(rest.authRoles?.includes(next));
      return prev;
    }, false);
    if (!hassAccess) {
      router.replace('/dashboard');
      return;
    }
    setLoading(false);
  }, [rest.authRoles, user]);

  const params = {
    [LayoutEnum.PUBLIC]: {
      element: <PublicLayout>{children}</PublicLayout>,
      image: 'https://cdn-icons-png.flaticon.com/512/2554/2554936.png',
      title: 'Drivee',
    },
    [LayoutEnum.DASHBOARD]: {
      element: <DashboardLayout>{children}</DashboardLayout>,
      image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg',
      title: 'Dashboard - Drivee',
    },
    [LayoutEnum.AUTH]: {
      element: <AuthLayout>{children}</AuthLayout>,
      image: 'https://icons.veryicon.com/png/o/miscellaneous/simple-line-icon/authentication-16.png',
      title: 'Iniciar sesión - Drivee',
    },
  };

  const title = rest.title ?? params[layout].title;
  const image = rest.image ?? params[layout].image;
  const description =
    rest.description ??
    'El mejor mercado de vehículos compartidos. ¿Tiene un vehículo? Gana dinero como Anfitrión. Alquile el coche de sus sueños como invitado.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} key="title" />
        <meta name="description" content={description} key="description" />
        <meta name="keywords" content="drivee, alquiler, alquiler de vehiculos" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:image" content={image} key="og:image" />
        <link rel="icon" href={image} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {layout === LayoutEnum.PUBLIC ? null : (
          <>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
          </>
        )}
      </Head>

      <main className={inter.className}>
        {loading ? (
          <div className="h-screen flex items-center">
            <Loader />
          </div>
        ) : (
          params[layout].element
        )}
      </main>
    </>
  );
};

export default Layout;

import React from 'react';
import DashboardLayout from './Dashboard';
import PublicLayout from './Public';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useAppContext } from '@/context';
import LayoutEnum from '@/enums/layout.enum';
import AuthLayout from './Auth';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

interface LayoutSwitchProps {
  children: React.ReactNode;
}

const LayoutSwitch = ({ children }: LayoutSwitchProps) => {
  const { layoutKey } = useAppContext();

  const params = {
    [LayoutEnum.PUBLIC]: {
      element: <PublicLayout>{children}</PublicLayout>,
      image: 'https://cdn-icons-png.flaticon.com/512/2554/2554936.png',
      title: 'PUBLIC - DRIVEE',
    },
    [LayoutEnum.DASHBOARD]: {
      element: <DashboardLayout>{children}</DashboardLayout>,
      image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg',
      title: 'DASHBOARD - DRIVEE',
    },
    [LayoutEnum.AUTH]: {
      element: <AuthLayout>{children}</AuthLayout>,
      image: 'https://icons.veryicon.com/png/o/miscellaneous/simple-line-icon/authentication-16.png',
      title: 'AUTH - DRIVEE',
    },
  };

  return (
    <>
      <Head>
        <title>{params[layoutKey].title}</title>
        <meta name="title" content="Drivee" key="title" />
        <meta name="description" content="El mejor mercado de vehículos compartidos" key="description" />
        <meta name="keywords" content="drivee, alquiler, alquiler de vehiculos" />
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta property="og:title" content="Drivee" key="og:title" />
        <meta
          property="og:description"
          content="El mejor mercado de vehículos compartidos. ¿Tiene un vehículo? Gana dinero como Anfitrión. Alquile el coche de sus sueños como invitado."
          key="og:description"
        />
        <meta property="og:image" content={params[layoutKey].image} key="og:image" />
        <link rel="icon" href={params[layoutKey].image} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {layoutKey === LayoutEnum.PUBLIC ? null : (
          <>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
          </>
        )}
      </Head>

      <main className={inter.className}>{params[layoutKey].element}</main>
    </>
  );
};

export default LayoutSwitch;

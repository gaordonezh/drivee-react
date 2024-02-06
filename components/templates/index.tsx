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
  path?: string;
}

const Layout = ({ children, layout, ...rest }: LayoutProps) => {
  const router = useRouter();
  const { user } = useAppContext();
  const [loading, setLoading] = useState(Boolean(rest.authRoles));
  const realURL = `https://drivee-client.vercel.app${rest.path ?? router.pathname}`;

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
      image: 'https://drivee-files.s3.amazonaws.com/drivee-logo-dark.png',
      title: 'Drivee',
    },
    [LayoutEnum.DASHBOARD]: {
      element: <DashboardLayout>{children}</DashboardLayout>,
      image: 'https://drivee-files.s3.amazonaws.com/drivee-logo-dark.png',
      title: 'Dashboard - Drivee',
    },
    [LayoutEnum.AUTH]: {
      element: <AuthLayout>{children}</AuthLayout>,
      image: 'https://drivee-files.s3.amazonaws.com/drivee-logo-dark.png',
      title: 'Iniciar sesión - Drivee',
    },
  };

  const title = rest.title ?? params[layout].title;
  const imagePath = rest.image ?? params[layout].image;
  const description =
    rest.description ??
    'El mejor mercado de vehículos compartidos. ¿Tiene un vehículo? Gana dinero como Anfitrión. Alquile el coche de sus sueños como invitado.';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content="drivee, alquiler, alquiler de vehiculos" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link data-default-icon={imagePath} rel="icon" sizes="192x192" href={imagePath} />
        <link rel="canonical" href={realURL} />
        <meta charSet="utf-8" />

        {/* TWITTER TAGS - START */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@drivee" />
        <meta name="twitter:maxage" content="86400" />
        <meta name="twitter:image" content={imagePath} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {/* TWITTER TAGS - END */}

        {/* OG TAGS - START */}
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Drivee" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imagePath} />
        <meta property="og:url" content={realURL} />
        <meta property="og:description" content={description} />
        {/* OG TAGS - END */}

        {layout === LayoutEnum.PUBLIC ? null : (
          <>
            <meta name="robots" content="noarchive, noimageindex" />
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

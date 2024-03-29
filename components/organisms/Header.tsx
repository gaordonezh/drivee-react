import React from 'react';
import Button from '../atoms/Button';
import { useRouter } from 'next/router';
import Container from '../molecules/Container';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { combineClassnames } from '@/utils/functions';
import { USER_SESSION_KEY } from '@/utils/constants';
import Link from 'next/link';
import { useAppContext } from '@/context';
import Divider from '../protons/Divider';
import { MdLogout, MdDashboard } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { deleteCookie } from '@/utils/storage';

const Header = () => {
  const { push, pathname, asPath } = useRouter();
  const { user } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [fixed, setFixed] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setFixed(true);
      else setFixed(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = () => {
    signOut({ callbackUrl: '/auth/signin', redirect: true });
    deleteCookie(USER_SESSION_KEY);
  };

  return (
    <header className={combineClassnames('bg-black px-10 py-5', fixed ? 'sticky top-0 z-20' : '')}>
      <Container>
        <nav className="flex gap-5 items-center">
          <Link href="/" className="font-black text-3xl text-white cursor-pointer">
            Drivee
          </Link>
          <Link
            href="/booking"
            className={combineClassnames('hidden lg:block', pathname === '/booking' ? 'text-gray-200 font-semibold' : 'text-gray-400')}
          >
            Alquila un vehículo
          </Link>
          <Link
            href="/share"
            className={combineClassnames('hidden lg:block', pathname === '/share' ? 'text-gray-200 font-semibold' : 'text-gray-400')}
          >
            Conviertete en socio
          </Link>
          <Link href="/rent" className={combineClassnames('hidden lg:block', pathname === '/rent' ? 'text-gray-200 font-semibold' : 'text-gray-400')}>
            Únete a nosotros
          </Link>

          <div className="flex-1" />

          {user ? (
            <div className="dropdown__avatar hidden lg:block">
              <div
                className="h-[33px] w-[33px] rounded-full bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${user.photo ?? '/images/profile.png'})` }}
              />
              <div className="dropdown__avatar--content">
                <div className="flex flex-col gap-5">
                  <p className="text-slate-800 font-semibold">
                    Hola {user.f_name}
                    <br />
                    <span className="text-xs font-normal">{user.email}</span>
                  </p>
                  <Divider />
                  <Link href="/dashboard" className="text-gray-500 flex gap-2 items-center text-sm">
                    <MdDashboard size={17} /> Administración
                  </Link>
                  <Link href="/dashboard/profile" className="text-gray-500 flex gap-2 items-center text-sm">
                    <FaUserAlt size={15} /> Mi cuenta
                  </Link>
                  <button onClick={handleClose} className="text-gray-500 flex gap-2 items-center text-sm">
                    <MdLogout size={17} /> Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              size="large"
              variant="outlined"
              onClick={() => push({ pathname: '/auth/signin', query: { page: asPath } })}
              className="hidden lg:block"
            >
              Iniciar sesión
            </Button>
          )}
          <BiMenu color="FFFFFF" size={44} className="cursor-pointer lg:hidden" onClick={() => setOpen(true)} />
        </nav>
        <div className={combineClassnames(open ? 'fixed' : 'hidden', 'bg-black top-0 left-0 right-0 bottom-0 px-10 py-6 z-50 lg:hidden')}>
          <div className="flex flex-col gap-5 h-full">
            <div className="flex align-middle justify-between">
              <h1 className="font-black text-3xl text-white">Drivee</h1>
              <AiOutlineClose color="FFFFFF" size={40} className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>

            {user ? (
              <>
                <div className="flex flex-row gap-5 items-center">
                  <div
                    className="h-[50px] w-[50px] rounded-full bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${user.photo ?? '/images/profile.png'})` }}
                  />
                  <div>
                    <p className="text-white font-semibold text-lg">Hola {user.f_name}</p>
                    <p className="text-slate-400 font-light text-sm">{user.email}</p>
                  </div>
                </div>

                <Divider className="my-5 !bg-slate-600" />
              </>
            ) : null}

            <Link href="/booking" className={combineClassnames(pathname === '/booking' ? 'text-gray-200 font-semibold' : 'text-gray-400')}>
              Alquila un vehículo
            </Link>
            <Link
              href="/share"
              className={combineClassnames(user ? '' : 'mt-5', pathname === '/share' ? 'text-gray-200 font-semibold' : 'text-gray-400')}
            >
              Conviertete en socio
            </Link>
            <Link href="/rent" className={combineClassnames(pathname === '/rent' ? 'text-gray-200 font-semibold' : 'text-gray-400')}>
              Únete a nosotros
            </Link>
            <div className="flex-1" />

            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-500 flex gap-2 items-center">
                  <MdDashboard size={17} /> Administración
                </Link>
                <Link href="/dashboard/profile" className="text-gray-500 flex gap-2 items-center">
                  <FaUserAlt size={15} /> Mi cuenta
                </Link>
                <button onClick={handleClose} className="text-gray-500 flex gap-2 items-center">
                  <MdLogout size={17} /> Cerrar sesión
                </button>
              </>
            ) : (
              <Button fullWidth size="large" variant="white" onClick={() => push({ pathname: '/auth/signin', query: { page: asPath } })}>
                Iniciar sesión
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

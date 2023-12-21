import React from 'react';
import Button from '../atoms/Button';
import { useRouter } from 'next/router';
import Container from '../molecules/Container';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { combineClassnames } from '@/utils/functions';
import { IMAGE_LIST } from '@/utils/constants';
import Link from 'next/link';

const HeaderPublic = () => {
  const { push } = useRouter();
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

  const withAccess = false;

  const profileButton = (
    <button className="flex flex-row items-center text-white text-base gap-2" onClick={() => push('/dashboard')}>
      Cuenta
      <div className="h-[33px] w-[33px] rounded-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${IMAGE_LIST[0]})` }} />
    </button>
  );

  return (
    <header className={combineClassnames('bg-black px-10 py-5', fixed ? 'sticky top-0 z-20' : '')}>
      <Container>
        <nav className="flex gap-5 items-center">
          <Link href="/" className="font-black text-3xl text-white cursor-pointer">
            Drivee
          </Link>
          <Link href="/share" className="text-white hidden lg:block">
            Conviertete en socio
          </Link>
          <Link href="/rent" className="text-white hidden lg:block">
            Únete a nosotros
          </Link>
          <Link href="/booking" className="text-white hidden lg:block">
            Alquila un vehículo
          </Link>

          <div className="flex-1" />

          {withAccess ? (
            profileButton
          ) : (
            <>
              <Button size="large" variant="outlined" onClick={() => push('/auth/signin')} className="hidden lg:block">
                Iniciar sesión
              </Button>
              <Button size="large" variant="white" onClick={() => push('/auth/signup')} className="hidden lg:block">
                Registrate
              </Button>
            </>
          )}
          <BiMenu color="FFFFFF" size={44} className="cursor-pointer lg:hidden" onClick={() => setOpen(true)} />
        </nav>
        <div className={combineClassnames(open ? 'fixed' : 'hidden', 'bg-black top-0 left-0 right-0 bottom-0 px-10 py-6 z-50 lg:hidden')}>
          <div className="flex flex-col gap-5 h-full">
            <div className="flex align-middle justify-between">
              <h1 className="font-black text-3xl text-white">Drivee</h1>
              <AiOutlineClose color="FFFFFF" size={40} className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>

            <Link href="/share" className="text-white mt-5">
              Conviertete en socio
            </Link>
            <Link href="/rent" className="text-white">
              Únete a nosotros
            </Link>
            <Link href="/booking" className="text-white">
              Alquila un vehículo
            </Link>
            <div className="flex-1" />

            {withAccess ? (
              profileButton
            ) : (
              <>
                <Button fullWidth size="large" variant="outlined" onClick={() => push('/auth/signin')}>
                  Iniciar sesión
                </Button>
                <Button fullWidth size="large" variant="white" onClick={() => push('/auth/signup')}>
                  Registrate
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderPublic;

import React from 'react';
import Button from '../atoms/Button';
import { useRouter } from 'next/router';
import Container from '../molecules/Container';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import { combineClassnames } from '@/utils/functions';

const HeaderPublic = () => {
  const { push } = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="bg-black px-10 py-5">
      <Container>
        <nav className="flex gap-5">
          <h1 className="font-black text-3xl text-white cursor-pointer" onClick={() => push('/')}>
            Drivee
          </h1>
          <div className="flex-1" />
          <Button size="large" variant="outlined" onClick={() => push('/auth/signin')} className="hidden lg:block">
            Iniciar sesión
          </Button>
          <Button size="large" variant="white" onClick={() => push('/auth/signup')} className="hidden lg:block">
            Registrate
          </Button>
          <BiMenu color="FFFFFF" size={44} className="cursor-pointer lg:hidden" onClick={() => setOpen(true)} />
        </nav>
        <div className={combineClassnames(open ? 'fixed' : 'hidden', 'bg-black top-0 left-0 right-0 bottom-0 p-5 z-50 lg:hidden')}>
          <div className="flex flex-col gap-10">
            <div className="flex align-middle justify-between">
              <h1 className="font-black text-3xl text-white">Drivee</h1>
              <AiOutlineClose color="FFFFFF" size={40} className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>

            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-white">Lorem ipsum dolor sit amet.</p>

            <Button fullWidth size="large" variant="outlined" onClick={() => push('/auth/signin')}>
              Iniciar sesión
            </Button>
            <Button fullWidth size="large" variant="white" onClick={() => push('/auth/signup')}>
              Registrate
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderPublic;

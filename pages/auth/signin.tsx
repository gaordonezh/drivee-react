import { useEffect } from 'react';
import { getSession, useSession, signOut, signIn } from 'next-auth/react';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/components/atoms/Button';
import Chip from '@/components/atoms/Chip';
import Input from '@/components/atoms/Input';
import Divider from '@/components/protons/Divider';

const Signin = () => {
  // const res2 = useSession();

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const res = await getSession();
    console.log(res?.user);
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Iniciar Sesión</h2>

      <div className="flex flex-col gap-2 mt-10">
        <Chip label="Continuar con Facebook" iconLeft={<BsFacebook size={20} color="1877F2" />} onClick={() => signIn('facebook')} />
        <Chip label="Continuar con Google" iconLeft={<FcGoogle size={20} />} onClick={() => signIn('google')} />
        <Chip label="Continuar con GitHub" iconLeft={<BsGithub size={20} color="111111" />} onClick={() => signIn('github')} />
      </div>
      <Divider className="my-5" />
      <form autoComplete="on" className="flex flex-col gap-4">
        <Input label="Usuario" type="text" autoComplete="user" required placeholder="Ingresa tu usuario" />
        <Input label="Contraseña" type="password" autoComplete="new-password" required placeholder="Ingresa tu contraseña" />
        <Button fullWidth size="large" type="submit" className="mt-4">
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
};

export default Signin;

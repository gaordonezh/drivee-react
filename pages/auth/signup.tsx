import { signIn } from 'next-auth/react';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/components/atoms/Button';
import Chip from '@/components/atoms/Chip';
import Input from '@/components/atoms/Input';
import Divider from '@/components/protons/Divider';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';

const Signup = () => {
  return (
    <Layout layout={LayoutEnum.AUTH}>
      <div className="mt-5">
        <h2 className="font-bold text-2xl">Registrate</h2>
        <p className="font-light text-sm">
          Nos encantaría tenerte con nosotros. Únete a nuestros clientes en todo el mundo y mejore su productividad
        </p>

        <div className="flex flex-col gap-2 mt-10">
          <Chip label="Continuar con Facebook" iconLeft={<BsFacebook size={20} color="1877F2" />} onClick={() => signIn('facebook')} />
          <Chip label="Continuar con Google" iconLeft={<FcGoogle size={20} />} onClick={() => signIn('google')} />
          <Chip label="Continuar con GitHub" iconLeft={<BsGithub size={20} color="111111" />} onClick={() => signIn('github')} />
        </div>
        <Divider className="my-5" />
        <form autoComplete="on" className="flex flex-col gap-4">
          <Input label="Nombre" type="text" autoComplete="name" required placeholder="Ingresa tu nombre" />
          <Input label="Correo" type="email" autoComplete="email" required placeholder="Ingresa tu correo" />
          <Input label="Contraseña" type="password" autoComplete="new-password" required placeholder="Ingresa tu contraseña" />
          <Input
            label="Confirmar contraseña"
            type="password"
            autoComplete="confirm-password"
            required
            placeholder="Vuelve a ingresar tu contraseña"
          />
          <Button fullWidth size="large" type="submit" className="mt-4">
            Registrarme
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;

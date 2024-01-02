import { useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import Button from '@/components/atoms/Button';
import Chip from '@/components/atoms/Chip';
import Input from '@/components/atoms/Input';
import Divider from '@/components/protons/Divider';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputPassword from '@/components/molecules/InputPassword';
import Spinner from '@/components/molecules/Spinner';
import { EMAIL_PATTERN } from '@/utils/constants';

type InputsType = {
  email: string;
  password: string;
};

const Signin = () => {
  const router = useRouter();
  const { register, handleSubmit, formState, setError } = useForm<InputsType>({ mode: 'onChange' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const res = await getSession();
    if (res?.user?.email) router.push('/dashboard');
    setLoading(false);
  };

  const handleLogin: SubmitHandler<InputsType> = async (fields) => {
    try {
      setLoading(true);
      const res = await signIn('credentials', { ...fields, redirect: false });
      if (res?.error) throw new Error(res.error);
      await router.push((router.query.page as string) || '/dashboard');
    } catch (error) {
      setError('email', { message: 'Usuario incorrecto.' });
      setError('password', { message: 'Contraseña incorrecta.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout layout={LayoutEnum.AUTH}>
      <div className="mt-5">
        <h2 className="font-bold text-2xl">Iniciar Sesión</h2>
        <p className="text-sm">Selecciona una cuenta para continuar</p>
        <div className="flex flex-col gap-2 mt-5">
          <Chip label="Continuar con Google" iconLeft={<FcGoogle size={20} />} onClick={() => signIn('google')} disabled={loading} />
        </div>
        <Divider className="my-5" />

        <p className="text-sm mb-5">O completa el formulario para iniciar sesión</p>

        <Spinner loading={loading}>
          <form autoComplete="on" className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
            <Input
              label="Usuario"
              autoComplete="username"
              placeholder="Ingresa tu usuario"
              type="email"
              error={Boolean(formState.errors.email)}
              errorMessage={formState.errors.email?.message || ''}
              {...register('email', {
                validate: {
                  required: (value) => {
                    if (!value.trim()) return 'El correo es requerido';
                  },
                },
                pattern: { message: 'Ingrese un correo válido', value: EMAIL_PATTERN },
              })}
            />
            <InputPassword
              label="Contraseña"
              autoComplete="new-password"
              placeholder="Ingresa tu contraseña"
              error={Boolean(formState.errors.password)}
              errorMessage={formState.errors.password?.message || ''}
              {...register('password', {
                validate: {
                  required: (value) => {
                    if (!value.trim()) return 'La contraseña es requerida';
                  },
                },
                minLength: { value: 8, message: 'Son 8 caracteres como mínimo' },
                maxLength: { value: 20, message: 'Son 20 caracteres como máximo' },
              })}
            />
            <Button fullWidth size="large" type="submit" className="mt-4">
              Iniciar sesión
            </Button>
            <Button fullWidth size="large" type="button" variant="white" className="!border-black" onClick={() => router.push('/')}>
              Cancelar
            </Button>
          </form>
        </Spinner>
      </div>
    </Layout>
  );
};

export default Signin;

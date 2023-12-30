import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { NextPageContext } from 'next';
import InputPassword from '@/components/molecules/InputPassword';
import Button from '@/components/atoms/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsArrowRight } from 'react-icons/bs';
import Alert from '@/components/atoms/Alert';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { createPassword } from '@/store/user/user.slice';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Spinner from '@/components/molecules/Spinner';
import Input from '@/components/atoms/Input';

interface CreatePasswordProps {
  token: string;
  email: string;
}

type InputsType = {
  password: string;
  passwordConfirm: string;
};

const CreatePassword = ({ token, email }: CreatePasswordProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState } = useForm<InputsType>({ mode: 'onChange' });
  const { createPasswordState } = useAppSelector((state) => state.user);

  const handleSend: SubmitHandler<InputsType> = async (fields) => {
    await dispatch(createPassword({ password: fields.password, token }));
  };

  return (
    <Layout layout={LayoutEnum.AUTH}>
      {createPasswordState === RequestStatusEnum.SUCCESS ? (
        <>
          <h2 className="text-xl font-bold mb-5">Tu contraseña se creó correctamente</h2>
          <p className="text-sm text-gray-500">En unos segundos seras redirigido a tu cuenta.</p>
        </>
      ) : (
        <Spinner loading={createPasswordState === RequestStatusEnum.PENDING}>
          <h2 className="text-xl font-bold mb-5">Crea tu contraseña</h2>
          {createPasswordState === RequestStatusEnum.ERROR ? (
            <Alert title="¡Ocurrió un error!" description="El token expiró o ya fue realizada la creación de la contraseña." variant="error" />
          ) : null}
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleSend)}>
            <Input label="Correo" value={email} type="email" readOnly autoComplete="username" />
            <InputPassword
              placeholder="Ingresa tu contraseña"
              label="Contraseña"
              error={Boolean(formState.errors.password)}
              autoComplete="new-password"
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

            <InputPassword
              placeholder="Confirma tu contraseña"
              label="Confirma contraseña"
              error={Boolean(formState.errors.passwordConfirm)}
              errorMessage={formState.errors.passwordConfirm?.message || ''}
              autoComplete="new-password"
              {...register('passwordConfirm', {
                validate: {
                  equalPassword: (value) => {
                    if (!value.trim()) return 'La contraseña es requerida';
                    if (watch('password') !== value) return 'Las contraseñas no coinciden';
                  },
                },
              })}
            />
            <Button size="large" className="mt-5" type="submit">
              Continuar <BsArrowRight />
            </Button>
          </form>
        </Spinner>
      )}
    </Layout>
  );
};

export function getServerSideProps(context: NextPageContext) {
  const { token, email } = context.query;
  if (!token || !email) return { redirect: { permanent: false, destination: '/' } };
  return { props: { token, email } };
}

export default CreatePassword;

import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import Button from '@/components/atoms/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsArrowRight } from 'react-icons/bs';
import Alert from '@/components/atoms/Alert';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { forgorPassword, resetUpdateUserState } from '@/store/user/user.slice';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Spinner from '@/components/molecules/Spinner';
import Input from '@/components/atoms/Input';
import { EMAIL_PATTERN } from '@/utils/constants';

type InputsType = {
  email: string;
};

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, reset } = useForm<InputsType>({ mode: 'onChange' });
  const { forgotPasswordState } = useAppSelector((state) => state.user);
  const isLoading = forgotPasswordState === RequestStatusEnum.PENDING;
  const isError = forgotPasswordState === RequestStatusEnum.ERROR;
  const isSuccess = forgotPasswordState === RequestStatusEnum.SUCCESS;

  const handleSend: SubmitHandler<InputsType> = async (fields) => {
    const res = await dispatch(forgorPassword(fields));
    // @ts-ignore
    if (res.error) return;
    reset();
    setTimeout(() => {
      dispatch(resetUpdateUserState());
    }, 7000);
  };

  return (
    <Layout layout={LayoutEnum.AUTH} title="Olvidaste tu contraseña">
      <Spinner loading={isLoading}>
        <h2 className="text-xl font-bold mb-5">Ingresa tu correo</h2>
        {isError && (
          <Alert className="my-5" title="¡Ocurrió un error!" description="El correo ingresado no existe en nuestros sistemas." variant="error" />
        )}

        {isSuccess && (
          <Alert
            className="my-5"
            title="Revisa tu bandeja de entrada"
            description="Te enviamos un correo con los pasos a seguir para restaurar tu contraseña."
          />
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleSend)}>
          <Input
            label="Correo *"
            placeholder="Ingresa tu correo"
            type="email"
            error={Boolean(formState.errors.email)}
            errorMessage={formState.errors.email?.message ?? ''}
            autoComplete="email"
            {...register('email', {
              pattern: { message: 'Ingresa un correo válido', value: EMAIL_PATTERN },
            })}
          />

          <Button size="large" className="mt-5" type="submit">
            Continuar <BsArrowRight />
          </Button>
        </form>
      </Spinner>
    </Layout>
  );
};

export default ForgotPassword;

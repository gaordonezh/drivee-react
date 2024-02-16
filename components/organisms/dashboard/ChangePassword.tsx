import { useAppContext } from '@/context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import Button from '@/components/atoms/Button';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Spinner from '@/components/molecules/Spinner';
import Alert from '@/components/atoms/Alert';
import InputPassword from '@/components/molecules/InputPassword';
import { resetUpdateUserState, updatePassword } from '@/store/user/user.slice';

type UpdatePasswordFields = {
  current: string;
  new: string;
  confirm: string;
};

const ChangePassword = () => {
  const { user } = useAppContext();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, getValues, reset } = useForm<UpdatePasswordFields>({ mode: 'onChange' });
  const { updatePasswordState } = useAppSelector((state) => state.user);
  const isLoading = updatePasswordState === RequestStatusEnum.PENDING;
  const isError = updatePasswordState === RequestStatusEnum.ERROR;
  const isSuccess = updatePasswordState === RequestStatusEnum.SUCCESS;

  const onSubmit: SubmitHandler<UpdatePasswordFields> = async (body) => {
    const res = await dispatch(updatePassword({ body, userId: user?._id! }));
    // @ts-ignore
    if (res.error) return;
    reset();
    setTimeout(() => {
      dispatch(resetUpdateUserState());
    }, 7000);
  };

  return (
    <Spinner loading={isLoading}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {isError && <Alert title="No se logró actualizar tu contraseña." description="Disculpe las molestias, intente mas tarde." variant="error" />}
        {isSuccess && <Alert title="Tu contraseña se actualizó correctamente" description="Recuerdalo la próxima vez que inicies sesión." />}
        <InputPassword
          label="Contraseña *"
          placeholder="Ej.: password"
          error={Boolean(formState.errors.current)}
          errorMessage={formState.errors.current?.message ?? ''}
          {...register('current', {
            validate: {
              required: (value) => {
                if (!value.trim()) return 'La contraseña es requerida';
              },
            },
            minLength: { message: 'Se acepta un mínimo de 8 caracteres', value: 8 },
            maxLength: { message: 'Se acepta un máximo de 20 caracteres', value: 20 },
          })}
        />

        <InputPassword
          label="Nueva contraseña *"
          placeholder="Ej.: password"
          error={Boolean(formState.errors.new)}
          errorMessage={formState.errors.new?.message ?? ''}
          {...register('new', {
            validate: {
              required: (value) => {
                if (!value.trim()) return 'La contraseña es requerida';
              },
            },
            minLength: { message: 'Se acepta un mínimo de 8 caracteres', value: 8 },
            maxLength: { message: 'Se acepta un máximo de 20 caracteres', value: 20 },
          })}
        />

        <InputPassword
          label="Confirma tu nueva contraseña *"
          placeholder="Ej.: password"
          error={Boolean(formState.errors.confirm)}
          errorMessage={formState.errors.confirm?.message ?? ''}
          {...register('confirm', {
            validate: {
              required: (value) => {
                if (!value.trim()) return 'La contraseña es requerida';
              },
              equals: () => {
                const values = getValues();
                if (values.new !== values.confirm) return 'Las contraseñas no coinciden';
              },
            },
            minLength: { message: 'Se acepta un mínimo de 8 caracteres', value: 8 },
            maxLength: { message: 'Se acepta un máximo de 20 caracteres', value: 20 },
          })}
        />

        <Button size="large" type="submit" disabled={isError}>
          GUARDAR CAMBIOS
        </Button>
      </form>
    </Spinner>
  );
};

export default ChangePassword;

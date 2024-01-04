import Input from '@/components/atoms/Input';
import { useAppContext } from '@/context';
import { UpdateUserBodyProps } from '@/store/user/user';
import { UserSexEnum } from '@/store/user/user.enum';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { resetUpdateUserState, updateUser } from '@/store/user/user.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { EMAIL_PATTERN, PHONE_PATTERN } from '@/utils/constants';
import DatePicker from '../DatePicker';
import moment from 'moment-timezone';
import { combineClassnames, objectCleaner } from '@/utils/functions';
import Button from '@/components/atoms/Button';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Spinner from '@/components/molecules/Spinner';
import Select from '@/components/atoms/Select';
import { USER_SEX_TRANSLATE } from '@/utils/translate';
import Alert from '@/components/atoms/Alert';
import CustomDropZone from '../DropZone';
import { uploadFile } from '@/store/files/files.slice';
import SearchLocationWithMaps from '@/components/molecules/SearchLocationWithMaps';
import useUserDataValidations from '@/hooks/useUserDataValidations';

interface ProfileFormProps {
  handleClose: VoidFunction;
}

const ProfileForm = ({ handleClose }: ProfileFormProps) => {
  const { user } = useAppContext();
  const dispatch = useAppDispatch();
  const validateUserFields = useUserDataValidations();
  const { validateUserState, updateUserState } = useAppSelector((state) => state.user);
  const { uploadFileState } = useAppSelector((state) => state.files);
  const states = [validateUserState, updateUserState, uploadFileState];
  const isLoading = states.includes(RequestStatusEnum.PENDING);
  const disabledForm = states.includes(RequestStatusEnum.ERROR);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
    clearErrors,
  } = useForm<UpdateUserBodyProps>({
    mode: 'onChange',
    defaultValues: {
      f_name: user?.f_name,
      l_name: user?.l_name,
      email: user?.email,
      phone: user?.phone,
      sex: user?.sex,
      date_birth: user?.date_birth ? new Date(user.date_birth) : null,
      address: user?.address,
      photo: user?.photo,
      files: [],
    },
  });

  const onSubmit: SubmitHandler<UpdateUserBodyProps> = async (data) => {
    if (data.files?.length) {
      const result = await dispatch(uploadFile(data.files[0]));
      if (result.payload.url) data.photo = result.payload.url;
    }

    const res = await dispatch(updateUser({ body: objectCleaner(data), user_id: user?._id! }));
    // @ts-ignore
    if (res.error) return;
    handleClose();
    setTimeout(() => {
      dispatch(resetUpdateUserState());
    }, 7000);
  };

  return (
    <Spinner loading={isLoading}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className="text-2xl font-semibold underline">Actualizar mis datos</h2>
        {updateUserState === RequestStatusEnum.ERROR && (
          <Alert title="No se logró actualizar tus datos." description="Disculpe las molestias, intente mas tarde." variant="error" />
        )}
        <Input
          label="Nombres *"
          placeholder="Ingresa tu nombre"
          error={Boolean(errors.f_name)}
          errorMessage={errors.f_name?.message ?? ''}
          {...register('f_name', {
            validate: {
              required: (value) => {
                if (!value.trim()) return 'El nombre es requerido';
              },
            },
            pattern: { message: 'Solo se aceptan caracteres alfanuméricos', value: /^[0-9a-z áéíóúñ]+$/i },
            minLength: { value: 3, message: 'Son 3 caracteres alfanuméricos como mínimo' },
            maxLength: { value: 50, message: 'Son 50 caracteres alfanuméricos como máximo' },
          })}
        />

        <Input
          label="Apellidos *"
          placeholder="Ingresa tus apellidos"
          error={Boolean(errors.l_name)}
          errorMessage={errors.l_name?.message ?? ''}
          {...register('l_name', {
            validate: {
              required: (value) => {
                if (!value.trim()) return 'El apellido es requerido';
              },
            },
            pattern: { message: 'Solo se aceptan caracteres alfanuméricos', value: /^[0-9a-z áéíóúñ]+$/i },
            minLength: { value: 3, message: 'Son 3 caracteres alfanuméricos como mínimo' },
            maxLength: { value: 50, message: 'Son 50 caracteres alfanuméricos como máximo' },
          })}
        />

        <Input
          label="Correo *"
          placeholder="Ingresa tu correo"
          type="email"
          error={Boolean(errors.email)}
          errorMessage={errors.email?.message ?? ''}
          autoComplete="email"
          {...register('email', {
            pattern: { message: 'Ingresa un correo válido', value: EMAIL_PATTERN },
            validate: {
              required: (value) => {
                if (!value.trim()) return 'El correo es requerido';
              },
              emailExist: async (value) => {
                if (!EMAIL_PATTERN.test(value)) return '';
                const res = await validateUserFields({ email: value, user: user?._id });
                if (res.email) return 'El correo no se encuentra disponible';
              },
            },
          })}
        />

        <Controller
          name="date_birth"
          rules={{ required: { value: true, message: 'La fecha de nacimiento es requerida' } }}
          control={control}
          render={({ field }) => (
            <div>
              <p className="font-semibold">Fecha de nacimiento *</p>
              <DatePicker
                selected={field.value}
                onChange={(update) => {
                  if (!update) setError('date_birth', { type: 'required', message: 'La fecha de nacimiento es requerida' });
                  else clearErrors('date_birth');
                  setValue('date_birth', update);
                }}
                maxDate={moment().subtract(18, 'years').toDate()}
                className={combineClassnames(errors.date_birth ? 'border-red-500 placeholder:text-red-400' : '')}
              />
              {errors.date_birth && <p className="text-sm text-red-500 leading-3 mt-1">{errors.date_birth.message}</p>}
            </div>
          )}
        />

        <Input
          label="Celular *"
          placeholder="Ingresa tu n° celular"
          type="tel"
          error={Boolean(errors.phone)}
          errorMessage={errors.phone?.message ?? ''}
          {...register('phone', {
            required: { value: true, message: 'El número de teléfono es requerido' },
            pattern: { value: PHONE_PATTERN, message: 'Ingrese un número de teléfono válido' },
            validate: {
              phoneExist: async (value) => {
                if (!PHONE_PATTERN.test(value)) return;
                const res = await validateUserFields({ phone: value, user: user?._id });
                if (res.phone) return 'El n° celular no se encuentra disponible';
              },
            },
          })}
        />

        <Controller
          name="sex"
          rules={{ required: { value: true, message: 'El sexo es requerido' } }}
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              label="Sexo *"
              setValue={(newValue) => setValue('sex', newValue as UserSexEnum, { shouldValidate: true })}
              data={Object.values(UserSexEnum).map((item) => ({ _id: item, name: USER_SEX_TRANSLATE[item] }))}
              error={Boolean(errors.sex)}
              errorMessage={errors.sex?.message ?? ''}
            />
          )}
        />

        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <div>
              <p className="font-semibold">Foto de perfil (opcional)</p>
              <CustomDropZone
                files={field.value!}
                setFiles={(newFiles) => setValue('files', newFiles)}
                accept={{ 'image/jpeg': ['.jpeg', '.png', 'jpg', '.webp'] }}
                max={1}
              />
            </div>
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <div>
              <p className="font-semibold">Ubicación (opcional)</p>
              <SearchLocationWithMaps
                auxValue={field.value ? { location: field.value.location, text: field.value.address, value: field.value.id } : null}
                setAuxValue={(newParams) =>
                  setValue('address', newParams ? { location: newParams.location, address: newParams.text, id: newParams.value } : null, {
                    shouldValidate: true,
                  })
                }
                className="w-full h-[300px] mt-1"
              />
            </div>
          )}
        />

        <Button size="large" type="submit" disabled={disabledForm}>
          GUARDAR CAMBIOS
        </Button>
        <Button size="large" type="button" variant="white" className="!border-black" onClick={handleClose}>
          Cancelar
        </Button>
      </form>
    </Spinner>
  );
};

export default ProfileForm;

import Container from '../molecules/Container';
import { IconType } from 'react-icons/lib';
import { combineClassnames } from '@/utils/functions';
import Card from '../atoms/Card';
import Input from '@/components/atoms/Input';
import DatePicker from '@/components/organisms/DatePicker';
import moment from 'moment-timezone';
import Button from '@/components/atoms/Button';
import { BsArrowRight } from 'react-icons/bs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Spinner from '../molecules/Spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { createUser } from '@/store/user/user.slice';
import { CreateUserBodyProps } from '@/store/user/user';
import { EMAIL_PATTERN, PHONE_PATTERN } from '@/utils/constants';
import { useState } from 'react';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { UserRolesEnum } from '@/store/user/user.enum';
import Alert from '../atoms/Alert';
import useUserDataValidations from '@/hooks/useUserDataValidations';

interface GeneralInformationProps {
  steps: Array<{ title: string; detail: string; icon: IconType }>;
  title: string;
  description: string;
  extraTitle: string;
  extraDescription: string;
  roles: Array<UserRolesEnum>;
}

type Inputs = {
  f_name: string;
  l_name: string;
  email: string;
  dateBorn: null | Date;
  phone: string;
};

const GeneralInformation = ({ steps, title, description, extraTitle, extraDescription, roles }: GeneralInformationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm<Inputs>({ mode: 'onChange', defaultValues: { dateBorn: null } });
  const dispatch = useAppDispatch();
  const validateUserFields = useUserDataValidations();
  const { validateUserState, createUserState } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const isLoading = createUserState === RequestStatusEnum.PENDING || validateUserState === RequestStatusEnum.PENDING;
  const disabledForm = createUserState === RequestStatusEnum.ERROR || validateUserState === RequestStatusEnum.ERROR || Boolean(email);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (disabledForm) return;
    setEmail(data.email);
    const body: CreateUserBodyProps = {
      f_name: data.f_name,
      l_name: data.l_name,
      email: data.email,
      phone: data.phone,
      roles,
      date_birth: data.dateBorn?.toISOString()!,
    };
    const res = await dispatch(createUser(body));
    // @ts-ignore
    if (res.error) return;
    reset();
  };

  return (
    <div>
      <div className="bg-information bg-cover bg-no-repeat bg-center">
        <Container>
          <div className="h-60 lg:h-80 flex flex-col items-center justify-center gap-3">
            <h1 className="text-center text-xl lg:text-4xl max-w-2xl font-semibold">{title}</h1>
            <p className="max-w-2xl text-center">{description}</p>
          </div>
        </Container>
      </div>

      <div className="bg-share-texture bg-no-repeat bg-center bg-cover" id="register">
        <Container className="px-5 py-16 md:px-10 md:py-32">
          <div className="flex flex-col md:flex-row-reverse gap-20">
            <div className="flex-1 flex flex-col">
              <ol className="border-l-2 border-black">
                {steps.map((item, index) => (
                  <li key={item.title}>
                    <div className="flex-start md:flex">
                      <div className="-ml-[22px] flex h-[40px] w-[45px] items-center justify-center rounded-full bg-gray-200">
                        <item.icon color="#000000" className="h-8 w-8" />
                      </div>
                      <div className={combineClassnames('ml-5 w-full', index + 1 === steps.length ? 'mb-3' : 'mb-9')}>
                        <p className="text-base font-semibold">{item.title}</p>
                        <p className="text-gray-800 text-sm">{item.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="flex-1" />
              <Card className="bg-white mt-11 border-none !p-10">
                <h2 className="text-xl font-bold">{extraTitle}</h2>
                <p className="text-sm text-gray-500 mt-3 text-justify">{extraDescription}</p>
                <p className="text-sm text-gray-500 mt-3 text-justify">Te notificaremos por correo y whatsapp sobre el estado de tus documentos.</p>
              </Card>
            </div>
            <Spinner loading={isLoading}>
              <Card className="bg-white flex-1">
                <div className="p-2 lg:p-10">
                  <div className="mb-5">
                    <h2 className="font-semibold text-lg">¡Comencemos!</h2>
                    <p className="text-sm">Completa el formulario para comenzar</p>
                  </div>

                  {createUserState === RequestStatusEnum.SUCCESS && (
                    <Alert title="Revisa tu bandeja de entrada!" description={`Se envió un correo a ${email}`} />
                  )}
                  {createUserState === RequestStatusEnum.ERROR && (
                    <Alert title="No se logró realizar tu registro." description="Disculpe las molestias, intente mas tarde." variant="error" />
                  )}
                  {validateUserState === RequestStatusEnum.ERROR && (
                    <Alert title="No se logró validar tus datos." description="Intente otra vez" variant="error" />
                  )}
                  <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Input
                      placeholder="Ingresa tus nombres"
                      label="Ingresa tus nombres"
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
                      placeholder="Ingresa tus apellidos"
                      label="Apellidos"
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
                      placeholder="Ingresa tu correo"
                      type="email"
                      label="Correo"
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
                            const res = await validateUserFields({ email: value });
                            if (res.email) return 'El correo no se encuentra disponible';
                          },
                        },
                      })}
                    />
                    <Controller
                      name="dateBorn"
                      rules={{ required: { value: true, message: 'La fecha de nacimiento es requerida' } }}
                      control={control}
                      render={({ field }) => (
                        <>
                          <DatePicker
                            label="Fecha de nacimiento"
                            selected={field.value}
                            onChange={(update) => {
                              if (!update) setError('dateBorn', { type: 'required', message: 'La fecha de nacimiento es requerida' });
                              else clearErrors('dateBorn');
                              setValue('dateBorn', update);
                            }}
                            maxDate={moment().subtract(18, 'years').toDate()}
                            className={combineClassnames(errors.dateBorn ? 'border-red-500 placeholder:text-red-400' : '')}
                          />
                          {errors.dateBorn && <p className="text-sm text-red-500 leading-3 -mt-2">{errors.dateBorn.message}</p>}
                        </>
                      )}
                    />
                    <Input
                      placeholder="Ingresa tu n° celular"
                      type="tel"
                      label="Celular"
                      error={Boolean(errors.phone)}
                      errorMessage={errors.phone?.message ?? ''}
                      {...register('phone', {
                        required: { value: true, message: 'El número de teléfono es requerido' },
                        pattern: { value: PHONE_PATTERN, message: 'Ingrese un número de teléfono válido' },
                        validate: {
                          phoneExist: async (value) => {
                            if (!PHONE_PATTERN.test(value)) return;
                            const res = await validateUserFields({ phone: value });
                            if (res.phone) return 'El n° celular no se encuentra disponible';
                          },
                        },
                      })}
                    />
                    <Button size="large" className="mt-5" type="submit" disabled={disabledForm}>
                      Continuar <BsArrowRight />
                    </Button>
                  </form>
                </div>
              </Card>
            </Spinner>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default GeneralInformation;

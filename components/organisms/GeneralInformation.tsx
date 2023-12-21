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
import InputPassword from '../molecules/InputPassword';
import Spinner from '../molecules/Spinner';

interface GeneralInformationProps {
  steps: Array<{ title: string; detail: string; icon: IconType }>;
  title: string;
  description: string;
  extraTitle: string;
  extraDescription: string;
}

type Inputs = {
  f_name: string;
  l_name: string;
  email: string;
  dateBorn: null | Date;
  phone: string;
  password: string;
  passwordConfirm: string;
};

const GeneralInformation = ({ steps, title, description, extraTitle, extraDescription }: GeneralInformationProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    setError,
    clearErrors,
  } = useForm<Inputs>({ mode: 'onChange', defaultValues: { dateBorn: null } });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data, null, 5));
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

      <div className="bg-share-texture bg-no-repeat bg-center bg-cover">
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
            <Spinner className="rounded-lg" loading={false}>
              <Card className="bg-white flex-1">
                <div className="p-2 lg:p-10">
                  <div className="mb-5">
                    <h2 className="font-semibold text-lg">¡Comencemos!</h2>
                    <p className="text-sm">Completa el formulario para comenzar</p>
                  </div>
                  <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <Input
                      placeholder="Ingresa tus nombres"
                      label="Ingresa tus nombres"
                      error={Boolean(errors.f_name)}
                      errorMessage={errors.f_name?.message || ''}
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
                      errorMessage={errors.l_name?.message || ''}
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
                      errorMessage={errors.email?.message || ''}
                      {...register('email', {
                        validate: {
                          required: (value) => {
                            if (!value.trim()) return 'El correo es requerido';
                          },
                        },
                        pattern: { message: 'Ingresa un correo válido', value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i },
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
                      errorMessage={errors.phone?.message || ''}
                      {...register('phone', {
                        validate: {
                          required: (value) => {
                            if (!value.trim()) return 'El número de teléfono es requerido';
                          },
                          length: (value) => {
                            if (!value.trim() || value.trim().length !== 9) return 'Ingrese un número de teléfono válido';
                          },
                        },
                        pattern: { value: /^[0-9]+$/i, message: 'Solo se aceptan números' },
                      })}
                    />
                    <InputPassword
                      placeholder="Ingresa tu contraseña"
                      label="Contraseña"
                      error={Boolean(errors.password)}
                      errorMessage={errors.password?.message || ''}
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
                      error={Boolean(errors.passwordConfirm)}
                      errorMessage={errors.passwordConfirm?.message || ''}
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

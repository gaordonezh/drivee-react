import React, { useState } from 'react';
import Container from '../molecules/Container';
import { IconType } from 'react-icons/lib';
import { combineClassnames } from '@/utils/functions';
import Card from '../atoms/Card';
import Input from '@/components/atoms/Input';
import DatePicker from '@/components/organisms/DatePicker';
import moment from 'moment-timezone';
import Button from '@/components/atoms/Button';
import { BsArrowRight } from 'react-icons/bs';

interface GeneralInformationProps {
  steps: Array<{ title: string; detail: string; icon: IconType }>;
  title: string;
  description: string;
  extraTitle: string;
  extraDescription: string;
}

const GeneralInformation = ({ steps, title, description, extraTitle, extraDescription }: GeneralInformationProps) => {
  const [form, setForm] = useState<any>({ dateBorn: null });

  return (
    <>
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
            <Card className="bg-white flex-1">
              <div className="p-2 lg:p-10">
                <div className="mb-5">
                  <h2 className="font-semibold text-lg">¡Comencemos!</h2>
                  <p className="text-sm">Completa el formulario para comenzar</p>
                </div>
                <form className="flex flex-col gap-3">
                  <Input label="Nombres" />
                  <Input label="Apellidos" />
                  <Input label="Correo" />
                  <DatePicker
                    label="Fecha de nacimiento"
                    selected={form.dateBorn ? moment(form.dateBorn).toDate() : null}
                    onChange={(update) => setForm({ ...form, dateBorn: moment(update) })}
                    maxDate={moment().subtract(18, 'years').toDate()}
                  />
                  <Input label="Celular" />
                  <Input label="Contraseña" />
                  <Input label="Confirma contraseña" />
                  <Button size="large" className="mt-5">
                    Continuar <BsArrowRight />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};

export default GeneralInformation;

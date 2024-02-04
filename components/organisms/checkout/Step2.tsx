import Button from '@/components/atoms/Button';
import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { FieldsStateType, RangeStateType } from '../DetailsForm';
import { formatMoney } from '@/utils/functions';
import List from '@/components/molecules/List';
import Spinner from '@/components/molecules/Spinner';
import GoogleMapsViewer from '../GoogleMapsViewer';

interface AllFieldsProps extends FieldsStateType, RangeStateType {}

interface Step2Props {
  fields: AllFieldsProps;
  handleNext: VoidFunction;
  handleBack: VoidFunction;
}

const Step2 = ({ fields, handleBack, handleNext }: Step2Props) => {
  const { location, dateEnd, dateStart, quantity, timeEnd, timeStart, total } = fields;

  return (
    <>
      <List
        title="Resumen"
        subtitle="Detalles del servicio"
        data={[
          { title: 'Dirección', value: location?.address },
          {
            title: 'Ubicación',
            value: (
              <Spinner loading={!fields.location}>
                <div className="border h-[250px] sm:h-[300px] md:h-[200px] xl:h-[250px] w-[100%] rounded">
                  {fields.location ? <GoogleMapsViewer initialLocation={fields.location.location} /> : null}
                </div>
              </Spinner>
            ),
          },
          { title: 'Fecha de inicio', value: dateStart?.format('dddd DD [de] MMMM [del] YYYY')! },
          { title: 'Hora de inicio', value: timeStart?.format('hh:mm a')! },
          { title: 'Fecha de finalización', value: dateEnd?.format('dddd DD [de] MMMM [del] YYYY')! },
          { title: 'Hora de finalización', value: timeEnd?.format('hh:mm a')! },
          { title: 'Cantidad de horas', value: `${formatMoney(quantity)} horas`, bold: true },
          { title: 'Costo total', value: `S/ ${formatMoney(total)}`, bold: true },
        ]}
      />

      <div className="flex flex-col sm:flex-row gap-5 mt-5">
        <Button fullWidth size="large" variant="white" className="!border-2 !border-black" onClick={handleBack}>
          <FaLongArrowAltLeft /> Volver
        </Button>
        <Button fullWidth size="large" onClick={handleNext}>
          Continuar <FaLongArrowAltRight />
        </Button>
      </div>
    </>
  );
};

export default Step2;

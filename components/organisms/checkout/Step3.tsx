import Button from '@/components/atoms/Button';
import React from 'react';
import { FaLongArrowAltLeft, FaMoneyCheckAlt } from 'react-icons/fa';
import { FieldsStateType, RangeStateType } from '../DetailsForm';
import Input from '@/components/atoms/Input';
import { formatMoney } from '@/utils/functions';

interface AllFieldsProps extends FieldsStateType, RangeStateType {}

interface Step3Props {
  fields: AllFieldsProps;
  handleBack: VoidFunction;
}

const Step3 = ({ fields, handleBack }: Step3Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-base font-semibold leading-7 text-gray-900">Ingresa los datos de tu tarjeta</h3>

      <Input label="Número de tarjeta" placeholder="Ingresa el número de tu tarjeta" />

      <Input label="Titular de la tarjeta" placeholder="Como figura en la tarjeta" />

      <Input label="Vencimiento" placeholder="MM/YY" />

      <Input label="Código de seguridad" placeholder="Como figura en la tarjeta" />

      <div className="flex flex-row justify-between">
        <dt className={'text-xl text-gray-900 font-bold'}>MONTO TOTAL</dt>
        <dd className={'text-xl text-gray-900 font-bold'}>S/ {formatMoney(fields.total)}</dd>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 mt-5">
        <Button fullWidth size="large" variant="white" className="!border-2 !border-black" onClick={handleBack}>
          <FaLongArrowAltLeft /> Volver
        </Button>
        <Button fullWidth size="large">
          Pagar <FaMoneyCheckAlt />
        </Button>
      </div>
    </div>
  );
};

export default Step3;

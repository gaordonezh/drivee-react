import React, { useState } from 'react';
import Input from '../atoms/Input';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import moment, { Moment } from 'moment-timezone';
import Chip from '../atoms/Chip';
import Button from '../atoms/Button';
import { formatMoney } from '@/utils/functions';

type FieldsStateType = {
  dateStart: null | Moment;
  timeStart: null | Moment;
  dateEnd: null | Moment;
  timeEnd: null | Moment;
};

interface DetailsFormProps {
  price: { value: number; kind: string };
}

const DetailsForm = ({ price }: DetailsFormProps) => {
  const [fields, setFields] = useState<FieldsStateType>({ dateStart: null, timeStart: null, dateEnd: null, timeEnd: null });
  const [variant, setVariant] = useState({ quantity: 0, total: 0 });
  const plural = variant.quantity > 1 ? 's' : '';

  const handleChange = (newParams: Record<string, any>) => {
    const combined = { ...fields, ...newParams };
    setFields(combined);
    console.log(combined);
  };

  const kind = price.kind === 'day' ? `día${plural}` : `hora${plural}`;

  return (
    <form className="flex flex-col gap-5">
      <Input label="Ubicación" name="location" placeholder="Ej.: Lima" />
      <div>
        <p className="font-semibold">Fecha y hora de recojo</p>
        <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-3">
          <DatePicker
            selected={fields.dateStart ? moment(fields.dateStart).toDate() : null}
            onChange={(update) => handleChange({ dateStart: moment(update) })}
            minDate={moment().toDate()}
            maxDate={moment().add(2, 'months').subtract(1, 'day').toDate()}
          />
          <TimePicker time={fields.timeStart} setTime={(timeStart) => handleChange({ timeStart })} />
        </div>
      </div>
      <div>
        <p className="font-semibold">Fecha y hora de devolución</p>
        <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-3">
          <DatePicker
            selected={fields.dateEnd ? moment(fields.dateEnd).toDate() : null}
            onChange={(update) => handleChange({ dateEnd: moment(update) })}
            minDate={fields.dateStart ? moment(fields.dateStart).toDate() : null}
            maxDate={fields.dateStart ? moment(fields.dateStart).add(2, 'weeks').toDate() : null}
          />
          <TimePicker time={fields.timeEnd} setTime={(timeEnd) => handleChange({ timeEnd })} />
        </div>
      </div>
      <div>
        <p className="font-semibold mb-2">Duración</p>
        <p className="text-sm text-slate-500">{`— S/ ${formatMoney(price.value)} por ${kind}`}</p>
        <p className="text-sm text-slate-500">— {`${variant.quantity} ${kind}`}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-slate-700">Total</p>
        <Chip label={`S/ ${formatMoney(variant.total)}`} />
      </div>
      <Button fullWidth size="large" className="mt-5">
        RESERVAR AHORA
      </Button>
    </form>
  );
};

export default DetailsForm;

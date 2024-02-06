import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import moment, { Moment } from 'moment-timezone';
import { formatMoney, mergeDateTime } from '@/utils/functions';
import { FaLongArrowAltRight } from 'react-icons/fa';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import Chip from '@/components/atoms/Chip';
import Button from '@/components/atoms/Button';
import { FieldsStateType, RangeStateType } from '../DetailsForm';

interface Step1Props {
  fields: FieldsStateType;
  setFields: Dispatch<SetStateAction<FieldsStateType>>;
  range: RangeStateType;
  setRange: Dispatch<SetStateAction<RangeStateType>>;
  price: number;
  handleNext: VoidFunction;
}

const Step1 = ({ fields, setFields, range, setRange, price, handleNext }: Step1Props) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    handleChange({});
  }, []);

  const handleChange = (newParams: Record<string, any>) => {
    const combined = { ...fields, ...newParams };
    setFields(combined);
    const isDisabled = Object.values(combined).some((value) => !value);
    setDisabled(isDisabled);

    if (isDisabled) setRange({ quantity: 0, total: 0 });
    else getPriceAndQuantity(mergeDateTime(combined.dateStart!, combined.timeStart!), mergeDateTime(combined.dateEnd!, combined.timeEnd!));
  };

  const getPriceAndQuantity = (start: Moment, end: Moment) => {
    const hoursDiff = end.diff(start, 'hours', true);
    if (hoursDiff < 0) return setRange({ quantity: 0, total: 0 });

    const total = Number(formatMoney(hoursDiff * price));
    setRange({ quantity: Number(formatMoney(hoursDiff)), total });
  };

  const isDisabled = disabled || !(range.quantity && range.total);

  const daysDiff = fields.dateEnd?.diff(fields.dateStart, 'day');

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="font-semibold">Dirección:</p>
        <p>{fields.location?.address}</p>
      </div>
      <div>
        <p className="font-semibold">Fecha y hora de recojo</p>
        <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-1 mt-1">
          <DatePicker
            selected={fields.dateStart ? moment(fields.dateStart).toDate() : null}
            onChange={(update) => handleChange({ dateStart: moment(update).startOf('day'), dateEnd: null })}
            minDate={moment().toDate()}
            maxDate={moment().add(2, 'months').subtract(1, 'day').toDate()}
          />
          <TimePicker time={fields.timeStart} setTime={(timeStart) => handleChange({ timeStart, timeEnd: null })} />
        </div>
      </div>
      <div>
        <p className="font-semibold">Fecha y hora de devolución</p>
        <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-1 mt-1">
          <DatePicker
            selected={fields.dateEnd ? moment(fields.dateEnd).toDate() : null}
            onChange={(update) => handleChange({ dateEnd: moment(update).startOf('day') })}
            minDate={fields.dateStart ? moment(fields.dateStart).toDate() : null}
            maxDate={fields.dateStart ? moment(fields.dateStart).add(2, 'weeks').toDate() : null}
          />
          <TimePicker
            time={fields.timeEnd}
            setTime={(timeEnd) => handleChange({ timeEnd })}
            minTime={!daysDiff ? fields.timeStart?.toDate() : undefined}
          />
        </div>
      </div>
      <div>
        <p className="font-semibold mb-2">Duración</p>
        <p className="text-sm text-slate-500">{`— S/ ${formatMoney(price)} por hora`}</p>
        <p className="text-sm text-slate-500">— {`${range.quantity} hora${range.quantity === 1 ? '' : 's'}`}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-slate-700">Total</p>
        <Chip label={`S/ ${formatMoney(range.total)}`} />
      </div>
      <Button fullWidth size="large" className="mt-5" disabled={isDisabled} onClick={handleNext}>
        CONTINUAR <FaLongArrowAltRight />
      </Button>
    </div>
  );
};

export default Step1;

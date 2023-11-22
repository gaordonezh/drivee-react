import React, { useState } from 'react';
import Step1 from './checkout/Step1';
import Step2 from './checkout/Step2';
import { Moment } from 'moment-timezone';
import Step3 from './checkout/Step3';
import Stepper from '../molecules/Stepper';

interface DetailsFormProps {
  price: number;
}

export type FieldsStateType = {
  location: string;
  dateStart: null | Moment;
  timeStart: null | Moment;
  dateEnd: null | Moment;
  timeEnd: null | Moment;
};
export type RangeStateType = {
  quantity: number;
  total: number;
};

const DetailsForm = ({ price }: DetailsFormProps) => {
  const [fields, setFields] = useState<FieldsStateType>({ location: '', dateStart: null, timeStart: null, dateEnd: null, timeEnd: null });
  const [range, setRange] = useState<RangeStateType>({ quantity: 0, total: 0 });
  const [step, setStep] = useState<0 | 1 | 2>(1);

  const steps = {
    0: <Step1 fields={fields} setFields={setFields} range={range} setRange={setRange} price={price} handleNext={() => setStep(1)} />,
    1: <Step2 />,
    2: <Step3 />,
  };

  return (
    <div className="">
      <Stepper steps={Array.from(Array(step + 1).keys())} />
      {steps[step]}
    </div>
  );
};

export default DetailsForm;

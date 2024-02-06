import React, { useState, useEffect } from 'react';
import Step1 from './checkout/Step1';
import Step2 from './checkout/Step2';
import moment, { Moment } from 'moment-timezone';
import Step3 from './checkout/Step3';
import Stepper from '../molecules/Stepper';
import { useRouter } from 'next/router';
import { AddressProps } from '@/store/user/user';
import { useAppContext } from '@/context';
import ModalLogin from './ModalLogin';

interface DetailsFormProps {
  price: number;
  location: AddressProps;
}

export type FieldsStateType = {
  location: null | AddressProps;
  dateStart: null | Moment;
  timeStart: null | Moment;
  dateEnd: null | Moment;
  timeEnd: null | Moment;
};
export type RangeStateType = {
  quantity: number;
  total: number;
};

const DetailsForm = ({ price, location }: DetailsFormProps) => {
  const { user } = useAppContext();
  const { query } = useRouter();
  const [fields, setFields] = useState<FieldsStateType>({ location: null, dateStart: null, timeStart: null, dateEnd: null, timeEnd: null });
  const [range, setRange] = useState<RangeStateType>({ quantity: 0, total: 0 });
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [modalLogin, setModalLogin] = useState(false);

  useEffect(() => {
    const newObject = {
      location,
      dateStart: query.startAt ? moment(query.startAt) : null,
      timeStart: null,
      dateEnd: query.endAt ? moment(query.endAt) : null,
      timeEnd: null,
    };
    setFields(newObject);
  }, [query]);

  const steps = {
    0: (
      <Step1
        fields={fields}
        setFields={setFields}
        range={range}
        setRange={setRange}
        price={price}
        handleNext={() => (user ? setStep(1) : setModalLogin(true))}
      />
    ),
    1: <Step2 fields={{ ...fields, ...range }} handleNext={() => setStep(2)} handleBack={() => setStep(0)} />,
    2: <Step3 fields={{ ...fields, ...range }} handleBack={() => setStep(1)} />,
  };

  return (
    <div className="">
      <Stepper steps={Array.from(Array(step + 1).keys())} />
      {steps[step]}
      {modalLogin && <ModalLogin handleClose={() => setModalLogin(false)} />}
    </div>
  );
};

export default DetailsForm;

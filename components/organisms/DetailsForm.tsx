import React, { useState, useEffect } from 'react';
import Step1 from './checkout/Step1';
import Step2 from './checkout/Step2';
import moment, { Moment } from 'moment-timezone';
import Stepper from '../molecules/Stepper';
import { useRouter } from 'next/router';
import { AddressProps } from '@/store/user/user';
import { useAppContext } from '@/context';
import ModalLogin from './ModalLogin';
import { GetPublicVehiclesFilterProps, VehicleProps } from '@/store/vehicle/vehicle';
import { mergeDateTime } from '@/utils/functions';
import { CreateBookingBodyProps } from '@/store/booking/booking';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { createBooking } from '@/store/booking/booking.slice';
import { VehicleStatusEnum } from '@/store/vehicle/vehicle.enum';
import Alert from '../atoms/Alert';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Spinner from '../molecules/Spinner';
import { getPublicVehicles } from '@/store/vehicle/vehicle.slice';
import { verifyDocuments } from '@/store/documents/documents.slice';

interface DetailsFormProps {
  vehicle: VehicleProps;
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

const DetailsForm = ({ vehicle }: DetailsFormProps) => {
  const dispatch = useAppDispatch();
  const { requestBookingState } = useAppSelector((state) => state.booking);
  const valificationState = useAppSelector((state) => state.vehicles.publicVehicles.status);
  const verifyStatus = useAppSelector((state) => state.documents.createDocumentStatus);
  const { user } = useAppContext();
  const { query } = useRouter();
  const [fields, setFields] = useState<FieldsStateType>({ location: null, dateStart: null, timeStart: null, dateEnd: null, timeEnd: null });
  const [range, setRange] = useState<RangeStateType>({ quantity: 0, total: 0 });
  const [step, setStep] = useState<keyof typeof steps>(0);
  const [modalLogin, setModalLogin] = useState(false);
  const [disabledVehicle, setDisabledVehicle] = useState(false);
  const [disableDocument, setDisableDocument] = useState(false);
  const loading = [requestBookingState, valificationState, verifyStatus].includes(RequestStatusEnum.PENDING);
  const error = requestBookingState === RequestStatusEnum.ERROR;
  const success = requestBookingState === RequestStatusEnum.SUCCESS;

  useEffect(() => {
    const newObject = {
      location: vehicle.address,
      dateStart: query.startAt ? moment(query.startAt) : null,
      timeStart: null,
      dateEnd: query.endAt ? moment(query.endAt) : null,
      timeEnd: null,
    };
    setFields(newObject);
  }, [query]);

  const handleReserve = async () => {
    if (!user) return;
    const body: CreateBookingBodyProps = {
      user: { id: user._id, f_name: user.f_name, l_name: user.l_name!, email: user.email, phone: user.phone! },
      vehicle: {
        id: vehicle._id,
        name: vehicle.name,
        description: vehicle.description,
        image: vehicle.images[0],
        address: vehicle.address,
        pricexhour: vehicle.pricexhour,
      },
      startDatetime: mergeDateTime(fields.dateStart!, fields.timeStart!).toISOString(),
      endDatetime: mergeDateTime(fields.dateEnd!, fields.timeEnd!).toISOString(),
      totalPrice: range.total,
      totalHours: range.quantity,
    };

    const res = await dispatch(createBooking(body));

    if (!res.payload.success) return;
    setFields({ location: null, dateStart: null, timeStart: null, dateEnd: null, timeEnd: null });
    setRange({ quantity: 0, total: 0 });
    setStep(0);
  };

  const handleNextStep = async () => {
    if (!user) return setModalLogin(true);

    const verify = await dispatch(verifyDocuments({ user: user._id }));
    setDisableDocument(verify.payload.user);
    if (verify.payload.user) return;

    const filters: GetPublicVehiclesFilterProps = {
      dateFrom: moment(fields.dateStart).startOf('day').toISOString(),
      dateTo: moment(fields.dateEnd).endOf('day').toISOString(),
      id: vehicle._id,
    };

    const res = await dispatch(getPublicVehicles(filters));
    const available = Boolean(res.payload.docs.length);
    if (!available) return setDisabledVehicle(true);
    setStep(1);
  };

  const steps = {
    0: (
      <Step1
        fields={fields}
        setFields={(newFields) => {
          setFields(newFields);
          setDisabledVehicle(false);
        }}
        range={range}
        setRange={setRange}
        price={vehicle.pricexhour}
        handleNext={handleNextStep}
        notAvailable={vehicle.status !== VehicleStatusEnum.AVAILABLE}
        notRangeAvailable={disabledVehicle}
        disableDocument={disableDocument}
      />
    ),
    1: <Step2 fields={{ ...fields, ...range }} handleNext={handleReserve} handleBack={() => setStep(0)} />,
  };

  return (
    <div>
      <Stepper steps={Array.from(Array(step + 1).keys())} />
      {error && <Alert title="No se finalizó la reserva" description="El vehículo no se encuentra disponible" variant="error" className="mb-2" />}
      {success && (
        <Alert
          title="La reserva se realizó correctamente"
          description="Puedes ver el detalle y estado de tu reserva en "
          link={{ path: '/dashboard/orders', text: 'mis rentas' }}
          variant="success"
          className="mb-2"
        />
      )}
      <Spinner loading={loading} text=":: Tu reserva está en curso ::">
        {steps[step]}
      </Spinner>
      {modalLogin && <ModalLogin handleClose={() => setModalLogin(false)} />}
    </div>
  );
};

export default DetailsForm;

import React, { Fragment, useId, useState } from 'react';
import PortalCreator from '@/components/molecules/PortalCreator';
import Drawer from '@/components/molecules/Drawer';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import Spinner from '@/components/molecules/Spinner';
import { BookingProps } from '@/store/booking/booking';
import Link from 'next/link';
import Divider from '@/components/protons/Divider';
import List from '@/components/molecules/List';
import moment from 'moment-timezone';
import { formatMoney } from '@/utils/functions';
import { BOOKING_STATUS_TAGS } from './OrderCards';
import Fab from '@/components/atoms/Fab';
import { IoClose } from 'react-icons/io5';
import Button from '@/components/atoms/Button';
import { BookingStatusEnum } from '@/store/booking/booking.enum';
import ConfirmAction from '@/components/molecules/ConfirmAction';
import { updateBookingState } from '@/store/booking/booking.slice';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Alert from '@/components/atoms/Alert';
import Input from '@/components/atoms/Input';

interface RentalsDrawerProps {
  handleClose: VoidFunction;
  handleReload: VoidFunction;
  data: BookingProps;
}

const RentalsDrawer = ({ handleClose, handleReload, data }: RentalsDrawerProps) => {
  const uniqueGlobalId = useId();
  const dispatch = useAppDispatch();
  const { requestBookingState } = useAppSelector((state) => state.booking);
  const [action, setAction] = useState<null | BookingStatusEnum>(null);
  const [comment, setComment] = useState(data.comment || '');

  const handleResponse = (res: boolean) => {
    return;
    dispatch(updateBookingState(res ? RequestStatusEnum.SUCCESS : RequestStatusEnum.ERROR));
    if (!res) return;
    handleReload();
    handleClose();
    setTimeout(() => {
      dispatch(updateBookingState(RequestStatusEnum.IDLE));
    }, 7000);
  };

  const rejectedBTN = (
    <Button size="large" style={{ width: 'calc((50%) - 0.5rem)' }} onClick={() => setAction(BookingStatusEnum.REJECTED)}>
      RECHAZAR
    </Button>
  );
  const approvedBTN = (
    <Button size="large" style={{ width: 'calc((50%) - 0.5rem)' }} onClick={() => setAction(BookingStatusEnum.APPROVED)}>
      APROBAR
    </Button>
  );
  const paymentBTN = (
    <Button size="large" style={{ width: 'calc((50%) - 0.5rem)' }} onClick={() => setAction(BookingStatusEnum.IN_PROCCESS)}>
      APROBAR PAGO DIRECTO
    </Button>
  );
  const processBTN = (
    <Button size="large" style={{ width: 'calc((50%) - 0.5rem)' }} onClick={() => setAction(BookingStatusEnum.FINISHED)}>
      FINALIZAR
    </Button>
  );

  const buttons = {
    [BookingStatusEnum.PENDING]: [rejectedBTN, approvedBTN],
    [BookingStatusEnum.REJECTED]: [rejectedBTN],
    [BookingStatusEnum.APPROVED]: [],
    [BookingStatusEnum.PAYMENT]: [paymentBTN],
    [BookingStatusEnum.IN_PROCCESS]: [processBTN],
    [BookingStatusEnum.FINISHED]: [],
  };

  return (
    <>
      <PortalCreator
        uniqueGlobalId={uniqueGlobalId}
        component={
          <Drawer position="right" onClose={handleClose}>
            <Spinner loading={false} text="Cargando información...">
              <div className="flex flex-col gap-5 relative">
                <Fab icon={<IoClose color="red" size={30} />} size="large" onClick={handleClose} className="absolute -top-4 -right-4" />
                <div>
                  {requestBookingState === RequestStatusEnum.ERROR && (
                    <Alert
                      title={`No se logró ${action === BookingStatusEnum.REJECTED ? 'rechazar' : 'aprobar'} la solicitud`}
                      description="Intente mas tarde"
                      variant="error"
                      className="my-5"
                    />
                  )}

                  <div className="flex flex-row items-center gap-2">
                    <div
                      className="h-16 w-16 rounded-full bg-no-repeat bg-cover bg-center"
                      style={{ backgroundImage: `url(${data.vehicle.image})` }}
                    />
                    <div>
                      <p className="font-bold text-xl leading-3">{data.vehicle.name}</p>
                      <Link
                        href={`https://maps.google.com/?q=${data.vehicle.address?.location.lat},${data.vehicle.address?.location.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline text-sm"
                      >
                        Ubicación
                      </Link>
                      <p className="text-sm uppercase">{BOOKING_STATUS_TAGS[data.status].label}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{data.vehicle.description}</p>
                </div>

                <Divider />

                <div>
                  <p className="font-bold text-xl leading-5">
                    {data.user.f_name} {data.user.l_name}
                  </p>
                  <p className="text-gray-500 text-sm">{data.user.email}</p>
                  <p className="text-gray-500 text-sm">{data.user.phone}</p>
                </div>

                {data.status === BookingStatusEnum.APPROVED && (
                  <>
                    <Divider />
                    <Alert title="Recuerda:" description="El pago se realizá el día de inicio del alquiler." variant="info" />
                  </>
                )}

                {data.status === BookingStatusEnum.IN_PROCCESS && (
                  <>
                    <Divider />
                    <Alert
                      title="Recuerda:"
                      description="Si no marca como finalizado, el sistema automaticamente lo realizará el día siguiente de la fecha de término."
                      variant="info"
                    />
                  </>
                )}

                <List
                  data={[
                    { title: 'Fecha Inicio', value: moment(data.startDatetime).format('dddd DD MMM YYYY'), bold: true },
                    { title: 'Hora Inicio', value: moment(data.startDatetime).format('hh:mm a') },
                    { title: 'Fecha Fin', value: moment(data.endDatetime).format('dddd DD MMM YYYY'), bold: true },
                    { title: 'Hora Fin', value: moment(data.endDatetime).format('hh:mm a') },
                    { title: 'Precio por hora', value: `S/ ${formatMoney(data.vehicle.pricexhour ?? 0)}` },
                    { title: 'Total horas', value: `${formatMoney(data.totalHours)} hrs.` },
                    { title: 'PRECIO FINAL', value: `S/ ${formatMoney(data.totalPrice)}`, bold: true },
                  ]}
                />

                {data.comment ? (
                  <>
                    <Divider />
                    <p className="font-semibold">
                      Comentario
                      <br />
                      <span className="font-normal text-sm text-gray-500">{data.comment}</span>
                    </p>
                  </>
                ) : null}

                <Divider />

                <div className="flex flex-wrap gap-4 mt-5">
                  {buttons[data.status].map((btn, index) => (
                    <Fragment key={index}>{btn}</Fragment>
                  ))}

                  <Button
                    size="large"
                    variant="white"
                    className="!border-black"
                    style={{ width: buttons[data.status].length % 2 ? 'calc((50%) - 0.5rem)' : '100%' }}
                    onClick={handleClose}
                  >
                    CERRAR
                  </Button>
                </div>
              </div>
            </Spinner>
          </Drawer>
        }
      />

      {action === BookingStatusEnum.REJECTED && (
        <ConfirmAction
          title="RECHAZAR RESERVA"
          subtitle="¿Seguro que desea RECHAZAR esta reserva?"
          method="put"
          endpoint={`/booking/${data._id}`}
          body={{ status: action, comment }}
          handleClose={() => setAction(null)}
          handleResponse={(result) => handleResponse(result.success)}
          content={
            <Input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Ingresa un comentario"
              label="Comentario (opcional)"
            />
          }
        />
      )}

      {action === BookingStatusEnum.APPROVED && (
        <ConfirmAction
          title="APROBAR RESERVA"
          subtitle="¿Seguro que desea APROBAR esta reserva?"
          method="put"
          endpoint={`/booking/${data._id}`}
          body={{ status: action, comment }}
          handleClose={() => setAction(null)}
          handleResponse={(result) => handleResponse(result.success)}
          content={
            <Input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Ingresa un comentario"
              label="Comentario (opcional)"
            />
          }
        />
      )}

      {action === BookingStatusEnum.IN_PROCCESS && (
        <ConfirmAction
          title="AUTORIZAR PAGO DIRECTO"
          subtitle="El pago se realiza directamente entre el dueño y el contratante."
          method="put"
          endpoint={`/booking/${data._id}`}
          body={{ status: action }}
          handleClose={() => setAction(null)}
          handleResponse={(result) => handleResponse(result.success)}
        />
      )}

      {action === BookingStatusEnum.FINISHED && (
        <ConfirmAction
          title="FINALIZAR"
          subtitle="Para culminar el proceso presiona el botón CONFIRMAR"
          method="put"
          endpoint={`/booking/${data._id}`}
          body={{ status: action }}
          handleClose={() => setAction(null)}
          handleResponse={(result) => handleResponse(result.success)}
        />
      )}
    </>
  );
};

export default RentalsDrawer;

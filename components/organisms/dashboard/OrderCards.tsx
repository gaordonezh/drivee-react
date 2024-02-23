import Card from '@/components/atoms/Card';
import List, { ListItemProps } from '@/components/molecules/List';
import { useAppSelector } from '@/hooks/useStore';
import { BookingStatusEnum } from '@/store/booking/booking.enum';
import Link from 'next/link';
import { MdInfoOutline, MdOutlineCheck, MdOutlineClose } from 'react-icons/md';
import { formatMoney } from '@/utils/functions';
import moment from 'moment-timezone';
import { BOOKING_STATUS_TRANSLATE } from '@/utils/translate';
import { BookingProps } from '@/store/booking/booking';
import Alert from '@/components/atoms/Alert';
import { IoCarSportSharp } from 'react-icons/io5';
import Accordion from '@/components/atoms/Accordion';

export const BOOKING_STATUS_TAGS = {
  [BookingStatusEnum.PENDING]: {
    label: <span className="text-yellow-500 font-semibold text-sm">{BOOKING_STATUS_TRANSLATE[BookingStatusEnum.PENDING]}</span>,
    icon: <MdInfoOutline size={20} className="text-yellow-500" />,
    text: BOOKING_STATUS_TRANSLATE[BookingStatusEnum.PENDING],
  },
  [BookingStatusEnum.APPROVED]: {
    label: <span className="text-blue-500 font-semibold text-sm">{BOOKING_STATUS_TRANSLATE[BookingStatusEnum.APPROVED]}</span>,
    icon: <MdOutlineCheck size={20} className="text-blue-500" />,
    text: BOOKING_STATUS_TRANSLATE[BookingStatusEnum.APPROVED],
  },
  [BookingStatusEnum.REJECTED]: {
    label: <span className="text-red-500 font-semibold text-sm">{BOOKING_STATUS_TRANSLATE[BookingStatusEnum.REJECTED]}</span>,
    icon: <MdOutlineClose size={20} className="text-red-500" />,
    text: BOOKING_STATUS_TRANSLATE[BookingStatusEnum.REJECTED],
  },
  [BookingStatusEnum.FINISHED]: {
    label: <span className="text-green-500 font-semibold text-sm">{BOOKING_STATUS_TRANSLATE[BookingStatusEnum.FINISHED]}</span>,
    icon: <MdInfoOutline size={20} className="text-green-500" />,
    text: BOOKING_STATUS_TRANSLATE[BookingStatusEnum.FINISHED],
  },
  [BookingStatusEnum.IN_PROCCESS]: {
    label: <span className="text-blue-600 font-semibold text-sm">{BOOKING_STATUS_TRANSLATE[BookingStatusEnum.IN_PROCCESS]}</span>,
    icon: <IoCarSportSharp size={20} className="text-blue-600" />,
    text: BOOKING_STATUS_TRANSLATE[BookingStatusEnum.IN_PROCCESS],
  },
};

const OrderCards = () => {
  const { data } = useAppSelector((state) => state.booking);

  const getListData = (item: BookingProps): Array<ListItemProps> => {
    const toReturn: Array<ListItemProps> = [
      { title: 'Dirección', value: item.vehicle.address?.address, align: 'right' },
      {
        title: 'Ubicación',
        value: (
          <Link
            href={`https://maps.google.com/?q=${item.vehicle.address?.location.lat},${item.vehicle.address?.location.lng}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Ver
          </Link>
        ),
        align: 'right',
      },
      { title: 'Inicio', value: moment(item.startDatetime).format('dddd DD MMM YYYY, hh:mm a'), align: 'right' },
      { title: 'Fin', value: moment(item.endDatetime).format('dddd DD MMM YYYY, hh:mm a'), align: 'right' },
      { title: 'Precio por hora', value: `S/ ${formatMoney(item.vehicle.pricexhour ?? 0)}`, align: 'right' },
      { title: 'Total horas', value: `${formatMoney(item.totalHours)} hrs.`, align: 'right' },
      { title: 'PRECIO FINAL', value: `S/ ${formatMoney(item.totalPrice)}`, align: 'right' },
    ];

    if (item.comment) {
      toReturn.push({ title: 'Comentario del dueño', value: item.comment, align: 'right' });
    }

    return toReturn;
  };

  return (
    <>
      {data.docs.map((item) => {
        const tags = BOOKING_STATUS_TAGS[item.status];
        const diff = moment().diff(moment(item.endDatetime), 'day');

        return (
          <Card key={item._id}>
            <p className="text-sm flex items-center gap-2 uppercase">
              {tags.icon}
              {tags.label}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-rent-car">
                <p className="text-gray-900 font-bold text-xl">{item.vehicle.name}</p>
                <p className="text-gray-500 text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={item.vehicle.description}>
                  {item.vehicle.description}
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${item.vehicle.image})` }} />
            </div>

            {item.status === BookingStatusEnum.APPROVED && (
              <Alert title="Recuerda:" description="El pago se realizá el día de inicio del alquiler." className="my-5" variant="info" />
            )}

            {item.status === BookingStatusEnum.FINISHED && diff >= 0 && diff <= 15 && (
              <Alert
                title="Recuerda:"
                description="No olvides dejar tu comentario para "
                className="my-5"
                variant="info"
                link={{ path: `/details?code=${item.vehicle.id}#comments`, text: item.vehicle.name, target: '_blank' }}
              />
            )}

            {item.status === BookingStatusEnum.APPROVED && (
              <Alert
                title="¡Recuerda!"
                description="Tienes que coordinar el PAGO DIRECTO con el dueño del vehículo."
                className="my-5"
                variant="info"
              />
            )}

            <Accordion title="Detalles" className="my-5">
              <List small data={getListData(item)} />
              {typeof item.vehicle.owner === 'object' ? (
                <div className="flex items-center mt-5">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={item.vehicle.owner.photo ?? '/images/profile.png'}
                    alt="Avatar of Jonathan Reinink"
                  />
                  <div className="text-sm">
                    <p className="text-gray-900 font-semibold leading-none">{item.vehicle.owner.f_name}</p>
                    <p className="text-gray-500">— {item.vehicle.owner.email}</p>
                    <p className="text-gray-500">— {item.vehicle.owner.phone}</p>
                  </div>
                </div>
              ) : null}
            </Accordion>
          </Card>
        );
      })}
    </>
  );
};

export default OrderCards;

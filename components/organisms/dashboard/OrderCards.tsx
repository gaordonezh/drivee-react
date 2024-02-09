import Card from '@/components/atoms/Card';
import List from '@/components/molecules/List';
import { useAppSelector } from '@/hooks/useStore';
import { BookingStatusEnum } from '@/store/booking/booking.enum';
import Link from 'next/link';
import { MdInfoOutline, MdOutlineCheck, MdOutlineClose, MdWallet } from 'react-icons/md';
import { formatMoney } from '@/utils/functions';
import moment from 'moment-timezone';
import { BOOKING_STATUS_TRANSLATE } from '@/utils/translate';

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
  [BookingStatusEnum.PAYMENT]: {
    label: <span className="text-slate-500 font-semibold text-sm">{BOOKING_STATUS_TRANSLATE[BookingStatusEnum.PAYMENT]}</span>,
    icon: <MdWallet size={20} className="text-slate-500" />,
    text: BOOKING_STATUS_TRANSLATE[BookingStatusEnum.PAYMENT],
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
};

const OrderCards = () => {
  const { data } = useAppSelector((state) => state.booking);

  return (
    <>
      {data.docs.map((item) => (
        <Card key={item._id}>
          <p className="text-sm flex items-center gap-2">
            {BOOKING_STATUS_TAGS[item.status].icon}
            {BOOKING_STATUS_TAGS[item.status].label}
          </p>
          <div className="flex items-center mt-5 gap-2">
            <div className="w-rent-car">
              <p className="text-gray-900 font-bold text-xl">{item.vehicle.name}</p>
              <p className="text-gray-500 text-sm whitespace-nowrap overflow-hidden text-ellipsis" title={item.vehicle.description}>
                {item.vehicle.description}
              </p>
            </div>
            <div className="h-14 w-14 rounded-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${item.vehicle.image})` }} />
          </div>
          <List
            small
            data={[
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
            ]}
          />

          {typeof item.vehicle.owner === 'object' ? (
            <div className="flex items-center mt-5">
              <img className="w-10 h-10 rounded-full mr-4" src={item.vehicle.owner.photo ?? '/images/profile.png'} alt="Avatar of Jonathan Reinink" />
              <div className="text-sm">
                <p className="text-gray-900 font-semibold leading-none">{item.vehicle.owner.f_name}</p>
                <p className="text-gray-500">— {item.vehicle.owner.email}</p>
                <p className="text-gray-500">— {item.vehicle.owner.phone}</p>
              </div>
            </div>
          ) : null}
        </Card>
      ))}
    </>
  );
};

export default OrderCards;

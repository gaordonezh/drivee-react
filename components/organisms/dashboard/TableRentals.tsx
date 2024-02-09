import Fab from '@/components/atoms/Fab';
import Loader from '@/components/atoms/Loader';
import Empty from '@/components/molecules/Empty';
import { useAppSelector } from '@/hooks/useStore';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { formatMoney } from '@/utils/functions';
import moment from 'moment-timezone';
import Link from 'next/link';
import { BiCheck } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { BOOKING_STATUS_TAGS } from './OrderCards';

const TableRentals = () => {
  const { data } = useAppSelector((state) => state.booking);
  const loading = data.status === RequestStatusEnum.PENDING;

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="overflow-hidden">
          <table className="min-w-full text-sm font-light">
            <thead className="font-medium">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Estado
                </th>
                <th scope="col" className="px-6 py-4">
                  Solicitante
                </th>
                <th scope="col" className="px-6 py-4">
                  Vehículo
                </th>
                <th scope="col" className="px-6 py-4">
                  Inicio
                </th>
                <th scope="col" className="px-6 py-4">
                  Fin
                </th>
                <th scope="col" className="px-6 py-4">
                  Horas
                </th>
                <th scope="col" className="px-6 py-4">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {data.docs.length && !loading ? (
                data.docs.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 flex flex-row gap-2">
                      <p>{BOOKING_STATUS_TAGS[item.status].icon}</p>
                      <p>{BOOKING_STATUS_TAGS[item.status].label}</p>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {`${item.user.f_name} ${item.user.l_name}`}
                      <br />
                      {item.user.email}
                      <br />
                      {item.user.phone}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-row gap-2">
                        <div
                          className="h-10 w-10 rounded-full bg-no-repeat bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.vehicle.image})` }}
                        />
                        <div>
                          {item.vehicle.name}
                          <br />
                          <Link
                            href={`https://maps.google.com/?q=${item.vehicle.address?.location.lat},${item.vehicle.address?.location.lng}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline"
                          >
                            Ubicación
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {moment(item.startDatetime).format('dddd DD [de] MMMM [del] YYYY')}
                      <br />
                      {moment(item.startDatetime).format('hh:mm a')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {moment(item.endDatetime).format('dddd DD [de] MMMM [del] YYYY')}
                      <br />
                      {moment(item.endDatetime).format('hh:mm a')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{formatMoney(item.totalHours)} hrs.</td>
                    <td className="whitespace-nowrap px-6 py-4">S/ {formatMoney(item.totalPrice)}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex flex-row gap-1 justify-center">
                        <Fab icon={<BiCheck size={30} className="text-green-500" />} size="large" title="Aprobar" />
                        <Fab icon={<IoClose size={30} className="text-red-500" />} size="large" title="Rechazar" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>{loading ? <Loader /> : <Empty />}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableRentals;

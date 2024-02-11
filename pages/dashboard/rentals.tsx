import { useEffect, useState } from 'react';
import TableRentals from '@/components/organisms/dashboard/TableRentals';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { UserRolesEnum } from '@/store/user/user.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useAppContext } from '@/context';
import { BookingProps, GetBookingBodyProps } from '@/store/booking/booking';
import { getBooking } from '@/store/booking/booking.slice';
import Pagination, { PaginationActionType } from '@/components/molecules/Pagination';
import { ModalStateEnum, RequestStatusEnum } from '@/interfaces/global.enum';
import { BookingStatusEnum } from '@/store/booking/booking.enum';
import Select from '@/components/atoms/Select';
import { BOOKING_STATUS_TAGS } from '@/components/organisms/dashboard/OrderCards';
import RentalsDrawer from '@/components/organisms/dashboard/RentalsDrawer';
import Alert from '@/components/atoms/Alert';

type ParamsStateType = { limit: number; status?: BookingStatusEnum; action?: PaginationActionType };
export type RentalsModalStateType = null | { mode: ModalStateEnum; data: BookingProps };

const Rentals = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppContext();
  const { data, requestBookingState } = useAppSelector((state) => state.booking);
  const [params, setParams] = useState<ParamsStateType>({ limit: 10 });
  const [modals, setModals] = useState<RentalsModalStateType>(null);
  const loading = data.status === RequestStatusEnum.PENDING;

  useEffect(() => {
    obtainData();
  }, [params]);

  const obtainData = () => {
    const { limit, action, status } = params;
    const body: GetBookingBodyProps = {
      owner: user?._id,
      limit: limit, // @ts-ignore
      status: status === 'all' ? undefined : status,
      next: action === 'next' ? data.next : undefined,
      previous: action === 'previous' ? data.previous : undefined,
    };
    dispatch(getBooking(body));
  };

  const selectData = [
    ...Object.values(BookingStatusEnum).map((item) => ({ label: BOOKING_STATUS_TAGS[item].text, value: item })),
    { label: 'Todos', value: 'all' },
  ];

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <div className="flex flex-col md:flex-row gap-2 justify-between items-start mb-5">
        <h2 className="text-xl font-bold">Revisa aquí el estado de tus alquileres</h2>
        <Select
          value={params.status}
          data={selectData}
          setValue={(newValue) => setParams({ ...params, status: newValue as BookingStatusEnum })}
          keyToShow="label"
          keyToGey="value"
          className="w-full md:w-[250px]"
          placeholder="Selecciona un estado"
        />
      </div>

      {requestBookingState === RequestStatusEnum.SUCCESS && <Alert title="El estado de la solicitud se actualizó correctamente" className="mb-5" />}

      <TableRentals setModals={setModals} />

      <Pagination
        total={data.totalDocs}
        perPage={params.limit}
        disabled={loading || !data.docs.length}
        onChange={(action) => setParams({ ...params, action })}
      />

      {modals && <RentalsDrawer data={modals.data} handleClose={() => setModals(null)} handleReload={obtainData} />}
    </Layout>
  );
};

export default Rentals;

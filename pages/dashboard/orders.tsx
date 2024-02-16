import { useEffect, useState } from 'react';
import Card from '@/components/atoms/Card';
import Skeleton from '@/components/atoms/Skeleton';
import Empty from '@/components/molecules/Empty';
import Layout from '@/components/templates';
import { useAppContext } from '@/context';
import LayoutEnum from '@/enums/layout.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { GetBookingBodyProps } from '@/store/booking/booking';
import { getBooking } from '@/store/booking/booking.slice';
import { UserRolesEnum } from '@/store/user/user.enum';
import OrderCards from '@/components/organisms/dashboard/OrderCards';
import Pagination, { PaginationActionType } from '@/components/molecules/Pagination';

const limit = 10;
const Orders = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppContext();
  const { data } = useAppSelector((state) => state.booking);
  const loading = data.status === RequestStatusEnum.PENDING;
  const [action, setAction] = useState<PaginationActionType>();

  useEffect(() => {
    obtainData();
  }, [action]);

  const obtainData = () => {
    const body: GetBookingBodyProps = {
      user: user?._id,
      populate: ['owner'],
      limit,
      next: action === 'next' ? data.next : undefined,
      previous: action === 'previous' ? data.previous : undefined,
    };
    dispatch(getBooking(body));
  };

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.USER, UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <OrderCards />

        {loading
          ? Array.from(Array(2).keys()).map((item) => (
              <Card className="bg-white" key={item}>
                <Skeleton
                  items={[
                    { type: 'paragraph', qty: 1 },
                    { type: 'title', qty: 1 },
                    { type: 'paragraph', qty: 1 },
                    { type: 'empty', qty: 1 },
                    { type: 'paragraph', qty: 2 },
                    { type: 'empty', qty: 1 },
                    { type: 'paragraph', qty: 2 },
                    { type: 'empty', qty: 1 },
                    { type: 'paragraph', qty: 2 },
                    { type: 'empty', qty: 1 },
                    { type: 'paragraph', qty: 2 },
                    { type: 'empty', qty: 1 },
                    { type: 'paragraph', qty: 2 },
                    { type: 'empty', qty: 1 },
                    { type: 'subtitle', qty: 1 },
                    { type: 'paragraph', qty: 1 },
                  ]}
                />
              </Card>
            ))
          : null}
      </div>

      {!data.docs.length && !loading ? (
        <div className="py-10">
          <Empty title="No tiene rentas" />
        </div>
      ) : null}

      <Pagination total={data.totalDocs} perPage={limit} disabled={loading || !data.docs.length} onChange={setAction} />
    </Layout>
  );
};

export default Orders;

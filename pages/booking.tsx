import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Container from '@/components/molecules/Container';
import BookingFilters, { BookingFiltersStateType } from '@/components/organisms/BookingFilters';
import { useRouter } from 'next/router';
import { formatMoney, objectCleaner } from '@/utils/functions';
import Pagination from '@/components/molecules/Pagination';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { getPublicVehicles } from '@/store/vehicle/vehicle.slice';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import { GetPublicVehiclesFilterProps, VehicleDetailsProps } from '@/store/vehicle/vehicle';
import Skeleton from '@/components/atoms/Skeleton';
import Card from '@/components/atoms/Card';
import Empty from '@/components/molecules/Empty';
import moment from 'moment-timezone';
import { VehicleTypeEnum } from '@/store/vehicle/vehicle.enum';
import Link from 'next/link';

const limit = 20;
const Booking = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.vehicles.publicVehicles);
  const [fields, setFields] = useState<BookingFiltersStateType>({
    startAt: '',
    endAt: '',
    type: '',
    willcard: '',
    priceFrom: '',
    priceTo: '',
    action: '',
    ...router.query,
    location: router.query.location ? JSON.parse(router.query.location as string) : null,
  });
  const loading = data.status === RequestStatusEnum.PENDING;

  useEffect(() => {
    const newParams = objectCleaner({ ...fields, location: fields.location ? JSON.stringify(fields.location) : '' });
    router.replace({ query: newParams });

    getRealData();
  }, [fields]);

  const getRealData = () => {
    const { location, startAt, endAt, type, willcard, priceFrom, priceTo, action } = fields;

    const filters = objectCleaner({
      limit,
      willcard,
      latitude: location?.location.lat,
      longitude: location?.location.lng,
      dateFrom: startAt ? moment(startAt).startOf('day').toISOString() : undefined,
      dateTo: endAt ? moment(endAt).endOf('day').toISOString() : undefined,
      type: type as VehicleTypeEnum,
      priceFrom,
      priceTo,
      next: action === 'next' ? data.next : undefined,
      previous: action === 'previous' ? data.previous : undefined,
    } as GetPublicVehiclesFilterProps);

    dispatch(getPublicVehicles(filters));
  };

  return (
    <Layout layout={LayoutEnum.PUBLIC}>
      <div className="bg-gray-100">
        <BookingFilters loading={loading} fields={fields} setFields={setFields} />

        <Container className="px-10 mt-10">
          <div className="mb-5">
            {loading ? (
              <Skeleton items={[{ type: 'subtitle', qty: 1 }]} />
            ) : (
              <>
                {data.totalDocs ? (
                  <p className="text-gray-500">
                    Se encontraron <b>{data.totalDocs}</b> resultados
                  </p>
                ) : null}
              </>
            )}
          </div>

          {!data.docs.length && !loading && (
            <div className="py-20">
              <Empty title="No se encontraron resultados" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.docs.length
              ? data.docs.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg hover:shadow-xl">
                    <Image src={item.images[0]} width={300} height={200} alt={item.name} className="w-full h-[200px]" />
                    <div className="px-5 py-3 flex flex-col h-[255px]">
                      <p className="font-bold text-2xl">{item.name}</p>
                      <DetailsRender details={item.details} />

                      <div className="flex-1" />

                      {item.distance === undefined ? null : (
                        <p className="border-b border-b-slate-200 text-sm text-slate-400">
                          A <b>{Number(item.distance).toFixed(1)}</b> km. del punto marcado.
                        </p>
                      )}
                      <footer className="flex flex-row justify-between items-center gap-2">
                        <div>
                          <p className="text-xl font-semibold text-slate-500">Por hora</p>
                          <p className="font-extrabold text-2xl">
                            <sup>S/</sup>
                            {formatMoney(item.pricexhour)}
                          </p>
                        </div>
                        <Link href={{ pathname: '/details', query: objectCleaner({ code: item._id, startAt: fields.startAt, endAt: fields.endAt }) }}>
                          <Button>Detalles</Button>
                        </Link>
                      </footer>
                    </div>
                  </div>
                ))
              : loading &&
                Array.from(Array(4).keys()).map((item) => (
                  <Card className="bg-white" key={item}>
                    <Skeleton
                      items={[
                        { type: 'image', qty: 1 },
                        { type: 'title', qty: 1 },
                        { type: 'paragraph', qty: 3 },
                        { type: 'empty', qty: 1 },
                        { type: 'subtitle', qty: 2 },
                      ]}
                    />
                  </Card>
                ))}
          </div>

          <div className="pb-20 pt-10">
            <Pagination
              total={data.totalDocs}
              perPage={limit}
              disabled={loading || !data.docs.length}
              onChange={(action) => setFields({ ...fields, action })}
            />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Booking;

const DetailsRender = ({ details }: { details: Array<VehicleDetailsProps> }) => {
  const list = details.slice(0, 3);
  const extra = details.slice(3, details.length);

  return (
    <ul className="">
      {list.map((record) => (
        <li key={record.value} className="flex flex-row justify-between gap-2 mb-1">
          <p className="text-gray-500">{record.title}</p>
          <p className="text-gray-500">{record.value}</p>
        </li>
      ))}
      {extra.length ? <li className="text-gray-500">+ {extra.length} adicionales...</li> : null}
    </ul>
  );
};

const LoadingSkeleton = () => {};

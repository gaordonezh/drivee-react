import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Container from '@/components/molecules/Container';
import BookingFilters from '@/components/organisms/BookingFilters';
import { useRouter } from 'next/router';
import { objectCleaner } from '@/utils/functions';
import Pagination from '@/components/molecules/Pagination';

const Booking = () => {
  const router = useRouter();
  const [fields, setFields] = useState({
    location: '',
    startAt: '',
    endAt: '',
    type: '',
    willcard: '',
    priceFrom: '',
    priceTo: '',
    ...router.query,
  });

  useEffect(() => {
    router.replace({ query: objectCleaner(fields) });
  }, [fields]);

  const handleContinue = (code: string) => {
    const query = objectCleaner({ code, location: fields.location, startAt: fields.startAt, endAt: fields.endAt });
    router.push({ pathname: '/details', query });
  };

  return (
    <div className="bg-gray-100">
      <BookingFilters fields={fields} setFields={setFields} />

      <Container className="px-10 mt-10">
        <p className="text-gray-500 mb-5">
          Se encontraron <b>67</b> resultados
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from(Array(4).keys()).map((item) => (
            <div key={item} className="bg-white rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg hover:shadow-xl">
              <img src="/images/auth-bg.jpg" alt="Card" />
              <div className="px-5 py-3">
                <p className="font-bold text-2xl mb-2">Corola</p>
                <ul className="mb-5">
                  {Array.from(Array(2).keys()).map((item) => (
                    <li key={item} className="flex flex-row justify-between gap-2 mb-1">
                      <p className="text-gray-500">Asientos</p>
                      <p className="text-gray-500">4</p>
                    </li>
                  ))}
                </ul>
                <footer className="flex flex-row justify-between items-center gap-2 ">
                  <div>
                    <p className="text-xl font-semibold text-gray-500">Por hora</p>
                    <p className="font-extrabold text-2xl">
                      <sup>S/</sup>50.00
                    </p>
                  </div>
                  <Button onClick={() => handleContinue(String(item))}>Alquilar</Button>
                </footer>
              </div>
            </div>
          ))}
        </div>
        <div className="pb-20 pt-10">
          <Pagination />
        </div>
      </Container>
    </div>
  );
};

export default Booking;

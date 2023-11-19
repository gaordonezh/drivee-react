import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@/components/molecules/Container';

const Details = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
    if (!router.query.code) {
      router.push('/');
      return;
    }
  }, [router.query]);

  return (
    <Container className="py-10 px-20 flex flex-col gap-20">
      <div className="flex gap-5">
        <div className="flex-auto flex flex-col gap-5">
          <div className="border border-red-600 rounded-xl bg-slate-100 h-[500px]">CAR MAIN IMAGE</div>
          <div className="flex gap-5">
            {Array.from(Array(3).keys()).map((item) => (
              <div className="border border-red-600 flex-1 rounded-lg h-[200px]" key={item}>
                IMAGE {item + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="border border-red-600 flex-initial w-[500px] rounded-xl bg-slate-100">FIELDS</div>
      </div>
      <p className="border border-red-600">BMW M2 2020</p>
      <div className="border border-red-600">
        <p className="font-bold text-2xl mb-5">Especificaciones</p>
        <ul className='grid grid-cols-4 gap-x-16 gap-y-2'>
          {Array.from(Array(15).keys()).map((item) => (
            <li key={item} className="flex justify-between border-b">
              <p className="text-gray-500">Asientos</p>
              <p className="text-gray-500">2</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Details;

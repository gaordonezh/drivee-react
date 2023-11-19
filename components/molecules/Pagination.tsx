import React from 'react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Button from '../atoms/Button';

const Pagination = () => {
  return (
    <div className="flex flex-col gap-3 text-center md:items-center md:flex-row justify-between bg-white px-4 py-3 sm:px-6">
      <Button variant="white">
        <HiOutlineArrowNarrowLeft /> Anterior
      </Button>
      <p className="text-gray-500 text-sm">
        Mostrando <b>1</b> a <b>10</b> de <b>76</b> resultados
      </p>
      <Button variant="white">
        Siguiente <HiOutlineArrowNarrowRight />
      </Button>
    </div>
  );
};

export default Pagination;

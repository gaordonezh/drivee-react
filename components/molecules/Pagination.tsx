import React, { useState } from 'react';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Button from '../atoms/Button';

type ActionType = 'previous' | 'next';

interface PaginationProps {
  total: number;
  perPage: number;
  disabled: boolean;
  onChange: (action: ActionType) => void;
}

const crearPaginador = (totalRegistros: number, porPagina: number, paginaActual: number) => {
  const totalPaginas = Math.ceil(totalRegistros / porPagina);

  if (paginaActual < 1) {
    paginaActual = 1;
  } else if (paginaActual > totalPaginas) {
    paginaActual = totalPaginas;
  }

  const inicio = (paginaActual - 1) * porPagina + 1;
  const fin = Math.min(inicio + porPagina - 1, totalRegistros);

  return { paginaActual, totalPaginas, inicio, fin };
};

const Pagination = ({ total, perPage, disabled, onChange }: PaginationProps) => {
  const [currentPage, setCurrent] = useState(1);
  const { paginaActual, totalPaginas, inicio, fin } = crearPaginador(total, perPage, currentPage);

  const disabledPrev = paginaActual === 1;
  const disabledNext = paginaActual === totalPaginas;

  const handleChange = (action: ActionType) => {
    onChange(action);
    setCurrent(action === 'next' ? currentPage + 1 : currentPage - 1);
  };

  return (
    <div className="flex flex-col gap-3 text-center md:items-center md:flex-row justify-between bg-white px-4 py-3 sm:px-6">
      <Button
        variant="white"
        className={disabled || disabledPrev ? 'pointer-events-none text-gray-400' : ''}
        onClick={() => handleChange('previous')}
      >
        <HiOutlineArrowNarrowLeft /> Anterior
      </Button>
      <p className="text-gray-500 text-sm">
        Mostrando <b>{total ? inicio : 0}</b> a <b>{fin}</b> de <b>{total}</b> registros
      </p>
      <Button variant="white" className={disabled || disabledNext ? 'pointer-events-none text-gray-400' : ''} onClick={() => handleChange('next')}>
        Siguiente <HiOutlineArrowNarrowRight />
      </Button>
    </div>
  );
};

export default Pagination;

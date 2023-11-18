import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '../atoms/Button';
import { LuSettings2 } from 'react-icons/lu';
import { combineClassnames } from '@/utils/functions';
import RangePrice from '../molecules/RangePrice';
import GeneralInputFilters, { FieldsFiltersType } from './GeneralInputFilters';
import Select from '../atoms/Select';

interface FieldsType extends FieldsFiltersType {
  type: string;
  willcard: string;
  priceFrom: string;
  priceTo: string;
}

interface BookingFiltersProps {
  fields: FieldsType;
  setFields: (params: FieldsType) => void;
}

const items = [
  { _id: 'car', name: 'Automovil' },
  { _id: 'bike', name: 'Motocicleta' },
];

const BookingFilters = ({ fields, setFields }: BookingFiltersProps) => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);

  return (
    <>
      <div className="h-[300px] bg-booking bg-no-repeat bg-top bg-cover text-center">
        <h1 className={combineClassnames('text-white text-lg font-semibold lg:text-3xl', showExtraFilters ? 'pt-14' : 'pt-20')}>
          Alquila un coche, alquila tu libertad
        </h1>
      </div>

      <div className={combineClassnames('booking__filters', showExtraFilters ? 'h-[130px]' : 'h-[75px]')}>
        <div className="booking__filters--box">
          <div className="booking__filters--card">
            <div className="booking__filters--main">
              <GeneralInputFilters
                location={fields.location}
                startAt={fields.startAt}
                endAt={fields.endAt}
                setFields={(newParams) => setFields({ ...fields, ...newParams })}
              />
            </div>
            <div className="booking__filters--others">
              <Button size="large" onClick={() => setShowExtraFilters((prev) => !prev)}>
                <LuSettings2 size={20} /> {showExtraFilters ? 'Ocultar' : 'Agregar'} filtros
              </Button>
              <div className={combineClassnames('flex gap-5 mt-5', showExtraFilters ? 'block' : 'hidden')}>
                <Input
                  label="Buscar"
                  placeholder="Buscar"
                  value={fields.willcard}
                  onChange={(event) => setFields({ ...fields, willcard: event.target.value })}
                />
                <Select data={items} value={fields.type} setValue={(type) => setFields({ ...fields, type })} />
                <RangePrice priceFrom={fields.priceFrom} priceTo={fields.priceTo} setFields={(newParams) => setFields({ ...fields, ...newParams })} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingFilters;

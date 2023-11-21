import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '../atoms/Button';
import { LuSettings2 } from 'react-icons/lu';
import { combineClassnames } from '@/utils/functions';
import RangePrice from '../molecules/RangePrice';
import GeneralInputFilters, { FieldsFiltersType } from './GeneralInputFilters';
import Select from '../atoms/Select';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import FiltersDrawer from './FiltersDrawer';
import Chip from '../atoms/Chip';
import moment from 'moment-timezone';
import { IoCloseCircleOutline } from 'react-icons/io5';

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

const itemsTranslate = {
  car: 'Automovil',
  bike: 'Motocicleta',
};

const items = [
  { _id: 'car', name: itemsTranslate.car },
  { _id: 'bike', name: itemsTranslate.bike },
];

type FieldValueType = { keys: Array<string>; value: string };

const BookingFilters = ({ fields, setFields }: BookingFiltersProps) => {
  const { width } = useWindowDimensions();
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClose = () => setShowDrawer(false);

  const handleRemove = (items: Array<keyof typeof fields>) => {
    items.forEach((item) => {
      fields[item] = '';
    });
    setFields({ ...fields });
  };

  const fieldsValues = Object.entries(fields).reduce((acum, [key, value]) => {
    if (!value) return acum;
    if (['location', 'willcard'].includes(key)) acum.push({ keys: [key], value });
    if (key === 'startAt')
      acum.push({
        keys: ['startAt', 'endAt'],
        value: `${moment(fields.startAt).format('DD/MM/YYYY')} a ${moment(fields.endAt).format('DD/MM/YYYY')}`,
      });

    if (key === 'type') acum.push({ keys: ['type'], value: itemsTranslate[value as keyof typeof itemsTranslate] });
    if (key === 'priceFrom') acum.push({ keys: ['priceFrom', 'priceTo'], value: `S/ ${fields.priceFrom} a S/ ${fields.priceTo}` });
    return acum;
  }, [] as Array<FieldValueType>);

  return (
    <>
      <div className="h-[300px] bg-booking bg-no-repeat bg-top bg-cover text-center pt-28 md:pt-20">
        <h1 className={combineClassnames('text-white text-xl font-semibold lg:text-3xl')}>Alquila un coche, alquila tu libertad</h1>
      </div>

      <div className={combineClassnames('booking__filters h-[40px] md:h-[80px]')}>
        <div className="booking__filters--box">
          <div className="booking__filters--card">
            {width >= 768 ? (
              <div className="booking__filters--main">
                <GeneralInputFilters
                  location={fields.location}
                  startAt={fields.startAt}
                  endAt={fields.endAt}
                  setFields={(newParams) => setFields({ ...fields, ...newParams })}
                />
              </div>
            ) : null}
            <div className="filter__chips--container">
              <div className="filter__chips--action">
                <Button size={width > 768 ? 'large' : 'medium'} onClick={() => setShowDrawer((prev) => !prev)}>
                  <LuSettings2 size={20} /> Agregar filtros
                </Button>
              </div>
              <div className="filter__chips--items">
                {fieldsValues.map((item) => (
                  <Chip
                    key={item.value}
                    label={item.value}
                    size="small"
                    iconRight={
                      <IoCloseCircleOutline size={20} cursor="pointer" onClick={() => handleRemove(item.keys as Array<keyof typeof fields>)} />
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDrawer && (
        <FiltersDrawer onClose={handleClose}>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold">Aplicar filtros</h2>
            <Input
              label="Buscar"
              placeholder="Buscar"
              value={fields.willcard}
              onChange={(event) => setFields({ ...fields, willcard: event.target.value })}
            />
            {width < 768 ? (
              <GeneralInputFilters
                location={fields.location}
                startAt={fields.startAt}
                endAt={fields.endAt}
                setFields={(newParams) => setFields({ ...fields, ...newParams })}
              />
            ) : null}
            <Select label="Tipo de vehículo" data={items} value={fields.type} setValue={(type) => setFields({ ...fields, type })} />
            <RangePrice priceFrom={fields.priceFrom} priceTo={fields.priceTo} setFields={(newParams) => setFields({ ...fields, ...newParams })} />
            <Button size="large" className="mt-5" onClick={handleClose}>
              Aplicar filtros
            </Button>
            <Button size="large" variant="white" onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </FiltersDrawer>
      )}
    </>
  );
};

export default BookingFilters;

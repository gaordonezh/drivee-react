import React, { useState, useEffect } from 'react';
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
import { VehicleTypeEnum } from '@/store/vehicle/vehicle.enum';
import { VEHICLE_TYPES_TRANSLATE } from '@/utils/translate';
import Spinner from '../molecules/Spinner';
import Container from '../molecules/Container';

export interface BookingFiltersStateType extends FieldsFiltersType {
  type: string;
  willcard: string;
  priceFrom: string;
  priceTo: string;
  action: string;
}

interface BookingFiltersProps {
  loading: boolean;
  fields: BookingFiltersStateType;
  setFields: (params: BookingFiltersStateType) => void;
}

const items = Object.values(VehicleTypeEnum).map((item) => ({ _id: item, name: VEHICLE_TYPES_TRANSLATE[item] }));

type FieldValueType = { keys: Array<string>; value: string };

const BookingFilters = ({ loading, fields, setFields }: BookingFiltersProps) => {
  const { width } = useWindowDimensions();
  const [showDrawer, setShowDrawer] = useState(false);
  const [auxFields, setAuxFields] = useState<BookingFiltersStateType>({ ...fields });

  useEffect(() => {
    setAuxFields({ ...fields });
  }, [fields]);

  const handleClose = () => setShowDrawer(false);

  const handleRemove = (items: Array<keyof typeof fields>) => {
    items.forEach((item) => {
      if (item === 'location') fields.location = null;
      else fields[item] = '';
    });
    setFields({ ...fields });
  };

  const fieldsValues = Object.entries(fields).reduce((acum, [key, value]) => {
    if (!value) return acum;
    if (['willcard'].includes(key)) acum.push({ keys: [key], value });
    if (['location'].includes(key)) acum.push({ keys: [key], value: fields.location?.text ?? '' });
    if (key === 'startAt')
      acum.push({
        keys: ['startAt', 'endAt'],
        value: `${moment(fields.startAt).format('DD/MM/YYYY')} a ${moment(fields.endAt).format('DD/MM/YYYY')}`,
      });

    if (key === 'type') acum.push({ keys: ['type'], value: VEHICLE_TYPES_TRANSLATE[value as keyof typeof VEHICLE_TYPES_TRANSLATE] });
    if (key === 'priceFrom') acum.push({ keys: ['priceFrom', 'priceTo'], value: `S/ ${fields.priceFrom} a S/ ${fields.priceTo}` });
    return acum;
  }, [] as Array<FieldValueType>);

  return (
    <>
      <div className="h-[150px] md:h-[250px] bg-booking bg-no-repeat bg-top bg-cover text-center pt-10 md:pt-14">
        <h1 className={combineClassnames('text-white text-xl font-semibold lg:text-3xl')}>Alquila un coche, alquila tu libertad</h1>
      </div>

      <Container className="px-10 booking__filters h-[40px] md:h-[80px]">
        <div className="booking__filters--box">
          <Spinner loading={loading}>
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
                  <Button fullWidth={width < 500} size={width > 768 ? 'large' : 'medium'} onClick={() => setShowDrawer((prev) => !prev)}>
                    <LuSettings2 size={20} /> Agregar filtros
                  </Button>
                </div>
                <div className="filter__chips--items">
                  {fieldsValues.map((item) => (
                    <Chip
                      key={item.value}
                      label={item.value}
                      bold={false}
                      whiteSpace={false}
                      size="small"
                      iconRight={
                        <div className="h-[20px] w-[20px]">
                          <IoCloseCircleOutline size={20} cursor="pointer" onClick={() => handleRemove(item.keys as Array<keyof typeof fields>)} />
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </Spinner>
        </div>
      </Container>

      {showDrawer && (
        <FiltersDrawer onClose={handleClose}>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold">Aplicar filtros</h2>
            <Input
              label="Buscar"
              placeholder="Buscar"
              value={auxFields.willcard}
              onChange={(event) => setAuxFields({ ...auxFields, willcard: event.target.value })}
            />
            {width < 768 ? (
              <GeneralInputFilters
                location={auxFields.location}
                startAt={auxFields.startAt}
                endAt={auxFields.endAt}
                setFields={(newParams) => setAuxFields({ ...auxFields, ...newParams })}
              />
            ) : null}
            <Select label="Tipo de vehículo" data={items} value={auxFields.type} setValue={(type) => setAuxFields({ ...auxFields, type })} />
            <RangePrice
              priceFrom={auxFields.priceFrom}
              priceTo={auxFields.priceTo}
              setFields={(newParams) => setAuxFields({ ...auxFields, ...newParams })}
            />
            <Button
              size="large"
              className="mt-5"
              onClick={() => {
                setFields({ ...auxFields });
                handleClose();
              }}
            >
              Aplicar filtros
            </Button>
            <Button
              size="large"
              variant="white"
              onClick={() => {
                setAuxFields({ ...fields });
                handleClose();
              }}
            >
              Cancelar
            </Button>
          </div>
        </FiltersDrawer>
      )}
    </>
  );
};

export default BookingFilters;

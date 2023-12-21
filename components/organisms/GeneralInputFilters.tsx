import React from 'react';
import Input from '../atoms/Input';
import RangePickerModal from './RangePickerModal';
import moment from 'moment-timezone';
import InputMaps, { InputMapsStateType } from '../molecules/InputMaps';

export type FieldsFiltersType = { location: InputMapsStateType; startAt: string; endAt: string };

interface GeneralInputFiltersProps extends FieldsFiltersType {
  setFields: (params: FieldsFiltersType) => void;
}

const GeneralInputFilters = (props: GeneralInputFiltersProps) => {
  const { setFields, ...rest } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <InputMaps label="Ubicación" value={rest.location} setValue={(location) => setFields({ ...rest, location })} />
      <Input
        label="Fecha de recogida"
        autoComplete="off"
        onFocus={() => setOpen(true)}
        placeholder="Selecciona una fecha"
        value={rest.startAt ? moment(rest.startAt).format('DD/MM/YYYY') : ''}
        readOnly
      />
      <Input
        label="Fecha de devolución"
        autoComplete="off"
        onFocus={() => setOpen(true)}
        placeholder="Selecciona una fecha"
        value={rest.endAt ? moment(rest.endAt).format('DD/MM/YYYY') : ''}
        readOnly
      />

      {open && (
        <RangePickerModal
          handleClose={() => setOpen(false)}
          handleSave={(startAt, endAt) => setFields({ ...rest, startAt, endAt })}
          oldDates={{ startAt: rest.startAt, endAt: rest.endAt }}
        />
      )}
    </React.Fragment>
  );
};

export default GeneralInputFilters;

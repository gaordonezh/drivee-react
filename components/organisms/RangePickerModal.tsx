import React, { useState, useId } from 'react';
import DateRangePicker, { RangePickerStateType } from './DateRangePicker';
import PortalCreator from '../molecules/PortalCreator';
import Modal from './Modal';
import Button from '../atoms/Button';
import moment from 'moment-timezone';

interface RangePickerModalProps {
  handleClose: VoidFunction;
  handleSave: (startDate: string, endDate: string) => void;
  oldDates: {
    startAt?: string | null;
    endAt?: string | null;
  };
}

const RangePickerModal = ({ handleClose, handleSave, oldDates }: RangePickerModalProps) => {
  const uniqueGlobalId = useId();
  const [dates, setDates] = useState<RangePickerStateType>([
    oldDates.startAt ? new Date(oldDates.startAt) : null,
    oldDates.endAt ? new Date(oldDates.endAt) : null,
  ]);
  const [startDate, endDate] = dates;

  return (
    <PortalCreator
      uniqueGlobalId={uniqueGlobalId}
      component={
        <Modal onClose={handleClose}>
          <DateRangePicker dates={dates} setDates={setDates} />
          <div className="flex flex-col-reverse justify-end lg:flex-row gap-5 mt-10">
            <Button size="large" variant="white" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              size="large"
              disabled={!startDate || !endDate}
              onClick={() => {
                handleSave(moment(startDate).startOf('day').toISOString(), moment(endDate).endOf('day').toISOString());
                handleClose();
              }}
            >
              Aplicar fechas
            </Button>
          </div>
        </Modal>
      }
    />
  );
};

export default RangePickerModal;

import React from 'react';
import moment, { Moment } from 'moment-timezone';
import ReactDatePicker from 'react-datepicker';
import { CiTimer } from 'react-icons/ci';

interface TimePickerProps {
  label?: string;
  minTime?: Date;
  time: null | Moment;
  setTime: (time: null | Moment) => void;
}

const TimePicker = ({ label, time, minTime, setTime }: TimePickerProps) => (
  <div className="w-full">
    {label && <label className="font-semibold">{label}</label>}
    <ReactDatePicker
      calendarIconClassname="react-datepicker-picker-icon"
      dateFormat="HH:mm"
      timeCaption="Hora"
      showTimeSelect
      showTimeSelectOnly
      placeholderText="Seleccione una hora"
      timeIntervals={30}
      className="react-datepicker-picker"
      showIcon
      icon={(<CiTimer />) as any}
      selected={time ? moment(time).toDate() : null}
      onChange={(update) => setTime(moment(update))}
      minTime={minTime}
      maxTime={minTime ? moment({ hours: 23, minutes: 59, seconds: 59 }).toDate() : undefined}
    />
  </div>
);

export default TimePicker;

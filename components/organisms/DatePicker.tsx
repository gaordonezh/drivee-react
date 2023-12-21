import { combineClassnames } from '@/utils/functions';
import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { CiCalendar } from 'react-icons/ci';

interface DatePickerProps extends ReactDatePickerProps {
  label?: string;
}

const DatePicker = ({ label, className, ...rest }: DatePickerProps) => (
  <div className="w-full">
    {label && <label className="font-semibold">{label}</label>}
    <ReactDatePicker
      calendarIconClassname="react-datepicker-picker-icon"
      dateFormat="dd/MM/yyyy"
      className={combineClassnames('react-datepicker-picker', className)}
      showIcon
      icon={(<CiCalendar />) as any}
      disabledKeyboardNavigation
      placeholderText="Seleccione una fecha"
      {...rest}
    />
  </div>
);

export default DatePicker;

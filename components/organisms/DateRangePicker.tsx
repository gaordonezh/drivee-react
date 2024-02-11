import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export type RangePickerStateType = [Date | null, Date | null];

interface DateRangePickerProps {
  dates: RangePickerStateType;
  setDates: (dates: RangePickerStateType) => void;
}

const DateRangePicker = ({ dates, setDates }: DateRangePickerProps) => {
  const { width } = useWindowDimensions();
  const [startDate, endDate] = dates;

  return (
    <div className="react-datepicker-container">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => setDates(update)}
        monthsShown={width > 900 ? 2 : 1}
        disabledKeyboardNavigation
        inline
        minDate={moment().toDate()}
        maxDate={moment().add(6, 'months').subtract(1, 'day').toDate()}
      />
    </div>
  );
};

export default DateRangePicker;

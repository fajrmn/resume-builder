import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";

interface DateRangePickerProps {
  startDate: string | null;
  endDate?: string | null;
  current?: boolean;
  onChange: (startDate: string | null, endDate: string | null, current: boolean) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  current = false,
  onChange
}) => {
  const [start, setStart] = useState<Date | null>(startDate ? new Date(startDate) : null);
  const [end, setEnd] = useState<Date | null>(endDate ? new Date(endDate) : null);
  const [isCurrent, setIsCurrent] = useState(current);

  useEffect(() => {
    onChange(
      start ? start.toISOString() : null, 
      isCurrent ? null : (end ? end.toISOString() : null), 
      isCurrent
    );
  }, [start, end, isCurrent]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates;
    setStart(startDate);
    setEnd(endDate);
    setIsCurrent(false);
  };

  const toggleCurrent = () => {
    const newCurrentStatus = !isCurrent;
    setIsCurrent(newCurrentStatus);
    if (newCurrentStatus) {
      setEnd(null);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <DatePicker
        selectsRange
        startDate={start}
        endDate={end}
        onChange={handleDateChange}
        monthsShown={2}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText="Start - End Date"
        className="w-40 bg-transparent border-none focus:border-none focus:outline-none focus:ring-0 text-right"
        isClearable
      />
      
      <label className="flex items-center space-x-1 text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={isCurrent}
          onChange={toggleCurrent}
          className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <span className="text-sm">Present</span>
      </label>
    </div>
  );
};

export default DateRangePicker;

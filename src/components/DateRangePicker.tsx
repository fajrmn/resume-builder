import React, { useState, useEffect } from 'react';

interface DateRangePickerProps {
  startDate: string | null;
  endDate?: string | null;
  onChange: (startDate: string | null, endDate: string | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange
}) => {
  const [dateRange, setDateRange] = useState(
    startDate && endDate ? `${startDate} - ${endDate}` : (startDate || '')
  );

  useEffect(() => {
    const [start, end] = dateRange.split(' - ');
    onChange(start || null, end || null);
  }, [dateRange]);

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange(e.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={dateRange}
        onChange={handleDateRangeChange}
        placeholder="Start Date - End Date"
        className="w-full bg-transparent border-none focus:ring-0 text-gray-600 placeholder-gray-400"
      />
    </div>
  );
};

export default DateRangePicker;

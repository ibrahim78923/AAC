import { useState } from 'react';

const useTimePicker = () => {
  const [time, setTime] = useState<string>('');

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = event?.target?.value;
    if (inputTime === '') {
      setTime('');
    } else if (/^\d{2}:\d{2}$/.test(inputTime)) {
      setTime(inputTime);
    }
  };

  return {
    time,
    handleTimeChange,
  };
};

export default useTimePicker;

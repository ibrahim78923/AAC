import { useState, ChangeEvent } from 'react';

export default function useTimePickerState() {
  const [time, setTime] = useState<string>('');

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    if (/^\d{2}:\d{2}$/.test(inputTime)) {
      setTime(inputTime);
    }
  };

  return {
    time,
    handleTimeChange,
  };
}

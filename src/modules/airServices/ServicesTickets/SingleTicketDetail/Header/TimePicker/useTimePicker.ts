import { useState } from 'react';

const useTimePicker = () => {
  const [time, setTime] = useState<string>('');

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = event?.target?.value;
    if (inputTime === '') {
      setTime('');
    } else if (/^\d{2}:\d{2}$/.test(inputTime)) {
      // Update the time if a valid time format is entered
      setTime(inputTime);
    }
  };
  //TODO: we will use it in integration
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const currentTime = new Date();
  //     const hours = String(currentTime?.getHours())?.padStart(2, '0');
  //     const minutes = String(currentTime?.getMinutes())?.padStart(2, '0');
  //     setTime(`${hours}:${minutes}`);
  //   }, 60000); // Update time every minute (60000 milliseconds)

  //   // Clean up the interval when the component is unmounted
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);
  return {
    time,
    handleTimeChange,
  };
};

export default useTimePicker;

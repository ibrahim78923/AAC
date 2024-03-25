import { styles } from './TimePicker.style';
import React from 'react';
import useTimePicker from './useTimePicker';

const TimePicker = () => {
  const { seconds, minutes, hours, days } = useTimePicker();
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={styles}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </div>
  );
};
export default TimePicker;

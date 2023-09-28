import React, { useState, ChangeEvent } from 'react';

function CustomTimePicker() {
  const [time, setTime] = useState<string>('');

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    if (/^\d{2}:\d{2}$/.test(inputTime)) {
      setTime(inputTime);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '50px',
    height: '24px',
    padding: '0 !important', // Adjust the width as needed
    border: 'none', // Remove the border
    outline: 'none', // Remove the outline when focused (optional)
    margin: '0',
  };

  return (
    <input
      type="text"
      value={time}
      onChange={handleTimeChange}
      placeholder="00:00"
      style={inputStyle}
    />
  );
}

export default CustomTimePicker;

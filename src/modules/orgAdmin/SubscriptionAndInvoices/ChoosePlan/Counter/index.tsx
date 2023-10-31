import React, { useState, ChangeEvent, FC } from 'react';
import { Box } from '@mui/material';
import { CounterI } from './Counter.interface';
import { AddCircleIcon, MinusCircleIcon } from '@/assets/icons';
import { styles } from './Counter.style';

const Counter: FC<CounterI> = ({
  inputValue,
  fixedText,
  inputWidth = '58px',
}) => {
  const [value, setValue] = useState<number>(inputValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setValue(isNaN(newValue) ? 0 : newValue);
  };

  const increment = () => {
    setValue((prev) => prev + 1);
  };

  const decrement = () => {
    setValue((prev) => prev - 1);
  };

  return (
    <Box sx={styles.counterHolder}>
      <Box sx={styles.decrementBtn} onClick={decrement}>
        <MinusCircleIcon />
      </Box>

      <Box sx={styles.textField}>
        <input
          type="text"
          value={fixedText ? `${value} ${fixedText}` : value}
          onChange={handleChange}
          style={{ width: inputWidth }}
        />
      </Box>

      <Box sx={styles.incrementBtn} onClick={increment}>
        <AddCircleIcon />
      </Box>
    </Box>
  );
};

export default Counter;

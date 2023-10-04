import React, { useState, ChangeEvent, FC } from 'react';
import { Box } from '@mui/material';
import { styles } from './Counter.style';
import { CounterProps } from './Counter.interface';
import { IconAddCircle, IconMinusCircle } from '@/assets/icons';

const Counter: FC<CounterProps> = ({
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
        <IconMinusCircle />
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
        <IconAddCircle />
      </Box>
    </Box>
  );
};

export default Counter;

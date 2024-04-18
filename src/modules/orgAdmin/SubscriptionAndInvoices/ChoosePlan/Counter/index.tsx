import React, { ChangeEvent, FC } from 'react';
import { Box } from '@mui/material';
import { AddCircleIcon, MinusCircleIcon } from '@/assets/icons';
import { styles } from './Counter.style';

const Counter: FC<any> = ({
  fixedText,
  inputWidth = '58px',
  disabled,
  value,
  setValue,
  maxValue,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event?.target?.value);
    setValue(isNaN(newValue) ? 0 : newValue);
  };
  // setValue((prev: any) => prev + 1);
  const increment = () => {
    if (maxValue > value) {
      setValue((prev: any) => prev + 1);
    }
  };

  const decrement = () => {
    if (value > 0) {
      setValue((prev: any) => prev - 1);
    }
  };

  return (
    <>
      {disabled ? (
        <Box sx={styles?.counterHolder}>
          <Box sx={styles?.decrementBtn(value)}>
            <MinusCircleIcon />
          </Box>

          <Box sx={styles?.textField}>
            <input
              type="text"
              value={fixedText ? `${value} ${fixedText}` : value}
              style={{ width: inputWidth }}
            />
          </Box>

          <Box sx={styles?.incrementBtn} style={{ cursor: 'not-allowed' }}>
            <AddCircleIcon color="#D1D5DB" />
          </Box>
        </Box>
      ) : (
        <Box sx={styles?.counterHolder}>
          <Box sx={styles?.decrementBtn(value)} onClick={decrement}>
            <MinusCircleIcon />
          </Box>

          <Box sx={styles?.textField}>
            <input
              type="text"
              value={fixedText ? `${value} ${fixedText}` : value}
              onChange={handleChange}
              style={{ width: inputWidth }}
            />
          </Box>

          <Box sx={styles?.incrementBtn} onClick={increment}>
            <AddCircleIcon />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Counter;

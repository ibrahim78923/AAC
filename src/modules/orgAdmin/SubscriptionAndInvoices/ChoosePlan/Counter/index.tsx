import React, { ChangeEvent, FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { AddCircleIcon, MinusCircleIcon } from '@/assets/icons';
import { styles } from './Counter.style';

const Counter: FC<any> = ({
  fixedText,
  inputWidth = '58px',
  value,
  setValue,
  disabled,
}) => {
  const theme = useTheme();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event?.target?.value);
    setValue(isNaN(newValue) ? 0 : newValue);
  };
  const increment = () => {
    setValue((prev: number) => prev + 1);
  };

  const decrement = () => {
    if (value > 0) {
      setValue((prev: number) => prev - 1);
    }
  };

  return (
    <>
      {disabled ? (
        <Box sx={styles?.counterHolder}>
          <Box sx={styles?.decrementBtn(false)}>
            <MinusCircleIcon />
          </Box>

          <Box sx={styles?.textField}>
            <input
              disabled
              type="text"
              value={0}
              style={{ width: inputWidth }}
            />
          </Box>

          <Box sx={styles?.decrementBtn(false)}>
            <AddCircleIcon color={theme?.palette?.custom?.dark} />
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

import React from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { styles } from '../../importDeal.style';

const CustomSelect = ({ options, handleChange, value, id, ...rest }: any) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={styles.inputLabel} id={'select-label' + id}>
        {rest.label}
      </InputLabel>
      <Select
        size="small"
        labelId={'select-label' + id}
        id={'select' + id}
        value={value}
        onChange={handleChange}
        {...rest}
      >
        {options?.map((option: any) => (
          <Box key={uuidv4()}>
            {option.head ? (
              <ListSubheader key={option.head}>{option.head}</ListSubheader>
            ) : (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            )}
          </Box>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;

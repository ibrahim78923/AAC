import { useState } from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const ChooseQuotes = () => {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const options = [
    { label: 'Opton 1', value: 'Opton 1' },
    { label: 'Opton 2', value: 'Opton 2' },
    { label: 'Opton 3', value: 'Opton 3' },
    { label: 'Opton 4', value: 'Opton 4' },
    { label: 'Opton 5', value: 'Opton 5' },
    { label: 'Opton 6', value: 'Opton 6' },
    { label: 'Opton 7', value: 'Opton 7' },
    { label: 'Opton 8', value: 'Opton 8' },
  ];

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Typography>Select Quotes</Typography>
        <Select value={age} onChange={handleChange}>
          {options.map((item: any) => (
            <MenuItem key={uuidv4()} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ChooseQuotes;

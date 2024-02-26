import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { styles } from './styles';
import Slot from './Slot';

const SetBusinessHours = ({ value, handleChange }: any) => {
  return (
    <Box>
      <Box sx={styles?.label}>Select The Working Hours</Box>

      <ToggleButtonGroup
        color="primary"
        value={value}
        onChange={handleChange}
        sx={styles?.btnGroup}
      >
        <ToggleButton value="monday">Mon</ToggleButton>
        <ToggleButton value="tuesday">Tue</ToggleButton>
        <ToggleButton value="wednesday">Wed</ToggleButton>
        <ToggleButton value="thursday">Thu</ToggleButton>
        <ToggleButton value="friday">Fri</ToggleButton>
        <ToggleButton value="saturday">Sat</ToggleButton>
        <ToggleButton value="sunday">Sun</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ pt: '24px' }}>
        <Box sx={styles?.label}>Enter The Working Hours</Box>
        <Box>
          You can add multiple working hour slots for a day. The gap between two
          slots be considered as a break.
        </Box>
        <Box sx={{ maxWidth: '540px', mt: '24px' }}>
          <Slot />
        </Box>
      </Box>
    </Box>
  );
};

export default SetBusinessHours;

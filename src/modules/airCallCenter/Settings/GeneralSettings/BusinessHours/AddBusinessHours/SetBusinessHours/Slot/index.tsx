import React from 'react';
import { Box, Button } from '@mui/material';
import { styles } from './styles';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { RHFTimePicker } from '@/components/ReactHookForm';

const Slot = () => {
  return (
    <Box sx={styles?.slot}>
      <Box sx={styles?.content}>
        <Box sx={styles?.slotLabel}>Monday</Box>
        <Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={styles?.timeField}>
              <RHFTimePicker name="timeStart" size="small" />
            </Box>
            <Box sx={styles?.toString}>To</Box>
            <Box sx={styles?.timeField}>
              <RHFTimePicker name="timeEnd" size="small" />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={styles?.addMore}>
        <Button
          variant="contained"
          className="small"
          startIcon={<PlusShared />}
        >
          Add More
        </Button>
      </Box>
    </Box>
  );
};

export default Slot;

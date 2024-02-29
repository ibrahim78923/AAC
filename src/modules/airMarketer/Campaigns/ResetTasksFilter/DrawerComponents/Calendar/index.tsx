import { AnnoucementIcon } from '@/assets/icons';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { Box, Card, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

const Calander = () => {
  const theme = useTheme();
  const [datePickerVal, setDatePickerVal] = useState();
  return (
    <Box>
      <Box sx={{ mt: 1, height: '420px' }}>
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{ color: theme?.palette?.primary?.main }}
        >
          View full calendar
        </Typography>
        <SwitchableDatepicker
          isCalendarOpen
          dateValue={datePickerVal}
          setDateValue={setDatePickerVal}
        />
      </Box>
      <Box>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography variant="body1" fontWeight={600}>
            Wednesday, March, 2022
          </Typography>
          <Typography variant="body2">2 Event</Typography>
        </Stack>
        <Card
          sx={{
            padding: 2,
            borderLeft: `3px solid ${theme?.palette?.primary?.main}`,
          }}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <AnnoucementIcon />
            <Stack direction="column">
              <Typography variant="body2">Meeting with CEO</Typography>
              <Typography variant="body2">
                03:00 PM EDT March, 16,2022
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default Calander;

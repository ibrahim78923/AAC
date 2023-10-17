import { Box, Card, Typography, useTheme } from '@mui/material';
import Table from './Table';
import { FilterLargeWidgetIcon } from '@/assets/icons';

const MeetingDetails = () => {
  const theme = useTheme();
  return (
    <Card>
      <Box p={1} sx={{ backgroundColor: theme.palette.grey[700] }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">Meeting Details</Typography>
            <Typography variant="body3">
              Date range In last 30 days | compare To : Year before
            </Typography>
          </Box>
          <Box mt={1.3}>
            <FilterLargeWidgetIcon />
          </Box>
        </Box>
      </Box>
      <Table />
    </Card>
  );
};
export default MeetingDetails;

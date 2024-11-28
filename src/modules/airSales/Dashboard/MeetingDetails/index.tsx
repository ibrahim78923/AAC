import { Box, Card, Typography, useTheme } from '@mui/material';
import Table from './Table';
import { MeetingDetailsTableData } from '@/mock/modules/airSales/Dashboard/MeetingDetails';

const MeetingDetails = (props: any) => {
  const { isStatic = true, meetingsData } = props;
  const meetingDetails = isStatic
    ? MeetingDetailsTableData
    : meetingsData?.meetingsData;
  const theme = useTheme();
  return (
    <Card>
      <Box p={1.6} sx={{ backgroundColor: theme?.palette?.grey[700] }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5">Meeting details</Typography>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.grey[900] }}
            >
              Date range In last 30 days | compare To : Year before
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box pb={3}>
        <Table data={meetingDetails} />
      </Box>
    </Card>
  );
};
export default MeetingDetails;

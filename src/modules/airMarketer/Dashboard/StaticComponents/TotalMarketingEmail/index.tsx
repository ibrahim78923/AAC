import { Box, Card, Typography, useTheme } from '@mui/material';
import Table from './Table';

const TotalMarketingEmail = () => {
  const theme = useTheme();
  return (
    <Card>
      <Box p={1.6}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" fontWeight={500}>
              Total Marketing Email
            </Typography>
            <Typography
              variant="body3"
              sx={{ color: theme?.palette?.grey[900] }}
            >
              Date range In last 30 days
            </Typography>
          </Box>
        </Box>
      </Box>
      <Table />
    </Card>
  );
};
export default TotalMarketingEmail;

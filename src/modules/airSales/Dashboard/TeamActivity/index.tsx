import {
  Grid,
  Card,
  Typography,
  Box,
  useTheme,
  CardContent,
} from '@mui/material';
import ActivityDetails from './ActivityDetails';
import { FilterLargeWidgetIcon } from '@/assets/icons';

const TeamActivity = () => {
  const theme = useTheme();
  return (
    <Card>
      <Box p={1.6} sx={{ backgroundColor: theme.palette.grey[700] }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">Team Activity</Typography>
            <Typography variant="body3" sx={{ color: theme.palette.grey[900] }}>
              Date range in last 30 days
            </Typography>
          </Box>
          <Box mt={1.3}>
            <FilterLargeWidgetIcon />
          </Box>
        </Box>
      </Box>
      <Grid item sm={12} sx={{ padding: '0px' }}>
        <CardContent style={{ height: '316px', overflow: 'auto' }}>
          <ActivityDetails />
        </CardContent>
      </Grid>
    </Card>
  );
};
export default TeamActivity;

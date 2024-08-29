import {
  Grid,
  Card,
  Typography,
  Box,
  useTheme,
  CardContent,
  Stack,
} from '@mui/material';
import ActivityDetails from './ActivityDetails';
import { FilterLargeWidgetIcon } from '@/assets/icons';

const TeamActivity = ({ teamActivityDetails }: any) => {
  const theme = useTheme();
  return (
    <Card>
      <Box p={1.6} sx={{ backgroundColor: theme.palette.grey[700] }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5">Team Activity</Typography>
            <Typography variant="body3" sx={{ color: theme.palette.grey[900] }}>
              Date range in last 30 days
            </Typography>
          </Box>
          <Box>
            <FilterLargeWidgetIcon />
          </Box>
        </Stack>
      </Box>
      <Grid item sm={12} sx={{ padding: '0px' }}>
        <CardContent style={{ height: '316px', overflow: 'auto' }}>
          <ActivityDetails data={teamActivityDetails} />
        </CardContent>
      </Grid>
    </Card>
  );
};
export default TeamActivity;

import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import {
  departments,
  availabilityHeader,
  pieChartData,
  pieChartDataOptions,
} from './AgentAvailability.data';
import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import { CardWrapper } from '../CardWrapper';

export const AgentAvailability = () => {
  const theme = useTheme();
  return (
    <>
      <CardWrapper>
        <Box sx={{ marginLeft: 2 }}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            marginRight={3}
          >
            <Typography variant="h4">Agent Availability</Typography>
            <SingleDropdownButton
              dropdownOptions={departments}
              dropdownName="All Dept."
            />
          </Box>
          <Grid container spacing={5}>
            {availabilityHeader(theme)?.map((department) => (
              <Grid item sx={{ mt: 2 }} key={uuidv4()}>
                <Box display={'flex'} alignItems={'center'} gap={1}>
                  {department?.icon}
                  <Typography>{department?.title}</Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h5">
                    {department?.titleNumber}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <CustomChart
            key={uuidv4()}
            options={{
              ...pieChartDataOptions(theme),
              legend: { show: false },
            }}
            series={pieChartData?.data}
            type="pie"
            height={180}
          />
        </Box>
      </CardWrapper>
    </>
  );
};

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { SingleDropdownButton } from '../../../../../../components/SingleDropdownButton';
import { actionsFunction, availabilityHeader } from './HeaderPieChart.data';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './HeaderPieChart.styles';

export const HeaderPieChart = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        marginRight={3}
        marginTop={1}
      >
        <Typography variant="h6" sx={styles?.headerText(theme)}>
          Agent Availability
        </Typography>
        <SingleDropdownButton
          dropdownOptions={actionsFunction}
          dropdownName="All Dept."
        />
      </Box>
      <Grid container justifyContent={'space-between'}>
        {availabilityHeader(theme)?.map((department) => (
          <Grid item sx={{ mt: 2 }} key={uuidv4()} xs={12} lg={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {department?.icon}
              <Typography variant="body3">{department?.title}</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5">{department?.titleNumber}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

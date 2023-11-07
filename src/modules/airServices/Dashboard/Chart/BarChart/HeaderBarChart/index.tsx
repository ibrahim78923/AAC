import { Box, Typography, useTheme } from '@mui/material';
import { SingleDropdownButton } from '../../../../../../components/SingleDropdownButton';
import { actionsFunction } from './HeaderBarChart.data';
import { styles } from './HeaderBarChart.styles';

export const HeaderBarChart = () => {
  const theme = useTheme();

  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} marginRight={3}>
        <Typography variant="h6" sx={styles?.headerText(theme)}>
          Tickets based on Status
        </Typography>
        <SingleDropdownButton
          dropdownOptions={actionsFunction}
          dropdownName="Status"
        />
      </Box>
    </>
  );
};

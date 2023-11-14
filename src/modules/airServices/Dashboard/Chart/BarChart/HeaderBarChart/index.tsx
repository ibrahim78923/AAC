import { Box, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { dropDownMenus } from './HeaderBarChart.data';

export const HeaderBarChart = ({ setIsBarChart }: any) => {
  const options = dropDownMenus(setIsBarChart);
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} marginRight={3}>
        <Typography variant="h5">Tickets based on Status</Typography>
        <SingleDropdownButton dropdownOptions={options} dropdownName="Status" />
      </Box>
    </>
  );
};

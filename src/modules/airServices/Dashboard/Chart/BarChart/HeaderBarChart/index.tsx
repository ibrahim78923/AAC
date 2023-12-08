import { Box, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { dropDownMenus } from './HeaderBarChart.data';

export const HeaderBarChart = ({ setIsBarChart, isbarchart }: any) => {
  const options = dropDownMenus(setIsBarChart);
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} marginRight={3}>
        <Typography variant="h5">
          Tickets based on {!isbarchart ? 'Priority' : 'Status'}
        </Typography>
        <SingleDropdownButton dropdownOptions={options} dropdownName="Status" />
      </Box>
    </>
  );
};

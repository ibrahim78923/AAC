import { Box, Typography } from '@mui/material';
import { dropDownMenus, dashboardFunction } from './HeaderDashboard.data';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useHeaderDashboard } from './useHeaderDashboard ';
import EmailThisDashboard from '../EmailThisDashboard';

export const HeaderDashboard = () => {
  const { theme, router, isDrawerOpen, setIsDrawerOpen } = useHeaderDashboard();
  return (
    <>
      <Typography variant="h3" color="primary.main">
        Service
      </Typography>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1}
        mt={1}
      >
        <Typography variant="h4" fontWeight={500} color="blue.main">
          <Typography component="span" variant="h4">
            Hi Sam!
          </Typography>{' '}
          Happy to See You again
        </Typography>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <SingleDropdownButton
            dropdownOptions={dropDownMenus(setIsDrawerOpen)}
            dropdownName="Actions"
          />
          <SingleDropdownButton
            dropdownOptions={dashboardFunction(theme, router)}
            dropdownName="Dashboards"
          />
        </Box>
        <EmailThisDashboard
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
      </Box>
    </>
  );
};

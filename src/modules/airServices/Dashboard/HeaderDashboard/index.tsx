import { Box, Typography } from '@mui/material';
import useAuth from '@/hooks/useAuth';

export const HeaderDashboard = () => {
  const { user }: any = useAuth();

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
            Hi {user?.firstName ?? '-'}!
          </Typography>{' '}
          Happy to See You again
        </Typography>
        {/* TODO: Will be catered in V2
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
        /> */}
      </Box>
    </>
  );
};

import { Box, Typography } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { dropDownMenus } from './HeaderBarChart.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

export const HeaderBarChart = ({ setIsBarChart, isbarchart }: any) => {
  const options = dropDownMenus(setIsBarChart);
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} marginRight={3}>
        <Typography variant="h5">
          Tickets based on {!isbarchart ? 'Priority' : 'Status'}
        </Typography>
        <PermissionsGuard
          permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
        >
          <SingleDropdownButton
            dropdownOptions={options}
            dropdownName={'status'}
          />
        </PermissionsGuard>
      </Box>
    </>
  );
};

import { Box, Typography, useTheme } from '@mui/material';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { dropDownMenus, pieChartHeader } from './HeaderPieChart.data';
import { useGetDashboardAgentQuery } from '@/services/airServices/dashboard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

export const HeaderPieChart = () => {
  const theme = useTheme();
  const { data: pieChart } = useGetDashboardAgentQuery(true);
  const pieCharts = pieChart?.data;
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        marginBottom={1.5}
        gap={1}
        flexWrap={'wrap'}
      >
        <Typography variant="h5">Agent Availability</Typography>
        <PermissionsGuard
          permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
        >
          <SingleDropdownButton
            dropdownOptions={dropDownMenus}
            dropdownName="All Dept."
          />
        </PermissionsGuard>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        gap={1}
        flexWrap={'wrap'}
      >
        {pieChartHeader(theme, pieCharts)?.map((department) => (
          <Box key={department?.title}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {department?.icon}
              <Typography variant="body3">{department?.title}</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="h5">{department?.titleNumber}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

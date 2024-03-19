import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Typography } from '@mui/material';
import { useTicketBased } from './useTicketBased';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { BarChart } from './BarChart';
import { RadialBarChart } from './RadialBarChart';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const TicketBased = () => {
  const { chartData, graphType, options, isLoading, isFetching } =
    useTicketBased();
  return (
    <>
      <Box display={'flex'} justifyContent={'space-between'} marginRight={3}>
        <Typography variant="h5">
          Tickets based on{' '}
          <Typography textTransform="capitalize" component="span" variant="h5">
            {graphType}
          </Typography>
        </Typography>
        <PermissionsGuard
          permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
        >
          <SingleDropdownButton
            dropdownOptions={options}
            dropdownName={graphType}
          />
        </PermissionsGuard>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : graphType === TICKET_GRAPH_TYPES?.STATUS ? (
          <BarChart chartData={chartData} />
        ) : (
          <RadialBarChart chartData={chartData} />
        )}
      </Box>
    </>
  );
};

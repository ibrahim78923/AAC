import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { BarChart } from './BarChart';
import { RadialBarChart } from './RadialBarChart';
import { dropDownMenus } from './TicketBased.data';

export const TicketBased = (props: any) => {
  const { data, ticketType, setTicketType, isPreviewMode } = props;
  const dropDownOptions = dropDownMenus(setTicketType);
  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
      p={2}
    >
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        gap={2}
        mr={2}
      >
        <Typography variant="h5">
          Tickets based on{' '}
          <Typography textTransform="capitalize" component="span" variant="h5">
            {ticketType}
          </Typography>
        </Typography>
        <PermissionsGuard
          permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
        >
          <SingleDropdownButton
            dropdownOptions={dropDownOptions}
            dropdownName={ticketType}
            disabled={isPreviewMode}
          />
        </PermissionsGuard>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        {ticketType === TICKET_GRAPH_TYPES?.STATUS ? (
          <BarChart chartData={data?.tickets} />
        ) : (
          <RadialBarChart chartData={data?.tickets} />
        )}
      </Box>
    </Box>
  );
};

import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Typography } from '@mui/material';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';
import { TicketStatusGraph } from './TicketStatusGraph';
import { TicketPriorityGraph } from './TicketPriorityGraph';
import { dropDownMenus } from './TicketBased.data';

export const TicketBased = (props: any) => {
  const { data, ticketType, setTicketType, isPreviewMode } = props;
  const dropDownOptions = dropDownMenus(setTicketType);

  const ticketBasedChart = {
    [TICKET_GRAPH_TYPES?.STATUS]: (
      <TicketStatusGraph chartData={data?.tickets} />
    ),
    [TICKET_GRAPH_TYPES?.PRIORITY]: (
      <TicketPriorityGraph chartData={data?.tickets} />
    ),
  };

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
      <Box sx={{ marginTop: 2 }}>{ticketBasedChart?.[ticketType]}</Box>
    </Box>
  );
};

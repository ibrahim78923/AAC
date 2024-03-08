import { Box, Button, Typography } from '@mui/material';
import { CirclePlusIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';

export const RelatedTicketsHeader = ({
  isActive,
  setIsDrawerOpen,
  relatedTicketsActionDropdown,
  setSelectedChildTickets,
}: any) => {
  return (
    <Box
      display="flex"
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      gap={1}
      alignItems={'center'}
    >
      <Typography variant="h5" color="slateBlue.main">
        Child Tickets
      </Typography>
      <Box display="flex" flexWrap={'wrap'} gap={1}>
        <PermissionsGuard
          permissions={
            Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_CHILD_TICKET_ACTION
          }
        >
          <SingleDropdownButton
            disabled={isActive}
            dropdownOptions={relatedTicketsActionDropdown}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CHILD_TICKET]}
        >
          <Button
            disableElevation
            variant="contained"
            onClick={() => {
              setSelectedChildTickets?.([]);
              setIsDrawerOpen(true);
            }}
            startIcon={<CirclePlusIcon />}
          >
            Add Child Ticket
          </Button>
        </PermissionsGuard>
      </Box>
    </Box>
  );
};

import { Box, Button, Typography } from '@mui/material';
import { CirclePlusIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

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
        <SingleDropdownButton
          disabled={isActive}
          dropdownOptions={relatedTicketsActionDropdown}
        />
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
      </Box>
    </Box>
  );
};

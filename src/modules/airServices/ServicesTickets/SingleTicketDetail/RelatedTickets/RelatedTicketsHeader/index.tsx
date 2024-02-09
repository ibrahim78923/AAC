import { Box, Button, Typography } from '@mui/material';
import { CirclePlusIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';

export const RelatedTicketsHeader = ({
  isActive,
  setIsDrawerOpen,
  // headerFunctions,
  relatedTicketsActionDropdown,
}: any) => {
  // const {
  //   handleActionClick,
  //   actionExportPop,
  //   actionPop,
  //   setActionPop,
  //   handleActionExportClose,
  //   openAction,
  //   handleActionExportClick,
  //   handleActionClose,
  //   openActionExport,
  //   handleDeleteChildTickets,
  // } = headerFunctions();

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
        {/* TODO: according to user story */}
        {/* <Button
          color="secondary"
          endIcon={<ActionButtonIcon />}
          onClick={handleActionClick}
          disabled={!!!isActive?.length}
          variant={'outlined'}
        >
          Action
        </Button>
        <Popover
          open={openAction}
          anchorEl={actionPop}
          onClose={handleActionClose}
          sx={{ mt: '8px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <MenuItem sx={{ p: 1 }} onClick={handleDeleteChildTickets}>
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsDrawerOpen(true), setActionPop(null);
            }}
            sx={{ p: 1 }}
          >
            Edit
          </MenuItem>

          <MenuItem sx={{ p: 1 }}>
            <a onClick={handleActionExportClick}>Export Ticket</a>
            <Popover
              open={openActionExport}
              anchorEl={actionExportPop}
              onClose={handleActionExportClose}
              sx={{ ml: '-12px' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem>CSV</MenuItem>
              <MenuItem>Excel</MenuItem>
            </Popover>
          </MenuItem>
        </Popover> */}
        <Button
          disableElevation
          variant="contained"
          onClick={() => setIsDrawerOpen(true)}
          startIcon={<CirclePlusIcon />}
        >
          Add Child Ticket
        </Button>
      </Box>
    </Box>
  );
};

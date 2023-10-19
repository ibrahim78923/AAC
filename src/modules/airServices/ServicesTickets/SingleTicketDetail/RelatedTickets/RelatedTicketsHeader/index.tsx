import { Button, Grid, MenuItem, Popover, Typography } from '@mui/material';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';
import { relatedticketsStyles } from '../RelatedTickets.styles';
import { useRelatedTickets } from '../useRelatedTickets';

export const RelatedTicketsHeader = ({ isActive, setIsDrawerOpen }: any) => {
  const {
    enqueueSnackbar,
    handleActionClick,
    actionExportPop,
    actionPop,
    setActionPop,
    handleActionExportClose,
    openAction,
    handleActionExportClick,
    handleActionClose,
    openActionExport,
  } = useRelatedTickets();
  return (
    <Grid
      container
      spacing={{ sm: 0, xs: 2 }}
      sx={relatedticketsStyles?.headContainer}
    >
      <Grid
        item
        sm={6}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-start', xs: 'center' },
        }}
      >
        <Typography variant="h5" sx={relatedticketsStyles?.headtext}>
          Child Tickets
        </Typography>
      </Grid>
      <Grid sm={6} xs={12} item sx={relatedticketsStyles?.btnContainer}>
        <Button
          sx={relatedticketsStyles?.actionBtn}
          endIcon={<ActionButtonIcon />}
          onClick={handleActionClick}
          disabled={!!!isActive.length}
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
          <MenuItem
            sx={{ p: 1 }}
            onClick={() => {
              enqueueSnackbar('child ticket deleted successfully', {
                variant: 'success',
              });
            }}
          >
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
        </Popover>
        <Button
          sx={relatedticketsStyles?.addTicketBtn}
          onClick={() => setIsDrawerOpen(true)}
          startIcon={<CirclePlusIcon />}
        >
          Add Child Ticket
        </Button>
      </Grid>
    </Grid>
  );
};

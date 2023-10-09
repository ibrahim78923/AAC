import { useState } from 'react';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { data, columns } from './RelatedTicketsTable.mock';
import { Button, Typography, Popover, MenuItem } from '@mui/material';
import { ticketsStyles } from './RelatedTickets.styles';
import { RelatedTicketsDrawer } from './RelatedTicketsDrawer';
import { ActionButtonIcon, CirclePlusIcon } from '@/assets/icons';

const RelatedTickets = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const handleCheckboxChange = (event: any) => {
    setActive(event.target.checked);
  };
  const [actionPop, setActionPop] = useState<HTMLButtonElement | null>(null);
  const [actionExportPop, setActionExportPop] =
    useState<HTMLButtonElement | null>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionPop(event.currentTarget);
  };
  const handleActionClose = () => {
    setActionPop(null);
  };
  const openAction = Boolean(actionPop);

  const handleActionExportClick = (event: any) => {
    setActionExportPop(event.currentTarget);
  };
  const handleActionExportClose = () => {
    setActionExportPop(null);
  };
  const openActionExport = Boolean(actionExportPop);

  return (
    <div>
      <div style={ticketsStyles?.headContainer}>
        <Typography variant="h5" sx={ticketsStyles?.headtext}>
          Child Tickets
        </Typography>

        <div style={ticketsStyles?.btnContainer}>
          <Button
            sx={ticketsStyles?.actionBtn}
            endIcon={<ActionButtonIcon />}
            onClick={handleActionClick}
            disabled={!isActive}
          >
            Action
          </Button>

          <Button
            sx={ticketsStyles?.addTicketBtn}
            onClick={() => setIsDrawerOpen(true)}
            startIcon={<CirclePlusIcon />}
          >
            Add Child Ticket
          </Button>
        </div>
      </div>
      <RelatedTicketsDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <br />
      <TanstackTable
        data={data}
        columns={columns(setIsDrawerOpen, handleCheckboxChange)}
      />
      {openAction && (
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
            onClick={() => {
              setIsDrawerOpen(true), setActionPop(null);
            }}
            sx={{ p: 1 }}
          >
            Edit
          </MenuItem>
          <MenuItem sx={{ p: 1 }}>Delete</MenuItem>
          <MenuItem sx={{ p: 1 }}>
            <a onClick={handleActionExportClick}>Export Ticket</a>
            <Popover
              open={openActionExport}
              anchorEl={actionExportPop}
              onClose={handleActionExportClose}
              sx={{ ml: '-12px' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => window.history.go(-1)}>CSV</MenuItem>
              <MenuItem onClick={() => window.history.go(-1)}>Excel</MenuItem>
            </Popover>
          </MenuItem>
        </Popover>
      )}
    </div>
  );
};
export default RelatedTickets;

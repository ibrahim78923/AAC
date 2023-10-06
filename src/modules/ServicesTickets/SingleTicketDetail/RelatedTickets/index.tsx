import { useState } from 'react';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { data, columns } from './RelatedTicketsTable.mock';
import { Button, Typography } from '@mui/material';
import { ticketsStyles } from './RelatedTickets.styles';
import { RelatedTicketsDrawer } from './RelatedTicketsDrawer';
import ActionPopover from '@/components/Popover';

const RelatedTickets = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [, setActive] = useState<boolean>(false);
  const handleCheckboxChange = (event: any) => {
    setActive(event.target.checked);
  };
  return (
    <div>
      <div style={ticketsStyles?.headContainer}>
        <Typography variant="h5" sx={ticketsStyles?.headtext}>
          Child Tickets
        </Typography>
        <div style={ticketsStyles?.btnContainer}>
          <ActionPopover btnText="Actions" options={['Delete', 'Edit']} />
          <Button
            sx={ticketsStyles?.addTicketBtn}
            onClick={() => setIsDrawerOpen(true)}
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
    </div>
  );
};
export default RelatedTickets;

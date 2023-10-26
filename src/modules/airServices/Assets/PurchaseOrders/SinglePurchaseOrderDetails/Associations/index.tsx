import NoData from '@/components/NoData';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import { Button, useTheme } from '@mui/material';
import { AddCircleIcon } from '@/assets/icons';
import { useState } from 'react';
import { AssociationsDrawer } from './AssociationsDrawer';
import { AssociationsTicket } from './AssociationsTicket';

export const Associations = () => {
  const theme: any = useTheme();
  const [openDrawer, setOpenDrawer] = useState<any>(false);
  const [openTicket, setOpenTicket] = useState<any>(false);

  return (
    <>
      {openTicket === false ? (
        <NoData
          image={NoAssociationFound}
          message={
            'Make approved purchases by sending the order to your stakeholders for approval'
          }
        >
          <Button
            sx={{
              marginRight: '12px',
              backgroundColor: theme?.palette?.primary?.light,
              color: theme?.palette?.primary?.main,
              '&:hover': {
                bgcolor: theme?.palette?.grey[400],
              },
            }}
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpenDrawer(true)}
          >
            Associate
          </Button>
        </NoData>
      ) : (
        <AssociationsTicket />
      )}

      <AssociationsDrawer
        open={openDrawer}
        setDrawerOpen={() => setOpenDrawer(false)}
        setOpenTicket={setOpenTicket}
      />
    </>
  );
};

import NoData from '@/components/NoData';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import { Button, useTheme } from '@mui/material';
import { AddCircleIcon } from '@/assets/icons';
import { styles } from './Associations.style';
import { useState } from 'react';
import { AddAssociationsDrawer } from './AssociationsDrawer';
import AssociationTicket from './AssociationsTicket';

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
            sx={styles.addButtonStyle(theme)}
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpenDrawer(true)}
          >
            Associate
          </Button>
        </NoData>
      ) : (
        <AssociationTicket />
      )}

      <AddAssociationsDrawer
        open={openDrawer}
        setDrawerOpen={() => setOpenDrawer(false)}
        setOpenTicket={setOpenTicket}
      />
    </>
  );
};

import NoData from '@/components/NoData';
import { Box, Button, useTheme } from '@mui/material';
import { AddCircleIcon } from '@/assets/icons';
import { useState } from 'react';
import { AssociationsDrawer } from './AssociationsDrawer';
import { SingleAssociationsTicket } from './SingleAssociationsTicket';
import { associationsTicketData } from './Associations.data';
import { NoAssociationFoundImage } from '@/assets/images';

export const Associations = () => {
  const theme: any = useTheme();
  const [openDrawer, setOpenDrawer] = useState<any>(false);

  return (
    <>
      {associationsTicketData?.length === 0 ? (
        <>
          <NoData
            image={NoAssociationFoundImage}
            message={
              'Make approved purchases by sending the order to your stakeholders for approval'
            }
          >
            <Button
              sx={{
                marginRight: '12px',
                backgroundColor: theme?.palette?.primary?.light,
                color: theme?.palette?.primary?.main,
              }}
              variant="outlined"
              startIcon={<AddCircleIcon />}
              onClick={() => setOpenDrawer(true)}
            >
              Associate
            </Button>
          </NoData>
        </>
      ) : (
        <>
          <Box display={'flex'} justifyContent={'end'} marginBottom={'1rem'}>
            <Button
              sx={{
                marginRight: '12px',
                backgroundColor: theme?.palette?.primary?.light,
                color: theme?.palette?.primary?.main,
              }}
              variant="outlined"
              startIcon={<AddCircleIcon />}
            >
              Associate
            </Button>
          </Box>
          <SingleAssociationsTicket
            associationsTicketData={associationsTicketData}
          />
        </>
      )}

      <AssociationsDrawer
        open={openDrawer}
        setDrawerOpen={() => setOpenDrawer(false)}
      />
    </>
  );
};

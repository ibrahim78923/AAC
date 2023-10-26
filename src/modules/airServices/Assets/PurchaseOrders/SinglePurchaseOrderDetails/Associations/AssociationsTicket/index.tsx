import { Box, Button, useTheme } from '@mui/material';
import { AddCircleIcon } from '@/assets/icons';
import { SingleAssociationsTicket } from './SingleAssociationsTicket';
import { associationsTicketData } from './AssociationsTicket.data';

export const AssociationsTicket = () => {
  const theme: any = useTheme();
  return (
    <>
      <Box display={'flex'} justifyContent={'end'} marginBottom={'1rem'}>
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
          onClick={() => ''}
        >
          Associate
        </Button>
      </Box>
      <SingleAssociationsTicket
        associationsTicketData={associationsTicketData}
      />
    </>
  );
};

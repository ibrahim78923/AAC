import { Box, Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTheme } from '@mui/material/styles';
import { TicketsExport } from '../TicketsExport';
export const TicketsListHeader = ({ setOpenCreateTicket }: any) => {
  const { palette }: any = useTheme();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={'1rem'}
      >
        <Typography variant="h4" color={palette?.slateBlue?.main}>
          Ticket List - All Tickets
        </Typography>
        <Box
          gap={'1rem'}
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
        >
          <TicketsExport />
          <Button
            variant="contained"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setOpenCreateTicket?.()}
          >
            Create Ticket
          </Button>
        </Box>
      </Box>
    </>
  );
};

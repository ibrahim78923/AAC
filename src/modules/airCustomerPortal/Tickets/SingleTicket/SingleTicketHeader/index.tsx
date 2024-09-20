import { Box, Button, Theme, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useSingleTicketHeader } from './useSingleTicketHeader';
import { LoadingButton } from '@mui/lab';
import { TICKET_STATUS } from '@/constants/strings';
import { SingleTicketHeaderPropsI } from './SingleTicketHeader.interface';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { ShareTicket } from './ShareTicket';

export const SingleTicketHeader = (props: SingleTicketHeaderPropsI) => {
  const { ticketNumber, singleTicketData } = props;
  const {
    isLoading,
    updateTicketStatus,
    handleBack,
    portalStyles,
    shareModalOpen,
    setShareModalOpen,
  } = useSingleTicketHeader(props);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      alignItems={'center'}
    >
      <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
        <ArrowBack
          onClick={handleBack}
          color="action"
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h6" color="primary">
          Tickets
        </Typography>
        <Typography variant="h6" color="slateBlue.main">
          {'>'} &ensp; {ticketNumber}
        </Typography>
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
        <Button
          variant="outlined"
          color="secondary"
          className="small"
          onClick={() => setShareModalOpen?.(true)}
        >
          share
        </Button>
        {singleTicketData?.status !== TICKET_STATUS?.CLOSED && (
          <LoadingButton
            variant="contained"
            className="small"
            loading={isLoading}
            onClick={updateTicketStatus}
            sx={(theme: Theme) => ({
              bgcolor:
                portalStyles?.btnPrimary ||
                customizePortalDefaultValues(theme)?.btnPrimary,
              color: 'common.white',
              '&:hover': {
                bgcolor:
                  portalStyles?.btnPrimary ||
                  customizePortalDefaultValues(theme)?.btnPrimary,
                color: 'common.white',
              },
            })}
          >
            Mark ticket as closed
          </LoadingButton>
        )}
      </Box>
      {shareModalOpen && (
        <ShareTicket
          open={shareModalOpen}
          handleClose={() => setShareModalOpen?.(false)}
        />
      )}
    </Box>
  );
};

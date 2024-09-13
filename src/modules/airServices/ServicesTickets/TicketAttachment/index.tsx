import { Box, Typography } from '@mui/material';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { Attachments } from '@/components/Attachments';

export const TicketAttachment = (props: any) => {
  const { ticketId } = props;
  if (!ticketId) return <></>;

  return (
    <>
      <Typography
        variant="body1"
        fontWeight={500}
        color="slateBlue.main"
        mb={2}
      >
        {' '}
        Attachments{' '}
      </Typography>
      <Box maxHeight={'20vh'}>
        <Attachments
          recordId={ticketId}
          permissionKey={[
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.UPDATE_INFO_EDIT_TICKET_DETAILS,
          ]}
          colSpan={{ sm: 12, lg: 12 }}
        />
      </Box>
    </>
  );
};

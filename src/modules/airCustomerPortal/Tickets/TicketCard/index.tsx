import { Box, Typography, Chip, Avatar } from '@mui/material';
import dayjs from 'dayjs';
import { AIR_CUSTOMER_PORTAL, DATE_TIME_FORMAT } from '@/constants';
import { useRouter } from 'next/router';
import { generateImage } from '@/utils/avatarUtils';
import { TICKET_TYPE } from '@/constants/strings';

export const TicketsCard = (props: any) => {
  const { ticket } = props;

  const router = useRouter();

  return (
    <Box
      key={ticket?._id}
      sx={{
        p: 1,
        backgroundColor: 'grey.100',
        borderRadius: 3,
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
      onClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.SINGLE_TICKETS,
          query: {
            id: ticket?._id,
          },
        });
      }}
    >
      <Box>
        <Typography fontWeight={600} variant="body2" color={'blue.main'}>
          {ticket?.subject}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            my: 0.5,
          }}
        >
          <Avatar
            src={generateImage(ticket?.requesterDetails?.avatar?.url)}
            sx={{ bgcolor: 'blue.main', width: 25, height: 25 }}
          />
          <Typography variant="body2" color={'blue.main'} fontWeight={500}>{` ${
            ticket?.ticketType === TICKET_TYPE?.INC
              ? ''
              : ticket?.ticketTitle ?? ''
          } ${ticket?.ticketIdNumber}`}</Typography>
        </Box>
        <Typography variant="body2" color={'blue.main'} fontWeight={500}>
          {`Created On  ${dayjs(ticket?.createdAt)?.format(
            DATE_TIME_FORMAT?.UI,
          )}`}
          <Typography
            component="span"
            fontWeight={500}
            variant="body2"
            color="primary.main"
          >
            {!!ticket?.moduleType ? `- Via ${ticket?.moduleType}` : ''}
          </Typography>
        </Typography>
      </Box>
      {!!ticket?.status ? (
        <Chip
          label={ticket?.status ?? '---'}
          sx={{
            backgroundColor: 'grey.400',
            color: 'slateBlue.main',
          }}
        />
      ) : (
        '---'
      )}
    </Box>
  );
};

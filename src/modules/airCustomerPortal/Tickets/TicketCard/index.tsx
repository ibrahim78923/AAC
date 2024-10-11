import { Box, Typography, Chip, Avatar } from '@mui/material';
import dayjs from 'dayjs';
import { AIR_CUSTOMER_PORTAL, DATE_TIME_FORMAT } from '@/constants';
import { NextRouter, useRouter } from 'next/router';
import { fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { TICKET_TYPE } from '@/constants/strings';
import { TicketCardPropsI } from './TicketCard.interface';
import { TruncateText } from '@/components/TruncateText';

export const TicketsCard = (props: TicketCardPropsI) => {
  const { ticket } = props;
  const router: NextRouter = useRouter();
  const { companyId } = router?.query;

  return (
    <Box
      key={ticket?._id}
      borderRadius={3}
      display={'flex'}
      alignItems={'center'}
      flexWrap={'wrap'}
      gap={1}
      mb={1}
      justifyContent={'space-between'}
      bgcolor={'grey.100'}
      p={1}
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.SINGLE_TICKETS,
          query: {
            id: ticket?._id,
            ticketNo: ticket?.ticketIdNumber,
            ...(!!companyId && { companyId }),
          },
        });
      }}
    >
      <Box>
        <Typography fontWeight={600} variant="body2" color={'blue.main'}>
          <TruncateText
            text={ticket?.subject}
            size={50}
            customTooltipProps={{ placement: 'right' }}
          />
        </Typography>
        <Box
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={1}
          my={0.5}
        >
          <Avatar
            src={generateImage(ticket?.requesterDetails?.avatar?.url)}
            sx={{ bgcolor: 'blue.main', width: 25, height: 25 }}
          >
            <Typography variant="body2" textTransform={'uppercase'}>
              {fullNameInitial(
                ticket?.requesterDetails?.firstName,
                ticket?.requesterDetails?.lastName,
              )}
            </Typography>
          </Avatar>
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
            - Via Portal
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

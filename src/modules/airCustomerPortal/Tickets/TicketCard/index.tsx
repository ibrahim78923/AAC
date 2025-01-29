import { Box, Typography } from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { NextRouter, useRouter } from 'next/router';
import { fullNameInitial } from '@/utils/avatarUtils';
import { TICKET_TYPE } from '@/constants/strings';
import { TicketCardPropsI } from './TicketCard.interface';
import { TruncateText } from '@/components/TruncateText';
import { otherDateFormat } from '@/lib/date-time';
import { capitalizeFirstLetter } from '@/utils/api';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { CustomChip } from '@/components/Chip/CustomChip';

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
          <CustomAvatar
            nameInitial={fullNameInitial(
              ticket?.requesterDetails?.firstName,
              ticket?.requesterDetails?.lastName,
            )}
            avatarSrc={ticket?.requesterDetails?.avatar?.url}
          />
          <Typography variant="body2" color={'blue.main'} fontWeight={500}>{` ${
            ticket?.ticketType === TICKET_TYPE?.INC
              ? ''
              : ticket?.ticketTitle ?? ''
          } ${ticket?.ticketIdNumber}`}</Typography>
        </Box>
        <Typography variant="body2" color={'blue.main'} fontWeight={500}>
          {`Created On  ${otherDateFormat(
            ticket?.createdAt,
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
        <CustomChip
          label={capitalizeFirstLetter(ticket?.status) ?? '---'}
          backgroundColor="grey.400"
          textColor="slateBlue.main"
        />
      ) : (
        '---'
      )}
    </Box>
  );
};

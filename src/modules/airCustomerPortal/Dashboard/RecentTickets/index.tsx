import { Box, Typography, Avatar, Chip } from '@mui/material';
import { CardLayout } from '../CardLayout';
import { useTheme } from '@mui/material/styles';
import { useRecentTickets } from './useRecentTickets';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import dayjs from 'dayjs';
import { AIR_CUSTOMER_PORTAL, DATE_TIME_FORMAT } from '@/constants';
import { TICKET_TYPE } from '@/constants/strings';
import { generateImage } from '@/utils/avatarUtils';

export const RecentTickets = () => {
  const { palette }: any = useTheme();
  const { data, isLoading, isFetching, isError, router } = useRecentTickets();

  return (
    <CardLayout
      title={'Recent Tickets'}
      btnClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.TICKETS,
        });
      }}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState height={'100%'} />
      ) : (
        <Box my={1}>
          {!!data?.data?.length ? (
            data?.data?.map((ticket: any) => (
              <Box
                key={ticket?._id}
                sx={{
                  p: 1,
                  background: palette?.grey?.[100],
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
                  <Typography
                    fontWeight={600}
                    variant="body2"
                    color={'blue.main'}
                  >
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
                    <Typography
                      variant="body2"
                      color={'blue.main'}
                      fontWeight={500}
                    >{` ${
                      ticket?.ticketType === TICKET_TYPE?.INC
                        ? ''
                        : ticket?.ticketTitle
                    } ${ticket?.ticketIdNumber}`}</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color={'blue.main'}
                    fontWeight={500}
                  >
                    {`Created On  ${dayjs(ticket?.createdAt)?.format(
                      DATE_TIME_FORMAT?.UI,
                    )}`}
                    <Typography
                      component="span"
                      fontWeight={500}
                      variant="body2"
                      color="primary.main"
                    >
                      {!!ticket?.source ? `- Via ${ticket?.source}` : ''}
                    </Typography>
                  </Typography>
                </Box>
                <Chip
                  label={ticket?.status ?? '---'}
                  sx={{
                    backgroundColor: 'grey.400',
                    color: 'slateBlue.main',
                  }}
                />
              </Box>
            ))
          ) : (
            <NoData height={'100%'} />
          )}
        </Box>
      )}
    </CardLayout>
  );
};

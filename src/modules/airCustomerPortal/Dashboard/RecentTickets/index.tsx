import { Box, Typography, Avatar, Chip } from '@mui/material';
import { CardLayout } from '../CardLayout';
import { useTheme } from '@mui/material/styles';
import { useRecentTickets } from './useRecentTickets';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';
import { TICKET_TYPE } from '@/constants/strings';

export const RecentTickets = ({ title, handleViewMore }: any) => {
  const { palette }: any = useTheme();
  const { data, isLoading, isFetching, isError } = useRecentTickets();

  return (
    <CardLayout title={title} btnClick={handleViewMore}>
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState height={'100%'} />
      ) : (
        <Box my={1}>
          {!!data?.data?.articles?.length ? (
            data?.data?.articles?.map((ticket: any) => (
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
                }}
              >
                <Box>
                  <Typography fontWeight={600} color={palette?.blue?.main}>
                    {ticket?.subject}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    <Avatar src={ticket?.icon} />
                    <Typography
                      color={palette?.blue?.main}
                      fontWeight={500}
                    >{` ${
                      ticket?.ticketType === TICKET_TYPE?.INC
                        ? ''
                        : ticket?.ticketTitle
                    } ${ticket?.ticketIdNumber}`}</Typography>
                  </Box>
                  <Typography
                    color={palette?.blue?.main}
                    fontWeight={500}
                    pt={0.6}
                  >
                    {`Created On  ${dayjs(ticket?.CreatedAt)?.format(
                      DATE_FORMAT?.UI,
                    )}, ${dayjs(ticket?.CreatedAt)?.format(TIME_FORMAT?.UI)} `}
                    <Typography
                      component="span"
                      fontWeight={500}
                      color="primary.main"
                    >
                      {!!ticket?.source ? `- Via ${ticket?.source}` : ''}
                    </Typography>
                  </Typography>
                </Box>
                <Chip
                  label={'Processing'}
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

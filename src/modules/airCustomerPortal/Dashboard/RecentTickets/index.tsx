import { Box, Typography, Avatar } from '@mui/material';
import { CardLayout } from '../CardLayout';
import { useTheme } from '@mui/material/styles';
import { styles } from './RecentTickets.style';
import { v4 as uuidv4 } from 'uuid';
import { useRecentTickets } from './useRecentTickets';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';

export const RecentTickets = ({ title, handleViewMore }: any) => {
  const { palette }: any = useTheme();
  const { mainWrapper, approvalWrapper, processingBtn } = styles;
  const { data, isLoading, isFetching, isError } = useRecentTickets();

  return (
    <CardLayout title={title} btnClick={handleViewMore}>
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState />
      ) : (
        <Box my="0.75rem">
          {!!data?.data?.articles?.length ? (
            data?.data?.articles?.map((ticket: any) => (
              <Box key={uuidv4()} sx={mainWrapper(palette)}>
                <Box>
                  <Typography fontWeight={600} color={palette?.blue?.main}>
                    {ticket?.title}
                  </Typography>
                  <Box sx={approvalWrapper}>
                    <Avatar src={ticket?.icon} />
                    <Typography
                      color={palette?.blue?.main}
                      fontWeight={500}
                    >{` ${ticket?.ticketTitle} ${ticket?.ticketNumber}`}</Typography>
                  </Box>
                  <Typography
                    color={palette?.blue?.main}
                    fontWeight={500}
                    pt={0.6}
                  >
                    {`${ticket?.CreatedOn}- `}
                    <Typography
                      component="span"
                      fontWeight={500}
                      color="primary.main"
                    >
                      {ticket?.device}
                    </Typography>
                  </Typography>
                </Box>
                <Typography sx={processingBtn}>Processing</Typography>
              </Box>
            ))
          ) : (
            <NoData />
          )}
        </Box>
      )}
    </CardLayout>
  );
};

import { CardLayout } from '../CardLayout';
import { Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styles } from './PendingApprovals.style';
import { usePendingApprovals } from './usePendingApprovals';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';

export const PendingApprovals = ({ title, handleViewMore }: any) => {
  const { palette }: any = useTheme();
  const { mainWrapper, approvalWrapper, approvalTicket, divider } = styles;
  const { data, isLoading, isFetching, isError } = usePendingApprovals();

  return (
    <CardLayout title={title} btnClick={handleViewMore} maxHeight={260}>
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState />
      ) : (
        <Box my="0.75rem">
          {!!data?.data?.articles?.length ? (
            data?.data?.articles?.map(({ user, ...approval }: any) => (
              <Box key={approval?._id} sx={mainWrapper(palette)}>
                <Typography fontWeight={600} color={palette?.blue?.main}>
                  Request for :
                  <Typography
                    component={'span'}
                    variant="body2"
                    sx={approvalTicket(palette)}
                  >{`${approval?.ticketNumber}, ${approval?.ticketTitle}`}</Typography>
                </Typography>
                <Box sx={approvalWrapper}>
                  <Avatar></Avatar>
                  <Typography
                    color={palette?.blue?.light}
                  >{`${user?.firstName} ${user?.lastName} sent approval request `}</Typography>
                  <Box sx={divider(palette)} />
                  <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
                    {approval?.requestTime}
                  </Typography>
                  <Box sx={divider(palette)} />
                  <Typography color={palette?.grey?.[900]} fontSize={'0.75rem'}>
                    {approval?.device}
                  </Typography>
                </Box>
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

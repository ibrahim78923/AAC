import { useAppSelector } from '@/redux/store';
import { CircularProgress, Typography } from '@mui/material';

export const TotalCount = () => {
  const totalCount = useAppSelector(
    (state) => state?.servicesRelatedTickets?.totalCount,
  );

  const isTotalCountLoading = useAppSelector(
    (state) => state?.servicesRelatedTickets?.isTotalCountLoading,
  );

  return (
    <Typography variant={'h5'}>
      <Typography
        variant={'body1'}
        component={'span'}
        bgcolor={'secondary.main'}
        borderRadius={1}
        p={0.4}
        color={'common.white'}
        mr={0.5}
      >
        {isTotalCountLoading ? (
          <CircularProgress size={18} />
        ) : totalCount < 10 ? (
          `0${totalCount}`
        ) : (
          totalCount
        )}
      </Typography>
      Child Tickets
    </Typography>
  );
};

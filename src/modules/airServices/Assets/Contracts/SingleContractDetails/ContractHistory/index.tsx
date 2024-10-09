import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { Timeline } from './Timeline';
import { useContractHistory } from './useContractHistory';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const ContractHistory = () => {
  const { contractHistory, isLoading, isFetching, isError, refetch } =
    useContractHistory();
  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;
  return (
    <Grid container>
      <Grid item xs={12} md={10.5}>
        {!!contractHistory?.length ? (
          contractHistory?.map((singleActivity: any, index: number) => (
            <Timeline
              data={singleActivity}
              key={singleActivity?._id || index}
              timelineIndex={index}
            />
          ))
        ) : (
          <NoData message={'There is no activity'} />
        )}
      </Grid>
    </Grid>
  );
};

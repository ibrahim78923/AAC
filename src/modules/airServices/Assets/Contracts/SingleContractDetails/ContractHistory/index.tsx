import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
import { Timeline } from './Timeline';
import { useContractHistory } from './useContractHistory';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const ContractHistory = () => {
  const { contractHistory, isLoading, isFetching, isError } =
    useContractHistory();
  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState />;
  return (
    <Grid container>
      <Grid item xs={12} md={0.5}></Grid>
      <Grid item xs={12} md={10.5}>
        {!!contractHistory?.length ? (
          contractHistory?.map((singleActivity: any, index: any) => (
            <Timeline
              data={singleActivity}
              key={singleActivity?._id}
              timelineIndex={index}
            />
          ))
        ) : (
          <NoData
            image={NoAssociationFoundImage}
            message={'There is no activity'}
          />
        )}
      </Grid>
      <Grid item xs={12} md={1}></Grid>
    </Grid>
  );
};

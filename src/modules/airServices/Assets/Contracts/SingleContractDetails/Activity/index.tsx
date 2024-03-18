import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { ActivityTimeline } from './ActivityTimeline';
import { useActivity } from './useActivity';
import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const Activity = () => {
  const { isLoading, isError, setPageLimit, setPage, isFetching, data } =
    useActivity();

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState />;
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={0.5}></Grid>
        <Grid item xs={12} md={10.5}>
          {!!data?.data?.activitylogs?.length ? (
            data?.data?.activitylogs?.map((singleActivity: any) => (
              <ActivityTimeline
                activityData={singleActivity}
                key={singleActivity?._id}
              />
            ))
          ) : (
            <NoData message={'There is no activity'} />
          )}
        </Grid>
        <Grid item xs={12} md={1}></Grid>
      </Grid>
      <CustomPagination
        count={data?.data?.meta?.pages}
        totalRecords={data?.data?.meta?.total}
        pageLimit={data?.data?.meta?.limit}
        currentPage={data?.data?.meta?.page}
        onPageChange={(page: any) => setPage(page)}
        setPageLimit={setPageLimit}
        setPage={setPage}
      />
    </>
  );
};

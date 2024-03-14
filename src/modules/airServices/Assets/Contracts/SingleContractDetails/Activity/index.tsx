import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { ActivityTimeline } from './ActivityTimeline';
import { NoAssociationFoundImage } from '@/assets/images';
import { useActivity } from './useActivity';
import CustomPagination from '@/components/CustomPagination';
import { PAGINATION } from '@/config';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

export const Activity = () => {
  const {
    isLoading,
    isError,
    setPageLimit,
    setPage,
    isFetching,
    data: activityData,
  } = useActivity();
  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState />;
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={0.5}></Grid>
        <Grid item xs={12} md={10.5}>
          {activityData?.data?.activitylogs?.length > 0 ? (
            activityData?.data?.activitylogs?.map((singleActivity: any) => (
              <ActivityTimeline
                activityData={singleActivity}
                key={singleActivity?._id}
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
      <CustomPagination
        count={activityData?.data?.meta?.pages}
        totalRecords={activityData?.data?.meta?.total}
        pageLimit={activityData?.data?.meta?.limit}
        currentPage={activityData?.data?.meta?.page}
        rowsPerPageOptions={PAGINATION?.ROWS_PER_PAGE}
        onPageChange={(page: any) => setPage(page)}
        setPageLimit={setPageLimit}
        setPage={setPage}
      />
    </>
  );
};

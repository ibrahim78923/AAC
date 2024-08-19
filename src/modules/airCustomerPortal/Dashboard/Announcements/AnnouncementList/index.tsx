import ApiErrorState from '@/components/ApiErrorState';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Box } from '@mui/material';
import { Fragment } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import NoData from '@/components/NoData';
import CustomPagination from '@/components/CustomPagination';
import { AnnouncementsListPropsI } from '../Announcements.interface';

export const AnnouncementList = (props: AnnouncementsListPropsI) => {
  const {
    isLoading,
    isFetching,
    isError,
    data,
    isDrawerOpen,
    onClose,
    setPage,
    setPageLimit,
    refetch,
  } = props;

  return (
    <CommonDrawer
      title="Announcements"
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      isOk
      okText=""
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={() => refetch?.()} />
      ) : (
        <Box my="0.75rem">
          {!!data?.annoucements?.length ? (
            <>
              {data?.annoucements?.map((announcement: any, index: number) => (
                <Fragment key={announcement?._id}>
                  <AnnouncementCard data={announcement} index={index} />
                </Fragment>
              ))}
              <br />
              <CustomPagination
                count={data?.meta?.pages}
                pageLimit={data?.meta?.limit}
                currentPage={data?.meta?.page}
                totalRecords={data?.meta?.total}
                onPageChange={(page: number) => setPage?.(page)}
                setPage={setPage}
                setPageLimit={setPageLimit}
              />
            </>
          ) : (
            <NoData />
          )}
        </Box>
      )}
    </CommonDrawer>
  );
};

import ApiErrorState from '@/components/ApiErrorState';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Box } from '@mui/material';
import { Fragment } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import NoData from '@/components/NoData';
import CustomPagination from '@/components/CustomPagination';
import { useAnnouncementList } from './useAnnouncementList';

export const AnnouncementList = (props: any) => {
  const {
    isPortalOpen,
    dropdownAnnouncementsOptions,
    setPageLimit,
    setPage,
    data,
    isLoading = false,
    isFetching = false,
    isError = false,
  } = props;

  const { onClose } = useAnnouncementList?.(props);

  return (
    <CommonDrawer
      title="Announcements"
      isDrawerOpen={isPortalOpen?.isView}
      onClose={() => onClose?.()}
      isOk
      okText=""
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState />
      ) : (
        <Box my="0.75rem">
          {!!data?.announcements?.annoucements?.length ? (
            <>
              {data?.announcements?.annoucements?.map(
                (announcement: any, index: number) => (
                  <Fragment key={announcement?._id}>
                    <AnnouncementCard
                      dropdownAnnouncementsOptions={dropdownAnnouncementsOptions?.(
                        announcement,
                      )}
                      data={announcement}
                      index={index}
                    />
                  </Fragment>
                ),
              )}
              <br />
              {!!data?.announcements?.annoucements?.meta?.pages && (
                <CustomPagination
                  count={data?.announcements?.annoucements?.meta?.pages}
                  pageLimit={data?.announcements?.annoucements?.meta?.limit}
                  currentPage={data?.announcements?.annoucements?.meta?.page}
                  totalRecords={data?.announcements?.annoucements?.meta?.total}
                  onPageChange={(page: any) => setPage?.(page)}
                  setPage={setPage}
                  setPageLimit={setPageLimit}
                />
              )}
            </>
          ) : (
            <NoData />
          )}
        </Box>
      )}
    </CommonDrawer>
  );
};

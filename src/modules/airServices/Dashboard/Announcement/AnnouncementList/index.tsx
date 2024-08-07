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
    lazyGetCustomerAnnouncementStatus,
    setPageLimit,
    setPage,
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
      {lazyGetCustomerAnnouncementStatus?.isLoading ||
      lazyGetCustomerAnnouncementStatus?.isFetching ? (
        <SkeletonForm />
      ) : lazyGetCustomerAnnouncementStatus?.isError ? (
        <ApiErrorState />
      ) : (
        <Box my="0.75rem">
          {!!lazyGetCustomerAnnouncementStatus?.data?.annoucements?.length ? (
            <>
              {lazyGetCustomerAnnouncementStatus?.data?.annoucements?.map(
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
              <CustomPagination
                count={lazyGetCustomerAnnouncementStatus?.data?.meta?.pages}
                pageLimit={lazyGetCustomerAnnouncementStatus?.data?.meta?.limit}
                currentPage={
                  lazyGetCustomerAnnouncementStatus?.data?.meta?.page
                }
                totalRecords={
                  lazyGetCustomerAnnouncementStatus?.data?.meta?.total
                }
                onPageChange={(page: any) => setPage?.(page)}
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

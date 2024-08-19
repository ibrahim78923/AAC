import ApiErrorState from '@/components/ApiErrorState';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Box } from '@mui/material';
import { Fragment } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import NoData from '@/components/NoData';
import { useAnnouncementList } from './useAnnouncementList';

export const AnnouncementList = (props: any) => {
  const {
    isPortalOpen,
    dropdownAnnouncementsOptions,
    lazyGetCustomerAnnouncementStatus,
    getCustomerAnnouncementData,
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
        <ApiErrorState
          canRefresh
          refresh={() => getCustomerAnnouncementData?.()}
        />
      ) : (
        <Box my="0.75rem">
          {!!lazyGetCustomerAnnouncementStatus?.data?.data?.length ? (
            <>
              {lazyGetCustomerAnnouncementStatus?.data?.data?.map(
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
            </>
          ) : (
            <NoData />
          )}
        </Box>
      )}
    </CommonDrawer>
  );
};

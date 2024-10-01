import CommonDrawer from '@/components/CommonDrawer';
import { Box } from '@mui/material';
import { Fragment } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import NoData from '@/components/NoData';
import { useAnnouncementList } from './useAnnouncementList';
import { fullName } from '@/utils/avatarUtils';

export const AnnouncementList = (props: any) => {
  const {
    isPortalOpen,
    dropdownAnnouncementsOptions,
    lazyGetCustomerAnnouncementStatus,
  } = props;

  const { onClose, user, checkApiErrorOrLoading } =
    useAnnouncementList?.(props);

  return (
    <CommonDrawer
      title="Announcements"
      isDrawerOpen={isPortalOpen?.isView}
      onClose={onClose}
      isOk
      okText=""
    >
      {checkApiErrorOrLoading() ?? (
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
                      isLoggedInUser={
                        user?._id === announcement?.createdBy?._id
                      }
                      userDetails={{
                        userAvatar: announcement?.createdBy?.avatar?.url,
                        userName: fullName(
                          announcement?.createdBy?.firstName,
                          announcement?.createdBy?.lastName,
                        ),
                      }}
                    />
                  </Fragment>
                ),
              )}
            </>
          ) : (
            <NoData message="No announcements found" />
          )}
        </Box>
      )}
    </CommonDrawer>
  );
};

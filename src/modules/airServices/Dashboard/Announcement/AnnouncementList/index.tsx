import CommonDrawer from '@/components/CommonDrawer';
import { useAnnouncementList } from './useAnnouncementList';
import { InteractiveUserFeedCard } from '@/components/Cards/InteractiveUserFeedCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const AnnouncementList = (props: any) => {
  const {
    isPortalOpen,
    dropdownAnnouncementsOptions,
    getCustomerAnnouncementData,
  } = props;

  const { onClose, user, showLoader, hasError, announcements } =
    useAnnouncementList?.(props);

  return (
    <CommonDrawer
      title="Announcements"
      isDrawerOpen={isPortalOpen?.isView}
      onClose={onClose}
      isOk
      okText=""
    >
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={hasError}
        hasNoData={!announcements?.length}
        refreshApi={getCustomerAnnouncementData}
      >
        {announcements?.map((announcement: any, index: number) => (
          <InteractiveUserFeedCard
            key={announcement?._id}
            firstName={announcement?.createdBy?.firstName}
            lastName={announcement?.createdBy?.lastName}
            userAvatarSrc={announcement?.createdBy?.avatar?.url}
            feedTitle={announcement?.title}
            dateFrom={announcement?.createdAt}
            hasBorderBottom={index !== announcements?.length - 1}
            hasAction={user?._id === announcement?.createdBy?._id}
            dropdownAnnouncementsOptions={dropdownAnnouncementsOptions?.(
              announcement,
            )}
          />
        ))}
      </ApiRequestFlow>
    </CommonDrawer>
  );
};

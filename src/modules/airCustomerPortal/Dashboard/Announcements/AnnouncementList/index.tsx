import CommonDrawer from '@/components/CommonDrawer';
import { AnnouncementsListPropsI } from '../Announcements.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { InteractiveUserFeedCard } from '@/components/Cards/InteractiveUserFeedCard';

export const AnnouncementList = (props: AnnouncementsListPropsI) => {
  const { isError, data, isDrawerOpen, setDrawerOpen, refetch, showLoader } =
    props;

  const onClose = () => {
    setDrawerOpen(false);
  };

  return (
    <CommonDrawer
      title="Announcements"
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      isOk
      okText=""
    >
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
        hasNoData={!data?.data?.length}
        noDataMessage={'No announcement found'}
      >
        {data?.data?.map((announcement: any, index: number) => (
          <InteractiveUserFeedCard
            key={announcement?._id}
            firstName={announcement?.createdBy?.firstName}
            lastName={announcement?.createdBy?.lastName}
            description={announcement?.description}
            userAvatarSrc={announcement?.createdBy?.avatar?.url}
            title={announcement?.title}
            dateFrom={announcement?.createdAt}
            hasBorderBottom={index !== data?.data?.length - 1}
          />
        ))}
      </ApiRequestFlow>
    </CommonDrawer>
  );
};

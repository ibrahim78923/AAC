import { CardLayout } from '../CardLayout';
import { AnnouncementList } from './AnnouncementList';
import { useAnnouncements } from './useAnnouncements';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { InteractiveUserFeedCard } from '@/components/Cards/InteractiveUserFeedCard';

export const Announcements = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    openDrawer,
    setDrawerOpen,
    onClose,
    refetch,
    showLoader,
  } = useAnnouncements();

  return (
    <>
      <CardLayout
        title={'Announcements'}
        btnPosition="center"
        btnClick={() => setDrawerOpen(true)}
        buttonText="View All"
        maxHeight={'40vh'}
      >
        <ApiRequestFlow
          showSkeleton={showLoader}
          hasError={isError}
          refreshApi={refetch}
          skeletonType={SKELETON_TYPES?.BASIC_CARD}
          cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
          hasNoData={!data?.data?.length}
          noDataMessage={'No announcement found'}
          errorHeight="100%"
        >
          {data?.data?.map((announcement: any, index: number) => (
            <InteractiveUserFeedCard
              key={announcement?._id}
              firstName={announcement?.createdBy?.firstName}
              lastName={announcement?.createdBy?.lastName}
              userAvatarSrc={announcement?.createdBy?.avatar?.url}
              title={announcement?.title}
              dateFrom={announcement?.createdAt}
              hasBorderBottom={index !== data?.data?.length - 1}
              description={announcement?.description}
            />
          ))}
        </ApiRequestFlow>
      </CardLayout>

      {openDrawer && (
        <AnnouncementList
          isDrawerOpen={openDrawer}
          onClose={() => onClose?.()}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          showLoader={showLoader}
          isError={isError}
          refetch={refetch}
        />
      )}
    </>
  );
};

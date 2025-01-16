import CommonDrawer from '@/components/CommonDrawer';
import { Fragment } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import { AnnouncementsListPropsI } from '../Announcements.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const AnnouncementList = (props: AnnouncementsListPropsI) => {
  const { isError, data, isDrawerOpen, onClose, refetch, showLoader } = props;

  return (
    <CommonDrawer
      title="Announcements"
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
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
          <Fragment key={announcement?._id}>
            <AnnouncementCard data={announcement} index={index} />
          </Fragment>
        ))}
      </ApiRequestFlow>
    </CommonDrawer>
  );
};

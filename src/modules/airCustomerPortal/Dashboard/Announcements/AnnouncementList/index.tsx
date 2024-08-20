import ApiErrorState from '@/components/ApiErrorState';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Box } from '@mui/material';
import { Fragment } from 'react';
import { AnnouncementCard } from '../AnnouncementCard';
import NoData from '@/components/NoData';
import { AnnouncementsListPropsI } from '../Announcements.interface';

export const AnnouncementList = (props: AnnouncementsListPropsI) => {
  const {
    isLoading,
    isFetching,
    isError,
    data,
    isDrawerOpen,
    onClose,
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
          {!!data?.data?.length ? (
            <>
              {data?.data?.map((announcement: any, index: number) => (
                <Fragment key={announcement?._id}>
                  <AnnouncementCard data={announcement} index={index} />
                </Fragment>
              ))}
              <br />
            </>
          ) : (
            <NoData />
          )}
        </Box>
      )}
    </CommonDrawer>
  );
};

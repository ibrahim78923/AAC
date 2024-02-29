import { Box } from '@mui/material';
import { CardLayout } from '../CardLayout';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { AnnouncementCard } from './AnnouncementCard';
import { Fragment } from 'react';
import { AnnouncementList } from './AnnouncementList';
import { useAnnouncements } from './useAnnouncements';

export const Announcements = () => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    openDrawer,
    setDrawerOpen,
    setPageLimit,
    setPage,
    onClose,
  } = useAnnouncements();

  return (
    <>
      <CardLayout
        title={'Announcements'}
        btnPosition="center"
        btnClick={() => setDrawerOpen(true)}
      >
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : isError ? (
          <ApiErrorState height={'100%'} />
        ) : (
          <Box my="0.75rem">
            {!!data?.annoucements?.length ? (
              data?.annoucements?.map((announcement: any, index: number) => (
                <Fragment key={announcement?._id}>
                  <AnnouncementCard data={announcement} index={index} />
                </Fragment>
              ))
            ) : (
              <NoData height={'100%'} />
            )}
          </Box>
        )}
      </CardLayout>

      {openDrawer && (
        <AnnouncementList
          isDrawerOpen={openDrawer}
          onClose={() => onClose?.()}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      )}
    </>
  );
};

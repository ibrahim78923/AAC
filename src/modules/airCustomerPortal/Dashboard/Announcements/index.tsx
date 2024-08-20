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
    onClose,
    refetch,
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
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : isError ? (
          <ApiErrorState
            height={'100%'}
            canRefresh
            refresh={() => refetch?.()}
          />
        ) : (
          <>
            {!!data?.data?.length ? (
              data?.data?.map((announcement: any, index: number) => (
                <Fragment key={announcement?._id}>
                  <AnnouncementCard data={announcement} index={index} />
                </Fragment>
              ))
            ) : (
              <NoData height={'100%'} />
            )}
          </>
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
          refetch={refetch}
        />
      )}
    </>
  );
};

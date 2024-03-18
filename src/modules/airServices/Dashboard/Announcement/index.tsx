import { ViewDetailSharedIcon } from '@/assets/icons';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { useAnnouncementHeader } from './useAnnouncement';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { Fragment } from 'react';
import { AnnouncementCard } from './AnnouncementCard';
import NoData from '@/components/NoData';
import AddAnnouncement from './AddAnnouncement';
import { AnnouncementList } from './AnnouncementList';

export const Announcement = () => {
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
    openAddAnnouncementDrawer,
    setOpenAddAnnouncementDrawer,
  } = useAnnouncementHeader();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        p={2}
        borderBottom={'1px solid'}
        color="custom.off_white"
      >
        <Typography variant="h5" color="slateBlue.main">
          Announcements
        </Typography>
        <IconButton onClick={() => setOpenAddAnnouncementDrawer(true)}>
          <ViewDetailSharedIcon />
        </IconButton>
      </Box>
      <Box height={'30vh'} overflow={'auto'}>
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
      </Box>
      <Box textAlign={'center'}>
        <Button variant="text" fullWidth onClick={() => setDrawerOpen(true)}>
          View All
        </Button>
      </Box>
      {openAddAnnouncementDrawer && (
        <AddAnnouncement
          isDrawerOpen={openAddAnnouncementDrawer}
          setIsDrawerOpen={setOpenAddAnnouncementDrawer}
        />
      )}
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

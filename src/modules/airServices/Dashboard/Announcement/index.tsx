import { ViewDetailSharedIcon } from '@/assets/icons';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { useAnnouncement } from './useAnnouncement';
import { Fragment } from 'react';
import { AnnouncementCard } from './AnnouncementCard';
import NoData from '@/components/NoData';
import AddAnnouncement from './AddAnnouncement';
import { AnnouncementList } from './AnnouncementList';

export const Announcement = (props: any) => {
  const { data, isPreviewMode } = props;
  const {
    announcementsList,
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
  } = useAnnouncement();

  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
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
        <IconButton
          disabled={isPreviewMode}
          onClick={() => setOpenAddAnnouncementDrawer(true)}
        >
          <ViewDetailSharedIcon />
        </IconButton>
      </Box>
      <Box height={'30vh'} overflow={'auto'}>
        <Box my="0.75rem">
          {!!data?.announcements?.annoucements?.length ? (
            data?.announcements?.annoucements?.map(
              (announcement: any, index: number) => (
                <Fragment key={announcement?._id}>
                  <AnnouncementCard data={announcement} index={index} />
                </Fragment>
              ),
            )
          ) : (
            <NoData height={'100%'} />
          )}
        </Box>
        {/* )} */}
      </Box>
      <Box textAlign={'center'}>
        <Button
          variant="text"
          disabled={isPreviewMode}
          fullWidth
          onClick={() => setDrawerOpen(true)}
        >
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
          data={announcementsList}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      )}
    </Box>
  );
};

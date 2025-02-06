import { ViewDetailSharedIcon } from '@/assets/icons';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { useAnnouncement } from './useAnnouncement';
import NoData from '@/components/NoData';
import { SingleDashboardComponentPropsI } from '../SingleDashboard/SingleDashboard.interface';
import { InteractiveUserFeedCard } from '@/components/Cards/InteractiveUserFeedCard';

export const Announcement = (props: SingleDashboardComponentPropsI) => {
  const { data, isPreviewMode } = props;
  const { renderPortalComponent, isPortalOpen, setIsPortalOpen } =
    useAnnouncement(props);

  return (
    <>
      <Box
        borderRadius={3}
        border={`1px solid`}
        borderColor="custom.off_white"
        height="100%"
        display="flex"
        flexDirection={'column'}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
          px={2}
          py={0.5}
          borderBottom={'1px solid'}
          color="custom.off_white"
        >
          <Typography variant="h5" color="slateBlue.main">
            Announcements
          </Typography>
          <IconButton
            disabled={isPreviewMode}
            onClick={() => setIsPortalOpen({ isOpen: true, isUpsert: true })}
          >
            <ViewDetailSharedIcon />
          </IconButton>
        </Box>
        <Box flex={1}>
          {!!data?.announcements?.annoucements?.length ? (
            <>
              {data?.announcements?.annoucements
                ?.slice?.(0, 5)
                ?.map((announcement: any) => (
                  <InteractiveUserFeedCard
                    key={announcement?._id}
                    firstName={announcement?.userName}
                    userAvatarSrc={announcement?.userAvatar}
                    title={announcement?.title}
                    dateFrom={announcement?.createdAt}
                    hasBorderBottom
                    hasDescription={false}
                  />
                ))}
            </>
          ) : (
            <NoData height={'100%'} message="No announcements found" />
          )}
        </Box>
        <Box textAlign={'center'}>
          <Button
            className="small"
            variant="text"
            disabled={isPreviewMode}
            fullWidth
            onClick={() => setIsPortalOpen({ isOpen: true, isView: true })}
          >
            View All
          </Button>
        </Box>
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};

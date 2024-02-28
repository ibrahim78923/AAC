import { Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { announcementDashboardCardData } from '../AnnouncementDashboardCard/AnnouncementDashboardCard.data';
import { AnnouncementDashboardCard } from '../AnnouncementDashboardCard';

function AnnouncementDashboard({
  isAnnouncementDrawerOpen,
  setIsAnnouncementDrawerOpen,
}: any) {
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isAnnouncementDrawerOpen}
        onClose={() => {
          setIsAnnouncementDrawerOpen(false);
        }}
        title="Announcements"
        footer={false}
        isOk={false}
        okText=""
      >
        <Box>
          {announcementDashboardCardData?.map((item, index) => (
            <Box key={item?.id}>
              <AnnouncementDashboardCard
                icon={item?.icon}
                announcement={item?.announcement}
                announcementTime={item?.announcementTime}
                announcementAvatar={item?.announcementAvatar}
                isBorderBottom={
                  announcementDashboardCardData?.length - 1 !== index
                }
              />
            </Box>
          ))}
        </Box>
      </CommonDrawer>
    </>
  );
}

export default AnnouncementDashboard;

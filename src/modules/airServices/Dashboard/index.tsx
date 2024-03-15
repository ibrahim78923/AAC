import { HeaderDashboard } from '@/modules/airServices/Dashboard/HeaderDashboard';
import { RecentActivitiesDashboardCard } from '@/modules/airServices/Dashboard/RecentActivitiesDashboard/RecentActivitiesDashboardCard';
import { TicketDashboardCards } from '@/modules/airServices/Dashboard/TicketDashboardCards';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import { AnnouncementDashboardCard } from '@/modules/airServices/Dashboard/AnnouncementDashboard/AnnouncementDashboardCard';
import { TopPerformerDashboardCard } from '@/modules/airServices/Dashboard/TopPerformerDashboardCard';
import { ticketDashboardCardsData } from './TicketDashboardCards/TicketDashboardCards.data';
import { recentActivitiesDashboardCardData } from './RecentActivitiesDashboard/RecentActivitiesDashboardCard/RecentActivitiesDashboardCard.data';
import { announcementDashboardCardData } from './AnnouncementDashboard/AnnouncementDashboardCard/AnnouncementDashboardCard.data';
import { topPerformerDashboardCardData } from './TopPerformerDashboardCard/TopPerformerDashboardCard.data';
import { AnnouncementHeader } from './AnnouncementDashboard/AnnouncementHeader';
import { useDashboard } from './useDashboard';
import RecentActivitiesDashboardDrawer from './RecentActivitiesDashboard/RecentActivitiesDashboardDrawer';
import AnnouncementDashboard from './AnnouncementDashboard/AnnouncementDashboard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
import { PieChart } from './Chart/PieChart';
import { TicketBased } from './Chart/TicketBased';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const Dashboard = () => {
  const {
    setIsDrawerOpen,
    isDrawerOpen,
    handleIconButton,
    theme,
    handleAnnouncementIconButton,
    isAnnouncementDrawerOpen,
    setIsAnnouncementDrawerOpen,
    cardData,
    customerAnnouncement,
    recentActivities,
    isLoading,
    isFetching,
  } = useDashboard();

  return (
    <PermissionsGuard
      permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
    >
      <Box>
        <HeaderDashboard />
        <br />
        {isLoading || isFetching ? (
          <Skeleton variant="text" height="100%" />
        ) : ticketDashboardCardsData(cardData)?.length > 0 ? (
          <Grid container spacing={3}>
            {ticketDashboardCardsData(cardData)?.map((item: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item?._id}>
                <TicketDashboardCards
                  icon={item?.icon}
                  count={item?.count}
                  label={item?.label}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoData
            image={NoAssociationFoundImage}
            message={'No data is available'}
            height={'100%'}
          />
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8} sx={{ marginTop: 2 }}>
                <Box
                  borderRadius={3}
                  border={`1px solid ${theme?.palette?.grey?.[700]}`}
                  height="100%"
                >
                  <br />
                  <Box marginLeft={2}>
                    <Box marginTop={2} marginBottom={2}>
                      <TicketBased />
                    </Box>{' '}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={4} sx={{ marginTop: 2 }}>
                <Box
                  borderRadius={3}
                  border={`1px solid ${theme?.palette?.grey?.[700]}`}
                  height="100%"
                >
                  <br />
                  <Box marginLeft={2}>
                    <Typography variant="h5">Recent Activities</Typography>
                  </Box>
                  {isLoading || isFetching ? (
                    <SkeletonTable />
                  ) : recentActivitiesDashboardCardData(recentActivities)
                      .length > 0 ? (
                    <>
                      <Box marginTop={2} overflow={'scroll'} height={'35vh'}>
                        {recentActivitiesDashboardCardData(
                          recentActivities,
                        )?.map((item: any, index: any, arr: any) => (
                          <Box key={item?._id}>
                            <RecentActivitiesDashboardCard
                              icon={item?.icon}
                              recentActivityName={item?.recentActivityName}
                              recentActivity={item?.recentActivity}
                              recentActivityRequest={
                                item?.recentActivityRequest
                              }
                              recentActivitySerialNumber={
                                item?.recentActivitySerialNumber
                              }
                              recentActivityModuleName={
                                item?.recentActivityModuleName
                              }
                              recentActivityDateTime={
                                item?.recentActivityDateTime
                              }
                              isBorderBottom={arr.length - 1 !== index}
                            />
                          </Box>
                        ))}
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        marginTop={4.9}
                      >
                        <Button
                          variant="text"
                          fullWidth
                          onClick={handleIconButton}
                        >
                          View All
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <NoData
                      image={NoAssociationFoundImage}
                      message={'No data is available'}
                      height={'100%'}
                    />
                  )}
                  <RecentActivitiesDashboardDrawer
                    isDrawerOpen={isDrawerOpen}
                    setIsDrawerOpen={setIsDrawerOpen}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <Box
                  borderRadius={3}
                  p={2}
                  border={`1px solid ${theme?.palette?.grey?.[700]}`}
                  height="100%"
                >
                  <PieChart />
                </Box>
              </Grid>

              <Grid item xs={12} lg={4}>
                {topPerformerDashboardCardData &&
                topPerformerDashboardCardData.length > 0 ? (
                  topPerformerDashboardCardData.map((item: any) => (
                    <TopPerformerDashboardCard
                      key={item?._id}
                      userImage={item?.userImage}
                      badgeImage={item?.badgeImage}
                      badgeNextImage={item?.badgeNextImage}
                      userImageText={item?.userImageText}
                      userImageDescription={item?.userImageDescription}
                      progressBarText={item?.progressBarText}
                      ProgressBarDescription={item?.ProgressBarDescription}
                      badgeText={item?.badgeText}
                      badgeNextText={item?.badgeNextText}
                    />
                  ))
                ) : (
                  <NoData
                    image={NoAssociationFoundImage}
                    message={'No data is available'}
                    height={'100%'}
                  />
                )}
              </Grid>

              <Grid item xs={12} lg={4}>
                <Box
                  borderRadius={3}
                  border={`1px solid ${theme?.palette?.grey?.[700]}`}
                  height="100%"
                >
                  <br />
                  <Box>
                    <AnnouncementHeader />
                  </Box>

                  {isLoading || isFetching ? (
                    <SkeletonTable />
                  ) : announcementDashboardCardData(customerAnnouncement)
                      ?.length > 0 ? (
                    <>
                      <Box overflow={'scroll'} height={'29vh'}>
                        {announcementDashboardCardData(
                          customerAnnouncement,
                        )?.map((item: any, index: any) => (
                          <Box key={item?._id}>
                            <AnnouncementDashboardCard
                              icon={item?.icon}
                              announcement={item?.announcement}
                              announcementTime={item?.announcementTime}
                              announcementAvatar={item?.announcementAvatar}
                              isBorderBottom={
                                announcementDashboardCardData?.length - 1 !==
                                index
                              }
                            />
                          </Box>
                        ))}
                      </Box>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        marginTop={2}
                      >
                        <Button
                          variant="text"
                          fullWidth
                          onClick={handleAnnouncementIconButton}
                        >
                          View All
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <NoData
                      image={NoAssociationFoundImage}
                      message={'No data is available'}
                      height={'100%'}
                    />
                  )}
                  <AnnouncementDashboard
                    isAnnouncementDrawerOpen={isAnnouncementDrawerOpen}
                    setIsAnnouncementDrawerOpen={setIsAnnouncementDrawerOpen}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PermissionsGuard>
  );
};

export default Dashboard;

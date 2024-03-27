import Link from 'next/link';
import { Avatar, Box, Grid, Skeleton, Typography } from '@mui/material';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import Details from './Details';
import ActivityLog from './ActivityLog';
import Tasks from './Tasks';
import Notes from './Notes';
import Calls from './Calls';
import Emails from './Emails';
import Meetings from './Meetings';
import Associations from './Associations';
import { singleUserDealTabsData } from './ViewDetails.data';
import { ArrowBackIcon } from '@/assets/icons';
import { styles } from './ViewDetails.style';
import { AIR_SALES } from '@/routesConstants/paths';
import { useSearchParams } from 'next/navigation';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import useViewDetails from './useViewDetails';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import { IMG_URL } from '@/config';

const ViewDetails = () => {
  const { theme, viewDeal, isLoading, id } = useViewDetails();
  const searchParams = useSearchParams().get('tab-value');

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <Link href={AIR_SALES?.DEAL} style={{ paddingTop: '6px' }}>
              <ArrowBackIcon />
            </Link>
            {isLoading ? (
              <Skeleton width="15%" height="60px" />
            ) : (
              <Box>
                <Typography variant="h4">{viewDeal?.name}</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme?.palette?.custom?.main }}
                >
                  Amount: {viewDeal?.amount ?? 'N/A'}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={323} height={195} />
          ) : (
            <Box sx={styles?.detailsBox}>
              <Box sx={{ display: 'flex', gap: 1, marginBottom: '7px' }}>
                <Avatar
                  alt="Remy Sharp"
                  src={`${
                    viewDeal?.owner?.avatar
                      ? `${IMG_URL}${viewDeal?.owner?.avatar?.url}`
                      : ''
                  }`}
                />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: '600' }}>
                    {viewDeal?.owner?.firstName ?? 'N/A'}{' '}
                    {viewDeal?.owner?.lastName}
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.custom?.main }}
                  >
                    Created on{' '}
                    {dayjs(viewDeal?.owner?.createdAt)?.format(
                      DATE_TIME_FORMAT?.DMDMHA,
                    )}
                  </Typography>
                </Box>
              </Box>
              <hr style={styles?.salesBox} />
              <Box sx={styles?.salesBox}>
                <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                  Email
                </Typography>
                <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                  {viewDeal?.owner?.email ?? 'N/A'}
                </Typography>
              </Box>
              <Box sx={styles?.salesBox}>
                <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                  Phone Number
                </Typography>
                <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                  {viewDeal?.owner?.phoneNumber ?? 'N/A'}
                </Typography>
              </Box>
              <Box sx={styles?.salesBox}>
                <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                  Deal Stage
                </Typography>
                <Typography variant="body3" sx={styles?.salesPriority(theme)}>
                  {viewDeal?.stage?.name ?? 'N/A'}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={323} height={195} />
          ) : (
            <Box sx={styles?.detailsBox}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Products
              </Typography>
              <Box sx={styles?.noproductBox}>
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette?.grey[900] }}
                >
                  No products to show
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={323} height={195} />
          ) : (
            <Box sx={styles?.detailsBox}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Upcoming Meetings
              </Typography>
              <Box sx={styles?.noproductBox}>
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette?.grey[900] }}
                >
                  No Meeting Found
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={323} height={195} />
          ) : (
            <Box sx={styles?.detailsBox}>
              <Box sx={styles?.salesBox}>
                <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                  Stage
                </Typography>
                <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                  {viewDeal?.stage?.name ?? 'N/A'}
                </Typography>
              </Box>
              <Box sx={styles?.salesBox}>
                <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                  Pipeline
                </Typography>
                <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                  {viewDeal?.pipeline?.name ?? 'N/A'}
                </Typography>
              </Box>
              <Box sx={styles?.salesBox}>
                <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                  Priority
                </Typography>
                <Typography variant="body3" sx={styles?.salesPriority(theme)}>
                  {viewDeal?.priority ?? 'N/A'}
                </Typography>
              </Box>
              <Box sx={styles?.salesBox}>
                <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                  Created Date
                </Typography>
                <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                  {dayjs(viewDeal?.createdAt)?.format(DATE_TIME_FORMAT?.DMDMHA)}
                </Typography>
              </Box>
              <Box sx={styles?.salesBox}>
                <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                  Closes Date
                </Typography>
                <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                  {dayjs(viewDeal?.closeDate)?.format(
                    DATE_TIME_FORMAT?.DMDMHA,
                  ) ?? 'N/A'}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Box>
            <HorizontalTabs
              tabsDataArray={singleUserDealTabsData}
              defaultValue={Number(searchParams) ?? 0}
            >
              <Details selected={id} />
              <PermissionsGuard
                permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_ACTIVITY_LOG]}
              >
                <ActivityLog />
              </PermissionsGuard>

              <Associations selected={id} />

              <Tasks selectedRecId={id} />

              <Notes />
              <Calls />
              <Meetings />
              <Emails />
            </HorizontalTabs>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewDetails;

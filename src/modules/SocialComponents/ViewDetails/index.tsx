import Link from 'next/link';

import {
  Avatar,
  Box,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
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

import { ArrowBackIcon, EditFormIcon } from '@/assets/icons';

import { styles } from './ViewDetails.style';
import { useGetCompaniesDetailsQuery } from '@/services/commonFeatures/companies';
import dayjs from 'dayjs';
import { DATE_FORMAT, SOCIAL_COMPONENTS } from '@/constants';
import { useState } from 'react';
import UploadImageModal from './UploadImageModal';
import { useRouter } from 'next/router';
import { generateImage } from '@/utils/avatarUtils';
const ViewDetails = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);

  const theme = useTheme();
  const navigate = useRouter();
  const { query } = navigate;
  const { data, isLoading } = useGetCompaniesDetailsQuery({
    Id: query?.id,
  });
  const activeTabValue = query?.activeTab;

  const date = new Date(data?.data?.createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })} ${isPM ? 'PM' : 'AM'}`;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link href={SOCIAL_COMPONENTS.COMPANIES}>
              <ArrowBackIcon />
            </Link>
            {data ? (
              <>
                <Box
                  sx={{
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      opacity: 0.4,
                    },
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setIsUploadImageOpen(true)}
                >
                  {/* <Image
                    src={data?.data?.profilePicture?.url ? generateImage(data?.data?.profilePicture?.url) : "abc"}
                    width={50}
                    height={50}
                    alt="companyLogo"
                    style={{ borderRadius: '50%', border: `1px solid ${theme?.palette?.grey[700]}` }}
                  /> */}
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      textTransform: 'uppercase',
                      fontSize: '14px',
                      mr: '6px',
                    }}
                    alt="companyLogo"
                    src={generateImage(data?.data?.profilePicture?.url)}
                  >
                    {data?.data?.name?.charAt(0)}
                  </Avatar>
                  {isHovered && (
                    <Box sx={{ position: 'absolute' }}>
                      {' '}
                      <EditFormIcon />{' '}
                    </Box>
                  )}
                </Box>
                <Box>
                  <Typography variant="h4">{data?.data?.name}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme?.palette?.custom?.main,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {data?.data?.domain}
                  </Typography>
                </Box>
              </>
            ) : (
              <Skeleton variant="circular" width={50} height={50} />
            )}
          </Box>
        </Grid>

        {data ? (
          <>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={styles.detailsBox}>
                <Box sx={{ display: 'flex', gap: 1, marginBottom: '7px' }}>
                  {/* <Image
                    src={generateImage(data?.data?.owner?.profilePicture)}
                    width={40}
                    height={40}
                    alt="NotesAvatarImage"
                    style={{ borderRadius: '50%', border: `1px solid ${theme?.palette?.grey[700]}` }}
                  /> */}

                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      textTransform: 'uppercase',
                      fontSize: '14px',
                      mr: '6px',
                    }}
                    alt="companyLogo"
                    src={generateImage(data?.data?.owner?.profilePicture)}
                  >
                    {data?.data?.owner?.name?.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: '600' }}>
                      {data?.data?.owner?.name}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: theme?.palette?.custom?.main }}
                    >
                      Created on{' '}
                      {dayjs(data?.data?.createdAt)?.format(DATE_FORMAT?.UI)},{' '}
                      {formattedTime}
                    </Typography>
                  </Box>
                </Box>
                <hr style={styles?.salesBox} />
                <Box sx={styles?.salesBox}>
                  <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                    Email
                  </Typography>
                  <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                    {data?.data?.owner?.email}
                  </Typography>
                </Box>
                <Box sx={styles?.salesBox}>
                  <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                    Phone Number
                  </Typography>
                  <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                    {data?.data?.owner?.phoneNumber}
                  </Typography>
                </Box>
                <Box sx={styles?.salesBox}>
                  <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                    Company Type
                  </Typography>
                  <Typography variant="body3" sx={styles?.salesPriority(theme)}>
                    {data?.data?.type}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={styles.detailsBox}>
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
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={styles.detailsBox}>
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
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={styles.detailsBox}>
                <Box sx={styles.salesBox}>
                  <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                    Company Type
                  </Typography>
                  <Typography variant="body3" sx={styles?.salesPriority(theme)}>
                    {data?.data?.type}
                  </Typography>
                </Box>
                <Box sx={styles.salesBox}>
                  <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                    No of Employees
                  </Typography>
                  <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                    {data?.data?.noOfEmloyee}
                  </Typography>
                </Box>
                <Box sx={styles.salesBox}>
                  <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                    Total Revenue
                  </Typography>
                  <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                    £ {data?.data?.totalRevenue}
                  </Typography>
                </Box>
                <Box sx={styles.salesBox}>
                  <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                    LinkedIn
                  </Typography>
                  <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                    Not found
                  </Typography>
                </Box>
                <Box sx={styles.salesBox}>
                  <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                    Address
                  </Typography>
                  <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                    {data?.data?.address}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </>
        ) : (
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={180}
            sx={{ marginTop: '20px' }}
          />
        )}

        <Grid item xs={12}>
          <Box>
            <HorizontalTabs
              tabsDataArray={singleUserDealTabsData}
              defaultValue={parseFloat(activeTabValue)}
            >
              <Details data={data?.data} isLoading={isLoading} />
              <ActivityLog companyId={data?.data?._id} />
              <Associations companyId={data?.data?._id} />
              <Tasks companyId={data?.data?._id} />
              <Notes companyId={data?.data?._id} />
              <Calls companyId={data?.data?._id} />
              <Meetings />
              <Emails companyId={data?.data?._id} />
            </HorizontalTabs>
          </Box>
        </Grid>
      </Grid>

      <UploadImageModal
        isUploadImageOpen={isUploadImageOpen}
        setIsUploadImageOpen={setIsUploadImageOpen}
        companyId={data?.data?._id}
        profilePicture={data?.data?.profilePicture?.url}
      />
    </Box>
  );
};

export default ViewDetails;

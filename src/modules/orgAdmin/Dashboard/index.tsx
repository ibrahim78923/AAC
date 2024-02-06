import { useRouter } from 'next/router';
import { Box, Card, Grid, Typography } from '@mui/material';

import { ORG_ADMIN } from '@/routesConstants/paths';
import ProfileCard from '@/components/ProfileCard';

import { exploreProduct, myAccountData } from './dashboard.data';
import useDashboard from './useDashboard';

import { EditProfilelLineIcon, UploadDocumentIcon } from '@/assets/icons';

import { styles } from './dashboard.style';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const { theme } = useDashboard();
  const navigate = useRouter();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <Card>
            <ProfileCard
              userName="John Doe"
              role="Org Admin"
              email="Johndoe@gmail.com"
              phone="(316) 555-0116"
              handleEditProfile={() => {
                navigate.push(ORG_ADMIN?.DASHBOARD_EDIT_PROFILE);
              }}
              editBtn={true}
              isBadge={true}
            />
          </Card>
        </Grid>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              gap: 2,
            }}
          >
            <UploadDocumentIcon />
            <Typography
              variant="h5"
              sx={{ color: theme?.palette?.grey[600], fontSize: '14px' }}
            >
              Upload Organization Logo
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="body4"
                sx={{
                  color: theme?.palette?.custom?.steel_blue,
                }}
              >
                Edit Organization Information
              </Typography>
              <Box>
                <EditProfilelLineIcon />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h3"
          sx={{ color: theme?.palette?.slateBlue['main'], fontSize: '18px' }}
        >
          My Accounts
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme?.palette?.custom?.cadet_color, fontWeight: 400 }}
        >
          All the accounts in this organization that you have access to. Click
          to open.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {myAccountData?.map((item: any) => (
          <Grid item lg={3} md={6} sm={12} xs={12} key={uuidv4()}>
            <Card sx={{ p: '24px', mt: 3, textAlign: { xs: 'center' } }}>
              {item?.icon}
              <Typography
                variant="h6"
                sx={{ color: theme?.palette?.grey[600], fontSize: '18px' }}
              >
                {item?.heading}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.custom['main'], fontWeight: 400 }}
              >
                {item?.companyName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.custom['main'], fontWeight: 400 }}
              >
                {item?.buisnessname}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.custom['main'], fontWeight: 400 }}
              >
                {item?.services}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h3"
          sx={{ color: theme?.palette?.slateBlue['main'], fontSize: '18px' }}
        >
          Explore Airapple cart products
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme?.palette?.custom?.cadet_color, fontWeight: 400 }}
        >
          Our products help your teams deliver the best customer experiences
        </Typography>
      </Box>
      <Grid container>
        {exploreProduct?.map((item: any) => (
          <Grid item lg={2} md={3} sm={6} xs={12} key={uuidv4()}>
            <Box mt={3} sx={styles?.explore_icons}>
              <Typography sx={{ textAlign: 'center' }}>{item?.icon}</Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme?.palette?.grey[600],
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {item?.heading}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;

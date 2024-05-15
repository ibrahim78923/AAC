import { useRouter } from 'next/router';
import { Box, Card, Grid, Skeleton, Typography } from '@mui/material';

import { ORG_ADMIN } from '@/routesConstants/paths';
import ProfileCard from '@/components/ProfileCard';
import useDashboard from './useDashboard';

import { EditProfilelLineIcon, UploadDocumentIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import Image from 'next/image';
import { generateImage } from '@/utils/avatarUtils';
import useUsersDetails from '../Users/UsersDetails/useUsersDetails';
import { useGetAllProductsQuery } from '@/services/orgAdmin/organization';
import { getProductIcon } from '../SubscriptionAndInvoices/Subscriptions';
import { getSession } from '@/utils';

const Dashboard = () => {
  const { theme } = useDashboard();
  const navigate = useRouter();
  const { handleChangeImg } = useUsersDetails();
  const { getUserData, profileDataLoading } = useDashboard();

  const { data: productsData, isLoading } = useGetAllProductsQuery({});

  const accountsData =
    JSON.parse(localStorage.getItem('accountsData') || '') || {};
  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={8} md={6} sm={12} xs={12}>
          <Card>
            <ProfileCard
              userName={`${getUserData?.data?.firstName} ${getUserData?.data?.lastName}`}
              email={getUserData?.data?.email}
              phone={getUserData?.data?.phoneNumber}
              role={getUserData?.data?.role}
              editBtn={true}
              handleEditProfile={() => navigate.push(ORG_ADMIN?.EDIT_PROFILE)}
              isLoading={profileDataLoading}
              src={`${
                getUserData?.data?.avatar
                  ? generateImage(getUserData?.data?.avatar?.url)
                  : ''
              }`}
              handleChangeImg={(e: any) =>
                handleChangeImg(e, getUserData?.data?._id)
              }
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
            <Link href={ORG_ADMIN?.ORGANIZATION}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body4"
                  sx={{
                    color: theme?.palette?.custom?.steel_blue,
                    textDecoration: 'underline',
                  }}
                >
                  Edit Organization Information
                </Typography>
                <EditProfilelLineIcon />
              </Box>
            </Link>
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
        {accountsData?.data
          ? accountsData?.data?.map((item: any) => (
              <Grid item lg={3} md={6} sm={12} xs={12} key={uuidv4()}>
                <Card sx={{ p: '24px', mt: 3 }}>
                  <Image
                    src={generateImage(item?.logo?.url)}
                    width={35}
                    height={35}
                    alt="product"
                    style={{ marginBottom: '10px' }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: theme?.palette?.grey[600], fontSize: '18px' }}
                  >
                    {item?.name}
                  </Typography>
                  {item?.accounts?.map((account: any) => (
                    <Typography
                      variant="body2"
                      key={uuidv4()}
                      sx={{
                        color: theme?.palette?.grey[600],
                        fontSize: '14px',
                      }}
                    >
                      {account?.company?.accountName}
                    </Typography>
                  ))}
                </Card>
              </Grid>
            ))
          : 'no accounts found'}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h3"
          sx={{ color: theme?.palette?.slateBlue['main'], fontSize: '18px' }}
        >
          Explore Air Applecart products
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme?.palette?.custom?.cadet_color, fontWeight: 400 }}
        >
          Our products help your teams deliver the best customer experiences
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          margin: '0 auto',
          flexWrap: 'wrap',
          mt: 3,
          gap: '20px',
          '@media (max-width: 600px)': {
            justifyContent: 'center',
          },
        }}
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5]?.map(() => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
                key={uuidv4()}
              >
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="rectangular" width={110} height={20} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {productsData?.data?.map((item: any) => {
              return (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyItems: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: theme?.palette?.primary?.light,
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        filter: user?.products?.some(
                          (userProduct: any) => userProduct?._id === item?._id,
                        )
                          ? 'none'
                          : 'grayscale(1) brightness(1.0) opacity(0.8)',
                      }}
                    >
                      {getProductIcon(item?.name)}
                      {/* {item?.logo && (
                                <Image
                                  src={generateImage(item?.logo?.url)}
                                  width={25}
                                  height={25}
                                  alt="product"
                                />
                              )} */}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: `${item?.color}`,
                        fontWeight: 600,
                        lineHeight: '20PX',
                        paddingTop: '10px',
                      }}
                    >
                      {item?.name}
                    </Typography>
                  </Box>
                </>
              );
            })}
          </>
        )}
      </Box>
      {/* <Grid container>
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
      </Grid> */}
    </>
  );
};

export default Dashboard;

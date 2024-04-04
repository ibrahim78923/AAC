import React from 'react';

import Image from 'next/image';

import { Grid, Box, Typography, Skeleton, Button } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { dataArray } from './OrganizationCard.data';

import {
  MessageGreyImage,
  PhoneImage,
  UserImage,
  EditImage,
  ComLogoImage,
  OrcaloLogoImage,
} from '@/assets/images';
import { AddPenIcon } from '@/assets/icons';

import { styles } from './OrganizationCard.style';

import { v4 as uuidv4 } from 'uuid';
import useOrganizationCard from './useOrganizationCard';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_ORGANIZATION_PERMISSIONS } from '@/constants/permission-keys';
import { getSession } from '@/utils';
import { useGetAllProductsQuery } from '@/services/orgAdmin/organization';
import { getProductIcon } from '@/modules/orgAdmin/SubscriptionAndInvoices/Subscriptions';

const OrganizationCard = () => {
  const {
    theme,
    isOpenDrawer,
    setIsOpenDrawer,
    handleSubmit,
    onSubmit,
    methods,
    data,
    handleCloseDrawer,
  } = useOrganizationCard();

  const { data: productsData, isLoading } = useGetAllProductsQuery({});
  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const activeProducts = user?.products?.length;
  const inActiveProducts = productsData?.data?.length - user?.products?.length;

  return (
    <>
      <Box sx={{ paddingTop: '5px' }}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Box
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '8px',
                padding: '1rem',
                height: '184px',
                '@media (max-width:900px)': {
                  height: 'auto',
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid item lg={3} md={4} sm={12} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: { lg: '3rem', md: '2rem' },
                    }}
                  >
                    <Image src={OrcaloLogoImage} alt="Logo" />
                  </Box>
                </Grid>
                <Grid item lg={6} md={4} sm={6} xs={12}>
                  <Box
                    sx={{
                      display: 'grid',
                      justifyItems: {
                        lg: 'start',
                        md: 'start',
                        sm: 'start',
                        xs: 'center',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '21vw',
                        '@media (max-width: 600px)': {
                          maxWidth: '60vw',
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 500,
                          color: `${theme?.palette?.custom?.main}`,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '100%',
                        }}
                      >
                        {user?.organization?.name}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 500,
                        lineHeight: '30px',
                        color: `${theme?.palette?.custom?.main}`,
                      }}
                    >
                      {data?.data?.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '3px',
                        alignItems: 'center',
                        paddingTop: '1rem',
                      }}
                    >
                      <Image src={UserImage} alt="user" />
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom?.main}`,
                        }}
                      >
                        {user?.firstName ?? '-'} {user?.lastName ?? '-'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '3px',
                        alignItems: 'center',
                        paddingTop: '8px',
                      }}
                    >
                      <Image src={MessageGreyImage} alt="sms" />
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom?.main}`,
                        }}
                      >
                        {user?.email ?? '-'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        columnGap: '3px',
                        alignItems: 'center',
                        paddingTop: '8px',
                      }}
                    >
                      <Image src={PhoneImage} alt="phone" />
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom?.main}`,
                        }}
                      >
                        {user?.phoneNumber ?? '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <PermissionsGuard
                    permissions={[
                      ORG_ADMIN_ORGANIZATION_PERMISSIONS?.EDIT_INFO,
                    ]}
                  >
                    <Box
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Box
                        onClick={() => {
                          setIsOpenDrawer(true);
                        }}
                        sx={styles?.editSection}
                      >
                        <Button className="small" sx={{ gap: 1 }}>
                          <Image src={EditImage} alt="edit" />
                          Edit Info
                        </Button>
                      </Box>
                    </Box>
                  </PermissionsGuard>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Box
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '8px',
                padding: '1rem',
                height: '184px',
                '@media (max-width:900px)': {
                  height: 'auto',
                },
              }}
            >
              <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography sx={styles?.productTitle(theme)}>
                    Products&nbsp;
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: `${theme?.palette?.custom?.main}`,
                      }}
                    >
                      (4)
                    </span>
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box sx={styles?.statusSection}>
                    <Box sx={styles?.Active(theme)}>
                      Active&nbsp; (
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 700,
                          lineHeight: '18px',
                        }}
                      >
                        {activeProducts ?? '-'}
                      </Typography>
                      )
                    </Box>
                    <Box sx={styles?.inActive(theme)}>
                      Inactive&nbsp; (
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 700,
                          lineHeight: '18px',
                        }}
                      >
                        {inActiveProducts ?? '-'}
                      </Typography>
                      )
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container sx={{ paddingTop: '5px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '90%',
                    margin: '0 auto',
                    flexWrap: 'wrap',
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
                          <Skeleton
                            variant="rectangular"
                            width={110}
                            height={20}
                          />
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
                                  backgroundColor:
                                    theme?.palette?.primary?.light,
                                  width: '60px',
                                  height: '60px',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  filter: user?.products?.some(
                                    (userProduct: any) =>
                                      userProduct?._id === item?._id,
                                  )
                                    ? 'none'
                                    : 'grayscale(1) brightness(1.0) opacity(0.8)',
                                }}
                              >
                                {getProductIcon(item?.name)}
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
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {isOpenDrawer && (
        <CommonDrawer
          isDrawerOpen={isOpenDrawer}
          onClose={handleCloseDrawer}
          title="Edit Info"
          okText="Update"
          isOk={true}
          footer={true}
          submitHandler={handleSubmit(onSubmit)}
        >
          <Box sx={{ paddingTop: '1rem' }}>
            <center>
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    border: `1px solid ${theme?.palette?.grey[700]}`,
                    borderRadius: '100px',
                    width: '120px',
                    height: '120px',
                    boxShadow:
                      '0px 2px 4px -2px #1018280F, 5px 5px 9px -2px #1018281A',
                  }}
                >
                  <Image
                    src={ComLogoImage}
                    alt="NO image"
                    style={{ borderRadius: '100px' }}
                  />
                </Box>
                <Box sx={{ position: 'absolute', right: '165px', bottom: 0 }}>
                  <AddPenIcon />
                </Box>
              </Box>
            </center>
            <FormProvider methods={methods}>
              <Grid container spacing={1} sx={{ paddingTop: '1rem' }}>
                {dataArray?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component {...item?.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={uuidv4()}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </Box>
        </CommonDrawer>
      )}
    </>
  );
};

export default OrganizationCard;

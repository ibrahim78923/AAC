import React from 'react';

import Image from 'next/image';

import { Grid, Box, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { dataArray } from './OrganizationCard.data';

import { productItem } from '@/mock/modules/orgAdmin/OrganizationAdmin';

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

const OrganizationCard = () => {
  const {
    theme,
    isOpenDrawer,
    setIsOpenDrawer,
    handleSubmit,
    onSubmit,
    methods,
    data,
  } = useOrganizationCard();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
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
                <Grid item lg={5} md={4} sm={6} xs={12}>
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
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 500,
                        color: `${theme?.palette?.custom?.main}`,
                      }}
                    >
                      Orcalo holdings
                    </Typography>

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
                        John Doe
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
                        {data?.data?.email ?? '-'}
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
                        {data?.data?.phoneNo ?? '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box
                      onClick={() => {
                        setIsOpenDrawer(true);
                      }}
                      sx={styles?.editSection}
                    >
                      <Image src={EditImage} alt="edit" />
                      <Typography
                        variant="body3"
                        sx={{
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.primary?.main}`,
                        }}
                      >
                        Edit Info
                      </Typography>
                    </Box>
                  </Box>
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
                        1
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
                        3
                      </Typography>
                      )
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container sx={{ paddingTop: '10px' }}>
                {productItem?.map((item) => {
                  return (
                    <>
                      <Grid item lg={4} md={4} sm={6} xs={12} key={uuidv4()}>
                        <Box sx={{ display: 'grid', justifyItems: 'center' }}>
                          <Image src={item?.img} alt="no image" />
                          <Typography
                            variant="body2"
                            sx={{
                              color: `${item.color}`,
                              fontWeight: 600,
                              lineHeight: '20PX',
                              paddingTop: '10px',
                            }}
                          >
                            {item?.name}
                          </Typography>
                        </Box>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrganizationCard;

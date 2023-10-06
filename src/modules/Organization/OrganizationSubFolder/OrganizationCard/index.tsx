import React, { useState } from 'react';

import Image from 'next/image';

import {
  Grid,
  Box,
  Typography,
  Checkbox,
  Theme,
  useTheme,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  AddPenIcon,
  SmsImage,
  PhoneImage,
  UserImage,
  EditImage,
  FeaturedImage,
  ComLogoImage,
  OrcaloLogoImage,
} from '../../../../assets/images';

// dummy

import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

// dummy end

import {
  productItem,
  dataArray,
  defaultValues,
  validationSchema,
} from './OrganizationCard.data';
import { styles } from './OrganizationCard.style';

const OrganizationCard = ({ initialValueProps = defaultValues }: any) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const theme = useTheme<Theme>();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  // const { handleSubmit } = methods;
  // const onSubmit = async (data: any) => {
  //   console.log(data);
  //   enqueueSnackbar('Ticket Updated Successfully', {
  //     variant: 'success',
  //   });
  // };

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        title="Edit Info"
        okText="ok"
        isOk={true}
        footer={true}
        // submitHandler={}
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
          <Typography variant="h5">Products</Typography>
          <FormProvider methods={methods}>
            <Box
              sx={{
                display: 'flex',
                columnGap: '1rem',
                alignItems: 'center',
                overflowY: 'scroll',
                marginBottom: '1rem',
              }}
            >
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Sales</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Marketing</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Service</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Operation</Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
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
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '8px',
                padding: '1rem',
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
                      sx={{
                        fontSize: '24px',
                        fontWeight: 500,
                        lineHeight: '30px',
                        color: `${theme?.palette?.custom.main}`,
                      }}
                    >
                      Orcalo Holdings
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
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom.main}`,
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
                      <Image src={SmsImage} alt="sms" />
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom.main}`,
                        }}
                      >
                        Johndoe@gmail.com
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
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: `${theme?.palette?.custom.main}`,
                        }}
                      >
                        (316) 555-0116
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Box
                    onClick={() => {
                      setIsOpenDrawer(true);
                    }}
                    sx={styles.editSection}
                  >
                    <Image src={EditImage} alt="edit" />
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '18px',
                        color: `${theme?.palette?.primary.main}`,
                      }}
                    >
                      Edit Info
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography sx={styles.productTitle(theme)}>
                    Products&nbsp;
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: `${theme?.palette?.custom.main}`,
                      }}
                    >
                      (4)
                    </span>
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box sx={styles.statusSection}>
                    <Box sx={styles.Active(theme)}>
                      Active&nbsp; (
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 700,
                          lineHeight: '18px',
                        }}
                      >
                        1
                      </Typography>
                      )
                    </Box>
                    <Box sx={styles.inActive(theme)}>
                      Inactive&nbsp; (
                      <Typography
                        sx={{
                          fontSize: '12px',
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
                {productItem.map((item) => {
                  return (
                    <>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Box sx={{ display: 'grid', justifyItems: 'center' }}>
                          <Image src={item.img} alt="no image" />
                          <Typography
                            sx={{
                              color: `${item.color}`,
                              fontSize: '14px',
                              fontWeight: 600,
                              lineHeight: '20PX',
                              paddingTop: '10px',
                            }}
                          >
                            {item.name}
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

import React, { useState } from 'react';

import Image from 'next/image';

import { Grid, Box, Typography } from '@mui/material';

import CommonDrawer from '@/components/Drawer';

import logo from '../../../../assets/images/modules/organization/orcalologo.png';
import user from '../../../../assets/images/modules/organization/user.png';
import sms from '../../../../assets/images/modules/organization/sms.png';
import phone from '../../../../assets/images/modules/organization/phone.png';
import edit from '../../../../assets/images/modules/organization/edit.png';

import { productItem } from './MockData';

const OrganizationCard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        title="Edit Info"
        okText="ok"
        isOk={true}
        footer={true}
        // submitHandler={}
      >
        edit information
      </CommonDrawer>
      <Box sx={{ paddingTop: '5px' }}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box
              sx={{
                border: '1px solid #E5E7EB',
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
                    <Image src={logo} alt="Logo" />
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
                        color: '#374151',
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
                      <Image src={user} alt="user" />
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: '#374151',
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
                      <Image src={sms} alt="sms" />
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: '#374151',
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
                      <Image src={phone} alt="phone" />
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '18px',
                          color: '#374151',
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
                      setOpenDrawer(true);
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '5px',
                      cursor: 'pointer',
                      justifyContent: {
                        lg: 'start',
                        md: 'start',
                        sm: 'center',
                        xs: 'center',
                      },
                    }}
                  >
                    <Image src={edit} alt="edit" />
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '18px',
                        color: '#38CAB5',
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
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '1rem',
              }}
            >
              <Grid container>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '30px',
                      color: '#374151',
                      textAlign: {
                        lg: 'start',
                        md: 'start',
                        sm: 'center',
                        xs: 'center',
                      },
                    }}
                  >
                    Products&nbsp;
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px',
                        color: '#374151',
                      }}
                    >
                      (4)
                    </span>
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      columnGap: '10px',
                      justifyContent: {
                        lg: 'flex-end',
                        md: 'flex-end',
                        sm: 'center',
                        xs: 'center',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        background: '#d7f4f0',
                        color: '#38cab5',
                        padding: '0.4rem',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
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
                    <Box
                      sx={{
                        borderRadius: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        background: '#FF4A4A1A',
                        color: '#FF4A4A',
                        padding: '0.4rem',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '18px',
                      }}
                    >
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

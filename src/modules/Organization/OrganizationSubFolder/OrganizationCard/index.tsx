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

import comLogo from '@/assets/images/modules/organization/intellogo.png';
import featureIcon from '@/assets/images/modules/organization/Featuredicon.png';
import { AddPenIcon } from '../../../../assets/images';
import logo from '@/assets/images/modules/organization/orcalologo.png';
import user from '@/assets/images/modules/organization/user.png';
import sms from '@/assets/images/modules/organization/sms.png';
import phone from '@/assets/images/modules/organization/phone.png';
import edit from '@/assets/images/modules/organization/edit.png';

import { productItem } from './MockData';

const OrganizationCard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme<Theme>();
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
        <Typography variant="h5">Company Logo</Typography>
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
                src={comLogo}
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
        <Box
          sx={{
            display: 'flex',
            columnGap: '1rem',
            alignItems: 'center',
            overflowY: 'scroll',
            marginTop: '1rem',
          }}
        >
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.grey[900]}`,
              borderRadius: '8px',
              padding: '0.7rem',
            }}
          >
            <Checkbox
              defaultChecked
              sx={{
                marginLeft: '7rem',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                marginTop: '0.7rem',
                paddingBottom: '2rem',
                marginX: '2.5rem',
              }}
            >
              <Image src={featureIcon} alt="1" />
              <Typography>Sales</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.grey[900]}`,
              borderRadius: '8px',
              padding: '0.7rem',
            }}
          >
            <Checkbox
              sx={{
                marginLeft: '7rem',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                marginTop: '0.7rem',
                paddingBottom: '2rem',
                marginX: '2.5rem',
              }}
            >
              <Image src={featureIcon} alt="1" />
              <Typography>Marketing</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.grey[900]}`,
              borderRadius: '8px',
              padding: '0.7rem',
            }}
          >
            <Checkbox
              sx={{
                marginLeft: '7rem',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                marginTop: '0.7rem',
                paddingBottom: '2rem',
                marginX: '2.5rem',
              }}
            >
              <Image src={featureIcon} alt="1" />
              <Typography>Service</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.grey[900]}`,
              borderRadius: '8px',
              padding: '0.7rem',
            }}
          >
            <Checkbox
              sx={{
                marginLeft: '7rem',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                marginTop: '0.7rem',
                paddingBottom: '2rem',
                marginX: '2.5rem',
              }}
            >
              <Image src={featureIcon} alt="1" />
              <Typography>Operation</Typography>
            </Box>
          </Box>
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
                      <Image src={user} alt="user" />
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
                      <Image src={sms} alt="sms" />
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
                      <Image src={phone} alt="phone" />
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
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '30px',
                      color: `${theme?.palette?.custom.main}`,
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
                        color: `${theme?.palette?.custom.main}`,
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
                        background: `${theme?.palette?.primary.light}`,
                        color: `${theme?.palette?.primary.main}`,
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
                        color: `${theme?.palette?.error.main}`,
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

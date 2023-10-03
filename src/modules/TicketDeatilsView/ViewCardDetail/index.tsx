import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Typography, Box, Divider } from '@mui/material';
import Image from 'next/image';
import BadgeImag from '../../../assets/images/modules/viewdetails/_Badge-base-image.png';
import ViewDetailAvaterImage from '../../../assets/images/modules/viewdetails/view-avatar-image.png';
import { useTheme } from '@emotion/react';
import { ViewDetailDocumentTextIcon } from '@/assets/icons';
export default function DetailViewCard() {
  const margin_2 = {
    marginLeft: '2rem',
  };
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        maxWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        mt: '2rem',
      }}
    >
      <Grid item xs={11.9}>
        <Card
          sx={{
            maxWidth: '100%',
            borderRadius: '8px',
            border: '2px solid #EAECF0',
          }}
        >
          <CardContent>
            <Grid container sx={{ maxWidth: '100%' }}>
              <Grid
                item
                xl={3}
                sm={5}
                xs={11}
                lg={3.5}
                md={3.3}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Image
                      src={ViewDetailAvaterImage}
                      width={36}
                      height={36}
                      alt="Badge"
                    />
                  </div>

                  <Typography variant="h5" sx={margin_2}>
                    Sophie Baxter
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="h6" sx={margin_2}>
                    sophiebaxterl@gmail.com
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6">Created on:</Typography>
                  <Typography variant="h6" sx={margin_2}>
                    Sun, 5 Mar 9:41 PM
                  </Typography>
                </Box>
              </Grid>

              <Divider
                orientation="vertical"
                flexItem
                sx={{ background: '#EAECF0', mr: '2rem', ml: '2rem' }}
              />

              <Grid
                item
                xs={11}
                xl={5}
                sm={5}
                lg={4.2}
                md={4}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  flexDirection={'row'}
                >
                  <Typography variant="h6">Description:</Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      ...margin_2,
                      width: '80%',
                    }}
                  >
                    Hi Team,
                    <br /> I have been unable to send any emails since this
                    morning. What’s going on? <br />
                    Regards, Andrea
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  justifyContent={'flex-start'}
                  flexDirection={'row'}
                  marginLeft={'1rem'}
                >
                  <Typography variant="h6">Attachments:</Typography>
                  <Typography
                    component="span"
                    sx={{ ml: '1.5rem', mt: '0.5rem' }}
                  >
                    <ViewDetailDocumentTextIcon />
                  </Typography>
                  <Typography variant="body1">
                    &ensp;file-mame-0.text
                  </Typography>
                </Box>
              </Grid>

              <Divider
                orientation="vertical"
                flexItem
                sx={{ background: '#EAECF0', mr: '2rem', ml: '2rem' }}
              />

              <Grid item xs={11} xl={3} sm={3.5} lg={2.8} md={3}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box display={'flex'} justifyContent={'center'}>
                    <Typography variant="h6">
                      Status:&ensp;&ensp;&ensp;&ensp;
                    </Typography>
                    <Typography component="span" sx={{ ml: '4rem' }}>
                      <Image
                        src={BadgeImag}
                        width={64}
                        height={34}
                        alt="Badge"
                      />
                    </Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'center'}>
                    <Typography variant="h6" sx={{ ml: '2rem' }}>
                      Due by:&ensp;&ensp;&ensp;&ensp;
                      <Typography component="span">
                        Tue, 14 Mar 10:00 AM
                      </Typography>
                    </Typography>
                  </Box>
                  <Box display={'flex'} justifyContent={'center'}>
                    <Typography variant="h6">
                      Associated By:&ensp;&ensp;&ensp;&ensp;
                    </Typography>
                    <Typography
                      component="span"
                      variant="h6"
                      sx={{
                        color: theme?.palette?.primary?.main,
                        ml: '1rem',
                        textDecoration: 'underline',
                      }}
                    >
                      Deals
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

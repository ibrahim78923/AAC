import { useTheme } from '@emotion/react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { ViewDetailDocumentTextIcon } from '@/assets/icons';
import {
  Viewmaingridestyle,
  CardStyling,
  InergrideStyling,
  FirstBoxStyle,
  SecondGrideStyle,
  SecondBoxStyle,
  DividedeBgColour,
  margin_2,
  BoxStyleCenterText,
} from './ViewCardDetail.style';
import BadgeImag from '../../../assets/images/modules/viewdetails/_Badge-base-image.png';
import ViewDetailAvaterImage from '../../../assets/images/modules/viewdetails/view-avatar-image.png';

export default function DetailViewCard() {
  const theme: any = useTheme();
  return (
    <Grid container sx={Viewmaingridestyle}>
      <Grid item xs={11.9}>
        <Card sx={CardStyling}>
          <CardContent>
            <Grid container sx={{ maxWidth: '100%' }}>
              <Grid
                item
                xl={2.8}
                sm={5}
                xs={11}
                lg={3.5}
                md={3.3}
                sx={InergrideStyling}
              >
                <Box sx={FirstBoxStyle}>
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
                <Box sx={FirstBoxStyle}>
                  <Typography variant="h6">Email:</Typography>
                  <Typography variant="h6" sx={margin_2}>
                    sophiebaxterl@gmail.com
                  </Typography>
                </Box>
                <Box sx={FirstBoxStyle}>
                  <Typography variant="h6">Created on:</Typography>
                  <Typography variant="h6" sx={margin_2}>
                    Sun, 5 Mar 9:41 PM
                  </Typography>
                </Box>
              </Grid>

              <Divider orientation="vertical" flexItem sx={DividedeBgColour} />
              <Grid
                item
                xs={11}
                xl={6}
                sm={5}
                lg={4.2}
                md={4}
                sx={SecondGrideStyle}
              >
                <Box sx={FirstBoxStyle}>
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
                <Box sx={SecondBoxStyle}>
                  <Typography variant="h6">Attachments:</Typography>
                  <Typography
                    component="span"
                    sx={{ ml: '1rem', mt: '0.5rem' }}
                  >
                    <ViewDetailDocumentTextIcon />
                  </Typography>
                  <Typography variant="body1">
                    &ensp;file-mame-0.text
                  </Typography>
                </Box>
              </Grid>

              <Divider orientation="vertical" flexItem sx={DividedeBgColour} />

              <Grid item xs={11} xl={2.8} sm={3.5} lg={2.8} md={3}>
                <Box sx={BoxStyleCenterText}>
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
                        color: theme?.palette?.ButtonTyDeal?.main,
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

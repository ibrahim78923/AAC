import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import vuesax from '../../assets/ViewIcon/vuesax.svg';
import kebabmenu from '../../assets/ViewIcon/kebab menu - Copy.svg';
import meeting from '../../assets/ViewIcon/meeting.svg';
import sms from '../../assets/ViewIcon/sms.png';
import call from '../../assets/ViewIcon/call.svg';
import backarrow from '../../assets/ViewIcon/Back Arrow.svg';
import Image from 'next/image';
import CustomTimePicker from './timepicker';

export default function ToofPage() {
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={'space-around'}
        alignItems={'center'}
        display={'flex'}
        flexDirection={'row'}
      >
        <Grid
          item
          xs={9}
          sx={{
            display: 'flex',
          }}
        >
          <Image
            src={backarrow} // Provide the actual path to your image
            width={24} // Specify the width of the image
            height={24} // Specify the height of the image
            alt="Description of the image" // Provide a meaningful alt text
          />
          <Typography
            variant="h6"
            sx={{ color: theme?.palette?.primary?.main }}
          >
            #INC-3-
          </Typography>
          <Typography variant="h6" component="span">
            What’s wrong with my email?
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex' }}>
          <Image
            src={vuesax} // Provide the actual path to your image
            width={24} // Specify the width of the image
            height={24} // Specify the height of the image
            alt="Description of the image" // Provide a meaningful alt text
          />
          <CustomTimePicker />
          <Image
            src={kebabmenu} // Provide the actual path to your image
            width={24} // Specify the width of the image
            height={24} // Specify the height of the image
            alt="Description of the image" // Provide a meaningful alt text
          />
          <Image
            src={meeting} // Provide the actual path to your image
            width={24} // Specify the width of the image
            height={24} // Specify the height of the image
            alt="Description of the image" // Provide a meaningful alt text
          />
          <Image
            src={call} // Provide the actual path to your image
            width={24} // Specify the width of the image
            height={24} // Specify the height of the image
            alt="Description of the image" // Provide a meaningful alt text
          />
          <Image
            src={sms} // Provide the actual path to your image
            width={24} // Specify the width of the image
            height={24} // Specify the height of the image
            alt="Description of the image" // Provide a meaningful alt text
          />
        </Grid>
      </Grid>
    </>
  );
}

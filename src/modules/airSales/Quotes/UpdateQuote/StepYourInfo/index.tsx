import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TemplateFrame from '../TemplateFrame';
// import TemplatePlaceholder from '../TemplatePlaceholder';
import TemplateBasic from '../TemplateBasic';
import { ProfileCircleIcon } from '@/assets/icons/index';
import { styles } from './StepYourInfo.style';
import { getSession } from '@/utils';

const StepYourInfo = () => {
  const { user } = getSession();
  return (
    <Grid container spacing={'40px'}>
      <Grid item xs={5}>
        <Typography variant="h5" sx={styles?.heading}>
          Your Information
        </Typography>
        <Typography variant="body1" sx={styles?.checkInformation}>
          Check the information about you and your company that will appear on
          the quote
        </Typography>
        <Typography variant="h6" sx={styles?.boxTitle}>
          Your Contact
        </Typography>
        <Box sx={styles?.box}>
          <Box sx={styles?.icon}>
            <ProfileCircleIcon />
          </Box>
          <Box sx={styles?.contactInfo}>
            <Box sx={styles?.contactTitle}>
              {`${user?.firstName} ${user?.lastName}`}
            </Box>
            <Box sx={styles?.contactInfoText}>
              {user?.role?.toLowerCase()?.split('_')?.join(' ')}
            </Box>
            <Box sx={styles?.contactInfoText}>{user?.email}</Box>
            <Box sx={styles?.contactInfoText}>{user?.phoneNumber}</Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={7}>
        <TemplateFrame>
          <TemplateBasic />
          {/* <TemplatePlaceholder /> */}
        </TemplateFrame>
      </Grid>
    </Grid>
  );
};

export default StepYourInfo;

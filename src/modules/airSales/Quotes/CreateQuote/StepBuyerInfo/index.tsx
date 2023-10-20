import React from 'react';
import { Box, Grid } from '@mui/material';
import TemplateFrame from '../TemplateFrame';
// import TemplatePlaceholder from '../TemplatePlaceholder';
import TemplateBasic from '../TemplateBasic';
import { BuildingIcon, ProfileCircleIcon } from '@/assets/icons/index';
import { styles } from './StepBuyerInfo.style';

const StepBuyerInfo = () => {
  return (
    <Grid container spacing={'40px'}>
      <Grid item xs={5}>
        <Box>
          <Box sx={styles.button}>
            <Box sx={{ mr: '8px', display: 'inline-flex' }}>
              <ProfileCircleIcon />
            </Box>
            Add Contact
          </Box>
        </Box>
        <Box sx={styles.companyInformation}>
          <Box sx={styles.button}>
            <Box sx={{ mr: '8px', display: 'inline-flex' }}>
              <BuildingIcon />
            </Box>
            Add Company
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

export default StepBuyerInfo;

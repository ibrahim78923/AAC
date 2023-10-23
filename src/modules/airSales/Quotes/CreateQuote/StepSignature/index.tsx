import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TemplateFrame from '../TemplateFrame';
// import TemplatePlaceholder from '../TemplatePlaceholder';
import TemplateBasic from '../TemplateBasic';
import { signatureFields } from './StepSignature.data';
import { styles } from './StepSignature.style';

const StepSignature = () => {
  return (
    <Grid container spacing={'40px'}>
      <Grid item xs={5}>
        <Typography variant="h5" sx={styles.heading}>
          Signature
        </Typography>
        <Typography variant="body1" sx={styles.checkInformation}>
          Check the information about you and your company that will appear on
          the quote
        </Typography>
        <Box>
          <Grid container spacing={4}>
            {signatureFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item.id}>
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

export default StepSignature;

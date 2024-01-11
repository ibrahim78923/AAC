import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TemplateFrame from '../TemplateFrame';
import TemplateBasic from '../TemplateBasic';
import { styles } from './StepSignature.style';
import { signatureFormData } from '../UpdateQuote.data';
import { FormProvider } from '@/components/ReactHookForm';

const StepSignature = ({ values, methods }: any) => {
  return (
    <FormProvider methods={methods}>
      <Grid container spacing={'40px'}>
        <Grid item xs={5}>
          <Typography variant="h5" sx={styles?.heading}>
            Signature
          </Typography>
          <Typography variant="body1" sx={styles?.checkInformation}>
            Check the information about you and your company that will appear on
            the quote
          </Typography>
          <Box>
            <Grid container spacing={4}>
              {signatureFormData?.map((item: any) => {
                return (
                  <Grid item xs={12} key={item.id}>
                    <item.component {...item?.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <TemplateFrame>
            <TemplateBasic values={values} />
          </TemplateFrame>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default StepSignature;

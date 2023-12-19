import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import { createQuoteFormFields } from '../CreateQuote.data';
import { styles } from './TemplateBasic.style';

const TemplateBasic = ({ values }: any) => {
  return (
    <Box sx={styles?.container}>
      <Box sx={styles?.header}>
        <Typography variant="h4" sx={styles?.headerTitle}>
          Sample
        </Typography>
      </Box>
      <Box sx={styles?.quoteInfoHolder}>
        <Box sx={{ pb: '16px' }}>
          <Grid container spacing={'16px'}>
            <Grid item xs={7}>
              <Typography sx={styles?.buyerInfoTitle} variant="body1">
                One Care Media
              </Typography>
              <Typography sx={styles?.buyerInfoText} variant="body2">
                1414 Northeast 42nd Street
              </Typography>
              <Typography sx={styles?.buyerInfoText} variant="body2">
                02116
              </Typography>
              <Typography sx={styles?.buyerInfoText} variant="body2">
                United States
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={styles?.buyerInfoTitle} variant="body1">
                De Gea
              </Typography>
              <Typography sx={styles?.buyerInfoText} variant="body2">
                Maderson321@gmail.com
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={styles?.quoteInfo}>
          <Grid container spacing={'16px'}>
            <Grid item xs={7}>
              <Box sx={styles?.quoteInfoLabel}>
                Reference No: <Box component={'span'}>20230410-075533523</Box>
              </Box>
              <Box sx={styles?.quoteInfoLabel}>
                Quote Created: <Box component={'span'}>April 9,2023</Box>
              </Box>
              <Box sx={styles?.quoteInfoLabel}>
                Quote Expires On: <Box component={'span'}>July 8,2023</Box>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box sx={styles?.quoteInfoLabel}>
                Quote Created By: <Box component={'span'}>Adil Khan</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ mt: '16px' }}>
        <Grid container spacing={4}>
          {createQuoteFormFields?.map((item: any, index) => {
            if (index === 6) {
              return (
                <Grid item xs={12} key={item.id}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </Box>

      <Box sx={styles?.voucher}>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Sub Total</Box>
          <Box sx={styles?.vCellRight}>£ 0.00</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>V.A.T %</Box>
          <Box sx={styles?.vCellRight}>£ 0</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Unit Discount</Box>
          <Box sx={styles?.vCellRight}>£ 0</Box>
        </Box>
        <Box sx={styles?.vRow}>
          <Box sx={styles?.vCellLef}>Discount</Box>
          <Box sx={styles?.vCellRight}>£ 0</Box>
        </Box>
        <Divider sx={{ my: '16px', borderColor: '#D2D6DF' }} />
        <Box sx={styles?.vRow}>
          <Box sx={styles?.total}>Total</Box>
          <Box sx={styles?.total}>£0.00</Box>
        </Box>
      </Box>
      {values?.signature === 'includeSignature' && (
        <Box sx={styles?.signatureCard}>
          <Box sx={styles?.signatureBox}>
            <Box sx={styles?.signatureSpace}>signature here...</Box>
            <Box sx={styles?.boxLabel}>Signature</Box>
          </Box>
          <Box sx={styles?.dateBox}>
            <Box sx={styles?.dateSpace}>date...</Box>
            <Box sx={styles?.boxLabel}>Date</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TemplateBasic;

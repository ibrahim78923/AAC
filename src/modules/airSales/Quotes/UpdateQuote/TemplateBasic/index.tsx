import { Box, Typography, Grid, Divider } from '@mui/material';
import { createQuoteFormFields } from '../UpdateQuote.data';
import { styles } from './TemplateBasic.style';
import { DATE_FORMAT, GlobalSearchSuperAdminModules } from '@/constants';
import dayjs from 'dayjs';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const TemplateBasic = ({
  quotesData,
  loyalityCalculation,
  BuyerInfoLoading,
}: any) => {
  return (
    <Box>
      {BuyerInfoLoading ? (
        <SkeletonTable />
      ) : (
        <Box sx={styles?.container}>
          <Box sx={styles?.header}>
            <Typography variant="h4" sx={styles?.headerTitle}>
              Sample
            </Typography>
          </Box>
          <Box sx={styles?.quoteInfoHolder}>
            <Box sx={{ pb: '16px' }}>
              <Grid container spacing={'16px'}>
                <Grid item lg={7} md={12} xs={12}>
                  <Typography sx={styles?.buyerInfoTitle} variant="body1">
                    {quotesData?.buyerCompany?.name ?? 'N/A'}
                  </Typography>
                  <Typography sx={styles?.buyerInfoText} variant="body2">
                    {quotesData?.buyerCompany?.address ?? 'N/A'}
                  </Typography>
                  <Typography sx={styles?.buyerInfoText} variant="body2">
                    {quotesData?.buyerCompany?.postalCode ?? 'N/A'}
                  </Typography>
                  <Typography sx={styles?.buyerInfoText} variant="body2">
                    {quotesData?.buyerCompany?.city ?? 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography sx={styles?.buyerInfoTitle} variant="body1">
                    {quotesData?.buyerCompany?.owner?.firstName}{' '}
                    {quotesData?.buyerCompany?.owner?.lastName}
                  </Typography>
                  <Typography sx={styles?.buyerInfoText} variant="body2">
                    {quotesData?.buyerCompany?.owner?.email}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={styles?.quoteInfo}>
              <Grid container spacing={'16px'}>
                <Grid item xs={7}>
                  <Box sx={styles?.quoteInfoLabel}>
                    Quote Created By:{' '}
                    <Box component={'span'}>
                      {quotesData?.createdBy?.firstName ?? 'N/'}{' '}
                      {quotesData?.createdBy?.lastName ?? 'A'}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box sx={styles?.quoteInfoLabel}>
                    Quote Created:{' '}
                    <Box component={'span'}>
                      {dayjs(quotesData?.createdAt)?.format(DATE_FORMAT?.UI)}
                    </Box>
                  </Box>
                  <Box sx={styles?.quoteInfoLabel}>
                    Quote Expires On:{' '}
                    <Box component={'span'}>
                      {dayjs(quotesData?.expiryDate)?.format(DATE_FORMAT?.UI)}
                    </Box>
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
                    <Grid item xs={12} key={item?.id}>
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
                } else {
                  return null;
                }
              })}
            </Grid>
          </Box>
          <Box sx={styles?.voucher}>
            {loyalityCalculation?.calculationsArray?.map((item: any) => (
              <Box sx={styles?.vRow} key={item?.name}>
                <Box sx={styles?.vCellLef}>{item?.name}</Box>
                <Box sx={styles?.vCellRight}>
                  {item?.name === GlobalSearchSuperAdminModules?.TAX
                    ? item?.amount
                    : `£ ${item?.amount}`}
                </Box>
              </Box>
            ))}
            <Divider sx={{ my: '16px', borderColor: '#D2D6DF' }} />
            <Box sx={styles?.vRow}>
              <Box sx={styles?.total}>Total</Box>
              <Box sx={styles?.total}>£ {loyalityCalculation?.finalTotal}</Box>
            </Box>
          </Box>
          {/* {values?.signature === 'includeSignature' && (
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
      )} */}
        </Box>
      )}
    </Box>
  );
};

export default TemplateBasic;

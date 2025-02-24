import { Box, Button, Divider, LinearProgress } from '@mui/material';
import { styles } from './Quotation.style';
import { styles as templateStyles } from '../../TemplateBasic/TemplateBasic.style';
import useQuotation from './useQuotation';

const Quotation = ({ loyalityCalculation }: any) => {
  const { getMoreDisocuntLoading, setFetchData, fetchData, moreDiscountValue } =
    useQuotation(loyalityCalculation);

  return (
    <Box height={'100%'}>
      <Box sx={styles?.box} height={'100%'}>
        <Box sx={templateStyles?.voucher}>
          <Box sx={templateStyles?.vRow}>
            <Box sx={templateStyles?.vCellLef}>
              {loyalityCalculation?.calculationsArray[0]?.name}
            </Box>
            <Box sx={templateStyles?.vCellRight}>
              {`£ ${loyalityCalculation?.calculationsArray[0]?.amount}`}
            </Box>
          </Box>
          <Box sx={templateStyles?.vRow}>
            <Box sx={templateStyles?.vCellLef}>
              {loyalityCalculation?.calculationsArray[1]?.name}
            </Box>
            <Box sx={templateStyles?.vCellRight}>
              {`£ ${loyalityCalculation?.calculationsArray[1]?.amount}`}
            </Box>
          </Box>
          <Box sx={templateStyles?.vRow}>
            <Box sx={templateStyles?.vCellLef}>
              {loyalityCalculation?.calculationsArray[2]?.name}
            </Box>
            <Box sx={templateStyles?.vCellRight}>
              {`£ ${loyalityCalculation?.calculationsArray[2]?.amount}`}
            </Box>
          </Box>
          <Box sx={templateStyles?.vRow}>
            <Box sx={templateStyles?.vCellLef}>
              {loyalityCalculation?.calculationsArray[3]?.name}
            </Box>
            <Box sx={templateStyles?.vCellRight}>
              {`£ ${loyalityCalculation?.calculationsArray[3]?.amount}`}
            </Box>
          </Box>
          <Box sx={templateStyles?.vRow}>
            <Box sx={templateStyles?.vCellLef}>
              {loyalityCalculation?.calculationsArray[4]?.name}
            </Box>
            <Box sx={templateStyles?.vCellRight}>
              {`£ ${loyalityCalculation?.calculationsArray[4]?.amount}`}
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            {!fetchData ? (
              <Button
                fullWidth
                className="small"
                variant="contained"
                onClick={() => setFetchData(true)}
              >
                Get Discount
              </Button>
            ) : getMoreDisocuntLoading ? (
              <Box display="flex" flexDirection="column" gap={1}>
                <LinearProgress color="secondary" />
                <LinearProgress color="secondary" />
              </Box>
            ) : (
              <Box>
                <Box sx={templateStyles?.vRow}>
                  <Box sx={templateStyles?.vCellLef}>Loyalty Discount</Box>
                  <Box sx={templateStyles?.vCellRight}>
                    £ {moreDiscountValue}
                  </Box>
                </Box>
                <Box sx={templateStyles?.vRow}>
                  <Box sx={templateStyles?.vCellLef}>
                    {loyalityCalculation?.calculationsArray[6]?.name}
                  </Box>
                  <Box sx={templateStyles?.vCellRight}>
                    {`£ ${loyalityCalculation?.calculationsArray[6]?.amount}`}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={templateStyles?.vRow}>
            <Box sx={templateStyles?.vCellLef}>
              {loyalityCalculation?.calculationsArray[5]?.name}
            </Box>
            <Box sx={templateStyles?.vCellRight}>
              {`${loyalityCalculation?.calculationsArray[5]?.amount}`}
            </Box>
          </Box>
          <Divider sx={{ my: '16px', borderColor: '#D2D6DF' }} />
          <Box sx={templateStyles?.vRow}>
            <Box sx={templateStyles?.total}>Total</Box>
            <Box sx={templateStyles?.total}>
              {`£ ${loyalityCalculation?.finalTotal}`}
            </Box>
          </Box>
        </Box>
        <Box sx={styles?.signatureCard}>
          <Box sx={styles?.signatureBox}>
            <Box sx={styles?.boxLabel}>Signature</Box>
          </Box>
          <Box sx={styles?.dateBox}>
            <Box sx={styles?.boxLabel}>Date</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Quotation;

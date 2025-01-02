import { Box, Divider } from '@mui/material';
import { styles } from './Quotation.style';
import { styles as templateStyles } from '../../TemplateBasic/TemplateBasic.style';
import { GlobalSearchSuperAdminModules } from '@/constants';

const Quotation = ({ loyalityCalculation }: any) => {
  return (
    <Box>
      <Box sx={styles?.box}>
        <Box sx={templateStyles?.voucher}>
          {loyalityCalculation?.calculationsArray?.map((item: any) => (
            <Box sx={templateStyles?.vRow} key={item?.name}>
              <Box sx={templateStyles?.vCellLef}>{item?.name}</Box>
              <Box sx={templateStyles?.vCellRight}>
                {item?.name === GlobalSearchSuperAdminModules?.TAX
                  ? item?.amount
                  : `£ ${item?.amount}`}
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: '16px', borderColor: '#D2D6DF' }} />
          <Box sx={templateStyles?.vRow}>
            <Box sx={templateStyles?.total}>Total</Box>
            <Box sx={templateStyles?.total}>
              £ {loyalityCalculation?.finalTotal}
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

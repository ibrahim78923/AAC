import { Box } from '@mui/material';
import ContractOverview from './Components/ContractOverview';
import ContractUtilization from './Components/ContractUtilization';
import UsageActivity from './Components/UsageActivity';
import { styles } from './Overview.style';

export const Overview = () => {
  return (
    <>
      <Box sx={styles.boxStyle}>
        <UsageActivity />
        <ContractUtilization />
        <ContractOverview />
      </Box>
    </>
  );
};

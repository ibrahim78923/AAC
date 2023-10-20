import { Box } from '@mui/material';
import ContractOverview from './Components/ContractOverview';
import ContractUtilization from './Components/ContractUtilization';
import UsageActivity from './Components/UsageActivity';
import { styles } from './Overview.style';
import {
  contractUtilizationData,
  contractUtilizationLable,
  UsageActivityData,
  UsageActivityLable,
  ContractOverviewLable,
} from './Overview.data';

export const Overview = () => {
  return (
    <>
      <Box sx={styles.boxStyle}>
        <UsageActivity
          UsageActivityData={UsageActivityData}
          UsageActivityLable={UsageActivityLable}
        />
        <ContractUtilization
          contractUtilizationData={contractUtilizationData}
          contractUtilizationLable={contractUtilizationLable}
        />
        <ContractOverview ContractOverviewLable={ContractOverviewLable} />
      </Box>
    </>
  );
};

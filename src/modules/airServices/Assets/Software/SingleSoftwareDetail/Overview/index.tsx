import { Box } from '@mui/material';
import ContractOverview from './ContractOverview';
import ContractUtilization from './ContractUtilization';
import UsageActivity from './UsageActivity';
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

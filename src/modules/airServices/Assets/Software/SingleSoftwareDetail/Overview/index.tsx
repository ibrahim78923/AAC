import { Box } from '@mui/material';
import ContractOverview from './ContractOverview';
import ContractUtilization from './ContractUtilization';
import UsageActivity from './UsageActivity';
import { styles } from './Overview.style';
import {
  contractUtilizationData,
  contractUtilizationLabel,
  usageActivityData,
  usageActivityLabel,
  contractOverviewLabel,
} from './Overview.data';

export const Overview = () => {
  return (
    <>
      <Box sx={styles.boxStyle}>
        <UsageActivity
          usageActivityData={usageActivityData}
          usageActivityLabel={usageActivityLabel}
        />
        <ContractUtilization
          contractUtilizationData={contractUtilizationData}
          contractUtilizationLabel={contractUtilizationLabel}
        />
        <ContractOverview contractOverviewLabel={contractOverviewLabel} />
      </Box>
    </>
  );
};

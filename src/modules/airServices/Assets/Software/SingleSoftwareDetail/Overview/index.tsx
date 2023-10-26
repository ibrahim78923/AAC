import { Box } from '@mui/material';
import ContractOverview from './Components/ContractOverview';
import ContractUtilization from './Components/ContractUtilization';
import UsageActivity from './Components/UsageActivity';
import {
  contractUtilizationData,
  contractUtilizationLable,
  usageActivityData,
  usageActivityLable,
  contractOverviewLable,
} from './Overview.data';

export const Overview = () => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        gap={'1.5rem'}
        flexWrap={'wrap'}
      >
        <UsageActivity
          usageActivityData={usageActivityData}
          usageActivityLable={usageActivityLable}
        />
        <ContractUtilization
          contractUtilizationData={contractUtilizationData}
          contractUtilizationLable={contractUtilizationLable}
        />
        <ContractOverview contractOverviewLable={contractOverviewLable} />
      </Box>
    </>
  );
};

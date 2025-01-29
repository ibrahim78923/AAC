import { styles } from './ContractOverview.style';
import { Box, Typography } from '@mui/material';
import { useContractOverview } from './useContractOverview';
import { formatDateExpiry } from '@/lib/date-time';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

function ContractOverview(props: {
  contractOverviewLabel: {
    heading: string;
    subHeading1: string;
    subHeading2: string;
  };
}) {
  const {
    data,
    isLoading,
    isError,
    contractOverviewLabel,
    theme,
    isFetching,
    refetch,
  } = useContractOverview(props);

  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>
          {contractOverviewLabel?.heading}
        </Typography>
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          skeletonType={SKELETON_TYPES?.BARS}
          length={2}
          errorHeight="100%"
          refreshApi={refetch}
        >
          <Box sx={styles?.contentBox}>
            <Box sx={styles?.contentBoxData(theme)}>
              <Typography>{contractOverviewLabel?.subHeading1}</Typography>
              <Typography>{`$${
                data?.data?.totalContractValue?.contractValue?.total ?? 0
              }`}</Typography>
            </Box>
            <Box sx={styles?.contentBoxData(theme)}>
              <Typography>{contractOverviewLabel?.subHeading2}</Typography>
              <Typography>
                {data?.data?.upCommingExipiry?.upcomingExpiryDate
                  ? formatDateExpiry(
                      data?.data?.upCommingExipiry?.upcomingExpiryDate,
                    )
                  : 'Not Specified'}
              </Typography>
            </Box>
          </Box>
        </ApiRequestFlow>
      </Box>
    </>
  );
}

export default ContractOverview;

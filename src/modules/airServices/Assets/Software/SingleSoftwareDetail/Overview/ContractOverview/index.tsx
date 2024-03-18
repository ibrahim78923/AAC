import { styles } from './ContractOverview.style';
import { Box, Typography } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useContractOverview } from './useContractOverview';

function ContractOverview(props: any) {
  const { data, isLoading, isError, contractOverviewLabel, formatDate, theme } =
    useContractOverview(props);
  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>
          {contractOverviewLabel?.heading}
        </Typography>
        {isLoading ? (
          <Box p={2}>
            <SkeletonTable />
          </Box>
        ) : isError ? (
          <ApiErrorState />
        ) : (
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
                  ? formatDate(data?.data?.upCommingExipiry?.upcomingExpiryDate)
                  : 'Not Specified'}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ContractOverview;

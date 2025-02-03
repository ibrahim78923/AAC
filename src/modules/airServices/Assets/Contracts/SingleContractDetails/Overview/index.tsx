import { Box, Typography } from '@mui/material';
import { overviewData } from './Overview.data';
import { styles } from './Overview.style';
import { useOverview } from './useOverview';
import { Fragment } from 'react';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { DynamicFormDataDisplay } from '@/components/DynamicForm/DynamicFormDataDisplay';

export const Overview = () => {
  const {
    theme,
    contractData,
    contractItemData,
    approverName,
    isLoading,
    isFetching,
    isError,
    fieldsOverviewData,
    data,
    refetch,
  } = useOverview();

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
    >
      {overviewData({ contractData, contractItemData, approverName })?.map(
        (item: any) => (
          <Fragment key={item?.id}>
            <Typography variant="h5" sx={{ py: '10px' }}>
              {item?.heading}
            </Typography>
            <Box sx={styles?.mainContainerBox}>
              {item?.detailsData?.map((detail: any) => (
                <Fragment key={detail?.name}>
                  <Box sx={styles?.childContainerBox}>
                    <Box sx={{ width: { sm: '20%', xs: '140px' } }}>
                      <Typography variant="body2" fontWeight={500}>
                        {detail?.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme?.palette?.grey?.[900] }}
                      >
                        {detail?.detail}
                      </Typography>
                    </Box>
                  </Box>
                </Fragment>
              ))}
            </Box>
            <Box sx={styles?.borderBox} />
          </Fragment>
        ),
      )}
      {data?.data?.customFields && (
        <>
          <Typography variant="h5" py={'0.625rem'}>
            {data?.data?.contractTypeData?.name} Details
          </Typography>

          <Box bgcolor={'primary.lighter'} borderRadius={2}>
            {Object?.entries(fieldsOverviewData)?.map(([key, value]: any) => (
              <Box key={key} display={'flex'}>
                <Typography
                  variant={'body2'}
                  fontWeight={500}
                  p={2}
                  color={'grey.600'}
                  minWidth={'25%'}
                >
                  {key}:
                </Typography>
                <Typography
                  variant={'body2'}
                  p={2}
                  color={'grey.900'}
                  fontWeight={500}
                >
                  <DynamicFormDataDisplay value={value} />
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </ApiRequestFlow>
  );
};

import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box } from '@mui/material';
import { useDonutChart } from './useDonutChart';
import NoData from '@/components/NoData';

export const DonutChart = (props: any) => {
  const { isDateFilter, title } = props;
  const { dataItems, seriesData } = useDonutChart(props);

  return (
    <Box
      borderRadius={3}
      p={2}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
      <PageTitledHeader title={title}>{isDateFilter && <></>}</PageTitledHeader>
      {!!seriesData?.length ? (
        <CustomChart
          options={{
            labels: dataItems,
          }}
          series={seriesData}
          type={'donut'}
          height={348}
        />
      ) : (
        <NoData height="" />
      )}
    </Box>
  );
};

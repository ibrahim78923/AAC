import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Button } from '@mui/material';
import { useDonutChart } from './useDonutChart';

export const DonutChart = (props: any) => {
  const { isDateFilter, title } = props;
  const { uniqueCounts, dataItems } = useDonutChart(props);

  return (
    <Box
      borderRadius={3}
      p={2}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
      <PageTitledHeader title={title}>
        {isDateFilter && <Button></Button>}
      </PageTitledHeader>
      <CustomChart
        options={{
          labels: dataItems,
        }}
        series={uniqueCounts
          ?.filter((item: any) => item?.value)
          ?.map((item: any) => item?.count)}
        type={'donut'}
        height={348}
      />
    </Box>
  );
};

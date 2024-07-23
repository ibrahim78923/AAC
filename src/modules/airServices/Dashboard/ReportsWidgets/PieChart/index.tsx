import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Button } from '@mui/material';
import { usePieChart } from './usePieChart';
import NoData from '@/components/NoData';

export const PieChart = (props: any) => {
  const { title, isDateFilter } = props;
  const { uniqueCounts, dataItems } = usePieChart(props);

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
      {!!uniqueCounts?.length ? (
        <CustomChart
          options={{
            labels: dataItems,
          }}
          series={uniqueCounts
            ?.filter((item: any) => item?.value)
            ?.map((item: any) => item?.count)}
          type={'pie'}
          height={348}
        />
      ) : (
        <NoData height="" />
      )}
    </Box>
  );
};

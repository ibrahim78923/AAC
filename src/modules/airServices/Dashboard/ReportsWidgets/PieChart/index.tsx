import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box } from '@mui/material';
import { usePieChart } from './usePieChart';
import NoData from '@/components/NoData';

export const PieChart = (props: any) => {
  const { title, isDateFilter } = props;
  const { dataItems, seriesData } = usePieChart(props);

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
          type={'pie'}
          height={348}
        />
      ) : (
        <NoData height="" />
      )}
    </Box>
  );
};

import { CustomChart } from '@/components/Chart';
import { useBarChart } from './useBarChart';
import { Box } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import NoData from '@/components/NoData';

export const BarChart = (props: any) => {
  const { title, isDateFilter } = props;
  const { options, seriesData } = useBarChart(props);

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
          options={options}
          series={seriesData}
          type={'bar'}
          height={348}
        />
      ) : (
        <NoData height="" />
      )}
    </Box>
  );
};

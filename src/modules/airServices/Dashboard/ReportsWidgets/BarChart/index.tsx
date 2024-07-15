import { CustomChart } from '@/components/Chart';
import { useBarChart } from './useBarChart';
import { Box, Button } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';

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
      <PageTitledHeader title={title}>
        {isDateFilter && <Button></Button>}
      </PageTitledHeader>
      <CustomChart
        options={options}
        series={seriesData}
        type={'bar'}
        height={348}
      />
    </Box>
  );
};

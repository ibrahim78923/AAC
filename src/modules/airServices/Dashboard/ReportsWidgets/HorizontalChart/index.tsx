import { CustomChart } from '@/components/Chart';
import { useHorizontalChart } from './useHorizontalChart';
import { Box, Button } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const HorizontalChart = (props: any) => {
  const { title, isDateFilter } = props;
  const { options, seriesData } = useHorizontalChart(props);

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

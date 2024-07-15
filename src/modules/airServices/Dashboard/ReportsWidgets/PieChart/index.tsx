import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box, Button } from '@mui/material';

export const PieChart = (props: any) => {
  const { title, isDateFilter, data } = props;
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
          labels: data?.items,
        }}
        series={data?.counts
          ?.filter((item: any) => item?.value)
          ?.map((item: any) => item?.count)}
        type={'pie'}
        height={348}
      />
    </Box>
  );
};

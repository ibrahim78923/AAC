import { CustomChart } from '@/components/Chart';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box } from '@mui/material';
import { usePieChart } from './usePieChart';
import NoData from '@/components/NoData';
import { TruncateText } from '@/components/TruncateText';

export const PieChart = (props: any) => {
  const { title } = props;
  const { dataItems, seriesData } = usePieChart(props);

  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
      <Box
        borderBottom={'1px solid'}
        borderColor={'custom.off_white_three'}
        px={2}
        py={0.5}
      >
        <PageTitledHeader
          title={<TruncateText text={title} />}
          titleVariant="h5"
          outerMarginBottom={0}
        />
      </Box>
      <Box p={1}>
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
          <NoData height="50%" />
        )}
      </Box>
    </Box>
  );
};

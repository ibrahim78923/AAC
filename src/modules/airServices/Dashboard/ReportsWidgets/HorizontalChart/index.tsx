import { CustomChart } from '@/components/Chart';
import { useHorizontalChart } from './useHorizontalChart';
import { Box } from '@mui/material';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import NoData from '@/components/NoData';
import { TruncateText } from '@/components/TruncateText';

export const HorizontalChart = (props: any) => {
  const { title } = props;
  const { options, seriesData } = useHorizontalChart(props);

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
            options={options}
            series={seriesData}
            type={'bar'}
            height={348}
          />
        ) : (
          <NoData height="50%" />
        )}
      </Box>
    </Box>
  );
};

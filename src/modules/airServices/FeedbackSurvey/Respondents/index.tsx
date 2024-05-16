import { CustomChart } from '@/components/Chart';
import { useRespondents } from './useRespondents';
import { Box } from '@mui/material';

export const Respondents = ({ chartData }: any) => {
  const { options, radialBarChartData } = useRespondents({ chartData });

  return (
    <Box boxShadow={2} p={2} borderRadius={2} height={'100%'}>
      <CustomChart
        options={options}
        series={radialBarChartData}
        type={'radialBar'}
        height={275}
      />
    </Box>
  );
};

import { CustomChart } from '@/components/Chart';
import { useTicketPriorityGraph } from './useTicketPriorityGraph';

export const TicketPriorityGraph = ({ chartData }: any) => {
  const { options, radialBarChartData } = useTicketPriorityGraph({ chartData });

  return (
    <CustomChart
      options={options}
      series={radialBarChartData}
      type={'radialBar'}
      height={348}
    />
  );
};

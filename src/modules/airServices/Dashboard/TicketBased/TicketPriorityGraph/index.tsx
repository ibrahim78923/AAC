import { CustomChart } from '@/components/Chart';
import { useTicketPriorityGraph } from './useTicketPriorityGraph';

export const TicketPriorityGraph = (props: any) => {
  const { options, radialBarChartData } = useTicketPriorityGraph(props);

  return (
    <CustomChart
      options={options}
      series={radialBarChartData}
      type={'radialBar'}
      height={348}
    />
  );
};

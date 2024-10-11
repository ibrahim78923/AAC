import { CustomChart } from '@/components/Chart';
import { useTicketStatusGraph } from './useTicketStatusGraph';

export const TicketStatusGraph = (props: any) => {
  const { options, seriesData } = useTicketStatusGraph(props);

  return (
    <CustomChart
      options={options}
      series={seriesData}
      type={'bar'}
      height={348}
    />
  );
};

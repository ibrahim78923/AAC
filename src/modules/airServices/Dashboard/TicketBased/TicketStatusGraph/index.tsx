import { CustomChart } from '@/components/Chart';
import { useTicketStatusGraph } from './useTicketStatusGraph';

export const TicketStatusGraph = ({ chartData }: any) => {
  const { options, seriesData } = useTicketStatusGraph({ chartData });

  return (
    <CustomChart
      options={options}
      series={seriesData}
      type={'bar'}
      height={348}
    />
  );
};

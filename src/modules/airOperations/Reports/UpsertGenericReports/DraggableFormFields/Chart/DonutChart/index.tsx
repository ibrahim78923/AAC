import { CustomChart } from '@/components/Chart';

export const DonutChart = () => {
  return (
    <CustomChart
      options={{
        labels: [],
      }}
      series={[44, 55, 13, 43]}
      type={'donut'}
      height={348}
    />
  );
};

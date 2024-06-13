import { CustomChart } from '@/components/Chart';

export const PieChart = () => {
  return (
    <>
      <CustomChart
        options={{
          labels: [],
        }}
        series={[44, 55, 13, 43]}
        type={'pie'}
        height={348}
      />
    </>
  );
};

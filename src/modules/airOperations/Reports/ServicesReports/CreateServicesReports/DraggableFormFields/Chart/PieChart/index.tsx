import { CustomChart } from '@/components/Chart';

export const PaiChart = () => {
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

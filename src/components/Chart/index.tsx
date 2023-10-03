import dynamic from 'next/dynamic';
import { ChartStyle } from '.';
import { CustomChartPropsI } from './Chart.interface';
import { baroptions } from './Chart.utils';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export const CustomChart = ({
  options,
  series,
  type,
  height = '312',
  width,
}: CustomChartPropsI) => {
  return (
    <>
      <ChartStyle />
      <ReactApexChart
        options={baroptions(type, options)}
        series={series}
        type={type}
        width={width}
        height={height}
      />
    </>
  );
};

// ----------------------------------------------------------------------

export { default as ChartStyle } from './Chart.style';

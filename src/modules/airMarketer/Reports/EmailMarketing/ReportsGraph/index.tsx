import { getCategories } from '@/modules/airMarketer/EmailMarketing/EmailReports';
import { useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ReportsGraph = ({ performanceData, calenderUnit }: any) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<any>(null);

  const data = performanceData;

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const subscribe = data?.map((entry) => entry?.subscribe || 0);
      const unsubscribe = data?.map((entry) => entry?.unsubscribe || 0);

      const categories = getCategories(data, calenderUnit);

      setChartData({
        series: [
          { name: 'Subscribe', data: subscribe },
          { name: 'Unsubscribe', data: unsubscribe },
        ],
        options: {
          chart: {
            type: 'bar',
            height: 350,
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '35%',
              endingShape: 'rounded',
            },
          },
          colors: [theme?.palette?.custom?.bright, theme?.palette?.grey[500]],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['transparent'],
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                fontSize: '12px',
                fontWeight: 400,
              },
            },
          },
          yaxis: {
            title: {
              text: 'Counts',
            },
            labels: {
              style: {
                fontSize: '12px',
                fontWeight: 400,
              },
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val: any) {
                return `${val}`;
              },
            },
          },
          legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: false,
            offsetY: 1,
          },
        },
      });
    }
  }, [data]);

  return (
    <div id="chart">
      {typeof window !== 'undefined' && chartData && (
        <ReactApexChart
          options={chartData?.options}
          series={chartData?.series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default ReportsGraph;

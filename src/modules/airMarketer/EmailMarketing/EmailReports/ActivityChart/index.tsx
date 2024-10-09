import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ActivityChart = ({ emailWidgetsData }: any) => {
  const [chartData, setChartData] = useState<any>(null);

  const total = emailWidgetsData?.total;
  const read = (emailWidgetsData?.open / total) * 100;
  const unread = (emailWidgetsData?.unread / total) * 100;
  const delivered = (emailWidgetsData?.delivered / total) * 100;

  useEffect(() => {
    setChartData({
      series: [delivered, read, unread],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Delivered', 'Read', 'Unread'],
        colors: ['#B889F4', '#38CAB5', '#7ED4EE'],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    });
  }, [emailWidgetsData]);

  return (
    <div id="chart">
      {typeof window !== 'undefined' && chartData && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={380}
        />
      )}
    </div>
  );
};

export default ActivityChart;

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ActivityChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    setChartData({
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C'],
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
  }, []);

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

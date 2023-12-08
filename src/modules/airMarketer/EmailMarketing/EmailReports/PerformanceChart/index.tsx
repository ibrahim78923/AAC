import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const PerformanceChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    setChartData({
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          width: 1,
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '35%',
            endingShape: 'rounded',
            roundedRect: {
              topLeft: 10,
              topRight: 10,
              bottomLeft: 0,
              bottomRight: 0,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['transparent'],
        },
        xaxis: {
          categories: [
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 400,
            },
          },
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
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
              return '$ ' + val + ' thousands';
            },
          },
        },
      },
    });
  }, []);

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

export default PerformanceChart;

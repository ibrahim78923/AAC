import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const PerformanceChart = (performanceData: any) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<any>(null);

  const data = performanceData?.performanceData;

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const sentData = data?.map((entry) => entry?.send || 0);
      const openedData = data?.map((entry) => entry?.open || 0);
      const unreadData = data?.map((entry) => entry?.unread || 0);
      const blockedData = data?.map((entry) => entry?.complaint || 0);
      const unDeliveredData = data?.map(
        (entry) => entry?.send - entry?.delivered || 0,
      );

      const categories = data?.map(
        (entry) => dayjs(entry?._id)?.format('MMMM'),
      );

      setChartData({
        series: [
          { name: 'Sent', data: sentData },
          { name: 'Unread', data: unreadData },
          { name: 'Opened', data: openedData },
          { name: 'Undelivered', data: unDeliveredData },
          { name: 'Blocked', data: blockedData },
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
          colors: [
            theme?.palette?.primary?.main,
            theme?.palette?.custom?.light_graph_purple,
            theme?.palette?.custom?.light_slate_blue,
            theme?.palette?.grey[500],
            theme?.palette?.custom?.light_graph_red,
          ],
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

export default PerformanceChart;

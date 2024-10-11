import { Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ActivityChart = ({ emailWidgetsData }: any) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<any>(null);

  const total = emailWidgetsData?.total;
  const read = (emailWidgetsData?.open / total) * 100;
  const unread = (emailWidgetsData?.unread / total) * 100;
  const unDelivered =
    ((emailWidgetsData?.send - emailWidgetsData?.delivered) / total) * 100;

  useEffect(() => {
    setChartData({
      series: [read, unread, unDelivered],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Read', 'Unread', 'Undelivered'],
        colors: [
          theme?.palette?.primary?.main,
          theme?.palette?.custom?.light_slate_blue,
          theme?.palette?.grey[500],
        ],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        },
        tooltip: {
          y: {
            formatter: (val: number) => {
              return `${val?.toFixed(1)}%`;
            },
          },
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
      {total === undefined ? (
        <Box
          sx={{
            height: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          No data found
        </Box>
      ) : (
        <>
          {typeof window !== 'undefined' && chartData && (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="pie"
              width={380}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ActivityChart;

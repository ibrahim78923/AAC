import { getCategories } from '@/modules/airMarketer/EmailMarketing/EmailReports';
import { Box, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const EmailOverviewGraph = ({ performanceData, calenderUnit }: any) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<any>(null);

  const data = performanceData;

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const bounceData = data?.map((entry) => entry?.bounce || 0);
      const clickData = data?.map((entry) => entry?.click || 0);
      const openedData = data?.map((entry) => entry?.open || 0);
      const deliveredData = data?.map((entry) => entry?.delivered || 0);
      const sendData = data?.map((entry) => entry?.send || 0);

      const categories = getCategories(data, calenderUnit);

      setChartData({
        series: [
          { name: `Bounced`, data: bounceData },
          { name: `Clicked`, data: clickData },
          { name: `Delivered`, data: deliveredData },
          { name: `Open`, data: openedData },
          { name: `Sent`, data: sendData },
        ],
        options: {
          chart: {
            type: 'line',
            height: 350,
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          markers: {
            strokeWidth: 5,
            shape: 'circle',
            height: 5,
            width: 5,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          colors: [
            theme?.palette?.error?.main,
            theme?.palette?.warning?.main,
            theme?.palette?.success?.main,
            theme?.palette?.custom?.maroon_dark,
            theme?.palette?.blue?.link_blue,
          ],
          grid: {
            row: {
              colors: ['transparent'],
            },
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
        <Box>
          <ReactApexChart
            options={chartData?.options}
            series={chartData?.series}
            type="line" // Change type to line
            height={350}
          />
        </Box>
      )}
    </div>
  );
};

export default EmailOverviewGraph;

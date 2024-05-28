import { Theme, useTheme } from '@mui/material';

const useInvoicingCard = (details: any) => {
  const theme = useTheme<Theme>();
  const series = details?.invoicing?.inDividual?.map(
    (item: any) => item?.totalNetAmount,
  );

  const sumOfThreeValues = series
    ?.slice(0, 3)
    ?.reduce((a: any, b: any) => a + b, 0);

  const invoiceHeadings = (heading: any) => {
    switch (heading) {
      case 'PENDING':
        return 'Follow up soon';
      case 'OVERDUE':
        return 'Follow up now';
      case 'PAID':
        return 'Invoice paid';
    }
  };
  const invoiceAmount = (invoice: { status: string; amount: number }) => {
    switch (invoice?.status) {
      case 'PENDING':
      case 'OVERDUE':
      case 'PAID':
        return `£ ${invoice?.amount.toFixed(2)}K`;
    }
  };

  const options: any = {
    series: series,
    chart: {
      type: 'donut',
    },
    colors: [
      `${theme?.palette?.success?.main}`,
      `${theme?.palette?.error?.main}`,
      `${theme?.palette?.custom?.bright}`,
    ],
    plotOptions: {
      pie: {
        startAngle: -110,
        endAngle: 110,
        offsetY: -5,
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: 'Total Revenue',
              formatter: function () {
                return '€' + sumOfThreeValues?.toFixed(1) + 'K';
              },
            },
          },
        },
        tooltip: {
          show: false,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: ['Invoice paid', 'Follow up soon', 'Follow up now'],
    grid: {
      padding: {
        bottom: -80,
      },
    },
    responsive: [
      {
        breakpoint: 375,
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
    label: ['u4gru43b4u3b4ub4b4uubufbruubru'],
  };
  return {
    invoiceHeadings,
    invoiceAmount,
    options,
    theme,
  };
};

export default useInvoicingCard;

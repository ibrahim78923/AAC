import { MONTH_NAMES, MONTH_NUMBERS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { InvoiceReport } from '@/modules/superAdmin/Reports/Reports.interface';

export const series = (invoicesReportsGraph: InvoiceReport[]) => {
  const paidnvoices = MONTH_NUMBERS?.map((month) => {
    const deal = invoicesReportsGraph?.find(
      (item: any) => item?.week === month,
    );
    return deal ? deal?.paid : 0;
  });

  const followNowInvoices = MONTH_NUMBERS?.map((month) => {
    const deal = invoicesReportsGraph?.find(
      (item: any) => item?.week === month,
    );
    return deal ? deal?.followUpNow : 0;
  });

  const followSoonInvoices = MONTH_NUMBERS?.map((month) => {
    const deal = invoicesReportsGraph?.find(
      (item: any) => item?.week === month,
    );
    return deal ? deal?.followUpSoon : 0;
  });

  return [
    {
      name: 'Paid',
      data: paidnvoices,
    },
    {
      name: 'Follow up soon',
      data: followSoonInvoices,
    },
    {
      name: 'Follow up now',
      data: followNowInvoices,
    },
  ];
};

export const options: any = () => {
  const theme = useTheme();
  return {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme?.palette?.success?.main,
      theme?.palette?.primary?.main,
      theme?.palette?.error?.main,
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '18px',
        endingShape: 'rounded',
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 5,
      colors: ['transparent'],
    },

    xaxis: {
      categories: MONTH_NAMES,
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
  };
};

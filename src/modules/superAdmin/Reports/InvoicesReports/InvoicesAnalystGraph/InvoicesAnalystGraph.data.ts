import { MONTH_NAMES, MONTH_NUMBERS, WEEK_NUMBERS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { InvoiceReport } from '@/modules/superAdmin/Reports/Reports.interface';

const isWeeklyData = (data: InvoiceReport[]): boolean => {
  return data?.some((item: any) => WEEK_NUMBERS.includes(item?.week));
};

const getFilteredCategories = (data: InvoiceReport[], isWeekly: boolean) => {
  const periods = isWeekly ? WEEK_NUMBERS : MONTH_NAMES;
  return periods?.filter(
    (period) =>
      data?.some((item: any) => item.month === period || item.week === period),
  );
};

export const series = (invoicesReportsGraph: InvoiceReport[]) => {
  const isWeekly = isWeeklyData(invoicesReportsGraph);

  const paidInvoices = (isWeekly ? WEEK_NUMBERS : MONTH_NAMES)?.map(
    (period) => {
      const deal = invoicesReportsGraph?.find(
        (item: any) => item.month === period || item.week === period,
      );
      return deal ? deal.paid : 0;
    },
  );

  const followNowInvoices = (isWeekly ? WEEK_NUMBERS : MONTH_NUMBERS)?.map(
    (period) => {
      const deal = invoicesReportsGraph?.find(
        (item: any) => item.month === period || item.week === period,
      );
      return deal ? deal.followUpNow : 0;
    },
  );

  const followSoonInvoices = (isWeekly ? WEEK_NUMBERS : MONTH_NUMBERS)?.map(
    (period) => {
      const deal = invoicesReportsGraph?.find(
        (item: any) => item.month === period || item.week === period,
      );
      return deal ? deal.followUpSoon : 0;
    },
  );

  return [
    {
      name: 'Paid',
      data: paidInvoices,
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

export const options: any = (invoicesReportsGraph: InvoiceReport[]) => {
  const theme = useTheme();
  const isWeekly = isWeeklyData(invoicesReportsGraph);
  const filteredCategories = getFilteredCategories(
    invoicesReportsGraph,
    isWeekly,
  );

  return {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.success.main,
      theme.palette.primary.main,
      theme.palette.error.main,
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
      categories: filteredCategories,
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

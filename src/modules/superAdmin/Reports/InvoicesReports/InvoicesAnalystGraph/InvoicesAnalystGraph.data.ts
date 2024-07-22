import { MONTH_NAMES, WEEK_NUMBERS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { InvoiceReport } from '@/modules/superAdmin/Reports/Reports.interface';

const isWeeklyData = (data: InvoiceReport[]): boolean => {
  return data?.some((item: any) => WEEK_NUMBERS?.includes(item?.week));
};

const getFilteredCategories = (data: InvoiceReport[], isWeekly: boolean) => {
  const periods = isWeekly ? WEEK_NUMBERS : MONTH_NAMES;
  return periods?.filter(
    (period) =>
      data?.some((item: any) =>
        isWeekly ? item?.week === period : item?.month === period,
      ),
  );
};

export const series = (invoicesReportsGraph: InvoiceReport[]) => {
  const isWeekly = isWeeklyData(invoicesReportsGraph);
  const periods = isWeekly ? WEEK_NUMBERS : MONTH_NAMES;
  const paidInvoices: (number | null)[] = [];
  const followNowInvoices: (number | null)[] = [];
  const followSoonInvoices: (number | null)[] = [];
  const filteredPeriods = [];

  periods?.forEach((period) => {
    const deal: any = invoicesReportsGraph?.find((item: any) =>
      isWeekly ? item?.week === period : item?.month === period,
    );

    const paid = deal ? parseFloat(deal?.paid) : 0;
    const followNow = deal ? parseFloat(deal?.followUpNow) : 0;
    const followSoon = deal ? parseFloat(deal?.followUpSoon) : 0;

    if (paid !== 0 || followNow !== 0 || followSoon !== 0) {
      paidInvoices?.push(isNaN(paid) ? null : paid);
      followNowInvoices?.push(isNaN(followNow) ? null : followNow);
      followSoonInvoices?.push(isNaN(followSoon) ? null : followSoon);
      filteredPeriods?.push(period);
    }
  });

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

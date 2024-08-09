import { MONTH_NAMES, WEEKS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { InvoiceReport } from '@/modules/superAdmin/Reports/Reports.interface';

export const isWeeklyData = (data: InvoiceReport[]): boolean => {
  return data?.some((item: any) => WEEKS?.includes(item?.week));
};

const getFilteredCategories = (data: InvoiceReport[], isWeekly: boolean) => {
  const periods = isWeekly ? WEEKS : MONTH_NAMES;
  return periods?.filter(
    (period) =>
      data?.some((item: any) =>
        isWeekly ? item?.week === period : item?.month === period,
      ),
  );
};

export const weekWiseSeries: any = (invoicesReportsGraph: InvoiceReport[]) => {
  const periods = WEEKS;
  const paidInvoices: (number | null)[] = [];
  const followNowInvoices: (number | null)[] = [];
  const followSoonInvoices: (number | null)[] = [];

  periods?.forEach((period) => {
    const deal: any = invoicesReportsGraph?.find(
      (item: any) => item?.week === period,
    );

    const paid = deal ? parseFloat(deal?.paid) : 0;
    const followNow = deal ? parseFloat(deal?.followUpNow) : 0;
    const followSoon = deal ? parseFloat(deal?.followUpSoon) : 0;

    paidInvoices?.push(isNaN(paid) ? null : paid);
    followNowInvoices?.push(isNaN(followNow) ? null : followNow);
    followSoonInvoices?.push(isNaN(followSoon) ? null : followSoon);
  });

  return [
    {
      name: 'Paid',
      data: paidInvoices,
    },
    {
      name: 'Follow Up Now',
      data: followNowInvoices,
    },
    {
      name: 'Follow Up Soon',
      data: followSoonInvoices,
    },
  ];
};

export const monthWiseSeries: any = (invoicesReportsGraph: InvoiceReport[]) => {
  const periods = MONTH_NAMES;
  const paidInvoices: (number | null)[] = [];
  const followNowInvoices: (number | null)[] = [];
  const followSoonInvoices: (number | null)[] = [];
  const filteredPeriods: string[] = [];

  periods?.forEach((period) => {
    const deal: any = invoicesReportsGraph?.find(
      (item: any) => item?.month === period,
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
      name: 'Follow Now',
      data: followNowInvoices,
    },
    {
      name: 'Follow Soon',
      data: followSoonInvoices,
    },
    {
      name: 'Periods',
      data: filteredPeriods,
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

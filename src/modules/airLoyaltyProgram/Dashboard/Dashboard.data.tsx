import { REQUESTORS_STATUS } from '@/constants/strings';
import { Chip } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AIR_LOYALTY_PROGRAM } from '@/constants';

export const rewardsData = [
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 100,
    status: 'Active',
  },
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 120,
    status: 'Active',
  },
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 150,
    status: 'Active',
  },
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 12,
    status: 'Active',
  },
  {
    rewardName: 'Star@gmail.com',
    requiredCredits: 16,
    status: 'Active',
  },
];

export const rewardsColumns = [
  {
    accessorFn: (row: any) => row?.rewardName,
    id: 'rewardName',
    header: 'Reward Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.requiredCredits,
    id: 'requiredCredits',
    header: 'Required Credits',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <Chip
        sx={{
          backgroundColor:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.lighter'
              : 'custom.error_lighter',
          color:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.main'
              : 'error.main',
          fontWeight: 500,
          fontSize: '0.7rem',
        }}
        icon={
          <FiberManualRecordIcon
            color={
              info?.getValue()?.toLowerCase() ===
              REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
                ? 'success'
                : 'error'
            }
            sx={{ fontSize: '0.7rem' }}
          />
        }
        label={info?.getValue()}
      />
    ),
  },
];

export const giftCardsData = [
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
  {
    type: 'Digital',
    cardNo: 'HJ456455',
    amount: 56,
    status: 'Active',
  },
];

export const giftCardsColumns = [
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    header: 'Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.cardNo,
    id: 'cardNo',
    header: 'Card No',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.amount,
    id: 'amount',
    header: 'Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    cell: (info: any) => (
      <Chip
        sx={{
          backgroundColor:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.lighter'
              : 'custom.error_lighter',
          color:
            info?.getValue()?.toLowerCase() ===
            REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
              ? 'success.main'
              : 'error.main',
          fontWeight: 500,
          fontSize: '0.7rem',
        }}
        icon={
          <FiberManualRecordIcon
            color={
              info?.getValue()?.toLowerCase() ===
              REQUESTORS_STATUS?.ACTIVE?.toLowerCase()
                ? 'success'
                : 'error'
            }
            sx={{ fontSize: '0.7rem' }}
          />
        }
        label={info?.getValue()}
      />
    ),
  },
];

export const transactionsData = [
  {
    id: '126645543',
    shopName: 'sharemydine',
    credits: 50,
  },
  {
    id: '126645543',
    shopName: 'sharemydine',
    credits: 120,
  },
  {
    id: 'HMW2ORKK7',
    shopName: 'sharemydine',
    credits: 150,
  },
  {
    id: 'HMW2ORKK7',
    shopName: 'sharemydine',
    credits: 12,
  },
  {
    id: 'HMW2ORKK7',
    shopName: 'sharemydine',
    credits: 16,
  },
];

export const transactionsColumns = [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    header: 'Id',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.shopName,
    id: 'shopName',
    header: 'Shop Name',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.credits,
    id: 'credits',
    header: 'Credits',
    cell: (info: any) => info?.getValue(),
  },
];

export const dashboardCardsData = [
  {
    id: 1,
    title: 'Rewards',
    href: AIR_LOYALTY_PROGRAM?.REWARDS,
    tableData: rewardsData,
    tableColumns: rewardsColumns,
  },
  {
    id: 11,
    title: 'Giftcard',
    href: AIR_LOYALTY_PROGRAM?.GIFT_CARDS,
    tableData: giftCardsData,
    tableColumns: giftCardsColumns,
  },
  {
    id: 111,
    title: 'Transactions',
    href: AIR_LOYALTY_PROGRAM?.VOUCHERS,
    tableData: transactionsData,
    tableColumns: transactionsColumns,
  },
];

export const loyaltyAnalyticsData = [
  {
    data: [12, 3, 40, 30, 5, 30, 44, 55, 41, 4, 22, 43],
    name: 'Contacts',
  },
  {
    data: [44, 55, 41, 4, 22, 43, 12, 3, 40, 30, 5, 30],
    name: 'Earnings',
  },
  {
    data: [53, 32, 33, 52, 13, 44, 12, 3, 40, 30, 5, 10],
    name: 'Spending',
  },
];

export const loyaltyAnalyticsDataOptions = (theme: any): any => ({
  labels: [
    'Jan',
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
  xaxis: {
    crosshairs: {
      show: false,
    },
  },
  colors: [
    theme?.palette?.blue?.main,
    theme?.palette?.primary?.main,
    theme?.palette?.graph?.Trash_bg,
  ],
  yaxis: {
    forceNiceScale: false,
    max: 100,
    labels: {
      formatter: (value: any) => {
        if (isNaN(value)) return value;
        return value?.toFixed(0) + '%';
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    markers: {
      width: 12,
      height: 12,
      radius: 4,
    },
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '30%',
      borderRadius: 6,
      borderRadiusApplication: 'end',
    },
  },
  responsive: [
    {
      breakpoint: 1600,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 2,
          },
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 650,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 2,
          },
        },
        xaxis: {
          forceNiceScale: false,
          max: 100,
          labels: {
            formatter: (value: any) => value?.toFixed(0) + '%',
          },
        },
        yaxis: {
          crosshairs: {
            show: false,
          },
        },
      },
    },
  ],
});

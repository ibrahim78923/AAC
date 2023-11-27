import { GoogleAds } from '@/assets/images';
import { SwitchBtn } from '../../../../components/SwitchButton';

export const ConnectAdAccountData = [
  {
    id: '1',
    title: 'Facebook',
    desc: 'Includes ads placed on all of Facebook, Instagram, Messenger and the Audience network',
    icon: 'FacebookIcon',
  },
  {
    id: '2',
    title: 'Google Ads',
    desc: 'Include ads placed on all of Google Search Display. YouTube and Google Shopping. Does not include Google smart Campaigns New Google ad accounts may be eligible for up to $500 USD credit. ',
    image: GoogleAds,
  },
  {
    id: '3',
    title: 'Linkdin',
    desc: 'New accounts connecting  to Airapple cart may be eligible $500 USD in ad credit.',
    icon: 'LinkdinIcon',
  },
];

export const accountData: any = [
  {
    AdAccount: 'Tej’s Ad Accout',
    AdAccountID: '509414235',
  },
  {
    AdAccount: 'Tej’s Ad Accout',
    AdAccountID: '509414235',
  },
];

export const accountColumns: any = [
  {
    accessorFn: (row: any) => row?.AdAccount,
    id: 'adaccount',
    isSortable: true,
    header: 'AD ACCOUNT',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },

  {
    accessorFn: (row: any) => row?.AdAccountID,
    id: 'adAccountid',
    isSortable: true,
    header: 'AD ACCOUNT ID',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },

  {
    accessorFn: (row: any) => row?.AutoTracking,
    id: 'autoTracking',
    isSortable: true,
    header: 'AUTO TRACKING',
    cell: () => <SwitchBtn checked={true} />,
  },
];

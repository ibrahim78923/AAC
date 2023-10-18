import { FeaturedImage, SentImage, ServiceImage } from '@/assets/images';

export const organizationTableData: any = [
  {
    Id: 1,
    companyAccount: `Orcalo Holdings`,
    products: 'Draftstrtr',
    phoneNo: 'Sharemydine',
    address: 'Alee',
    status: 'Tech Support',
  },
  {
    Id: 2,
    companyAccount: ` Apple AirCart`,
    products: 'Draftstrtr',
    phoneNo: 'Sharemydine',
    address: 'Alee',
    status: 'Tech Support',
  },

  {
    Id: 3,
    companyAccount: `PPCN`,
    products: 'Draftstrtr',
    phoneNo: 'Sharemydine',
    address: 'Alee',
    status: 'Tech Support',
  },
];

export const productItem = [
  {
    id: '1',
    img: FeaturedImage,
    name: 'Sales',
    color: '#4B5563',
    status: true,
  },
  {
    id: '2',
    img: SentImage,
    name: 'Marketing',
    color: '#9CA3AF',
    status: false,
  },
  {
    id: '3',
    img: ServiceImage,
    name: 'Service',
    color: '#9CA3AF',
    status: false,
  },
];

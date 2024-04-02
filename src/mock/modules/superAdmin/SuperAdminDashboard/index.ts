import { IcLinkImage } from '@/assets/images';

export const MyAccountData = [
  {
    title: 'Sales Cart',
    role: 'sales',
    icon: IcLinkImage,
    children: [
      { company: 'Company A', websiteLink: 'company.airapple.com' },
      { company: 'Company B', websiteLink: 'company.airapple.com' },
      { company: 'Company C', websiteLink: 'company.airapple.com' },
    ],
  },
  {
    title: 'Marketing',
    role: 'marketing',
    icon: IcLinkImage,
    children: [
      { company: 'Company A', websiteLink: 'company.airapple.com' },
      { company: 'Company B', websiteLink: 'company.airapple.com' },
      { company: 'Company C', websiteLink: 'company.airapple.com' },
    ],
  },
  {
    title: 'Organization  Admin Portal',
    role: 'organization',
    icon: IcLinkImage,
  },
];

export const planListData = [
  {
    planId: '001',
    description: `Air Sales`,
    planName: 'Growth',
    defaultUsers: '8',
    planPrice: '£95',
  },
  {
    planId: '002',
    description: `Air Marketing`,
    planName: 'Enterprise',
    defaultUsers: '4',
    planPrice: '£95',
  },
  {
    planId: '003',
    description: `Services`,
    planName: 'Premium',
    defaultUsers: '9',
    planPrice: '£95',
  },
  {
    planId: '004',
    description: `Services`,
    planName: 'Premium',
    defaultUsers: '9',
    planPrice: '£95',
  },
];

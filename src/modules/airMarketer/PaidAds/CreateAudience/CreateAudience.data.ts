import { AIR_MARKETER_PAID_ADS_PERMISSIONS } from '@/constants/permission-keys';

export const createAudience = [
  {
    id: '1',
    title: 'Websites Visitors',
    desc: "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    linkedinIcon: ' <LinkdinIcon/>',
    facebookIcon: '<FacebookIcon />',
    permissions:
      AIR_MARKETER_PAID_ADS_PERMISSIONS?.CREATE_AUDIENCE_WEBSITE_VISITORS,
  },
  {
    id: '2',
    title: 'Contact List',
    desc: "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    linkedinIcon: '',
    facebookIcon: '',
    permissions:
      AIR_MARKETER_PAID_ADS_PERMISSIONS?.CREATE_AUDIENCE_CONTACT_LIST,
  },
  {
    id: '3',
    title: 'Company List',
    desc: "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    linkedinIcon: '',
    facebookIcon: '',
    permissions:
      AIR_MARKETER_PAID_ADS_PERMISSIONS?.CREATE_AUDIENCE_COMPANY_LIST,
  },
  {
    id: '4',
    title: 'Lookalike',
    desc: "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    linkedinIcon: '',
    facebookIcon: '',
    permissions: AIR_MARKETER_PAID_ADS_PERMISSIONS?.CREATE_AUDIENCE_LOOALIKE,
  },
  {
    id: '5',
    title: 'Segments',
    desc: "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    linkedinIcon: '',
    facebookIcon: '',
    permissions:
      AIR_MARKETER_PAID_ADS_PERMISSIONS?.CREATE_AUDIENCE_SEGMENTATION,
  },
];

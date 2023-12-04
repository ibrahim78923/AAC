import {
  FacebookSquareIcon,
  LinkedInSquareIcon,
  SearchAdIcon,
} from '@/assets/icons';

export const createAdTabsData = [
  {
    title: 'Engagement ad',
    description:
      "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    fbIcon: <FacebookSquareIcon />,
    component: 'engagement-Ad',
  },
  {
    title: 'Website visit ad',
    description:
      "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    fbIcon: <FacebookSquareIcon />,
    linkedInIcon: <LinkedInSquareIcon />,
    component: 'website-Ad',
  },
  {
    title: 'Lead Generation ad',
    description:
      "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    fbIcon: <FacebookSquareIcon />,
    linkedInIcon: <LinkedInSquareIcon />,
    component: 'generation-Ad',
  },
  {
    description:
      "Drive traffic, build trust, and increase sales by showing a series of three ads, optimized for every stage of the buyer's journey.",
    fbIcon: <SearchAdIcon />,
    component: 'search-Ad',
  },
];

import { DealReportImage, ForecaseCardImg } from '@/assets/images';
import { AIR_SALES } from '@/routesConstants/paths';

export const reportsCardsData = [
  {
    heading: 'Deals',
    cards: [
      {
        title: 'Deals',
        img: DealReportImage,
        navigateLink: AIR_SALES?.DEALS_REPORTS,
        description: 'Overview Deals Reports',
      },
    ],
  },
  {
    heading: 'Forecast',
    cards: [
      {
        title: 'Pipeline Forecast Report',
        img: ForecaseCardImg,
        navigateLink: AIR_SALES?.PIPELINE_REPORTS,
        description: 'Overview Pipeline Forecast Report',
      },
      {
        title: 'Forecast Category Report',
        img: ForecaseCardImg,
        navigateLink: AIR_SALES?.CATEOGRORY_REPORTS,
        description: 'Overview Forecast Category Report',
      },
    ],
  },
];

import { DealReportImage, ForecaseCardImg } from '@/assets/images';
import {
  AIR_SALES_DEALS_REPORTS,
  AIR_SALES_FORECAST_REPORTS,
} from '@/constants/permission-keys';
import { AIR_SALES } from '@/routesConstants/paths';

export const reportsCardsData = [
  {
    heading: 'Deals',
    permissions: AIR_SALES_DEALS_REPORTS?.DEALS_REPORTS,
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
    permissions: AIR_SALES_FORECAST_REPORTS?.FORECAST_REPORTS,
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

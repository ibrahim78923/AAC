import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const CompainDetailsCard = (campaignDetails: any) => {
  return [
    {
      headingName: 'Owner',
      detail: 'Matt Shaw',
    },
    {
      headingName: 'Goal',
      detail: `${campaignDetails?.campaignGoal ?? 'N/A'}`,
    },
    {
      headingName: 'Audience',
      detail: `${campaignDetails?.campaignAudience ?? 'N/A'}`,
    },
    {
      headingName: 'Total Budget',
      detail: `₤ ${campaignDetails?.campaignBudget ?? 'N/A'}`,
    },
    {
      headingName: 'Total Spend',
      detail: '200',
    },
    {
      headingName: 'Start Date',
      detail: `${
        dayjs(campaignDetails?.startDate)?.format(DATE_FORMAT?.UI) ?? 'N/A'
      }`,
    },
    {
      headingName: 'End Date',
      detail: `${
        dayjs(campaignDetails?.endDate)?.format(DATE_FORMAT?.UI) ?? 'N/A'
      }`,
    },
  ];
};

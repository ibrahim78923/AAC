import { uiDateFormat } from '@/lib/date-time';

export const CardData = (data: any) => {
  return {
    'Deal Owner': data?.dealOwner?.name ?? '---',
    Amount: `£${data?.amount ?? '---'}`,
    'Deal Stage': data?.dealStage ?? '---',
    'Deal Pipeline': data?.dealPipeline ?? '---',
    Priority: data?.priority ?? '---',
    'Close Date': uiDateFormat(data?.closeDate),
  };
};

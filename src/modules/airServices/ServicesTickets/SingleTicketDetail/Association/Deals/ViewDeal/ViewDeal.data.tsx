import { DATE_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';

export const CardData = (data: any) => {
  return {
    'Deal Owner': data?.dealOwner?.name ?? '---',
    Amount: `£${data?.amount ?? '---'}`,
    'Deal Stage': data?.dealStage ?? '---',
    'Deal Pipeline': data?.dealPipeline ?? '---',
    Priority: data?.priority ?? '---',
    'Close Date': otherDateFormat(data?.closeDate, DATE_FORMAT?.UI),
  };
};

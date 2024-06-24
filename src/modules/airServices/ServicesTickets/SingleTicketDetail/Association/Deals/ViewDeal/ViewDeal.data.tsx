import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const CardData = (data: any) => {
  return {
    'Deal Owner': data?.dealOwner?.name,
    Amount: `£${data?.amount}`,
    'Deal Stage': data?.dealStage,
    'Deal Pipeline': data?.dealPipeline,
    Priority: data?.priority,
    'Close Date': dayjs(data?.closeDate)?.format(DATE_FORMAT?.UI),
  };
};

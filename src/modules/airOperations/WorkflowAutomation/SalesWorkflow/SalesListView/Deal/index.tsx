import { SALES_WORKFLOW_TYPES } from '@/constants/strings';
import { SalesListView } from '..';

export const Deal = () => {
  return <SalesListView module={SALES_WORKFLOW_TYPES?.DEALS} />;
};

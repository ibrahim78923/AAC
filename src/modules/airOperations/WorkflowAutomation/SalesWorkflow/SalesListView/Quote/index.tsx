import { SalesListView } from '..';
import { SALES_WORKFLOW_TYPES } from '@/constants/strings';

export const Quote = () => {
  return <SalesListView module={SALES_WORKFLOW_TYPES?.QUOTES} />;
};

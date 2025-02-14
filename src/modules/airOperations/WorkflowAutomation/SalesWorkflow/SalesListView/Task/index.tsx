import { SalesListView } from '..';
import { SALES_WORKFLOW_TYPES } from '@/constants/strings';

export const Task = () => {
  return <SalesListView module={SALES_WORKFLOW_TYPES?.SALES_TASKS} />;
};

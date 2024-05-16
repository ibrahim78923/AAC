import { CustomerSatisfactionList } from '../CustomerSatisfactionList';
import { usePublished } from './useAllSurveys';

export const Published = () => {
  const componentProps = usePublished();
  return <CustomerSatisfactionList {...componentProps} />;
};

import { CustomerSatisfactionList } from '../CustomerSatisfactionList';
import { useAllSurveys } from './useAllSurveys';

export const AllSurveys = () => {
  const componentProps = useAllSurveys();
  return <CustomerSatisfactionList {...componentProps} />;
};

import { CustomerSupportList } from '../CustomerSupportList';
import { useAllSurveys } from './useAllSurveys';

export const AllSurveys = () => {
  const componentProps = useAllSurveys();
  return <CustomerSupportList {...componentProps} />;
};

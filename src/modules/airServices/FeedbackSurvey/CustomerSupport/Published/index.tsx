import { CustomerSupportList } from '../CustomerSupportList';
import { usePublished } from './useAllSurveys';

export const Published = () => {
  const componentProps = usePublished();
  return <CustomerSupportList {...componentProps} />;
};

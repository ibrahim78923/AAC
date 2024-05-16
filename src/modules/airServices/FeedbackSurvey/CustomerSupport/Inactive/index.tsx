import { CustomerSupportList } from '../CustomerSupportList';
import { useInactive } from './useAllSurveys';

export const Inactive = () => {
  const componentProps = useInactive();
  return <CustomerSupportList {...componentProps} />;
};

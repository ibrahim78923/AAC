import { CustomerSatisfactionList } from '../CustomerSatisfactionList';
import { useDraft } from './useDraft';

export const Draft = () => {
  const componentProps = useDraft();
  return <CustomerSatisfactionList {...componentProps} />;
};

import { CustomerSupportList } from '../CustomerSupportList';
import { useDraft } from './useDraft';

export const Draft = () => {
  const componentProps = useDraft();
  return <CustomerSupportList {...componentProps} />;
};

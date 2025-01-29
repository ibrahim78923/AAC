import { formFields } from './NewCompany.data';
import { FormGrid } from '@/components/Grids/FormGrid';

export default function NewCompany() {
  return <FormGrid formFieldsList={formFields} />;
}

import { formFields } from './NewContact.data';
import { FormGrid } from '@/components/Grids/FormGrid';

export default function NewContact() {
  return <FormGrid formFieldsList={formFields} />;
}

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addInventoryDefaultValuesOne,
  addInventoryDefaultValuesTwo,
  addInventoryValidationSchemaOne,
  addInventoryValidationSchemaTwo,
} from './AddToInventoryDrawer.data';
export default function useAddToInventoryDrawer() {
  const methods1: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaOne),
    defaultValues: addInventoryDefaultValuesOne,
  });
  const {
    handleSubmit: handleSubmit1,

    watch,
  } = methods1;

  const { addNew } = watch({ name: 'addNew' });
  const methods2: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaTwo),
    defaultValues: addInventoryDefaultValuesTwo,
  });
  const { handleSubmit: handleSubmit2 } = methods2;

  const onSubmit = async () => {};
  return {
    methods1,
    handleSubmit1,
    methods2,
    handleSubmit2,
    onSubmit,
    addNew,
  };
}

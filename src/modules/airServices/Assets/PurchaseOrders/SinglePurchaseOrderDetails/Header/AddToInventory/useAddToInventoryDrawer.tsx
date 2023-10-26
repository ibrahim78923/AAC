import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addInventoryDefaultValuesTwo,
  addInventoryValidationSchemaTwo,
  addInventoryDefaultValuesOne,
  addInventoryDefaultValuesOneUpdate,
  addInventoryValidationSchemaOne,
  addInventoryValidationSchemaUpdate,
} from './AddToInventoryDrawer.data';
export default function useAddToInventoryDrawer() {
  const methodsTwo: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaTwo),
    defaultValues: addInventoryDefaultValuesTwo,
  });

  const { handleSubmit: handleSubmit2 } = methodsTwo;
  const methodsYes: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaOne),
    defaultValues: addInventoryDefaultValuesOne,
  });

  const { handleSubmit: handleSubmitYes } = methodsYes;

  const methodsNo: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaUpdate),
    defaultValues: addInventoryDefaultValuesOneUpdate,
  });
  const { handleSubmit: handleSubmitNo } = methodsNo;
  const onSubmit = async () => {};

  return {
    methodsTwo,
    handleSubmit2,
    onSubmit,
    handleSubmitYes,
    methodsNo,
    methodsYes,
    handleSubmitNo,
  };
}

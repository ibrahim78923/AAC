import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addInventoryDefaultValuesTwo,
  addInventoryValidationSchemaTwo,
  addInventoryDefaultValuesOne,
  addInventoryDefaultValuesOneUpdate,
  addInventoryValidationSchemaOne,
  addInventoryValidationSchemaUpdate,
} from './AddToInventory.data';

export default function useAddToInventoryDrawer() {
  const methodsTwo: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaTwo),
    defaultValues: addInventoryDefaultValuesTwo,
  });

  const { handleSubmit: handleSubmitTwo } = methodsTwo;
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
    handleSubmitTwo,
    onSubmit,
    handleSubmitYes,
    methodsNo,
    methodsYes,
    handleSubmitNo,
  };
}

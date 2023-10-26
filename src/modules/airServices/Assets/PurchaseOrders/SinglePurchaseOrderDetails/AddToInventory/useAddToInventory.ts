import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addInventoryDefaultValuesTwo,
  addInventoryValidationSchemaTwo,
} from './AddToInventory.data';

export default function useAddToInventoryDrawer() {
  const methodsTwo: any = useForm({
    resolver: yupResolver(addInventoryValidationSchemaTwo),
    defaultValues: addInventoryDefaultValuesTwo,
  });

  const { handleSubmit: handleSubmitTwo } = methodsTwo;

  // const methodsYes: any = useForm({
  //   resolver: yupResolver(addInventoryValidationSchemaOne),
  //   defaultValues: addInventoryDefaultValuesOne,
  // });
  // const { handleSubmit: handleSubmit1 } = methodsYes;

  // const methods2: any = useForm({
  //   resolver: yupResolver(addInventoryValidationSchemaTwo),
  //   defaultValues: addInventoryDefaultValuesTwo,
  // });
  // const { handleSubmit: handleSubmit2 } = methods2;

  const onSubmit = async () => {};
  return {
    methodsTwo,
    handleSubmitTwo,
    onSubmit,
  };
}

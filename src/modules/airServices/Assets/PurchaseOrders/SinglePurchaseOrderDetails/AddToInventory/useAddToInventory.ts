import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addToInventoryItemStatusDefaultValues,
  addToInventoryItemStatusValidationSchema,
  addInventoryDefaultValuesOne,
  addInventoryDefaultValuesOneUpdate,
  addInventoryValidationSchemaOne,
  addInventoryValidationSchemaUpdate,
  addToInventoryItemAdded,
} from './AddToInventory.data';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export default function useAddToInventoryDrawer(props: any) {
  const { setIsADrawerOpen } = props;
  const methodsTwo: any = useForm({
    resolver: yupResolver(addToInventoryItemStatusValidationSchema),
    defaultValues: addToInventoryItemStatusDefaultValues,
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
  const [boolVariable, setBoolVariable] = useState(true);
  const [toShow, setToShow] = useState(true);
  const handleRadioChange = (event: { target: { value: string } }) => {
    setToShow(event.target.value === 'Add New');
  };
  const submitHandlerYes = handleSubmitYes(() => {
    setBoolVariable(false);
    methodsYes.reset(addInventoryDefaultValuesOne);
  });
  const submitHandlerNo = handleSubmitNo(() => {
    enqueueSnackbar('item added to inventory Successfully', {
      variant: 'success',
    });
    methodsNo.reset(addInventoryDefaultValuesOneUpdate);
  });
  const submitHandlerTwo = handleSubmitTwo(() => {
    enqueueSnackbar('item added to inventory Successfully', {
      variant: 'success',
    });
    setIsADrawerOpen(false);
    setBoolVariable(true);
    methodsTwo.reset(addToInventoryItemStatusDefaultValues);
  });
  const filteredYes = addToInventoryItemAdded.filter((item: any) => {
    return item.toShow === 'Yes';
  });
  const filteredNo = addToInventoryItemAdded.filter((item: any) => {
    return item.toShow === 'No';
  });
  return {
    methodsTwo,
    handleSubmitTwo,
    onSubmit,
    handleSubmitYes,
    methodsNo,
    methodsYes,
    handleSubmitNo,
    boolVariable,
    filteredYes,
    filteredNo,
    submitHandlerTwo,
    submitHandlerNo,
    submitHandlerYes,
    handleRadioChange,
    toShow,
    setToShow,
  };
}

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  propertiesDefaultValues,
  propertiesValidationSchema,
} from './Properties/Properties.data';
import { useState } from 'react';
import {
  callActionsDefaultValues,
  callActionsValidationSchema,
} from './CallActions/CallActions.data';
import { successSnackbar } from '@/utils/api';

const useEditPhoneNumber = (props: any) => {
  const [callerIds, setcallerIds] = useState([]);
  const { isEditNumberDrawer, setIsEditNumberDrawer } = props;
  const [isValidation, setIsValidation] = useState(false);
  const [isNewNumber, setISNewNumber] = useState(false);
  const [callerIDCreated, setCallerIDCreated] = useState(false);
  const [isVerification, setIsVerification] = useState(false);

  const methods: any = useForm({
    resolver: yupResolver(propertiesValidationSchema),
    defaultValues: propertiesDefaultValues,
  });
  const methodsActions: any = useForm({
    resolver: yupResolver(callActionsValidationSchema) as any,
    defaultValues: callActionsDefaultValues,
  });
  {
    isValidation ? methods : methodsActions;
  }
  const { watch, handleSubmit } = methods;
  const { handleSubmit: handleSubmitActions } = methodsActions;
  const maskValue = watch('maskNumber');
  const onSubmit = () => {
    successSnackbar('Phone Number Updated Successfully');
    setIsEditNumberDrawer?.(false);
  };
  return {
    methods,
    maskValue,
    callerIds,
    setcallerIds,
    handleSubmit,
    onSubmit,
    isValidation,
    isEditNumberDrawer,
    setIsEditNumberDrawer,
    handleSubmitActions,
    methodsActions,
    setIsValidation,
    isNewNumber,
    setISNewNumber,
    callerIDCreated,
    setCallerIDCreated,
    isVerification,
    setIsVerification,
  };
};

export default useEditPhoneNumber;

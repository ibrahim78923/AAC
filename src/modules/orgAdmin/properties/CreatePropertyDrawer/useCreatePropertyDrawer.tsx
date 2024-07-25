import { useState } from 'react';
import { useForm } from 'react-hook-form';
import BasicInfo from './BasicInfo';
import FieldType from './FieldType';
import {
  basicInfoValidationSchema,
  basicInfoDefaultValues,
  fieldTypeDefaultValues,
} from './CreatePropertyDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { dealStatus, indexNumbers } from '@/constants';

const useCreatePropertyDrawer = (onClose?: any) => {
  const [activeStep, setActiveStep] = useState(indexNumbers?.ONE);
  const [basicInfoData, setBasicInfoData] = useState({});

  const basicInfoMethods = useForm({
    resolver: yupResolver(basicInfoValidationSchema),
    defaultValues: basicInfoDefaultValues,
  });

  const fieldTypeMethods = useForm({
    defaultValues: fieldTypeDefaultValues,
  });

  const methods =
    activeStep === dealStatus?.INITIAL_NUMBER
      ? basicInfoMethods
      : fieldTypeMethods;

  const { handleSubmit } = methods;
  const { watch } = fieldTypeMethods;

  const fieldTypeVal = watch('fieldType');

  const createPropertyStepsArray: any = [
    {
      key: 0,
      label: 'Basic Info',
      component: <BasicInfo />,
    },
    {
      key: 1,
      label: 'Field Type',
      component: <FieldType fieldTypeVal={fieldTypeVal} />,
    },
  ];

  const onSubmit = (data: any) => {
    setBasicInfoData(data);
    if (activeStep === 0) {
      setActiveStep(activeStep + 1);
    } else {
      onClose();
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    activeStep,
    setActiveStep,
    createPropertyStepsArray,
    basicInfoData,
    fieldTypeVal,
  };
};

export default useCreatePropertyDrawer;

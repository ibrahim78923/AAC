import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Step1 from './Import/StepOne';
import Step2 from './Import/StepTwo';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const useTask = () => {
  const [toggler, setToggler] = React.useState<string>('listView');
  const handleToggler = (value: string) => setToggler(value);

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNextStep = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBackStep = () =>
    setActiveStep((prevActiveStep) =>
      prevActiveStep - activeStep > 0 ? 1 : prevActiveStep,
    );
  const ImportStepperData = [
    {
      key: uuidv4(),
      label: 'Step 1',
      component: <Step1 />,
    },
    {
      key: uuidv4(),
      label: 'Step 2',
      component: <Step2 />,
    },
  ];

  const [counter, setCounter] = React.useState(0);
  const handleInsightsBtnClick = () => setCounter(0);
  const handleFeedBtnClick = () => setCounter(1);

  const stepOneMethods = useForm({
    defaultValues: {},
  });
  const { handleSubmit: StepOneHandleSubmit } = stepOneMethods;
  const stepOneSubmit = () => {};

  const stepTwoMethods = useForm({
    resolver: yupResolver(Yup.object({})),
    defaultValues: {},
  });
  const { handleSubmit: StepTwoHandleSubmit } = stepTwoMethods;
  const stepTwoSubmit = () => {};

  const createTaskMethods = useForm({
    resolver: yupResolver(Yup.object({})),
    defaultValues: {},
  });
  const { handleSubmit: createTaskHandleSubmit } = createTaskMethods;
  const createTaskSubmit = () => {};

  const [actionType, setActionType] = React.useState('');
  const handleActionBtn = (val: any) => setActionType(val);
  return {
    toggler,
    handleToggler,
    ImportStepperData,
    handleNextStep,
    handleBackStep,
    activeStep,
    counter,
    handleInsightsBtnClick,
    handleFeedBtnClick,
    stepOneMethods,
    StepOneHandleSubmit,
    stepOneSubmit,
    stepTwoMethods,
    StepTwoHandleSubmit,
    stepTwoSubmit,
    createTaskMethods,
    createTaskHandleSubmit,
    createTaskSubmit,
    actionType,
    handleActionBtn,
  };
};

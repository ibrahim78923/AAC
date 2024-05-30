import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import useCreatePropertyDrawer from './useCreatePropertyDrawer';
import AppHorizontalStepper from '@/components/Stepper';

const CreatePropertyDrawer = (props: any) => {
  const { open, onClose } = props;
  const {
    methods,
    activeStep,
    createPropertyStepsArray,
    handleSubmit,
    onSubmit,
  } = useCreatePropertyDrawer(onClose);

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title="Create Property"
      footer
      isOk
      okText="Next"
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <AppHorizontalStepper
          activeStep={activeStep}
          stepsArray={createPropertyStepsArray}
          stepperButtons={false}
        />
      </FormProvider>
    </CommonDrawer>
  );
};

export default CreatePropertyDrawer;

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormProvider } from '@/components/ReactHookForm';
import AppHorizontalStepper from '@/components/Stepper';
import StepDeal from './StepDeal';
import StepDetails from './StepDetails';
import StepBuyerInfo from './StepBuyerInfo';
import StepYourInfo from './StepYourInfo';
import { defaultValues } from './CreateQuote.data';
import StepSignature from './StepSignature';
import StepLineItems from './StepLineItems';
import StepReview from './StepReview';

const CreateQuote = () => {
  const router = useRouter();
  const methods: any = useForm({
    defaultValues: defaultValues,
  });
  const createQuoteSteps = [
    {
      key: 'deal',
      label: 'Deal',
      component: <StepDeal />,
    },
    {
      key: 'details',
      label: 'Details',
      component: <StepDetails />,
    },
    {
      key: 'buyerInfo',
      label: 'Buyer Info',
      component: <StepBuyerInfo />,
    },
    {
      key: 'yourInfo',
      label: 'Your Info',
      component: <StepYourInfo />,
    },
    {
      key: 'lineItems',
      label: 'Line Items',
      component: <StepLineItems />,
    },
    {
      key: 'signature',
      label: 'Signature',
      component: <StepSignature />,
    },
    {
      key: 'review',
      label: 'Review',
      component: <StepReview />,
    },
  ];
  return (
    <FormProvider methods={methods}>
      <AppHorizontalStepper
        cancelButton
        handleCancel={() => router.push('/air-sales/quotes')}
        stepsArray={createQuoteSteps}
        variantNextButton="contained"
      />
    </FormProvider>
  );
};

export default CreateQuote;

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FormProvider } from '@/components/ReactHookForm';
import AppHorizontalStepper from '@/components/Stepper';
import StepDeal from './StepDeal';
import StepDetails from './StepDetails';
import StepBuyerInfo from './StepBuyerInfo';
import StepYourInfo from './StepYourInfo';
import { initValues } from './CreateQuote.data';
import StepSignature from './StepSignature';
import StepLineItems from './StepLineItems';
import StepReview from './StepReview';
import FormCreateDeal from './FormCreateDeal';
import useCreateQuote from './useCreateQuote';

const CreateQuote = () => {
  const {
    isOpenFormCreateDeal,
    handleOpenFormCreateDeal,
    handleCloseFormCreateDeal,
  } = useCreateQuote();

  const router = useRouter();
  const methods: any = useForm({
    defaultValues: initValues,
  });

  const { watch } = methods;
  const watchFields = watch();

  const createQuoteSteps = [
    {
      key: 'deal',
      label: 'Deal',
      component: <StepDeal openCreateDeal={handleOpenFormCreateDeal} />,
    },
    {
      key: 'details',
      label: 'Details',
      component: <StepDetails values={watchFields} />,
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
    <>
      <FormProvider methods={methods}>
        <AppHorizontalStepper
          cancelButton
          handleCancel={() => router.push('/air-sales/quotes')}
          stepsArray={createQuoteSteps}
          variantNextButton="contained"
        />
      </FormProvider>

      <FormCreateDeal
        open={isOpenFormCreateDeal}
        onClose={handleCloseFormCreateDeal}
      />
    </>
  );
};

export default CreateQuote;

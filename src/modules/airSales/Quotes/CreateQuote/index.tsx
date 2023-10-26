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
import FormAddContact from './FormAddContact';
import FormAddCompany from './FormAddCompany';
import FormCreateProduct from './FormCreateProduct';

const CreateQuote = () => {
  const {
    isOpenFormCreateDeal,
    handleOpenFormCreateDeal,
    handleCloseFormCreateDeal,
    isOpenFormAddContact,
    handleOpenFormAddContact,
    handleCloseFormAddContact,
    isOpenFormAddCompany,
    handleOpenFormAddCompany,
    handleCloseFormAddCompany,
    isOpenFormCreateProduct,
    handleOpenFormCreateProduct,
    handleCloseFormCreateProduct,
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
      component: (
        <StepBuyerInfo
          openAddContact={handleOpenFormAddContact}
          openAddCompany={handleOpenFormAddCompany}
        />
      ),
    },
    {
      key: 'yourInfo',
      label: 'Your Info',
      component: <StepYourInfo />,
    },
    {
      key: 'lineItems',
      label: 'Line Items',
      component: (
        <StepLineItems openCreateProduct={handleOpenFormCreateProduct} />
      ),
    },
    {
      key: 'signature',
      label: 'Signature',
      component: <StepSignature values={watchFields} />,
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
          stepperPadding="4rem 0 0"
          stepperMargin="2rem 0 0"
          cancelButton
          handleCancel={() => router.push('/air-sales/quotes')}
          stepsArray={createQuoteSteps}
          variantNextButton="contained"
          nextButtonText="Save & Continue"
          nextButtonFinishText="Submit"
          divider
        />
      </FormProvider>

      <FormCreateDeal
        open={isOpenFormCreateDeal}
        onClose={handleCloseFormCreateDeal}
      />

      <FormAddContact
        open={isOpenFormAddContact}
        onClose={handleCloseFormAddContact}
      />

      <FormAddCompany
        open={isOpenFormAddCompany}
        onClose={handleCloseFormAddCompany}
      />

      <FormCreateProduct
        open={isOpenFormCreateProduct}
        onClose={handleCloseFormCreateProduct}
      />
    </>
  );
};

export default CreateQuote;

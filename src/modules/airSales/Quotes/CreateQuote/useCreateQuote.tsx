import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import StepDeal from './StepDeal';
import StepDetails from './StepDetails';
import StepBuyerInfo from './StepBuyerInfo';
import StepYourInfo from './StepYourInfo';
import StepSignature from './StepSignature';
import StepLineItems from './StepLineItems';
import StepReview from './StepReview';
import { initValues, validationSchema } from './CreateQuote.data';

const useCreateQuote = () => {
  const router = useRouter();
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initValues,
  });
  const { watch, trigger, handleSubmit } = methods;
  const onSubmit = async () => {
    enqueueSnackbar('Form Submitted', {
      variant: 'success',
    });
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const watchFields = watch();
  const [activeStep, setActiveStep] = useState(0);
  const [isOpenFormCreateDeal, setIsOpenFormCreateDeal] = useState(false);
  const [isOpenFormAddContact, setIsOpenFormAddContact] = useState(false);
  const [isOpenFormAddCompany, setIsOpenFormAddCompany] = useState(false);
  const [isOpenFormCreateProduct, setIsOpenFormCreateProduct] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleStepNext = async () => {
    let isValid = false;
    if (activeStep === 0) {
      isValid = await trigger('selectDeal');
    } else if (activeStep === 1) {
      const isTemplateValid = await trigger('quoteTemplate');
      const isNameValid = await trigger('quoteName');
      const isDateValid = await trigger('quoteExpiration');
      isValid = isTemplateValid && isNameValid && isDateValid;
    } else {
      isValid = true;
    }

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleStepBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleStepperCancel = () => {
    router.push('/air-sales/quotes');
  };

  const handleOpenFormCreateDeal = () => {
    setIsOpenFormCreateDeal(true);
  };
  const handleCloseFormCreateDeal = () => {
    setIsOpenFormCreateDeal(false);
  };

  const handleOpenFormAddContact = () => {
    setIsOpenFormAddContact(true);
  };
  const handleCloseFormAddContact = () => {
    setIsOpenFormAddContact(false);
  };

  const handleOpenFormAddCompany = () => {
    setIsOpenFormAddCompany(true);
  };
  const handleCloseFormAddCompany = () => {
    setIsOpenFormAddCompany(false);
  };

  const handleOpenFormCreateProduct = () => {
    setIsOpenFormCreateProduct(true);
  };
  const handleCloseFormCreateProduct = () => {
    setIsOpenFormCreateProduct(false);
  };

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

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

  return {
    methods,
    createQuoteSteps,
    activeStep,
    handleStepNext,
    handleStepBack,
    handleStepperCancel,
    handleFormSubmit,
    isOpenFormCreateDeal,
    setIsOpenFormCreateDeal,
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
    handleOpenDialog,
    handleCloseDialog,
    isOpenDialog,
  };
};

export default useCreateQuote;

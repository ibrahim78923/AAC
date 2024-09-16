import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { DRAWER_TITLE } from '../Cta.data';
import {
  usePostLeadCaptureCTAMutation,
  useUpdateLeadCaptureCTAMutation,
} from '@/services/airMarketer/lead-capture/cta';
import {
  generateCtaIframe,
  step1ValidationSchema,
  step2ValidationSchema,
  ctaDefaultValues,
  BUTTON_TYPE,
  defaultStylesCustomized,
  defaultStylesImage,
  getMarPadFormat,
} from './CtaEditorDrawer.data';

const useCreateCTA = (
  data: any,
  drawerClose: any,
  isDrawerOpen: boolean,
  title: string,
) => {
  const theme = useTheme();

  // Switch CTA Type
  const [ctaType, setCtaType] = useState<string>(BUTTON_TYPE?.customized);
  const handleSwitchCtaType = (type: string) => {
    setCtaType(type);
  };

  const defaultStyles =
    ctaType === BUTTON_TYPE?.customized
      ? defaultStylesCustomized
      : defaultStylesImage;

  // Editor Drawer Create & Edit CTA
  const [activeStep, setActiveStep] = useState(0);
  const [okText, setOkText] = useState('Next');
  const [ctaFormValues, setCtaFormValues] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ctaStyles, setCtaStyles] = useState<any>(defaultStylesCustomized);
  useEffect(() => {
    setImagePreview(null);
    if (ctaType === BUTTON_TYPE?.image) {
      setCtaStyles(defaultStylesImage);
    } else {
      setCtaStyles(defaultStylesCustomized);
    }
  }, [ctaType]);

  const validationSchema =
    activeStep === 0
      ? step1ValidationSchema(ctaType, title)
      : step2ValidationSchema;

  const [createCTA, { isLoading: loadingCreateCTA }] =
    usePostLeadCaptureCTAMutation();
  const [updateCTA, { isLoading: loadingUpdateCTA }] =
    useUpdateLeadCaptureCTAMutation();

  const methods = useForm({
    resolver: yupResolver<any>(validationSchema),
    defaultValues: ctaDefaultValues(data),
  });

  const { handleSubmit, trigger, reset, watch } = methods;
  const watchValues = watch();
  useEffect(() => {
    if (watchValues?.buttonPadding) {
      setCtaStyles((prev: any) => {
        return {
          ...prev,
          padding: getMarPadFormat(watchValues?.buttonPadding),
        };
      });
    }
    if (watchValues?.buttonMargin) {
      setCtaStyles((prev: any) => {
        return {
          ...prev,
          margin: getMarPadFormat(watchValues?.buttonMargin),
        };
      });
    }
    if (watchValues?.buttonImage) {
      if (title === DRAWER_TITLE?.create) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(watchValues?.buttonImage);
      }
    }
  }, [
    watchValues?.buttonPadding,
    watchValues?.buttonMargin,
    watchValues?.buttonImage,
  ]);

  useEffect(() => {
    methods.reset(ctaDefaultValues(data));
  }, [data, ctaType]);

  const handleBack = () => {
    if (activeStep === 0) {
      drawerClose();
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (activeStep < 2) {
      setOkText('Next');
    } else {
      setOkText('Finish');
    }
  }, [activeStep]);

  useEffect(() => {
    setActiveStep(0);
  }, [ctaType]);

  useEffect(() => {
    if (!isDrawerOpen) {
      setActiveStep(0);
      reset();
      setCtaStyles(defaultStyles);
      setCtaType(BUTTON_TYPE?.customized);
    }
    if (isDrawerOpen && title === DRAWER_TITLE?.edit) {
      setCtaType(data?.buttonType);
    }
  }, [isDrawerOpen]);

  const onSubmitEditCTA = async (values: any) => {
    let isValid = false;
    // Check validation based on active step
    if (activeStep === 0) {
      if (ctaType === BUTTON_TYPE?.customized) {
        const isButtonContentValid = await trigger('buttonContent');
        isValid = isButtonContentValid;
      }
      if (ctaType === BUTTON_TYPE?.image) {
        const [isButtonImage, isWidthValid, isHeightValid] = await Promise.all([
          trigger('buttonImage'),
          trigger('imageWidth'),
          trigger('imageHeight'),
        ]);
        isValid = isButtonImage && isWidthValid && isHeightValid;
      }

      const newData = values;
      setCtaFormValues((prevData: any) => {
        return {
          ...prevData,
          ...newData,
        };
      });
    } else if (activeStep === 1) {
      const [isInternalNameValid, isUrlValid, urlRedirectType] =
        await Promise.all([
          trigger('ctaInternalName'),
          trigger('url'),
          trigger('urlRedirectType'),
        ]);

      isValid = isInternalNameValid && isUrlValid && urlRedirectType;
      const newData = values;
      setCtaFormValues((prevData: any) => {
        return {
          ...prevData,
          ...newData,
        };
      });
    } else if (activeStep === 2) {
      const formData = new FormData();
      formData.append('buttonType', ctaType);
      formData.append('styles', JSON.stringify(ctaStyles));
      if (ctaType === BUTTON_TYPE?.image && title === DRAWER_TITLE?.create) {
        formData.append('buttonContent', 'Image CTA');
      }

      Object.entries(ctaFormValues)?.forEach(([key, value]: any) => {
        if (value === undefined || value === null || value === '') return;
        if (
          key === 'buttonColor' ||
          key === 'buttonSize' ||
          key === 'buttonStyle' ||
          key === 'buttonPadding' ||
          key === 'buttonMargin'
        )
          return;
        if (key === 'imageWidth' || key === 'imageHeight') {
          if (value) {
            formData.append(key, `${value}px`);
          } else {
            formData.append(key, value);
          }
        } else {
          formData.append(key, value);
        }
      });

      if (title === DRAWER_TITLE?.create) {
        try {
          await createCTA({ body: formData })?.unwrap();
          await drawerClose();
          enqueueSnackbar('CTA created successfully', {
            variant: 'success',
          });
        } catch (error: any) {
          enqueueSnackbar('An error occured', {
            variant: 'error',
          });
        }
      }

      if (title === DRAWER_TITLE?.edit) {
        try {
          await updateCTA({ id: data?._id, body: formData })?.unwrap();
          await drawerClose();
          enqueueSnackbar('CTA updated successfully', {
            variant: 'success',
          });
        } catch (error: any) {
          enqueueSnackbar('An error occured', {
            variant: 'error',
          });
        }
      }
    }

    // Proceed if the form is valid
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleDrawerSubmit = handleSubmit(onSubmitEditCTA);

  const handleCopyIframeCode = async () => {
    const iframeCode = await generateCtaIframe(data);
    navigator.clipboard.writeText(iframeCode);
  };

  return {
    theme,
    ctaType,
    handleSwitchCtaType,
    ctaStyles,
    watchValues,
    imagePreview,
    activeStep,
    handleBack,
    okText,
    methods,
    handleDrawerSubmit,
    loadingCreateCTA,
    loadingUpdateCTA,
    handleCopyIframeCode,
  };
};

export default useCreateCTA;

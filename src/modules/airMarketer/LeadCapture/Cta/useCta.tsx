import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import * as Yup from 'yup';
import {
  useGetLeadCaptureCTAQuery,
  usePostLeadCaptureCTAMutation,
} from '@/services/airMarketer/lead-capture/cta';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FORM_STEP } from './Cta.data';
import { enqueueSnackbar } from 'notistack';

const step1ValidationSchema = Yup?.object()?.shape({
  buttonContent: Yup?.string()
    ?.trim()
    ?.nullable()
    ?.required('Field is Required'),
});

const step2ValidationSchema = Yup?.object()?.shape({
  ctaInternalName: Yup?.string()
    ?.trim()
    ?.nullable()
    ?.required('Field is Required'),
  url: Yup?.string()?.trim()?.nullable()?.required('Field is Required'),
});

const CTADefaultValues = {
  buttonContent: '',
  ctaInternalName: '',
  urlRedirectType: '',
  url: '',
};

const useCta = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState('');
  const [checkExportFormats, setCheckExportFormats] = useState([]);

  // Editor Drawer Create & Edit CTA
  const [toggleButtonType, setToggleButtonType] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [okText, setOkText] = useState('Next');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Create');
  const [buttonStyle, setButtonStyle] = useState(FORM_STEP?.CUSTOM_ACTION);
  const [buttonData, setButtonData] = useState<any>({});
  const validationSchema =
    activeStep === 0 ? step1ValidationSchema : step2ValidationSchema;
  const buttonType = toggleButtonType ? 'customized' : 'image';

  const [createCTA, { isLoading: loadingCreateCTA }] =
    usePostLeadCaptureCTAMutation();
  const methodsEditCTA = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: CTADefaultValues,
  });
  const {
    handleSubmit: handleMethodEditCTA,
    trigger,
    reset: resetEditorForm,
  } = methodsEditCTA;

  const handleSwitchButtonType = () => {
    setToggleButtonType(!toggleButtonType);
    resetEditorForm();
  };
  const handleDrawerOpen = (title: string) => {
    setDrawerTitle(title);
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    resetEditorForm();
    setActiveStep(0);
    setOpenDrawer(false);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      handleDrawerClose();
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

  const onSubmitEditCTA = async (values: any) => {
    const formData = new FormData();
    let isValid = false;

    // Check validation based on active step
    if (activeStep === 0) {
      isValid = await trigger('buttonContent');
      const newData = values;
      setButtonData((prevData: any) => {
        return {
          ...prevData,
          ...newData,
        };
      });
    } else if (activeStep === 1) {
      const [isInternalNameValid, isUrlValid] = await Promise.all([
        trigger('ctaInternalName'),
        trigger('url'),
      ]);
      isValid = isInternalNameValid && isUrlValid;
      const newData = values;
      setButtonData((prevData: any) => {
        return {
          ...prevData,
          ...newData,
        };
      });
    } else if (activeStep === 2) {
      const buttonUrl = buttonData?.url;
      const buttonContent = buttonData?.buttonContent;
      const styles = {
        display: 'inline-block',
        padding: buttonData?.buttonPadding || '0',
        margin: buttonData?.buttonMargin || '0',
      };
      const ButtonHtmlComponent = () => (
        <a href={buttonUrl} style={styles}>
          {buttonContent}
        </a>
      );

      // Render the ButtonHtml component to a string
      const buttonHtmlString = ReactDOMServer.renderToString(
        <ButtonHtmlComponent />,
      );
      formData.append('buttonType', buttonType);
      formData.append('buttonHtml', buttonHtmlString);
      formData.append('ctaInternalName', buttonData?.ctaInternalName);
      formData.append('urlRedirectType', buttonData?.urlRedirectType);
      formData.append('url', buttonData?.url);

      try {
        await createCTA({ body: formData })?.unwrap();
        await handleDrawerClose();
        enqueueSnackbar('CTA created successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }

    // Proceed if the form is valid
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleDrawerSubmit = handleMethodEditCTA(onSubmitEditCTA);

  // Get CTA's Data
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }

  const { data: dataGetCTAs, isLoading: loadingGetCTAs } =
    useGetLeadCaptureCTAQuery({
      params: { ...searchPayLoad, ...paginationParams },
    });

  const handlecheckExportFormats = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const isChecked = event?.target?.checked;

    if (isChecked) {
      setCheckExportFormats((prevSelected) => [...prevSelected, name]);
    } else {
      setCheckExportFormats(
        (prevSelected) => prevSelected?.filter((item) => item !== name),
      );
    }
  };

  return {
    theme,
    toggleButtonType,
    handleSwitchButtonType,
    activeStep,
    drawerTitle,
    openDrawer,
    handleDrawerOpen,
    handleDrawerClose,
    handleBack,
    okText,
    buttonStyle,
    setButtonStyle,
    methodsEditCTA,
    handleDrawerSubmit,
    loadingCreateCTA,
    dataGetCTAs,
    loadingGetCTAs,
    setSearchValue,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,

    openModal,
    setOpenModal,

    handlecheckExportFormats,
    checkExportFormats,
  };
};

export default useCta;

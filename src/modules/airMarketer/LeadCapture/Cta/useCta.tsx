import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import * as Yup from 'yup';
import Image from 'next/image';
import {
  useGetLeadCaptureCTAQuery,
  usePostLeadCaptureCTAMutation,
  useDeleteLeadCaptureCTAMutation,
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
  imageWidth: Yup.mixed()
    .nullable()
    .test(
      'is-number-or-empty',
      'Image width must be a number',
      function (value: any) {
        if (value === undefined || value === null || value === '') {
          return true;
        }
        return !isNaN(value);
      },
    ),
  imageHeight: Yup.mixed()
    .nullable()
    .test(
      'is-number-or-empty',
      'Image height must be a number',
      function (value: any) {
        if (value === undefined || value === null || value === '') {
          return true;
        }
        return !isNaN(value);
      },
    ),
});

const step2ValidationSchema = Yup?.object()?.shape({
  ctaInternalName: Yup?.string()
    ?.trim()
    ?.nullable()
    ?.required('Field is Required'),
  url: Yup?.string()
    ?.trim()
    ?.nullable()
    ?.matches(
      /^(https?|http):\/\//,
      'URL must start with "http://" or "https://"',
    )
    ?.url('Invalid URL format')
    ?.required('Field is Required'),
});

interface DefaultValuesType {
  buttonContent: string | null;
  ctaInternalName: string | null;
  urlRedirectType: string | null;
  url: string | null;
  buttonStyle: string | null;
  buttonColor: string | null;
  buttonSize: string | null;
  buttonPadding: string | null;
  buttonMargin: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  altText: string | null;
}

const CTADefaultValues = {
  buttonContent: null,
  ctaInternalName: null,
  urlRedirectType: null,
  url: null,
  buttonStyle: null,
  buttonColor: null,
  buttonSize: null,
  buttonPadding: null,
  buttonMargin: null,
  imageWidth: null,
  imageHeight: null,
  altText: null,
};

const useCta = () => {
  const theme = useTheme();
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
  const [ctaDefaultValues, setCtaDefaultValues] =
    useState<DefaultValuesType>(CTADefaultValues);

  const [createCTA, { isLoading: loadingCreateCTA }] =
    usePostLeadCaptureCTAMutation();
  const methodsEditCTA = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: ctaDefaultValues,
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
  const handleDrawerOpen = (title: string = drawerTitle, data: any) => {
    setDrawerTitle(title);
    if (data) {
      setCtaDefaultValues({
        buttonContent: null,
        ctaInternalName: null,
        urlRedirectType: null,
        url: null,
        buttonStyle: null,
        buttonColor: null,
        buttonSize: null,
        buttonPadding: null,
        buttonMargin: null,
        imageWidth: null,
        imageHeight: null,
        altText: null,
      });
    }
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    resetEditorForm();
    setActiveStep(0);
    setToggleButtonType(true);
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
      const [isButtonContentValid, isWidthValid, isHeightValid] =
        await Promise.all([
          trigger('buttonContent'),
          trigger('imageWidth'),
          trigger('imageHeight'),
        ]);
      isValid = isButtonContentValid && isWidthValid && isHeightValid;
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
      const altText = buttonData?.altText || '';
      const imgWidth = buttonData?.imageWidth ? buttonData?.imageWidth : 'auto';
      const imgHeight = buttonData?.imageHeight
        ? buttonData?.imageHeight
        : 'auto';

      const styles = {
        display: 'inline-block',
        padding: buttonData?.buttonPadding || '0',
        margin: buttonData?.buttonMargin || '0',
      };
      const ButtonHtmlComponent = () => (
        <a href={buttonUrl} style={styles}>
          {buttonData?.buttonContent instanceof File ? (
            <Image
              src="buttonImageUrl"
              alt={altText}
              width={imgWidth}
              height={imgHeight}
            />
          ) : (
            buttonData?.buttonContent
          )}
        </a>
      );

      // Render the ButtonHtml component to a string
      const buttonHtmlString = ReactDOMServer.renderToString(
        <ButtonHtmlComponent />,
      );
      if (buttonType === 'image') {
        formData.append('buttonImage', buttonData.buttonContent);
      }
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

  // Delete CTA
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteCTA, { isLoading: loadingDelete }] =
    useDeleteLeadCaptureCTAMutation();
  const handleOpenModalDelete = () => {
    setIsDeleteModal(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteModal(false);
  };

  const handleDeleteCTA = async () => {
    // const items = await selectedRow?.join(',');
    const id = await selectedRow[0];
    try {
      await deleteCTA(id)?.unwrap();
      handleCloseModalDelete();
      setSelectedRow([]);
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
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

    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteCTA,
    loadingDelete,

    handlecheckExportFormats,
    checkExportFormats,
  };
};

export default useCta;

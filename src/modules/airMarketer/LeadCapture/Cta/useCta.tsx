import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import * as Yup from 'yup';
import {
  useGetLeadCaptureCTAQuery,
  usePostLeadCaptureCTAMutation,
  useUpdateLeadCaptureCTAMutation,
  useDeleteLeadCaptureCTAMutation,
} from '@/services/airMarketer/lead-capture/cta';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { isNullOrEmpty } from '@/utils';
import { BUTTON_TYPE, DRAWER_TITLE } from './Cta.data';
// import Image from 'next/image';
import IframeComponent from './IframeComponent';

const step1ValidationSchema = Yup?.object()?.shape({
  buttonContent: Yup?.string()
    ?.trim()
    ?.nullable()
    ?.required('Field is Required'),
  buttonPadding: Yup.string()
    .trim()
    .nullable()
    .matches(/^(\d+px,?\s*){0,3}\d+px$/, {
      message: 'Invalid padding format.',
      excludeEmptyString: true,
    }),
  buttonMargin: Yup.string()
    .trim()
    .nullable()
    .matches(/^(\d+px,?\s*){0,3}\d+px$/, {
      message: 'Invalid Margin format',
      excludeEmptyString: true,
    }),
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
  urlRedirectType: Yup?.string()
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

const ctaDefaultValues: DefaultValuesType = {
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

const getMarPad = (value: string) => {
  let str = '';
  if (!isNullOrEmpty(value)) {
    value.split(',').forEach((value: string, index: number) => {
      str += value.trim();
      if (index !== value.length) {
        str += ' ';
      }
    });
  } else {
    str = '0';
  }
  return str;
};

const useCta = () => {
  const theme = useTheme();

  // Editor Drawer Create & Edit CTA
  const [toggleButtonType, setToggleButtonType] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [okText, setOkText] = useState('Next');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Create');
  const [drawerFormValues, setDrawerFormValues] = useState<any>({});
  const [ctaButtonData, setCtaButtonData] = useState<any>({});
  const validationSchema =
    activeStep === 0 ? step1ValidationSchema : step2ValidationSchema;
  const buttonType = toggleButtonType ? 'customized' : 'image';

  const [createCTA, { isLoading: loadingCreateCTA }] =
    usePostLeadCaptureCTAMutation();
  const [updateCTA, { isLoading: loadingUpdateCTA }] =
    useUpdateLeadCaptureCTAMutation();

  const methodsEditCTA = useForm({
    resolver: yupResolver<any>(validationSchema),
    defaultValues: ctaDefaultValues,
  });

  const {
    handleSubmit: handleMethodEditCTA,
    trigger,
    reset: resetEditorForm,
  } = methodsEditCTA;

  const handleSwitchButtonType = () => {
    setToggleButtonType(!toggleButtonType);
    if (drawerTitle === DRAWER_TITLE?.create) {
      resetEditorForm();
    }
  };
  const handleDrawerOpen = (title: string = drawerTitle, data?: any) => {
    setDrawerTitle(title);
    if (data) {
      const isImage = data?.buttonType === BUTTON_TYPE?.image;
      setToggleButtonType(!isImage);
      setCtaButtonData(data);

      const buttonHTML = data?.buttonHtml;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = buttonHTML;

      const anchorElem = tempDiv.querySelector('a');
      const textContent = anchorElem?.textContent;
      const styleAttribute = anchorElem?.getAttribute('style');
      const stylesArray = styleAttribute?.split(';');
      const stylesObject: any = {};
      stylesArray?.forEach((style) => {
        const [property, value] = style.split(':');
        stylesObject[property] = value;
      });
      const paddingValue =
        stylesObject.padding === '0' ? null : stylesObject?.padding;
      const marginValue =
        stylesObject.margin === '0' ? null : stylesObject?.margin;

      let imgWidth;
      let imgHeight;
      let imgAlt = '';
      const imgElem = anchorElem?.querySelector('img');
      if (imgElem) {
        imgWidth = imgElem.width;
        imgHeight = imgElem.height;
        imgAlt = imgElem.alt;
      }

      if (isImage) {
        methodsEditCTA.setValue('imageWidth', imgWidth || null);
        methodsEditCTA.setValue('imageHeight', imgHeight || null);
        methodsEditCTA.setValue('altText', imgAlt);
      }
      methodsEditCTA.setValue('buttonContent', textContent || null);
      methodsEditCTA.setValue('ctaInternalName', data?.ctaInternalName);
      methodsEditCTA.setValue('urlRedirectType', data?.urlRedirectType);
      methodsEditCTA.setValue('url', data?.url);
      methodsEditCTA.setValue('buttonStyle', data?.buttonStyle);
      methodsEditCTA.setValue('buttonColor', data?.buttonColor);
      methodsEditCTA.setValue('buttonSize', data?.buttonSize);
      methodsEditCTA.setValue('buttonPadding', paddingValue || null);
      methodsEditCTA.setValue('buttonMargin', marginValue || null);
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
      setDrawerFormValues((prevData: any) => {
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
      setDrawerFormValues((prevData: any) => {
        return {
          ...prevData,
          ...newData,
        };
      });
    } else if (activeStep === 2) {
      const buttonUrl = drawerFormValues?.url;
      const altText = drawerFormValues?.altText || '';
      const imgWidth = drawerFormValues?.imageWidth
        ? drawerFormValues?.imageWidth
        : undefined;
      const imgHeight = drawerFormValues?.imageHeight
        ? drawerFormValues?.imageHeight
        : undefined;
      const padding = getMarPad(drawerFormValues?.buttonPadding);
      const margin = getMarPad(drawerFormValues?.buttonMargin);

      const styles = `{
        display: block;
        text-align: center;
        border: 1px solid ${theme?.palette?.primary?.main};
        padding: ${padding};
        margin: ${margin};
      }`;
      const cleanStyles = styles.replace(/\s+/g, '');

      const ButtonHtmlComponent = () => (
        <IframeComponent
          buttonContent={drawerFormValues?.buttonContent}
          buttonUrl={buttonUrl}
          styles={styles}
          buttonImageUrl="buttonImageUrl"
          altText={altText}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
        />
      );

      // Render the ButtonHtml component to a string
      const buttonHtmlString = ReactDOMServer.renderToString(
        <ButtonHtmlComponent />,
      );

      if (buttonType === 'image') {
        formData.append('buttonImage', drawerFormValues.buttonContent);
      }
      formData.append('buttonType', buttonType);
      formData.append('buttonHtml', buttonHtmlString);
      formData.append('ctaInternalName', drawerFormValues?.ctaInternalName);
      formData.append('urlRedirectType', drawerFormValues?.urlRedirectType);
      formData.append('url', drawerFormValues?.url);
      formData.append('styles', cleanStyles);

      if (drawerTitle === 'Create') {
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
      } else {
        try {
          await updateCTA({ id: ctaButtonData?._id, body: formData })?.unwrap();
          await handleDrawerClose();
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

  const {
    data: dataGetCTAs,
    isLoading: loadingGetCTAs,
    isFetching: fetchingGetCTAs,
  } = useGetLeadCaptureCTAQuery({
    params: { ...searchPayLoad, ...paginationParams },
  });

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
    const items = await selectedRow?.join(',');
    try {
      await deleteCTA(items)?.unwrap();
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

  // Export CTA
  const [openModalExport, setOpenModalExport] = useState(false);
  const [checkedValue, setCheckedValue] = useState(null);

  const handleOpenModalExport = () => {
    setOpenModalExport(true);
  };

  const handleCloseModalExport = () => {
    setOpenModalExport(false);
    setCheckedValue(null);
  };

  const handleChangeCheckbox = (value: any) => {
    setCheckedValue(value === checkedValue ? null : value);
  };

  const handleExportSubmit = () => {
    handleCloseModalExport();
  };

  return {
    theme,
    toggleButtonType,
    ctaButtonData,
    handleSwitchButtonType,
    activeStep,
    drawerTitle,
    openDrawer,
    handleDrawerOpen,
    handleDrawerClose,
    handleBack,
    okText,
    methodsEditCTA,
    handleDrawerSubmit,
    loadingCreateCTA,
    dataGetCTAs,
    loadingGetCTAs,
    fetchingGetCTAs,
    setSearchValue,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,
    loadingUpdateCTA,

    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteCTA,
    loadingDelete,

    openModalExport,
    handleOpenModalExport,
    handleCloseModalExport,
    handleExportSubmit,
    handleChangeCheckbox,
    checkedValue,
  };
};

export default useCta;

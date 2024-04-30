import { useState } from 'react';
import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import {
  useGetLeadCaptureCTAQuery,
  usePostLeadCaptureCTAMutation,
} from '@/services/airMarketer/lead-capture/cta';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CTA_FORM, FORM_STEP, drawerOkText } from './Cta.data';
import {
  // CTADefaultValues,
  CTAValidationSchema,
} from './CtaEditorDrawer/CtaEditorDrawer.data';
import { enqueueSnackbar } from 'notistack';

const useCta = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState('');
  const [checkExportFormats, setCheckExportFormats] = useState([]);

  // Drawer Open/Close
  const [toggleButtonType, setToggleButtonType] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Create');
  const [selectedForm, setSelectedForm] = useState(CTA_FORM?.CUSTOMIZED_BUTTON);
  const [buttonStyle, setButtonStyle] = useState(FORM_STEP?.CUSTOM_ACTION);

  const handleSwitchButtonType = () => {
    setToggleButtonType(!toggleButtonType);
  };

  const handleFormSwitcher = (type: string) => {
    setSelectedForm(type);
  };

  const displayOkText = () => {
    if (
      (buttonStyle === FORM_STEP?.CUSTOM_ACTION ||
        buttonStyle === FORM_STEP?.CTA_INTERNAL) &&
      selectedForm === CTA_FORM?.CUSTOMIZED_BUTTON
    ) {
      return drawerOkText['Next'];
    }
    if (
      (buttonStyle === FORM_STEP?.IMAGE_ACTION ||
        buttonStyle === FORM_STEP?.IMAGE_CTA_INTERNAL) &&
      selectedForm === CTA_FORM?.IMAGE_BUTTON
    ) {
      return drawerOkText['Next'];
    }
    return drawerOkText['Add'];
  };

  const [createCTA, { isLoading: loadingCreateCTA }] =
    usePostLeadCaptureCTAMutation();
  const methodsEditCTA = useForm({
    resolver: yupResolver(CTAValidationSchema),
  });
  const { handleSubmit: handleMethodEditCTA, trigger } = methodsEditCTA;

  const handleDrawerOpen = (title: string) => {
    setDrawerTitle(title);
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    if (buttonStyle === FORM_STEP?.CTA_INTERNAL) {
      setButtonStyle(FORM_STEP?.CUSTOM_ACTION);
      return;
    }
    setOpenDrawer(false);
  };

  const onSubmitEditCTA = async (values: any) => {
    setActiveStep(1);
    const buttonHtml = 'buttonHtml';
    const formData = new FormData();
    if (selectedForm === CTA_FORM?.CUSTOMIZED_BUTTON) {
      await trigger(buttonHtml);
      if (buttonStyle === FORM_STEP?.CUSTOM_ACTION) {
        setButtonStyle(FORM_STEP?.CTA_INTERNAL);
      }
      if (buttonStyle === FORM_STEP?.CTA_INTERNAL) {
        formData.append('buttonType', 'customized');
        Object.entries(values)?.forEach(([key, value]: any) => {
          if (value !== undefined && value !== null && value !== '') {
            if (key === buttonHtml) {
              formData.append(
                buttonHtml,
                encodeURIComponent(`<a>${value}</a>`),
              );
            }
            formData.append(key, value);
          }
        });

        try {
          await createCTA({ body: formData })?.unwrap();

          enqueueSnackbar('CTA created successfully', {
            variant: 'success',
          });
        } catch (error: any) {
          enqueueSnackbar('An error occured', {
            variant: 'error',
          });
        }
      }
    }
    // if (selectedForm === CTA_FORM?.IMAGE_BUTTON) {
    //   setButtonStyle(FORM_STEP?.IMAGE_CTA_INTERNAL);
    // }
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
    handleFormSwitcher,
    drawerTitle,
    openDrawer,
    handleDrawerOpen,
    handleDrawerClose,
    displayOkText,
    selectedForm,
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

import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { formStatus } from '@/constants/form-builder';
import { AIR_MARKETER, PUBLIC_LEAD_CAPTURE } from '@/routesConstants/paths';
import { renderIframeToString } from '@/utils/leadcapture-forms';
import {
  styleFormDefaultValues,
  styleFormvalidationSchema,
} from './CreateForm.data';
import {
  useGetManageFieldByIdQuery,
  usePostManageFieldsMutation,
} from '@/services/airMarketer/lead-capture/forms';
import { FE_BASE_URL } from '@/config';

const useCreateForm = () => {
  const theme = useTheme<Theme>();
  const router = useRouter();
  const { formId, mode }: any = router.query;

  const { data: dataGetManageFieldById, isLoading: loadingGetField } =
    useGetManageFieldByIdQuery({ id: formId });

  const [formName, setFormName] = useState('');
  const [formHtml, setFormHtml] = useState<string>('');
  const [formURL, setFormURL] = useState<string>('');
  const [fields, setFields] = useState<any>([]);
  const [formStyling, setFormStyling] = useState<any>({});
  useEffect(() => {
    if (dataGetManageFieldById) {
      setFormName(dataGetManageFieldById?.data?.form?.name ?? '');
      const fields = dataGetManageFieldById?.data?.fields;
      setFields(fields);
      setFormStyling(dataGetManageFieldById?.data?.form?.styling);
    }
  }, [dataGetManageFieldById]);

  const [isEditFormName, setIsEditFormName] = useState(true);
  const handleEditForm = () => {
    setIsEditFormName(!isEditFormName);
  };

  const [openAlertCreatedForm, setOpenAlertCreatedForm] = useState(false);
  const handleOpenAlertCreatedForm = () => {
    setOpenAlertCreatedForm(true);
  };
  const handleCloseAlertCreatedForm = () => {
    setOpenAlertCreatedForm(false);
    handleBackToAllForms();
  };

  // POST /manage-lead-form-fields
  const [postCreateForm] = usePostManageFieldsMutation();
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [loadingPublished, setLoadingPublished] = useState(false);
  const [createFormStyling, setCreateFormStyling] = useState({});

  const handlePostManageLeadForm = async (status: string) => {
    const newFields = fields?.map((obj: any) => {
      const newObj: any = {};
      for (const key in obj) {
        if (
          key !== '_id' &&
          key !== 'formId' &&
          key !== 'createdAt' &&
          key !== 'updatedAt'
        ) {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    });

    const payload = {
      formId: formId,
      status: status,
      name: formName,
      values: newFields,
      styling: createFormStyling,
    };

    try {
      if (status === formStatus?.draft) {
        setLoadingDraft(true);
      } else if (status === formStatus?.published) {
        setLoadingPublished(true);
      }
      const response = await postCreateForm({ body: payload })?.unwrap();
      enqueueSnackbar(`Form saved as ${status} successfully`, {
        variant: 'success',
      });
      if (status === formStatus?.published) {
        if (response) {
          setFormHtml(renderIframeToString(response?.data?.form?._id));

          setFormURL(
            `${FE_BASE_URL}${PUBLIC_LEAD_CAPTURE?.FORM}?id=${response?.data?.form?._id}`,
          );
          handleOpenAlertCreatedForm();
        }
      }
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    } finally {
      if (status === formStatus?.draft) {
        setLoadingDraft(false);
      } else if (status === formStatus?.published) {
        setLoadingPublished(false);
      }
    }
  };

  const [showView, setShowView] = useState(false);

  const [showExportText, setShowExportText] = useState(false);

  // Handle backto all forms
  const handleBackToAllForms = () => {
    router?.push(AIR_MARKETER.ALL_TABLE);
  };

  // Styling Drawer
  const [isStylingDrawerOpen, setIsStylingDrawerOpen] = useState(false);
  const methodsFormStyling = useForm<any>({
    resolver: yupResolver(styleFormvalidationSchema),
    defaultValues: styleFormDefaultValues(formStyling),
  });
  const { handleSubmit: handleMethodAddStyling, reset: resetStylingForm } =
    methodsFormStyling;

  const handleOpenStylingDrawer = () => {
    setIsStylingDrawerOpen(true);
  };
  const handleCloseStylingDrawer = () => {
    setIsStylingDrawerOpen(false);
  };

  const onSubmitStylingForm = async (values: any) => {
    const body: any = {};
    const button: any = {};

    const keyMap: { [key: string]: (value: any) => void } = {
      width: (value) => {
        body.width = value + 'px';
      },
      bodyBgColor: (value) => {
        body.backgroundColor = value;
      },
      bodyTextColor: (value) => {
        body.color = value;
      },
      bodyFontSize: (value) => {
        body.fontSize = value + 'px';
      },
      buttonBgColor: (value) => {
        button.backgroundColor = value;
      },
      buttonTextColor: (value) => {
        button.color = value;
      },
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value !== '' && keyMap[key]) {
        keyMap[key](value);
      }
    });

    setCreateFormStyling({ body, button });
    handleCloseStylingDrawer();
  };
  const handleStylingSubmit = handleMethodAddStyling(onSubmitStylingForm);
  useEffect(() => {
    resetStylingForm(styleFormDefaultValues(formStyling));
  }, [formStyling]);

  return {
    theme,
    fields,
    setFields,
    formName,
    setFormName,
    isEditFormName,
    handleEditForm,
    dataGetManageFieldById,
    loadingGetField,
    handlePostManageLeadForm,
    loadingDraft,
    loadingPublished,
    formHtml,
    formURL,
    isStylingDrawerOpen,
    handleOpenStylingDrawer,
    handleCloseStylingDrawer,
    methodsFormStyling,
    handleStylingSubmit,
    resetStylingForm,
    createFormStyling,
    showView,
    setShowView,

    openAlertCreatedForm,
    handleCloseAlertCreatedForm,
    showExportText,
    setShowExportText,
    router,
    handleBackToAllForms,
    mode,
  };
};

export default useCreateForm;

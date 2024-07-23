import { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { formStatus } from '@/constants/form-builder';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { generateFormHtml } from '@/utils/form-builder';
import {
  styleFormDefaultValues,
  styleFormvalidationSchema,
} from './CreateForm.data';
import {
  useGetManageFieldByIdQuery,
  usePostManageFieldsMutation,
} from '@/services/airMarketer/lead-capture/forms';

const useCreateForm = () => {
  const theme = useTheme<Theme>();
  const router = useRouter();
  const { formId, mode }: any = router.query;

  const { data: dataGetManageFieldById, isLoading: loadingGetField } =
    useGetManageFieldByIdQuery({ id: formId });

  const [formName, setFormName] = useState('');
  const [formHtml, setFormHtml] = useState<string>('');
  const [fields, setFields] = useState<any>([]);
  useEffect(() => {
    if (dataGetManageFieldById) {
      setFormName(dataGetManageFieldById?.data?.form?.name ?? '');
      const fields = dataGetManageFieldById?.data?.fields;
      setFields(fields);
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

  const handlePostManageLeadForm = async (status: string) => {
    // const newFields = fields.map((obj: any) => {
    //   const { _id, formId, createdAt, updatedAt, ...rest } = obj;
    //   return rest;
    // });
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
          setFormHtml(generateFormHtml(response?.data?.fields));
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
  const [createFormStyling, setCreateFormStyling] = useState(null);
  const styleFormMethods = useForm({
    resolver: yupResolver(styleFormvalidationSchema),
    defaultValues: styleFormDefaultValues,
  });
  const handleOpenStylingDrawer = () => {
    setIsStylingDrawerOpen(true);
  };
  const handleCloseStylingDrawer = () => {
    setIsStylingDrawerOpen(false);
  };
  const { handleSubmit: handleMethodAddStyling, reset: resetStylingForm } =
    styleFormMethods;
  const onSubmitStylingForm = async (values: any) => {
    if (values) {
      setCreateFormStyling(values);
    }
    handleCloseStylingDrawer();
  };
  const handleStylingSubmit = handleMethodAddStyling(onSubmitStylingForm);

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
    isStylingDrawerOpen,
    handleOpenStylingDrawer,
    handleCloseStylingDrawer,
    styleFormMethods,
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

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  dynamicallyFormArray,
  styleFormDefaultValues,
  styleFormvalidationSchema,
} from './CreateForm.data';
import {
  RHFDatePicker,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { Theme, Typography, useTheme } from '@mui/material';
import { usePostLeadCaptureFormMutation } from '@/services/airMarketer/lead-capture/forms';
import { enqueueSnackbar } from 'notistack';
import { formStatus } from '../Forms.data';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { fieldsType } from './CreateForm.data';

const useCreateForm = () => {
  const [value, setValue] = useState('1');
  const [showView, setShowView] = useState(false);
  const [editFormName, setEditFormName] = useState(true);
  const [showExportText, setShowExportText] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<any[]>([
    ...dynamicallyFormArray,
  ]);
  const theme = useTheme<Theme>();
  const router = useRouter();
  const { formName }: any = router.query;

  // const formValue = formData ? JSON.parse(formData) : null;
  const [inputValue, setInputValue] = useState(formName);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const addField = (type: any, label: any) => {
    // Create a mapping function to translate the type to form configuration

    const mapTypeToConfig = (type: any, label: any) => {
      switch (type) {
        case 'Text':
          return {
            field: fieldsType?.TEXT,
            componentProps: {
              name: type,
              Text: 'Your Text goes here adjust style accordingly',
              editorConfig: {},
              editorOpen: false,
            },
            md: 12,
            component: Typography,
          };
        case 'Input':
          return {
            field: fieldsType?.INPUT,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              placeholder: 'Enter here',
              required: true,
            },
            component: RHFTextField,
            md: 12,
          };
        case 'Image':
          return {
            field: fieldsType?.IMAGE,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              required: true,
            },
            component: RHFDropZone,
            md: 12,
          };
        case 'DatePicker':
          return {
            field: fieldsType?.DATEPICKER,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              required: true,
            },
            component: RHFDatePicker,
            md: 12,
          };
        case 'Button':
          return {
            field: fieldsType?.BUTTON,
            componentProps: {
              variant: 'contained',
              text: 'submit',
              button: 'text of button',
            },
            component: 'Button',
            md: 12,
          };
        case 'Spacing':
          return {
            field: fieldsType?.SPACING,
            componentProps: {
              Spacing: 'for Spacing',
            },
            component: 'Spacing',
            md: 12,
          };
        case 'Divider':
          return {
            field: fieldsType?.DIVIDER,
            componentProps: {
              Divider: 'for Divider',
            },
            component: 'Divider',
            md: 12,
          };
        case 'Select':
          return {
            field: fieldsType?.SELECT,
            componentProps: {
              name: 'PreferredLanguage',
              label: 'Preferred Language',
              fullWidth: true,
              select: true,
            },
            options: [
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ],
            component: RHFSelect,
            md: 12,
          };
        case 'firstName':
          return {
            field: fieldsType?.FIRSTNAME,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              placeholder: 'First Name',
            },
            component: RHFTextField,
            md: 12,
          };
        case 'lastName':
          return {
            field: fieldsType?.LASTNAME,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              placeholder: 'Last Name',
            },
            component: RHFTextField,
            md: 12,
          };
        case 'email':
          return {
            field: fieldsType?.EMAIL,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              placeholder: 'Enter email',
              type: 'email',
            },
            component: RHFTextField,
            md: 12,
          };
        case 'dateOfBirth':
          return {
            field: fieldsType?.DATEPICKER,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
            },
            component: RHFDatePicker,
            md: 12,
          };
        case 'phoneNumber':
          return {
            field: fieldsType?.PHONENUMBER,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
              type: 'number',
            },
            component: RHFTextField,
            md: 12,
          };
        case 'address':
          return {
            field: fieldsType?.ADDRESS,
            componentProps: {
              name: type,
              label: label,
              fullWidth: true,
            },
            component: RHFTextField,
            md: 12,
          };
        case 'preferredLanguage':
          return {
            field: fieldsType?.PREFERREDLANGUAGE,
            componentProps: {
              name: 'PreferredLanguage',
              label: 'Preferred Language',
              fullWidth: true,
              select: true,
            },
            options: [
              { value: 'English', label: 'English' },
              { value: 'French', label: 'French' },
              { value: 'Urdu', label: 'Urdu' },
            ],
            component: RHFSelect,
            md: 12,
          };
        default:
          return null;
      }
    };

    // Get the configuration based on the field type
    const newFieldConfig = mapTypeToConfig(type, label);
    if (newFieldConfig) {
      setDynamicFields((prevFields: any) => [...prevFields, newFieldConfig]);
    }
  };

  const deleteField = (index: any) => {
    setDynamicFields((prevFields) => [
      ...prevFields.slice(0, index),
      ...prevFields.slice(index + 1),
    ]);
  };

  // Handle backto all forms
  const handleBackToAllForms = () => {
    router?.push(AIR_MARKETER.ALL_TABLE);
    setDynamicFields([...dynamicallyFormArray]);
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

  // Handle Create Form
  const [createdFormResponse, setCreatedFormResponse] = useState(null);
  const [postAddForm, { isLoading: loadingAddForm }] =
    usePostLeadCaptureFormMutation();
  const [openAlertCreatedForm, setOpenAlertCreatedForm] = useState(false);
  const handleOpenAlertCreatedForm = () => {
    setOpenAlertCreatedForm(true);
  };
  const handleCloseAlertCreatedForm = () => {
    setOpenAlertCreatedForm(false);
    handleBackToAllForms();
  };

  const handleSubmitAddForm = async () => {
    // Generate HTML code for the form
    let formHTML = '<form>';
    dynamicFields?.forEach((item: any, index: number) => {
      formHTML += `<div>`;
      if (item?.field === fieldsType?.TEXT) {
        formHTML += `<p>Your text goes here adjust style accordingly</p>`;
      } else if (item?.field === fieldsType?.INPUT) {
        formHTML += `<input type="text" name="field_${index}" />`;
      } else if (item?.field === fieldsType?.TEXTAREA) {
        formHTML += `<textarea name="field_${index}"></textarea>`;
      } else if (item?.field === fieldsType?.SELECT) {
        formHTML += `<select name="field_${index}">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                         </select>`;
      } else if (item?.field === fieldsType?.IMAGE) {
        formHTML += `<input type="file" name="field_${index}" />`;
      } else if (item?.field === fieldsType?.SPACING) {
        formHTML += `<div style='height: 20px;'></div>`;
      } else if (item?.field === fieldsType?.DIVIDER) {
        formHTML += `<hr />`;
      } else if (item?.field === fieldsType?.BUTTON) {
        formHTML += `<button type="submit">Cleck Me!</button>`;
      } else if (item?.field === fieldsType?.FIRSTNAME) {
        formHTML += `<input type="text" name="field_${item?.field}" />`;
      } else if (item?.field === fieldsType?.LASTNAME) {
        formHTML += `<input type="text" name="field_${item?.field}" />`;
      } else if (item?.field === fieldsType?.EMAIL) {
        formHTML += `<input type="email" name="field_${item?.field}" />`;
      } else if (item?.field === fieldsType?.DATEPICKER) {
        formHTML += `<input type="datetime-local" name="field_${item?.field}" />`;
      } else if (item?.field === fieldsType?.PHONENUMBER) {
        formHTML += `<input type="number" name="field_${item?.field}" />`;
      } else if (item?.field === fieldsType?.ADDRESS) {
        formHTML += `<input type="text" name="field_${item?.field}" />`;
      } else if (item?.field === fieldsType?.PREFERREDLANGUAGE) {
        formHTML += `<select name="field_${item?.field}">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                         </select>`;
      }
      formHTML += `</div>`;
    });
    formHTML += '</form>';

    const payload: any = {
      name: formName,
      status: formStatus?.DRAFT,
      htmlTemplate: formHTML,
      successTemplate: '<p><b>Hi there!</b>Thank you for filling this form</p>',
    };
    if (createFormStyling) {
      payload.styling = createFormStyling;
    }
    try {
      const response = await postAddForm({ body: payload })?.unwrap();
      await enqueueSnackbar('Form created successfully', {
        variant: 'success',
      });
      if (response) {
        setCreatedFormResponse(response?.data);
        handleOpenAlertCreatedForm();
      }
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    isStylingDrawerOpen,
    handleOpenStylingDrawer,
    handleCloseStylingDrawer,
    styleFormMethods,
    handleStylingSubmit,
    resetStylingForm,
    createFormStyling,
    value,
    handleChange,
    editFormName,
    setEditFormName,
    showView,
    setShowView,
    inputValue,
    setInputValue,
    openAlertCreatedForm,
    handleCloseAlertCreatedForm,
    loadingAddForm,
    handleSubmitAddForm,
    showExportText,
    setShowExportText,
    router,
    addField,
    dynamicFields,
    deleteField,
    setDynamicFields,
    theme,
    createdFormResponse,
    handleBackToAllForms,
  };
};

export default useCreateForm;

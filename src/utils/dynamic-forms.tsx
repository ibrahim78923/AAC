import {
  RHFTextField,
  RHFRadioGroup,
  RHFMultiCheckbox,
  RHFDatePicker,
  RHFDropZone,
  RHFAutocomplete,
} from '@/components/ReactHookForm';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import * as Yup from 'yup';
import { ARRAY_INDEX } from '@/constants/strings';

export const generateUniqueId = () => {
  const timestamp = Date?.now()?.toString(36);
  const randomString = Math?.random()?.toString(36)?.substring(2, 7);
  return timestamp + randomString;
};

export const DYNAMIC_FORM_IDS = {
  DRAGGABLE_ID: 'draggable',
  DROPPABLE_ID: 'droppable',
};

export const DYNAMIC_FORM_CONSTANTS = {
  UNDEFINED: 'undefined',
};

export const DYNAMIC_FORM_FIELDS_TYPES = {
  OBJECT: 'object',
  LABEL: 'label',
  FILE_URL: 'fileUrl',
};

export const componentMap: any = {
  RHFTEXTFIELD: RHFTextField,
  RHFRADIOGROUP: RHFRadioGroup,
  RHFMULTICHECKBOX: RHFMultiCheckbox,
  RHFDATEPICKER: RHFDatePicker,
  RHFDROPZONE: RHFDropZone,
  RHFAUTOCOMPLETE: RHFAutocomplete,
};

export const FIELDS_CONSTANTS: any = {
  RHFTEXTFIELD: 'RHFTEXTFIELD',
  RHFRADIOGROUP: 'RHFRADIOGROUP',
  RHFMULTICHECKBOX: 'RHFMULTICHECKBOX',
  RHFDATEPICKER: 'RHFDATEPICKER',
  RHFDROPZONE: 'RHFDROPZONE',
  RHFAUTOCOMPLETE: 'RHFAUTOCOMPLETE',
};

export const DYNAMIC_FIELDS = {
  PT_SERVICES: 'SERVICES',
  PT_MARKETING: 'MARKETING',
  PT_SALES: 'SALES',
  MT_VENDOR: 'VENDOR',
  MT_SOFTWARE: 'SOFTWARE',
  MT_PURCHASE_ORDER: 'PURCHASE_ORDER',
  MT_TICKETS: 'TICKETS',
  MT_TIME_ENTRIES: 'TIME_ENTRIES',
  MT_TASK: 'TASK',
  MT_DEPARTMENT: 'DEPARTMENT',
  MT_ADD_REQUESTER: 'ADD_REQUESTER',
  MT_ADD_AGENT: 'ADD_AGENT',
  MT_ASSET_TYPE: 'ASSETS',
  MT_CONTRACT_TYPE: 'CONTRACTS',
};

export const isValidMongoId = (id: string) => /^[0-9a-fA-F]{24}$/?.test(id);

export const dynamicFormFieldsList = [
  {
    id: '0',
    title: 'Text',
    match: 'text',
    icon: <TextFormatIcon sx={{ color: 'custom.main' }} />,
    description: 'Single Line Text Area',
  },
  {
    id: '1',
    title: 'Paragraph Text',
    match: 'paragraphText',
    icon: <FormatListBulletedIcon sx={{ color: 'custom.main' }} />,
    description: 'Multi Line Text Area',
  },
  {
    id: '2',
    title: 'Single Selection',
    match: 'singleSelection',
    icon: <RadioButtonCheckedIcon sx={{ color: 'custom.main' }} />,
    description: 'Only one item with a radio button',
  },
  {
    id: '3',
    title: 'Multiple Selection',
    match: 'multipleSelection',
    icon: <CheckBoxIcon sx={{ color: 'custom.main' }} />,
    description: 'Multiple options using a checkbox',
  },
  {
    id: '4',
    title: 'Date',
    match: 'date',
    icon: <CalendarMonthIcon sx={{ color: 'custom.main' }} />,
    description: 'Select Date From Date Picker',
  },
  {
    id: '5',
    title: 'Upload',
    match: 'upload',
    icon: <CloudUploadIcon sx={{ color: 'custom.main' }} />,
    description: 'Send files via Documents and Media ',
  },
  {
    id: '6',
    title: 'Dropdown',
    match: 'dropdown',
    icon: <ArrowDropDownCircleIcon sx={{ color: 'custom.main' }} />,
    description: 'Add Dropdown List',
  },
];

export const dynamicFormModalsInitialState: any = {
  text: false,
  paragraphText: false,
  singleSelection: false,
  multipleSelection: false,
  date: false,
  upload: false,
  dropdown: false,
};

export const dynamicFormComponentToMatchMap: any = {
  RHFDATEPICKER: 'date',
  RHFAUTOCOMPLETE: 'dropdown',
  RHFMULTICHECKBOX: 'multipleSelection',
  RHFTEXTFIELD: ['text', 'paragraphText'],
  RHFRADIOGROUP: 'singleSelection',
  RHFDROPZONE: 'upload',
};

export const dynamicFormMapFormToBackendFormat = (form: any) => {
  return form?.map((field: any) => {
    return {
      label: field?.componentProps?.label,
      fieldType: field?.component,
      placeholder:
        field?.componentProps?.placeholder || field?.componentProps?.fileType,
      isRequired: field?.componentProps?.required,
      multiLine: field?.componentProps?.multiline,
      options: field?.componentProps?.options,
      dateformate: field?.componentProps?.format,
      ...(isValidMongoId(field?.id) && { Id: field?.id }),
    };
  });
};

export const dynamicFormValidationSchema = (form: any) => {
  const formSchema: any = form
    ?.map((item: any) => {
      let schema;

      if (item?.component === FIELDS_CONSTANTS?.RHFMULTICHECKBOX) {
        schema = Yup?.array()?.min(1, 'At least 1 Required');
      } else if (item?.component === FIELDS_CONSTANTS?.RHFDATEPICKER) {
        schema = Yup?.date()?.nullable();
      } else if (
        item?.component === FIELDS_CONSTANTS?.RHFDROPZONE ||
        item?.component === FIELDS_CONSTANTS?.RHFAUTOCOMPLETE
      ) {
        schema = Yup?.mixed()?.nullable();
      } else {
        schema = Yup?.string();
      }

      return item?.componentProps?.required
        ? {
            [item?.componentProps?.label]: schema?.required(
              `${item?.componentProps?.label} is Required`,
            ),
          }
        : null;
    })
    ?.filter((val: any) => val !== null)
    ?.reduce((acc: any, obj: any) => {
      const key: any = Object?.keys(obj)[ARRAY_INDEX?.ZERO];
      const value = obj[key];
      acc[key] = value;
      return acc;
    }, {});

  return formSchema;
};

export const dynamicFormInitialValue = (data?: any, form?: any) => {
  const initialValues: any = form
    ?.map((item: any) => {
      let initialValue: string | boolean | string[] | null | any;
      const key = item?.componentProps?.label;

      if (item?.component === FIELDS_CONSTANTS?.RHFMULTICHECKBOX) {
        initialValue = data?.customFields?.[key] ?? [];
      } else if (
        item?.component === FIELDS_CONSTANTS?.RHFDROPZONE ||
        item?.component === FIELDS_CONSTANTS?.RHFAUTOCOMPLETE
      ) {
        initialValue = data?.customFields?.[key] ?? null;
      } else if (item?.component === FIELDS_CONSTANTS?.RHFDATEPICKER) {
        initialValue = data?.customFields?.[key]
          ? new Date(data?.customFields?.[key])
          : null;
      } else {
        initialValue = data?.customFields?.[key] ?? '';
      }
      return { [key]: initialValue };
    })
    ?.filter(
      (item: any) =>
        Object?.keys(item)[ARRAY_INDEX?.ZERO] !==
        DYNAMIC_FORM_CONSTANTS?.UNDEFINED,
    )
    ?.reduce((acc: any, obj: any) => {
      const key: any = Object?.keys(obj)[ARRAY_INDEX?.ZERO];
      const value = obj[key];
      acc[key] = value;
      return acc;
    }, {});

  return initialValues;
};

export const dynamicAttachmentsPost = ({
  form,
  data,
  attachmentPromises,
  customFields,
  postAttachmentTrigger,
}: any) => {
  const attachments: any = form?.filter(
    (item: any) => item?.component === FIELDS_CONSTANTS?.RHFDROPZONE,
  );

  if (attachments?.length > 0) {
    for (const key of Object?.keys(attachments)) {
      const componentProps = attachments[key]?.componentProps;
      if (componentProps && componentProps?.label) {
        const label = componentProps?.label;
        const value = data[label];

        if (
          value !== undefined &&
          value != '' &&
          value != null &&
          !!!value?.fileUrl
        ) {
          const attachmentsFormData: any = new FormData();
          attachmentsFormData?.append('fileUrl', data[componentProps?.label]);
          attachmentsFormData?.append(
            'recordId',
            attachments[key]?.id as string,
          );

          const postAttachmentsParameters = {
            body: attachmentsFormData,
          };

          attachmentPromises?.push(
            postAttachmentTrigger({
              postAttachmentsParameters,
            })
              ?.unwrap()
              ?.then((attachmentsResponse: any) => {
                const responseData = attachmentsResponse?.data;
                if (responseData) {
                  if (!customFields[componentProps?.label]) {
                    customFields[componentProps?.label] = {};
                  }
                  customFields[componentProps?.label] = {
                    ...customFields[componentProps?.label],
                    ...responseData,
                  };
                }
              })
              ?.catch((error: any) => {
                throw new Error(error?.data?.message);
              }),
          );
        }
      }
    }
  }
};

export const isValidDate = (dateString: string) => {
  return !isNaN(Date.parse(dateString));
};

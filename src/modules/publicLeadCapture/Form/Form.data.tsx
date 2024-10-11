import { Box, Divider } from '@mui/material';
import {
  RHFTextField,
  RHFSelect,
  RHFDropZone,
} from '@/components/ReactHookForm';
import { fieldTypes } from '@/constants/form-builder';

export const getFieldComponent = (field: any) => {
  switch (field?.type) {
    case fieldTypes?.text:
    case fieldTypes?.textarea:
      return RHFTextField;
    case fieldTypes?.select:
      return RHFSelect;
    case fieldTypes?.file:
      return RHFDropZone;
    case fieldTypes?.space:
      const SpaceComponent = () => <Box sx={{ height: `${field?.space}px` }} />;
      return SpaceComponent;
    case fieldTypes?.divider:
      const DividerComponent = () => (
        <Divider
          sx={{
            borderBottomWidth: `${field?.dividerWidth}px`,
            borderColor: `${field?.dividerColor}`,
          }}
        />
      );
      return DividerComponent;
    default:
      return RHFTextField;
  }
};

export const formFieldsData = (data: any) => {
  const emailField = {
    component: RHFTextField,
    md: 12,
    componentProps: {
      name: 'emailAddress',
      label: 'Email Address',
      placeholder: 'Enter your email address',
      required: true,
    },
  };
  const transformData = data?.map((field: any) => ({
    component: getFieldComponent(field),
    md: 12,
    componentProps: {
      name: field?.name,
      label: field?.label,
      placeholder: field?.placeholder,
      required: field?.required === 'true' ? true : false,
      ...(field?.type === fieldTypes?.textarea && { rows: 3, multiline: true }),
      ...(field?.subtype && { type: field?.subtype }),
      ...(field?.type === fieldTypes?.select && { select: true }),
    },
    options: field?.values ?? [],
  }));

  return [emailField, ...transformData];
};

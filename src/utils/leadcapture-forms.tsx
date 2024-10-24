import { Box, Divider } from '@mui/material';
import ReactDOMServer from 'react-dom/server';
import * as Yup from 'yup';
import {
  RHFTextField,
  RHFSelect,
  RHFDropZone,
} from '@/components/ReactHookForm';
import { fieldTypes } from '@/constants/form-builder';
import { FE_BASE_URL } from '@/config';
import { PUBLIC_LEAD_CAPTURE } from '@/routesConstants/paths';

const getFieldComponent = (field: any) => {
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

export const validationSchema = (data: any) => {
  const schema: any = {
    emailAddress: Yup.string().email().required('Email Address is required'),
  };
  data?.forEach((field: any) => {
    if (
      field?.type === fieldTypes?.textarea ||
      field?.type === fieldTypes?.text
    ) {
      schema[field?.name] =
        field?.required === 'true'
          ? Yup?.string().nullable().required('Field is Required')
          : Yup.string().nullable();
    } else {
      schema[field?.name] =
        field?.required === 'true'
          ? Yup?.mixed()?.nullable().required('Field is Required')
          : Yup?.mixed()?.nullable();
    }
  });
  return Yup.object().shape(schema);
};

export const defaultValues = (data: any) => {
  const defaultValues: any = { emailAddress: '' };
  data?.forEach((field: any) => {
    defaultValues[field?.name] = field?.value ?? null;
  });
  return defaultValues;
};

export const generateFormFieldsData = (data: any) => {
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

export function renderIframeToString(
  id: string,
  width: string = '100%',
  height: string = '100%',
): string {
  return ReactDOMServer.renderToString(
    <iframe
      src={`${FE_BASE_URL}${PUBLIC_LEAD_CAPTURE?.EMBED_FORM}?id=${id}`}
      width={width}
      height={height}
      frameBorder="0"
    ></iframe>,
  );
}

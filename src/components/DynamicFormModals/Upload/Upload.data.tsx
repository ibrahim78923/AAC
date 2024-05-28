import * as Yup from 'yup';

export const fileTypeAcceptOptions = [
  { _id: 1, label: 'PNG' },
  { _id: 2, label: 'JPEG' },
  { _id: 3, label: 'GIF' },
  { _id: 4, label: 'PDF' },
  { _id: 5, label: 'MS Word' },
  { _id: 6, label: 'DOCX' },
  { _id: 7, label: 'MS Excel' },
  { _id: 8, label: 'CSV' },
];

export const validationSchema: any = Yup?.object()?.shape({
  name: Yup?.string()?.trim()?.required('Field Name is Required'),
  placeholder: Yup?.string()?.trim(),
  fileTypeAccept: Yup?.array()?.min(1, 'At least One File Type is Required'),
  size: Yup?.number()
    ?.typeError('Must be a Number')
    ?.positive('Must be above 0')
    ?.required('Size is Required'),
  required: Yup?.boolean()?.nullable(),
});

export const defaultValues: any = {
  name: '',
  placeholder: '',
  fileTypeAccept: [],
  size: 2,
  required: false,
};

export const fileTypeMapping: any = {
  PNG: {
    'image/png': ['.png', '.PNG'],
  },
  JPEG: {
    'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
  },
  GIF: {
    'image/gif': ['.gif', '.GIF'],
  },
  PDF: {
    'application/pdf': ['.pdf'],
  },
  'MS Word': {
    'application/msword': ['.doc'],
  },
  DOCX: {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
      '.docx',
    ],
  },
  'MS Excel': {
    'application/vnd.ms-excel': ['.xls', '.xlsx'],
  },
  CSV: {
    'text/csv': ['.csv'],
  },
};

import * as Yup from 'yup';

export const attachmentFormDefaultFormValues = {
  attachments: null,
};
export const attachmentFormSchemaFunction: any = Yup.object().shape({
  attachments: Yup.mixed().nullable().required('this is reui'),
});

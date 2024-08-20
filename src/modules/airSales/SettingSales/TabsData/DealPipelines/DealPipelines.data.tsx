import {
  dynamicFormInitialValue,
  dynamicFormValidationSchema,
} from '@/utils/dynamic-forms';
import * as Yup from 'yup';

interface DealStage {
  name: string;
  probability: number | string;
}

export const dealPipelinesvalidationSchema = (form: any) => {
  const formSchema: any = dynamicFormValidationSchema(form);
  return Yup?.object()?.shape({
    dealStages: Yup?.array()
      ?.of(
        Yup?.object()?.shape({
          name: Yup?.string()?.required('Field is Required'),
          probability: Yup?.string()?.required('Field is Required'),
        }),
      )
      ?.required('At least one deal stage is required'),
    pipelineName: Yup?.string()?.required('Field is Required'),
    defaultPipeline: Yup?.boolean()?.optional(),
    ...formSchema,
  });
};

export const dealPipelinesDefaultValues = (data?: any, form?: any) => {
  const initialValues: any = dynamicFormInitialValue(data, form);
  return {
    dealStages:
      data?.stages?.length > 1
        ? data?.stages?.map(
            ({
              name,
              probability,
            }: {
              name: string;
              probability: DealStage;
            }) => ({
              name,
              probability,
            }),
          )
        : [
            { name: 'New', probability: data?.stages[0]?.probability ?? '' },
            { name: 'Lost', probability: data?.stages[1]?.probability ?? '' },
            { name: 'Won', probability: data?.stages[2]?.probability ?? '' },
          ],
    pipelineName: data?.name ?? '',
    defaultPipeline: data?.isDefault ?? false,
    ...initialValues,
  };
};

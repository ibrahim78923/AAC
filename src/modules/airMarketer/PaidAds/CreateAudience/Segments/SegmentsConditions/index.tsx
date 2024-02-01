import React from 'react';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@mui/material';
import useSegmentsConditions from './useSegmentsConditions';

const SegmentsConditions = ({}: any) => {
  const { methods } = useSegmentsConditions();

  // const { handleSubmit } = methods;

  // const onSubmit = () => { };

  const formValues = [
    {
      componentProps: {
        name: 'field',
        label: 'Field',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ALL', label: 'All' },
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Published' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'field',
        label: 'Select operator',
        fullWidth: true,
        select: true,
      },
      options: [
        { value: 'ALL', label: 'All' },
        { value: 'DRAFT', label: 'Draft' },
        { value: 'PUBLISHED', label: 'Published' },
      ],
      component: RHFSelect,
      md: 12,
    },
    {
      componentProps: {
        name: 'audience',
        placeholder: 'Enter Value',
      },
      options: [{ label: 'label', value: 'value' }],
      component: RHFTextField,
    },
  ];

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={1}>
        {formValues?.map((item: any) => (
          <Grid item xs={12} md={item?.md} key={uuidv4()}>
            <item.component {...item.componentProps} size={'small'}>
              {item?.componentProps?.select &&
                item?.options?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
            </item.component>
          </Grid>
        ))}
      </Grid>
    </FormProvider>
  );
};

export default SegmentsConditions;

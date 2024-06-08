import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  validationSchema,
  defaultValues,
  getFormFields,
} from './NewContact.data';
import { Grid } from '@mui/material';

export default function NewContact() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const formFields = getFormFields();

  const onSubmit = async () => {
    reset();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {formFields?.map((item: any) => (
          <Grid item xs={12} key={item?.id}>
            <item.component {...item?.componentProps} size={'small'} />
          </Grid>
        ))}
      </Grid>
    </FormProvider>
  );
}

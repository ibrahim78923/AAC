import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import * as Yup from 'yup';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Button, Avatar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useLazyGetOrganizationsQuery,
  useLazyGetProductsQuery,
} from '@/services/dropdowns';

export const validationSchema = Yup?.object()?.shape({
  singleSelect: Yup?.mixed()?.nullable()?.required('Required'),
  singleSelectAvatar: Yup?.mixed()?.nullable()?.required('Required'),
  multiSelect: Yup?.mixed()?.nullable()?.required('Required'),
  multiSelectAvatar: Yup?.mixed()?.nullable()?.required('Required'),
  button: Yup?.mixed()?.nullable()?.required('Required'),
});

export const defaultValues: any = {
  singleSelect: null,
  singleSelectAvatar: null,
  multiSelect: [],
  multiSelectAvatar: [],
  button: null,
};

export const getDataArray = (
  apiQueryOrganizations: any,
  apiQueryProducts: any,
) => {
  return [
    {
      id: 1,
      componentProps: {
        name: 'singleSelect',
        label: 'Single Select',
        fullWidth: true,
        apiQuery: apiQueryOrganizations,
      },
      component: RHFAutocompleteAsync,
    },
    {
      id: 2,
      componentProps: {
        name: 'singleSelectAvatar',
        label: 'Single Select Avatar',
        fullWidth: true,
        apiQuery: apiQueryProducts,
        renderOption: (option: any) => (
          <Avatar src={option?.src} sx={{ color: 'primary.main', mr: 1 }} />
        ),
      },
      component: RHFAutocompleteAsync,
    },
    {
      id: 3,
      componentProps: {
        name: 'multiSelect',
        label: 'Multi Select',
        fullWidth: true,
        multiple: true,
        apiQuery: apiQueryOrganizations,
      },
      component: RHFAutocompleteAsync,
    },
    {
      id: 4,
      componentProps: {
        name: 'multiSelectAvatar',
        label: 'Multi Select Avatar',
        fullWidth: true,
        multiple: true,
        apiQuery: apiQueryProducts,
        renderOption: (option: any) => (
          <Avatar src={option?.src} sx={{ color: 'primary.main', mr: 1 }} />
        ),
      },
      component: RHFAutocompleteAsync,
    },
    {
      id: 5,
      componentProps: {
        name: 'button',
        label: 'Button',
        fullWidth: true,
        apiQuery: apiQueryProducts,
      },
      component: RHFAutocompleteAsync,
    },
  ];
};

const DemoAsyncAutoComplete = () => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  const apiQueryOrganizations = useLazyGetOrganizationsQuery();
  const apiQueryProducts = useLazyGetProductsQuery();

  const dataArray = getDataArray(apiQueryOrganizations, apiQueryProducts);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {dataArray?.map((item: any) => (
          <Grid item xs={12} key={item?.id}>
            <item.component {...item?.componentProps} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type={'submit'} variant={'contained'}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default DemoAsyncAutoComplete;

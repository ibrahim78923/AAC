import { useForm } from 'react-hook-form';

import { Grid, MenuItem } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { FilterData, defaultValues } from './DealFilterDrawer.data';

import { v4 as uuidv4 } from 'uuid';

const DealFilterDrawer = ({
  setFilterVal,
  open,
  onClose,
  setIsFilter,
}: any) => {
  const methods: any = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    setFilterVal(values);
    setIsFilter(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {FilterData()?.map((obj: any) => (
            <Grid item xs={12} key={uuidv4()}>
              <obj.component
                fullWidthcomponent
                size={'small'}
                SelectProps={{ sx: { borderRadius: '8px' } }}
                {...obj?.componentProps}
              >
                {obj?.componentProps?.select
                  ? obj.options?.map((option: any) => (
                      <MenuItem key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </MenuItem>
                    ))
                  : null}
              </obj.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default DealFilterDrawer;

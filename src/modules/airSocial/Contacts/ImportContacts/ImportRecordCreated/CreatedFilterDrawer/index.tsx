import { useForm } from 'react-hook-form';

import { Grid, MenuItem } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { FilterData } from './ContactsFilterDrawer.data';

import { v4 as uuidv4 } from 'uuid';

const CreatedFilterDrawer = ({ open, onClose }: any) => {
  const methods = useForm({});

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {FilterData?.map((obj) => (
            <Grid item xs={12} key={uuidv4()}>
              <obj.component
                fullWidth
                size={'small'}
                SelectProps={{ sx: { borderRadius: '8px' } }}
                {...obj?.componentProps}
              >
                {obj?.componentProps?.select
                  ? obj?.options?.map((option) => (
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

export default CreatedFilterDrawer;

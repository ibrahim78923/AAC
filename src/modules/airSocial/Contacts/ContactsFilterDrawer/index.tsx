import { Grid, MenuItem } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { FilterData } from './ContactsFilterDrawer.data';
import { v4 as uuidv4 } from 'uuid';
import useFilterDrawer from './useFilterDrawer';

const ContactsFilterDrawer = ({ open, onClose, onSubmit, methods }: any) => {
  const { contactOwnerData, lifeCycleStagesData, contactStatusData } =
    useFilterDrawer();

  const formFields = FilterData(
    contactOwnerData,
    lifeCycleStagesData,
    contactStatusData,
  );

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
      submitHandler={onSubmit}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {formFields?.map((obj) => (
            <Grid item xs={12} key={uuidv4()}>
              <obj.component
                fullWidth
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

export default ContactsFilterDrawer;

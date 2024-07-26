import { Grid, MenuItem } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterData } from './ContactsFilterDrawer.data';
import useFilterDrawer from './useFilterDrawer';
import { FormFieldI } from './ContactsFilterDrawer.interface';

const ContactsFilterDrawer = ({
  open,
  onClose,
  onSubmit,
  methods,
  isLoading,
}: any) => {
  const { orgId, contactOwnerData, lifeCycleStagesData, contactStatusData } =
    useFilterDrawer();

  const formFields = FilterData(
    orgId,
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
      isLoading={isLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {formFields?.map((obj: FormFieldI) => (
            <Grid item xs={12} key={obj?.componentProps?.name}>
              <obj.component
                fullWidth
                size={'small'}
                SelectProps={{ sx: { borderRadius: '8px' } }}
                {...obj?.componentProps}
              >
                {obj?.componentProps?.select
                  ? obj.options?.map((option: any) => (
                      <MenuItem key={option?.value} value={option?.value}>
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

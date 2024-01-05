import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRules } from './useUpsertRules';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { attributesOption } from './UpsertRules.data';

export const UpsertRules = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    closeUpsertRule,
    handleSubmit,
    submitUpsertRuleForm,
    upsertRuleMethod,
    upsertRulesFormFields,
    watchForAttribute,
  } = useUpsertRules(props);

  return (
    <CommonDrawer
      isOk={!!watchForAttribute}
      isDrawerOpen={isDrawerOpen}
      onClose={() => closeUpsertRule?.()}
      okText="Save"
      title="Create Rules"
      submitHandler={() => handleSubmit(submitUpsertRuleForm)()}
      cancelText={'Cancel'}
      isCancel={!!watchForAttribute}
      footer
    >
      <Box mt={1}>
        <FormProvider methods={upsertRuleMethod}>
          <Grid container mb={1}>
            <Grid item xs={12}>
              <RHFAutocomplete
                name="attribute"
                label="Select attribute"
                options={attributesOption}
                placeholder="Select"
                size={'small'}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {upsertRulesFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

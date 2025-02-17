import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRules } from './useUpsertRules';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { attributesOption } from './UpsertRules.data';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

const UpsertRules = () => {
  const {
    closePortal,
    handleSubmit,
    submitUpsertRuleForm,
    methods,
    upsertRulesFormFields,
    watchForAttribute,
    apiCallInProgress,
    isPortalOpen,
  } = useUpsertRules();

  return (
    <CommonDrawer
      isOk={!!watchForAttribute}
      isDrawerOpen={isPortalOpen?.isOpen}
      onClose={closePortal}
      okText="Save"
      title={isPortalOpen?.action}
      submitHandler={handleSubmit(submitUpsertRuleForm)}
      isCancel={!!watchForAttribute}
      footer
      isLoading={apiCallInProgress}
      isDisabled={apiCallInProgress}
      disabledCancelBtn={apiCallInProgress}
    >
      <FormProvider methods={methods}>
        <ContainerGrid>
          <CustomGrid>
            <RHFAutocomplete
              name="attribute"
              label="Select attribute"
              options={attributesOption}
              getOptionLabel={(option: any) => option?.label}
              placeholder="Select attribute"
              size={'small'}
            />
          </CustomGrid>
          {!!!watchForAttribute?._id ? (
            <></>
          ) : (
            upsertRulesFormFields?.map((item: any) => (
              <CustomGrid md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </CustomGrid>
            ))
          )}
        </ContainerGrid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default UpsertRules;

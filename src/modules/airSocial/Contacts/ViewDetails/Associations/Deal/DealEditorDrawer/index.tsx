import { Box, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { dealDataArray, existingDealDataArray } from './DealEditorDrawer.data';
import { DEAL_TYPE } from '../Deal.data';
import useDealEditorDrawer from './useDealEditorDrawer';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const DealEditorDrawer = (props: any) => {
  const {
    isOpen,
    onClose,
    title,
    methodsNewDeal,
    isDisabledFields,
    dealPipeline,
    dealOwners,
    dealStages,
    handleOnSubmit,
    isLoading,
    orgId,
    addLineItems,
    dealType,
    handleChangeDealType,
    methodsExistingDeal,
  } = props;

  const { dealsListData } = useDealEditorDrawer();

  const formFields = dealDataArray(
    orgId,
    dealPipeline,
    dealStages,
    dealOwners,
    addLineItems,
    isDisabledFields,
  );
  const formExistingDealFields = existingDealDataArray(dealsListData);

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      onClose={onClose}
      title={`${title} Deal`}
      okText={
        dealType === DEAL_TYPE?.NEW_DEAL
          ? GENERIC_UPSERT_FORM_CONSTANT?.CREATE
          : title
      }
      isOk={true}
      footer={title === 'View' ? false : true}
      submitHandler={handleOnSubmit}
      isLoading={isLoading}
    >
      <Box>
        {title === 'Add' && (
          <Grid container sx={{ mb: '8px' }}>
            <Grid item xs={12}>
              <RadioGroup
                name="dealType"
                onChange={handleChangeDealType}
                value={dealType}
                row
              >
                <FormControlLabel
                  value={DEAL_TYPE?.NEW_DEAL}
                  control={<Radio />}
                  label="New Deal"
                />
                <FormControlLabel
                  value={DEAL_TYPE?.EXISTING}
                  control={<Radio />}
                  label="Existing Deal"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        )}
        {dealType === DEAL_TYPE?.EXISTING && (
          <FormProvider methods={methodsExistingDeal}>
            <Grid container spacing={1}>
              {formExistingDealFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        )}
        {dealType === DEAL_TYPE?.NEW_DEAL && (
          <FormProvider methods={methodsNewDeal}>
            <Grid container spacing={1}>
              {formFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        )}
      </Box>
    </CommonDrawer>
  );
};

export default DealEditorDrawer;

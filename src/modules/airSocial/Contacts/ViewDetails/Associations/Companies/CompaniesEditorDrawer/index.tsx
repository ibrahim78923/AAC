import { Box, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import {
  FORM_TYPE,
  companiesDataArray,
  existingCompanyDataArray,
} from './CompaniesEditorDrawer.data';
import useCompaniesEditorDrawer from './useCompaniesEditorDrawer';
import { DRAWER_TITLE } from './CompaniesEditorDrawer.data';

const CompaniesEditorDrawer = (props: any) => {
  const {
    title,
    isOpen,
    onClose,
    methodsNewCompany,
    methodsExistingCompany,
    companyOwners,
    disabledField,
    handleOnSubmit,
    handleChangeFormType,
    formType,
    isLoading,
  } = props;

  const { companiesListData } = useCompaniesEditorDrawer();

  const formFields = companiesDataArray(companyOwners, disabledField);
  const formExistingCompanyFields = existingCompanyDataArray(companiesListData);

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isOpen}
        onClose={onClose}
        title={`${title} Company`}
        okText={'Add'}
        isOk={true}
        footer={title === DRAWER_TITLE?.VIEW ? false : true}
        submitHandler={handleOnSubmit}
        isLoading={isLoading}
      >
        <Box sx={{ pt: 2 }}>
          {title === DRAWER_TITLE?.ADD && (
            <Grid container sx={{ mb: '8px' }}>
              <Grid item xs={12}>
                <RadioGroup
                  name="formType"
                  onChange={handleChangeFormType}
                  value={formType}
                  row
                >
                  <FormControlLabel
                    value={FORM_TYPE?.NEW_COMPANY}
                    control={<Radio />}
                    label="New Company"
                  />
                  <FormControlLabel
                    value={FORM_TYPE?.EXISTING}
                    control={<Radio />}
                    label="Existing Company"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          )}
          {formType === FORM_TYPE?.EXISTING && (
            <FormProvider methods={methodsExistingCompany}>
              <Grid container spacing={1}>
                {formExistingCompanyFields?.map((item: any) => (
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
          {formType === FORM_TYPE?.NEW_COMPANY && (
            <FormProvider methods={methodsNewCompany}>
              <Grid container spacing={'22px'}>
                {formFields?.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.componentProps?.name}
                  >
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
    </div>
  );
};

export default CompaniesEditorDrawer;

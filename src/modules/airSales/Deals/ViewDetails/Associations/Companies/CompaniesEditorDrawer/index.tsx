import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFRadioGroup,
  RHFSearchableSelect,
} from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

import {
  companiesDataArray,
  companiesOptions,
  drawerButtonTitle,
  drawerTitle,
} from './CompaniesEditorDrawer.data';
import useCompaniesEditorDrawer from './useCompaniesEditorDrawer';

const CompaniesEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, dealId, companyRecord } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsCompanies,
    getCompanyContacts,
    watchCompany,
    postCompanyLoading,
    companyOptions,
  } = useCompaniesEditorDrawer({
    openDrawer,
    setOpenDrawer,
    dealId,
    companyRecord,
  });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        submitHandler={handleSubmit(onSubmit)}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
        isLoading={postCompanyLoading}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider methods={methodsCompanies}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFRadioGroup
                  options={companiesOptions}
                  name="company"
                  label={false}
                  defaultValue="new-Company"
                />
              </Grid>
              {watchCompany === 'new-Company' ? (
                companiesDataArray(getCompanyContacts)?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    <item.component
                      disabled={openDrawer === 'View' ? true : false}
                      {...item?.componentProps}
                      size={'small'}
                    >
                      {item?.componentProps?.select
                        ? item?.options?.map((option: any) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))
                        : null}
                    </item.component>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <RHFSearchableSelect
                    size="small"
                    name="chooseCompany"
                    options={companyOptions}
                  />
                </Grid>
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default CompaniesEditorDrawer;

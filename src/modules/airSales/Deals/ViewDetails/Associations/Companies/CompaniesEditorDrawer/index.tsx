import { Box, Grid, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  FormProvider,
  RHFRadioGroup,
  RHFSearchableSelect,
} from '@/components/ReactHookForm';

import {
  companiesDataArray,
  companiesOptions,
  drawerButtonTitle,
  drawerTitle,
} from './CompaniesEditorDrawer.data';
import useCompaniesEditorDrawer from './useCompaniesEditorDrawer';
import { DRAWER_ACTIONS_TITLES } from '@/constants/strings';

const CompaniesEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, dealId, companyRecord } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsCompanies,
    watchCompany,
    postCompanyLoading,
    getCompanyContactsList,
    companyOptions,
    createAssociationLoading,
    theme,
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
        footer={openDrawer === DRAWER_ACTIONS_TITLES?.VIEW ? false : true}
        isLoading={postCompanyLoading || createAssociationLoading}
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
                  disabled={
                    openDrawer === DRAWER_ACTIONS_TITLES?.VIEW ? true : false
                  }
                />
              </Grid>
              {watchCompany === 'new-Company' ? (
                companiesDataArray(getCompanyContactsList)?.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.componentProps?.name}
                  >
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
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={theme?.palette?.grey[600]}
                  >
                    Choose Contact{' '}
                    <span style={{ color: theme?.palette?.error?.main }}>
                      *
                    </span>
                  </Typography>
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

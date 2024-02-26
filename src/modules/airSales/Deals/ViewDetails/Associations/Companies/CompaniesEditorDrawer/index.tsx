import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider, RHFRadioGroup } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

import {
  companiesDataArray,
  companiesOptions,
  drawerButtonTitle,
  drawerTitle,
} from './CompaniesEditorDrawer.data';
import useCompaniesEditorDrawer from './useCompaniesEditorDrawer';
import Search from '@/components/Search';

const CompaniesEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsCompanies,
    getCompanyContacts,
    watchCompany,
    searchTicket,
    setSearchTicket,
  } = useCompaniesEditorDrawer(openDrawer);

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
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider
            methods={methodsCompanies}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RHFRadioGroup
                  options={companiesOptions}
                  name={'companyStatus'}
                  label={false}
                />
              </Grid>
              {watchCompany[0] === 'new-Company' ? (
                companiesDataArray(getCompanyContacts)?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
                ))
              ) : (
                <Grid item xs={12}>
                  <Search
                    searchBy={searchTicket}
                    setSearchBy={setSearchTicket}
                    label="Search Products"
                    size="medium"
                    fullWidth
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

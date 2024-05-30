import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { companiesDataArray } from './CompaniesEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';

const CompaniesEditorDrawer = (props: any) => {
  const {
    title,
    isOpen,
    onClose,
    methods,
    companyOwners,
    disabledField,
    handleOnSubmit,
  } = props;

  const formFields = companiesDataArray(companyOwners, disabledField);

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isOpen}
        onClose={onClose}
        title={`${title} Company`}
        okText={'Add'}
        isOk={true}
        footer={title === 'View' ? false : true}
        submitHandler={handleOnSubmit}
      >
        <Box sx={{ pt: 2 }}>
          <FormProvider methods={methods}>
            <Grid container spacing={'22px'}>
              {formFields?.map((item: any) => (
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
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default CompaniesEditorDrawer;

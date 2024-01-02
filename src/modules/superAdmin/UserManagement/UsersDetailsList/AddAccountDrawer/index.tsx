import { Grid, Box } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import { AddAccountArray } from './AddAccountDrawer.data';

import { v4 as uuidv4 } from 'uuid';
import useAddAccountDrawer from './useAddAccountDrawer';

const AddAccountDrawer = (props: any) => {
  const { isOpen, setIsOpen } = props;
  const { handleSubmit, onSubmit, methods, companyAccounts, companyRoles } =
    useAddAccountDrawer(props);

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      title="Add Account"
      okText="Add"
      isOk={true}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {AddAccountArray(companyAccounts, companyRoles)?.map(
              (item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ),
            )}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddAccountDrawer;

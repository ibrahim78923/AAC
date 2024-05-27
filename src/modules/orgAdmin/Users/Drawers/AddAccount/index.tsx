import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { AddAccountArray } from './AddAccount.data';
import useAddAccount from './useAddAccount';

const AddAccount = (props: any) => {
  const { isOpen, employeeDataById, setIsOpenAddAccountDrawer } = props;
  const { handleSubmit, onSubmit, methods, companyRoleParams } = useAddAccount(
    employeeDataById,
    setIsOpenAddAccountDrawer,
  );

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      onClose={() => setIsOpenAddAccountDrawer(false)}
      title="Add Account"
      okText="Add"
      isOk={true}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {AddAccountArray(companyRoleParams)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddAccount;

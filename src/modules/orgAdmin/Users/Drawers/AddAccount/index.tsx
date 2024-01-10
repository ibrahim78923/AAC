import { Grid, Box, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import { AddAccountArray } from './AddAccount.data';

import { v4 as uuidv4 } from 'uuid';
import useAddAccount from './useAddAccount';

const AddAccount = (props: any) => {
  const { isOpen, employeeDataById, setIsOpenAddAccountDrawer } = props;
  const { handleSubmit, onSubmit, methods, companyRoles } = useAddAccount(
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
            {AddAccountArray(companyRoles)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddAccount;

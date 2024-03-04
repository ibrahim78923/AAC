import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { addAccountsForm } from './AddBankAccounts.data';
import useAddBankAccounts from './useAddBankAccounts';

const AddBankAccounts = (props: any) => {
  const { isOpenAddAccountDrawer, setIsOpenAddAccountDrawer, setCheckedRows } =
    props;
  const { methods, handleSubmit, onSubmit, reset, companyAccounts } =
    useAddBankAccounts(
      setIsOpenAddAccountDrawer,
      isOpenAddAccountDrawer,
      setCheckedRows,
    );

  return (
    <CommonDrawer
      isDrawerOpen={isOpenAddAccountDrawer?.isToggle}
      onClose={() => {
        setIsOpenAddAccountDrawer(false);
        reset();
      }}
      title="Add Bank Account"
      okText="Add"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <FormProvider>
        <Grid container spacing={1} mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {addAccountsForm(companyAccounts)?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default AddBankAccounts;

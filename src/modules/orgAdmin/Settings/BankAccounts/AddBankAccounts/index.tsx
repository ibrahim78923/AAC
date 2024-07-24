import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Skeleton } from '@mui/material';
import { addAccountsForm } from './AddBankAccounts.data';
import useAddBankAccounts from './useAddBankAccounts';
import { DRAWER_TYPES } from '@/constants/strings';

interface DrawerInterface {
  isToggle: boolean;
  type: string;
  recId: string;
}
interface AddBankAccountsI {
  setIsOpenAddAccountDrawer: (value: DrawerInterface) => void;
  isOpenAddAccountDrawer: DrawerInterface;
  setCheckedRows: (value: string[]) => void;
}
const AddBankAccounts = (props: AddBankAccountsI) => {
  const { isOpenAddAccountDrawer, setIsOpenAddAccountDrawer, setCheckedRows } =
    props;

  const {
    updateReceiverAccountLoading,
    postReceiverAccountLoading,
    editAccountLoading,
    handleSubmit,
    onSubmit,
    methods,
    reset,
  } = useAddBankAccounts(
    setIsOpenAddAccountDrawer,
    setCheckedRows,
    isOpenAddAccountDrawer,
  );

  return (
    <CommonDrawer
      isDrawerOpen={isOpenAddAccountDrawer?.isToggle}
      onClose={() => {
        setIsOpenAddAccountDrawer({
          ...isOpenAddAccountDrawer,
          isToggle: false,
        });
        reset();
      }}
      title={
        isOpenAddAccountDrawer?.type === DRAWER_TYPES?.EDIT
          ? 'Edit Bank Account'
          : 'Add Bank Account'
      }
      okText={
        isOpenAddAccountDrawer?.type === DRAWER_TYPES?.EDIT ? 'Update' : 'Add'
      }
      isOk
      submitHandler={handleSubmit(onSubmit)}
      footer
      isLoading={updateReceiverAccountLoading || postReceiverAccountLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2} width="100%">
          {addAccountsForm()?.map((item: any) => (
            <Grid
              item
              xs={12}
              md={item?.md}
              key={item.componentProps?.name}
              width="100%"
            >
              {editAccountLoading ? (
                <Skeleton
                  sx={{ width: '100%' }}
                  height={46}
                  variant="rectangular"
                  animation="wave"
                />
              ) : (
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default AddBankAccounts;

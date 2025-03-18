import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { AddAccountArray } from './AddAccountDrawer.data';
import useAddAccountDrawer from './useAddAccountDrawer';
import { AddAccountDrawerProps } from '@/modules/superAdmin/UserManagement/UsersDetailsList/UsesDetailList-interface';

const AddAccountDrawer = (props: AddAccountDrawerProps) => {
  const {
    isOpen,
    setIsOpen,
    organizationBasesProducts,
    organizationId,
    userId,
  } = props;
  const { handleSubmit, onSubmit, methods, companyRoleParams, productValue } =
    useAddAccountDrawer(userId, setIsOpen, organizationId);

  const addAccountArrayParams = {
    companyRoleParams,
    organizationBasesProducts,
    organizationId,
    productId: productValue?._id,
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      title="Assign Account"
      okText="Assign"
      isOk={true}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {AddAccountArray(addAccountArrayParams)?.map((item: any) => (
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

export default AddAccountDrawer;

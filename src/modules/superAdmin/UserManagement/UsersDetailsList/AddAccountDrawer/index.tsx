import { Grid, Box } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';

import {
  AddAccountArray,
  AddAccountDefaultValues,
  AddAccountValidationSchema,
} from './AddAccountDrawer.data';

import { v4 as uuidv4 } from 'uuid';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { enqueueSnackbar } from 'notistack';
import { usePostUsersAccountMutation } from '@/services/superAdmin/user-management/UserList';
import { CommonAPIS } from '@/services/common-APIs';
import { useGetPermissionsRolesQuery } from '@/services/orgAdmin/roles-and-rights';

const AddAccountDrawer = (props: any) => {
  const { isOpen, setIsOpen, organizationId, userId } = props;
  const [postUsersAccount] = usePostUsersAccountMutation();

  const methods: any = useForm({
    resolver: yupResolver(AddAccountValidationSchema),
    defaultValues: AddAccountDefaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const organizationValue = watch('company');

  const onSubmit = async (values: any) => {
    values.user = userId;
    try {
      postUsersAccount({ id: organizationId, body: values });
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
      reset();
    } catch (error: any) {
      enqueueSnackbar(error?.message, {
        variant: 'error',
      });
    }
  };

  const { useGetCompanyAccountsQuery } = CommonAPIS;
  const { data: companyAccounts } = useGetCompanyAccountsQuery({
    orgId: organizationId,
  });
  const params = {
    page: 1,
    limit: 10,
    organizationCompanyAccountId: organizationValue,
  };
  const { data: companyRoles } = useGetPermissionsRolesQuery(params);

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

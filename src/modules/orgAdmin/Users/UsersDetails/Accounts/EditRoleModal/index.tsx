import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetCompanyAccountsRolesListQuery } from '@/services/common-APIs';
import { useUpdateAccountRoleMutation } from '@/services/superAdmin/user-management/UserList';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

const EditRoleModal = (props: any) => {
  const { editRoleModal, setEditRoleModal } = props;

  const [UpdateAccountRole, { isLoading: updateRoleLoading }] =
    useUpdateAccountRoleMutation();

  const methods = useForm({
    defaultValues: {
      role: editRoleModal?.data?.role,
    },
  });

  const { handleSubmit } = methods;

  const companyRoleParams = {
    organizationCompanyAccountId: editRoleModal?.data?.company?._id,
    productId: editRoleModal?.data?.product?._id,
  };

  const companyRoles = useLazyGetCompanyAccountsRolesListQuery();

  const onSubmit = async (data: any) => {
    try {
      await UpdateAccountRole({
        id: editRoleModal?.data?._id,
        body: {
          role: data?.role?._id,
        },
      })?.unwrap();
      setEditRoleModal({ isOpen: false, data: {} });
      enqueueSnackbar('Account role updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
  };

  return (
    <CommonModal
      open={editRoleModal?.isOpen}
      title="Edit Role"
      handleClose={() => setEditRoleModal({ isOpen: false, data: {} })}
      handleCancel={() => setEditRoleModal({ isOpen: false, data: {} })}
      footer={true}
      okText="Update"
      cancelText="Cancel"
      handleSubmit={handleSubmit(onSubmit)}
      isLoading={updateRoleLoading}
    >
      <FormProvider methods={methods}>
        <RHFAutocompleteAsync
          name="role"
          label="Manage Role"
          placeholder="Select Role"
          apiQuery={companyRoles}
          getOptionLabel={(option: any) => option?.name}
          externalParams={companyRoleParams}
          size="small"
        />
      </FormProvider>
    </CommonModal>
  );
};

export default EditRoleModal;

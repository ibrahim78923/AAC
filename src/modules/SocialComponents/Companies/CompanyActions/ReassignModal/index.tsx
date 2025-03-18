import { AlertModals } from '@/components/AlertModals';
import { AssignCommonIcon } from '@/assets/icons';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useReassignModal from './useReassignModal';
import { useChangeCompanyOwnerMutation } from '@/services/commonFeatures/companies';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useLazyGetCompaniesContactsAsyncQuery } from '@/services/common-APIs';

const ReassignModal = ({
  isReassign,
  setIsReassign,
  checkedRows,
  setCheckedRows,
}: any) => {
  const { methods, seletedContact, params } = useReassignModal();
  const [changeCompanyOwner] = useChangeCompanyOwnerMutation();

  const apiQueryUsers = useLazyGetCompaniesContactsAsyncQuery?.();

  return (
    <AlertModals
      typeImage={<AssignCommonIcon />}
      message={
        <FormProvider methods={methods}>
          <RHFAutocompleteAsync
            label="Company Owner"
            name="companyOwner"
            fullWidth
            apiQuery={apiQueryUsers}
            externalParams={params}
            size="small"
            placeholder="Select user"
            getOptionLabel={(option: any) =>
              `${option?.firstName + ' ' + option?.lastName}`
            }
          />
        </FormProvider>
      }
      type="Assign"
      open={isReassign}
      cancelBtnText="Cancel"
      submitBtnText="Update"
      handleClose={() => setIsReassign({ ...isReassign, reassignModal: false })}
      handleSubmitBtn={() => {
        if (checkedRows != null && seletedContact != null) {
          changeCompanyOwner({
            body: { id: checkedRows, ownerId: seletedContact?._id },
          });
          setIsReassign({ reassignModal: false });
          setCheckedRows([]);
          successSnackbar(`New owner has been assigned`);
        } else {
          errorSnackbar(`Please select company owner`);
        }
      }}
    />
  );
};

export default ReassignModal;

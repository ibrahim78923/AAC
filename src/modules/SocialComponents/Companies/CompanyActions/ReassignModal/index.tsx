import { AlertModals } from '@/components/AlertModals';
import { AssignCommonIcon } from '@/assets/icons';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import useReassignModal from './useReassignModal';
import { useChangeCompanyOwnerMutation } from '@/services/commonFeatures/companies';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const ReassignModal = ({
  isReassign,
  setIsReassign,
  checkedRows,
  setCheckedRows,
}: any) => {
  const { methods, seletedContact, getCompanyContacts } = useReassignModal();
  const [changeCompanyOwner] = useChangeCompanyOwnerMutation();

  return (
    <AlertModals
      typeImage={<AssignCommonIcon />}
      message={
        <FormProvider methods={methods}>
          <RHFSelect
            name="companyOwner"
            label="Company Owner"
            select={true}
            size="small"
          >
            {getCompanyContacts?.data?.contacts?.map((item: any) => (
              <option key={uuidv4()} value={item?._id}>
                {`${item?.firstName} ${item?.lastName}`}
              </option>
            ))}
          </RHFSelect>
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
            body: { id: checkedRows, ownerId: seletedContact },
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

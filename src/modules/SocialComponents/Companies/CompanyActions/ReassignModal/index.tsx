import { AlertModals } from '@/components/AlertModals';
import { AssignCommonIcon } from '@/assets/icons';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const ReassignModal = ({ isReassign, setIsReassign }: any) => {
  const methods = useForm();

  const optionsArray = [
    { value: 'All Industries', label: 'All Industries' },
    { value: 'Computer Software', label: 'Computer Software' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Electronics', label: 'Electronics' },
  ];

  return (
    <AlertModals
      typeImage={<AssignCommonIcon />}
      message={
        <FormProvider methods={methods}>
          <RHFSelect
            name="reassign"
            label="Company Owner"
            select={true}
            size="small"
          >
            {optionsArray?.map((item: any) => (
              <option key={uuidv4()} value={item?.value}>
                {item?.label}
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
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
};

export default ReassignModal;

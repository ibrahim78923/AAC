import { MergeCompaniesIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const ExportModal = ({ setIsExport, isExport }: any) => {
  const methods = useForm();

  const optionsArray = [
    { value: 'All Industries', label: 'All Industries' },
    { value: 'Computer Software', label: 'Computer Software' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Electronics', label: 'Electronics' },
  ];

  return (
    <>
      <AlertModals
        typeImage={<MergeCompaniesIcon />}
        message={
          <FormProvider methods={methods}>
            <RHFSelect
              name="export"
              label="File Format"
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
        type="Export Record"
        open={isExport}
        cancelBtnText="Cancel"
        submitBtnText="Export"
        handleClose={() => setIsExport(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default ExportModal;

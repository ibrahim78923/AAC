import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { UseFormReturn } from 'react-hook-form';
import GetSoftwareContractDropdown from '../../../SoftwareFormFieldsDropdowns/GetSoftwareContractDropdown';

const UsersAllocate: React.FC<{
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void;
}> = ({ methods, onSubmit }) => {
  return (
    <FormProvider methods={methods} onSubmit={methods?.handleSubmit(onSubmit)}>
      <Box maxWidth={'sm'}>
        <GetSoftwareContractDropdown />
      </Box>
    </FormProvider>
  );
};

export default UsersAllocate;

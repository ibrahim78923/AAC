import { Box } from '@mui/material';
import { RHFAutocompleteAsync, FormProvider } from '@/components/ReactHookForm';
import { UseFormReturn } from 'react-hook-form';

const UsersAllocate: React.FC<{
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  contractDropdown: any;
}> = ({ methods, onSubmit, contractDropdown }) => {
  return (
    <FormProvider methods={methods} onSubmit={methods?.handleSubmit(onSubmit)}>
      <Box maxWidth={'sm'}>
        <RHFAutocompleteAsync
          name="contract"
          label="Contract"
          apiQuery={contractDropdown}
          getOptionLabel={(option: any) => option?.name}
          placeholder="Select Contract"
          size="small"
          required
        />
      </Box>
    </FormProvider>
  );
};

export default UsersAllocate;

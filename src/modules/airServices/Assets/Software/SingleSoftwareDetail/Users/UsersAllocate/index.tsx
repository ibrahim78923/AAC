import { Box } from '@mui/material';
import { RHFAutocompleteAsync, FormProvider } from '@/components/ReactHookForm';
import useUsersAdd from '../UsersAdd/useUsersAdd';

const UsersAllocate = ({ methods, onSubmit }: any) => {
  const { contractDropdown } = useUsersAdd();
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

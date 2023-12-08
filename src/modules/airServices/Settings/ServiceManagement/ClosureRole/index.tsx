import { Box, Button } from '@mui/material';
import { Header } from './Header';
import { useClosureRole } from './useClosureRole';
import { FormProvider } from '@/components/ReactHookForm';
import { IncidentServicesClosureRule } from './IncidentServicesClosureRule';

export const ClosureRole = () => {
  const { closureRoleMethods, handleSubmitClosureRole, reset } =
    useClosureRole();

  return (
    <FormProvider
      methods={closureRoleMethods}
      onSubmit={handleSubmitClosureRole}
    >
      <Header />
      <br />
      <IncidentServicesClosureRule />
      <Box display={'flex'} justifyContent={'end'} gap={1} mt={1}>
        <Button variant="contained" type="submit">
          Save
        </Button>
        <Button variant="outlined" onClick={() => reset()}>
          cancel
        </Button>
      </Box>
    </FormProvider>
  );
};

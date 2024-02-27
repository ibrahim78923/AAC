import { useForm } from 'react-hook-form';

import { Box } from '@mui/material';

import {
  FormProvider,
  RHFSwitchableDatepicker,
} from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';

const RestoreFilterDrawer = ({ open, onClose }: any) => {
  const methods = useForm({});

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
    >
      <FormProvider methods={methods}>
        <Box sx={{ my: '20px' }}>
          <RHFSwitchableDatepicker
            name="startDate"
            fullWidth
            label="Start Date"
          />
        </Box>
        <RHFSwitchableDatepicker
          name="closeDate"
          fullWidth
          label="Close Date"
        />
      </FormProvider>
    </CommonDrawer>
  );
};

export default RestoreFilterDrawer;

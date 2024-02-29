import { Grid } from '@mui/material';

import { Box } from '@mui/material';

import {
  FormProvider,
  RHFSwitchableDatepicker,
} from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';

import { filterFormFields } from './RestoreFilterDrawer.data';

const RestoreFilterDrawer = ({ open, onClose, handleSubmit, methods }: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="Filter"
      submitHandler={handleSubmit}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={'22px'}>
          {filterFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select
                  ? item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))
                  : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
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

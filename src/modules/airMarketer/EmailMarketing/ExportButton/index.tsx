import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useExportButton } from './useExportButton';
import { exportButtonFormFields } from './ExportButton.data';
import { v4 as uuidv4 } from 'uuid';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { useState } from 'react';

export const ExportButton = (props: any) => {
  const { isExportModalOpen, handleExportModalOpen } = props;
  const {
    methods,
    //  handleSubmit,
    //  onSubmit,
    radioGroup,
  } = useExportButton();
  const [datePickerVal, setDatePickerVal] = useState(new Date());

  return (
    <CommonDrawer
      title="Export"
      isOk={handleExportModalOpen}
      isDrawerOpen={isExportModalOpen}
      onClose={handleExportModalOpen}
      okText="Apply"
      cancelText={'Cancel'}
      footer
    >
      <Box mt={1}>
        <FormProvider
          methods={methods}
          // onSubmit={onSubmit(handleSubmit)}
        >
          <Grid container spacing={2}>
            {exportButtonFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
          {radioGroup === 'emails' && (
            <SwitchableDatepicker
              isCalendarOpen
              dateValue={datePickerVal}
              setDateValue={setDatePickerVal}
            />
          )}
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

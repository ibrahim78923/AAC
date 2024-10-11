import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useExportButton } from './useExportButton';
import { exportButtonFormFields } from './ExportButton.data';
import { v4 as uuidv4 } from 'uuid';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import { useEffect, useState } from 'react';
import { API_STATUS } from '@/constants';

export const ExportButton = (props: any) => {
  const { isExportModalOpen, handleExportModalOpen } = props;

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerVal, setDatePickerVal] = useState(new Date());

  const {
    methods,
    handleSubmit,
    onSubmit,
    radioGroup,
    lazyGetEmailMarketingListAsExportStatus,
    setDatePickerSubmitVal,
  } = useExportButton({ handleExportModalOpen });

  useEffect(() => {
    if (radioGroup === 'emails') {
      setIsDatePickerOpen(true);
    } else {
      setIsDatePickerOpen(false);
    }
  }, [radioGroup]);

  const handelDateSubmit = () => {
    setDatePickerSubmitVal(datePickerVal);
  };

  return (
    <CommonDrawer
      title="Export"
      isOk={handleExportModalOpen}
      isDrawerOpen={isExportModalOpen}
      onClose={handleExportModalOpen}
      okText="Apply"
      cancelText={'Cancel'}
      isLoading={
        lazyGetEmailMarketingListAsExportStatus?.status === API_STATUS?.PENDING
      }
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
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

          <SwitchableDatepicker
            isCalendarOpen={isDatePickerOpen}
            setIsCalendarOpen={setIsDatePickerOpen}
            dateValue={datePickerVal}
            setDateValue={setDatePickerVal}
            handleDateSubmit={handelDateSubmit}
          />
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
